---
id: deploy-to-aws-ecs
title: Deploying to Amazon Web Services Elastic Container Service (ECS)
sidebar_label: Deploy to AWS ECS
slug: /deploy/aws/ecs
---

To get started with deploying your generated service onto Amazon Web Services (RDS), we can look towards Elastic Container Service (ECS). ECS lets you easily deploy an application. This walkthrough uses various [Amplication plugins](/getting-started/plugins/) together, to both provision the infrastructure required as well as setup a process for continuous integration and deployment.

## 1. Pre-requisites - Manual configuration

Although the setup in this example abstracts away a large part of the work to get the service running on Amazon Web Services, some manual actions are required to lay the ground work for the setup.

### Step 1.1: Authentication & Authorization

Both the perspective of the github actions pipeline needs permissions and authentication configuration to be able to push the container image & service task definition. As well as the actual execution of the task definition - for pulling an image, fetching a secret & pushing logs.

### Step 1.1.1. User + credentials (container image & task definition push - github actions)

As we need to GitHub Actions workflow to push a container image to a private repository and a service task definition to an ECS cluster. We need to create a User with the following permissions and create credentials for this user.

permissions - customer-managed: `EcrRelatedPermissions`
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecr:CompleteLayerUpload",
        "ecr:UploadLayerPart",
        "ecr:InitiateLayerUpload",
        "ecr:BatchCheckLayerAvailability",
        "ecr:PutImage",
        "ecr:GetAuthorizationToken"
      ],
      "Resource": "*"
    }
  ]
}
```

permissions - customer-managed: `EcsRelatedPermissions`
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "RegisterTaskDefinition",
      "Effect": "Allow",
      "Action": ["ecs:RegisterTaskDefinition"],
      "Resource": "*"
    },
    {
      "Sid": "PassRolesInTaskDefinition",
      "Effect": "Allow",
      "Action": ["iam:PassRole"],
      "Resource": "*"
    },
    {
      "Sid": "DeployService",
      "Effect": "Allow",
      "Action": ["ecs:UpdateService", "ecs:DescribeServices"],
      "Resource": "*"
    }
  ]
}
```

:::warning

Generate credentials for the user created above and store the credentials as repository secrets on the GitHub repository that will house the workflow that does the pushing of the container image & task definition. The expected keys they should be placed under are `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY`.

:::

### Step 1.1.2. Role (task execution - ecs service)

When executing the service definition that will be pushed from the github actions workflow pipeline in tha last step of this walkthrough, a role must be assigned to the service with the appropriate permissions.

`role: <task-execution-role-name>`

permissions - amazon-managed: `AmazonECSTaskExecutionRolePolicy`
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    }
  ]
}
```

permissions - customer-managed: `AdditionalPermissionsRequired`
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "FetchSecret",
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetSecretValue",
        "kms:Decrypt",
      ],
      "Resource": "*"
    },
    {
      "Sid": "CreateLogGroup",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup"
      ],
      "Resource": "*"
    }
  ]
}
```

:::note

The name of the role created above needs to be passed to the 'Deployment Github Actions AWS ECS' plugin on step 2.5, in the field `ecs_role_name`.

:::

### Step 1.2: Secret

As our generated service needs some secrets propagated in the form of environment variables, we store the values in a form of a json structure under secrets manager. 

:::warning
To be able to finish and start using the secret we need to have created the database first - as we need both the `username`, `password`, `database_url` & `database_name` to fill out the last key-value in the secret. Once we get to the part where these values are available a reference will be made to go back to this step and complete the pre-requisites.
:::

```json title="aws-secrets-manager/<secret-name>" showLineNumbers {5}
{
  "BCRYPT_SALT": "10",
  "JWT_EXPIRATION": "2d",
  "JWT_SECRET_KEY": "abcdef123456",
  "DB_URL": "postgres://<user>:<password>@<database_url>:5432/<dabase_name>"
}
```

### Step 1.3: Bucket name

We're going to store our terraform state in an S3 bucket, so before we can provision the infrastructure we should create the S3 bucket.

:::note

The name of the role created above needs to be passed to the 'Provisioning Terraform AWS Core' plugin on step 2.1, in the field `backend.s3.bucket_name` and make sure that the region aligns with the region in which the bucket was created.

:::

## 2. Pre-requisites - Plugin settings

In addition to the manual configuration above, we need to configure the plugins settings to make sure that the different plugins for Amazon Web Services work together. To get started with configuration of the plugins, they need to be installed first. Go to the plugin overview for the service that you want to deploy to AWS ECS, and install:

- Provisioning Terraform AWS Core
- Provisioning Terraform AWS Repository ECR
- Provisioning Terraform AWS Database RDS
- Provisioning Terraform AWS Deployment ECS
- Deployment Github Actions AWS ECS

### Step 2.1: Configuration of the 'Provisioning Terraform AWS Core' plugin

```json title="provisioning-terraform-aws-core/settings" showLineNumbers
{
  "root_level" : true,
  "directory_name": "terraform",
  "global": {
    "name": "sample-service",
    "region": "eu-west-1",
    "environment": "development"
  },
  "vpc": {
    "cidr_block": "10.0.0.0/16",
    "enable_dns_hostnames": true,
    "enable_dns_support": true,
    "enable_nat_gateway": true,
    "single_nat_gateway": true
  },
  "backend": {
    "type": "s3",
    "s3": {
      "bucket_name": "terraform-state",
      "key": "development/terraform.tfstate",
      "region": "eu-west-1"
    } 
  }
}
```

### Step 2.2: Configuration of the 'Provisioning Terraform AWS Repository ECR' plugin


