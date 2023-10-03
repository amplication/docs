---
id: deploy-kubernetes
title: Deploying to Kubernetes
sidebar_label: Deploy to Kubernetes
slug: /deploy/kubernetes
---

In the dynamic realm of modern software development, deploying applications on Kubernetes has become the defacto standard for reliability, flexibility and faster iteration. This guide distills the process of deploying an Amplication generated application on a Kubernetes cluster.

## Pre-requisites

Although default amplication code generation provides a few of the building blocks required to be able to deploy to kubernetes - e.g., Dockerfile. We will supplement the code base with the other pre-requisites by installing two plugins on the applicable service. These plugins are `Github Actions` and `Helm Chart`. Using these plugins will result in having the artifacts required to deploy the application to Kubernetes - a container image & helm chart.

### Step 1: Configuration of the Github Actions plugin

When in the overview of the to be deployed service, navigate to the plugins part of the service configuration. Here the `Github Actions` plugin can be found in between various other plugins. Press the `Install` button, this should introduce pending changes and the option to press a `Settings` button, press this to be able to configure the plugin further.

The setting `registry` determines the workflow base that is used. When it is left empty, the default workflow is used - this workflow only includes steps for building and testing the service.

```json title="github-actions-plugin/settings" showLineNumbers
{
    "registry" : ""
}
```

For deploying to kubernetes we need to package & publish the container image for the generated service to a container registry. In this example we're going to publish our image to `Github Packages`. The plugin provides us with two possibilities of authentication. If the container image will be deployed to the profile of the user that triggered the workflow, the first can be used. Otherwise the second option could be used to push somewhere else.

Adding the `configuration` options `registry_path` & `authentication_method` will add these additional steps to the workflow file.

```json title="github-actions-plugin/settings | option default github token" showLineNumbers
{
    "registry" : "github",
    "configuration" : {
        "registry_path" : "amplication/example-kubernetes-deployment"
    }
}
```

```json title="github-actions-plugin/settings | option personal access token" showLineNumbers
{
    "registry" : "github",
    "configuration" : {
        "registry_path" : "amplication/example-kubernetes-deployment",
        "authentication_method" : "pat"
    }
}
```

:::caution

When specifying the `registry_path` keep in mind that it will still be suffixed by the service name. The path for package of for example the server component of a service named `logistics` will be `example-kubernetes-deployment/logistics` and live within the `amplication` GitHub organization.

:::

### Step 2: Configuration of the Helm Chart plugin

After setting up the process that will result in the first artifact for the kubernetes deployment, we will continue with the setup for the Helm chart that will encapsulate the container image.

When in the overview of the to be deployed service, navigate to the plugins part of the service configuration. Here the `Helm Chart` plugin can be found. Press the `Install` button, this should introduce pending changes and the option to press a `Settings` button, press this to be able to configure the plugin further. As with the `Github Actions` plugin some changes are made to the default generated json settings.

The `root_level` setting determines whether the directory for the helm charts is placed at the root of the repository or in the base directory of the service. The `directory_name` setting determines what the sub-directory for the helm chart in the root level or service base directory is called.

```json title="helm-chart-plugin/settings" showLineNumbers
{
  "root_level": true,
  "directory_name": "helm",
  "server": {
    "chart_version": "0.0.1",
    "application_version": "0.0.1",
    "repository": "ghcr.io/amplication/example-kubernetes-deployment/logists",
    "tag": "latest",
    "host": "server.example.com",
    "port": "3000"
  },
  "admin_ui": {
    "enabled": false
  }
}
```

:::note

Everything that is in the environments variable file for the service is moved to the `configmap` part of the helm chart, it would be advised to move secret related configuration to the secrets object and preferably not have the secrets stored in the generated code at all (as this is implementation specific the decision was made to add everything to the `configmap`).

:::

### Step 3: Building and publishing the container image

After both the `Github Actions` & `Helm Chart` plugin have been enabled and configured, the pending changes should be enforced by building the service and merging the pull request.

