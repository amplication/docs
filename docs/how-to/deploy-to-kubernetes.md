---
id: deploy-to-kubernetes
title: Deploying to Kubernetes
sidebar_label: Deploy to Kubernetes
slug: /how-to/deploy-to-kubernetes
---

In the dynamic realm of modern software development, deploying applications on Kubernetes has become the defacto standard for reliability, flexibility and faster iteration. This guide distills the process of deploying an Amplication generated application on a Kubernetes cluster.

## Pre-requisites

Although default amplication code generation provides a few of the building blocks required to be able to deploy to kubernetes - e.g., Dockerfile. We will supplement the code base with the other pre-requisites by installing two plugins on the applicable service. These plugins are `Github Actions` and `Helm Chart`. Using these plugins will result in havin the artefacts required to deploy the application to Kubernetes - a container image & helm chart.

### Step 1: Configuration of the Github Actions plugin

When in the overview of the to be deployed service, navigate to the plugins part of the service configuration. Here the `Github Actions` plugin can be found in between various other plugins. Press the `Install` button, this should introduce pending changes and the option to press a `Settings` button, press this to be able to configure the plugin further.

The setting `registry` determines the workflow base that is used. When it is left empty, the default workflow is used - this workflow only includes steps for building and testing the service.

```json title="github-actions-plugin/settings"
{
    "registry" : ""
}
```

For deploying to kubernetes we need to package & publish the container image for the generated service to a container registry. In this example we're going to publish our image to `Github Packages`. The plugin provides us with two possibilities of authentication. If the container image will be deployed to the profile of the user that triggered the workflow, the first can be used. Otherwise the second option could be used to push somewhere else.

Adding the `configuration` options `registry_path` & `authentication_method` will add these additional steps to the workflow file.

```json title="github-actions-plugin/settings | option default github token"
{
    "registry" : "github",
    "configuration" : {
        "registry_path" : "amplication/example-kubernetes-deployment"
    }
}
```

```json title="github-actions-plugin/settings | option personal access token"
{
    "registry" : "github",
    "configuration" : {
        "registry_path" : "amplication/example-kubernetes-deployment",
        "authentication_method" : "pat"
    }
}
```

:::caution
When specifying the `registry_path` keep in mind that it will still be suffixed by the service name. The path for package of for example the server component of a service named `logistics` will be `example-kubernetes-deployment/logistics` and live within the `amplication` github organisation.
:::

### Step 2: Configuration of the Helm Chart plugin

After setting up the process that will result in the first artfact for the kubernetes deployment, we will continue with the setup for the Helm chart that will encapsulate the container image.

When in the overview of the to be deployed service, navigate to the plugins part of the service configuration. Here the `Helm Chart` plugin can be found. Press the `Install` button, this should introduce pending changes and the option to press a `Settings` button, press this to be able to configure the plugin further. As with the `Github Actions` plugin some changes are made to the default generated json settings.

The `root_level` setting determines whether the directory for the helm charts is placed at the root of the repository or in the base directory of the service. The `directory_name` setting determines what the sub-directory for the helm chart in the root level or service base directory is called.

```json title="helm-chart-plugin/settings"
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
Everything that is in the environments variable file for the service is moved to the configmap part of the helm chart, it would be adviced to move secret related configuration to the secrets object and preferably not have the secrets stored in the generated code at all (as this is implementation specific the decision was made to add everything to the configmap).
:::

### Step 3: Building and publishing the container image

After both the `Github Actions` & `Helm Chart` plugin have been enabled and confgured, the pending changes should be enforced by building the service and merging the pull request.

The next step is to run the generated workflow, this can either be done by doing a commit in the service directory or running the manually by using the `workflow_dispatch` trigger. When the workflow has been completed succesfully, this should result in a container image available under github packages.

:::caution
By default github publishes the container image and any subsequent image as `private`, meaning that to access this container image from the Kubernetes cluster in the following part of this walkthrough needs authentication. For simplicity sake the container images have been made public. See the following documentation on how to prepare pulling a container image from a private registry: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry
:::

:::tip
As it is beside the scope, this walkthrough does not include the fact that it is common to host the Helm Chart within Helm Chart repository. This is recommended when for example a GitOps approach is desired. Documentation how to create a Helm Chart repository can be found here: https://helm.sh/docs/topics/chart_repository
:::

## Deployment

Having all required artefacts in-place the next step is the deployment of the application on the Kubernetes cluster. 