```json title="provisioning-terraform-aws-repository-ecr/settings" showLineNumbers
{
  "repository_name": "",
  "repository_type": "private",
  "configuration": {
    "force_delete": false
  }
}
```

:::note

When looking at the configuration above it should be noted that the `repository_name` is left empty, in this case the input for that field will default to the name of the generated service.

:::

### Step 2.3: Configuration of the 'Provisioning Terraform AWS Database RDS' plugin

```json title="provisioning-terraform-aws-database-rds/settings" showLineNumbers
{
  "postgres" : {
    "identifier": "",
    "instance_class": "db.t4g.medium",
    "database_name": "",
    "username": "postgres",
    "port": 5432,
    "storage": {
      "allocated": 20,
      "maximum": 100
    },
    "maintenance": {
      "window": "Mon:00:00-Mon:03:00"
    },
    "backup": {
      "window": "03:00-06:00",
      "retention_period": 14
    },
    "security_group": {
      "name": ""
    }
  }
}
```

:::note

When looking at the configuration above it should be noted that the `identifier`, `database_name` & `security_group.name` are left empty, in this case the input for those fields will default to the name of the generated service.

:::

:::warning

As the naming for the database has some constraints, the name will be changed from `sample-service` to `sampleService`, this should be kept in mind when passing the configuration to the manually created secret in step 1.2.

:::

### Step 2.4: Configuration of the 'Provisioning Terraform AWS Deployment ECS' plugin


```json title="provisioning-terraform-aws-deployment-ecs/settings" showLineNumbers
{
  "cluster": {
    "name": "development-cluster",
    "capacity_provider": {
      "type": "fargate",
      "fargate": {
        "fargate_weight": 100,
        "fargate_base": 0,
        "fargate_spot_weight": 0
      }
    }
  },
  "service": {
    "name": "",
    "container_definitions": {
      "image": "012345678901.dkr.ecr.eu-west-1.amazonaws.com/sample-service",
      "port": 3000
    }
  }
}
```

:::note

The most important configuration part in the settings above is to make sure you give the `cluster` the desired `name` as well as that the image is set to match the repository url to be created by the step 1.2 configuration.

:::

### Step 2.5: Configuration of the 'Deployment Github Actions AWS ECS' plugin


```json title="deployment-github-actions-aws-ecs/settings" showLineNumbers
{
  "region_identifier": "eu-west-1",
  "account_identifier": "012345678901",
  "ecr_repository_name": "sample-service",
  "ecr_image_tag": "${{ github.sha }}",
  "ecs_cluster_name": "development-cluster",
  "ecs_role_name": "task-execution-role-name",
  "sm_secret_name": "sample-service",
  "resources": {
    "cpu": "1024",
    "memory": "2048"
  },
  "runtime": {
    "cpu_architecture": "X86_64",
    "os_family": "LINUX"
  }
}
```

:::note

The most important configuration part in the settings above is to make sure you give the correct `region_identifier`, `account_identifier`, `ecr_repository_name`, `ecs_cluster_name` (`cluster.name` on step 2.4) & `sm_secret_name` (match the name and random suffix that are created in step 1.2). The first three make up the exact url where the image can be pulled - which will be supplemented with the `ecr_image_tag`, which doesn't require any changes.

:::

## 3. Code generation

After the plugins settings have been configured - and thus installed on the service that is to be deployed to Amazon ECS, the next step would be to generate the terraform code base and workflow. When having these plugins installed that should be as simple as pressing the `Commit changes & build` button on the right hand side of Amplication. Based on the settings inputted above the generated code will look something like 

``` {3-6, 10-19}
.
├── README.md
├── .github/workflows
│   ├── cd-sample-service-aws-ecs.yaml
│   └── configuration
│       └── cd-sample-service-aws-ecs.json
├── apps
│   ├── sample-service-admin
│   └── sample-service
└── terraform
    ├── backend.tf
    ├── ecr-sample-service.tf
    ├── ecs-sample-service.tf
    ├── main.tf
    ├── outputs.tf
    ├── provider.tf
    ├── rds-sample-service.tf
    ├── variables.tf
    └── vpc.tf
```

## 4. Provisioning

As can be seen in the 'Code generation' paragraph above chaining the different plugins together results in a terraform directory either on the `root level` or at the `service level`. Navigate to this directory on your command-line. 

```shell
terraform init
```

```shell
terraform plan
```

```shell
terraform apply
```

After running the terraform apply, you should be prompted to apply the changes against the Amazon Web Services account. When you're certain that these are the resources with the applicable configuration you want to add to the cluster - input `yes` on the prompt below and press `enter`. The infrastructure should now start being provisioned - this will take approximately 10 minutes.

```shell
...
  + resource "aws_db_parameter_group" "this" {
      + arn         = (known after apply)
      + description = "sample-service parameter group"
      + family      = "postgres14"
      + id          = (known after apply)
      + name        = (known after apply)
      + name_prefix = "sample-service-"
      + tags        = {
          + "Name" = "sample-service"
        }
      + tags_all    = {
          + "Amplication" = "true"
          + "Environment" = "development"
          + "Name"        = "sample-service"
          + "Terraform"   = "true"
        }
    }

Plan: 59 to add, 0 to change, 0 to destroy.
...

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

```

:::caution

Now that the infrastructure has been created within the Amazon Web Services account, we need to make sure that we propagate the database configuration for the recently provisioned database into the secret for `step 1.2`.

:::

## 5. Deployment

With the existing infrastructure and more specifically, the template service we will deploy on top off, we're able to start the deployment process. The deployment process is done via a GitHub Actions workflow that will overwrite the current revision of the task definition with the latest image tag.

The workflow can be triggered in two ways, the first is closing a pull request, the second is a manual trigger on the console of the GitHub Actions workflow.