The next step is to run the generated workflow, this can either be done by doing a commit in the service directory or running the manually by using the `workflow_dispatch` trigger. When the workflow has been completed successfully, this should result in a container image available under github packages.

:::caution

By default github publishes the container image and any subsequent image as `private`, meaning that to access this container image from the Kubernetes cluster in the following part of this walkthrough needs authentication. For simplicity sake the container images have been made public. See the following documentation on how to prepare pulling a container image from a private registry: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry

:::

:::tip

As it is beside the scope, this walkthrough does not include the fact that it is common to host the Helm Chart within Helm Chart repository. This is recommended when for example a GitOps approach is desired. Documentation how to create a Helm Chart repository can be found here: https://helm.sh/docs/topics/chart_repository

:::

## Deployment

Having all required artifacts in-place the next step is the deployment of the application on the Kubernetes cluster. The steps provided next should be provider agnostic, whether you're running on [Amazon Elastic Kubernetes Service](https://aws.amazon.com/eks), [Azure Kubernetes Service](https://learn.microsoft.com/en-us/azure/aks) or [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine) or a local distribution like [Minikube](https://minikube.sigs.k8s.io/), [Kind](https://kind.sigs.k8s.io/) or [K3s](https://k3s.io/).

For the deployment process we need to following applications installed:
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
- [helm](https://helm.sh/docs/intro/install/)

### Step 4: Accessing the Kubernetes cluster

Wherever the Kubernetes cluster might exist, the first step of the deployment process is getting access to the cluster. This means you'll need to have access to the api endpoint & authentication. This is done in the form of a `kubeconfig` file, which is used to group access parameters under a convenient name.

As the `~/.kube/config` file can consists of multiple `context` elements, we'll start by setting the right context - this requires you the fetch the `kubeconfig` file for the cluster, the way you can fetch this depends on the kubernetes provider, look at the provider specific documentation:

```bash title="terminal"
kubectl set context
```

### Step 5: Render the Helm Chart

After setting up the access to the cluster, before we're going to manually deploy into the Kubernetes cluster we should make sure that the helm chart we're going to be installing renders as expected.

```bash title="terminal"
helm template location/of/the/helm-chart/directory
```

```yaml title="terminal | helm template - output"
---
# Source: logistics/templates/serviceaccount.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: release-name-logistics
  labels:
    helm.sh/chart: logistics-0.0.1
    app.kubernetes.io/name: logistics
    app.kubernetes.io/instance: release-name
    app.kubernetes.io/version: "0.0.1"
    app.kubernetes.io/managed-by: Helm
---
# Source: logistics/templates/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: release-name-logistics
...
```

:::note

Make sure that the rendered repository name and image tag on the deployment is matching the container image repository: `"ghcr.io/amplication/example-kubernetes-deployment/logistics:latest"` set by the `GitHub Actions` workflow.

:::

### Step 6: Installing the Helm Chart on the Kubernetes cluster

The last step to get the generated application running on the Kubernetes cluster, would be to execute the `helm install` command. This command takes a few [flags](https://helm.sh/docs/helm/helm_install/#options) that augment the way it is installed on the cluster.

```bash title="syntax | helm install"
helm install [NAME] [CHART] [flags]
```

```bash title="example | helm install"
helm install logistics-server helm/logistics --namespace logistics-server --create-namespace
```

```bash title="output"
NAME: logistics
LAST DEPLOYED: Wed Sep 27 17:23:03 2023
NAMESPACE: logistics-server
STATUS: deployed
REVISION: 1
TEST SUITE: None
```

The different Kubernetes objects for the generated service should now be on the Kubernetes cluster, as part of the deployment the container image will be pulled and in that way the generated service source code runs on the Kubernetes cluster.

:::caution

The `deployment` part of the helm chart also renders an `initContainer` which execute the prisma schema migration on the database specified throught the `.Values.variables.configmap.DB_URL` or `.Values.variables.secret.DB_URL` - when this fails to connect to the database the main container of the deployment won't intialize.

:::