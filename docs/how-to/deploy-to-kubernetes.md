---
id: deploy-to-kubernetes
title: Deploying to Kubernetes
sidebar_label: Deploy to Kubernetes
slug: /how-to/deploy-to-kubernetes
---

In the dynamic realm of modern software development, deploying applications on Kubernetes has become the defacto standard for reliability, flexibility and faster iteration. This guide distills the process of deploying an Amplication generated application on a Kubernetes cluster.

## Pre-requisites

Although default amplication code generation provides a few of the building blocks required to be able to deploy to kubernetes - e.g., Dockerfile. We will supplement the code base with the other pre-requisites by installing two plugins on the applicable service. These plugins are `Github Actions` and `Helm Chart`. Using these plugins will result in havin the artefacts required to deploy the application to Kubernetes - a container image & helm chart.

### Step 1: Configuration - Github Actions plugin

When in the overview of the to be deployed service, navigate to the plugins part of the service configuration. Here the `Github Actions` plugin can be found in between various other plugins. Press the `Install` button, this should introduce pending changes and the option to press a `Settings` button, press this to be able to configure the plugin further.

The setting `registry`` determines the workflow base that is used. When it is left empty, the default workflow is used - this workflow only includes steps for building and testing the service.

```json
{
    "registry" : ""
}
```

For deploying to kubernetes we need to package & publish the container image for the generated service to a container registry. In this example we're going to publish our image to `Github Packages`. The plugin provides us with two possibilities of authentication. If the container image will be deployed to the profile of the user that triggered the workflow, the first can be used. Otherwise the second option could be used to push somewhere else.

"selection of options"

option 1 - default github token:

```json
{
    "registry" : "github",
    "configuration" : {
        "registry_path" : "amplication/example-kubernetes-deployment"
    }
}
```

option 2 - personal access token:

```json
{
    "registry" : "github",
    "configuration" : {
        "registry_path" : "amplication/example-kubernetes-deployment",
        "authentication_method" : "pat"
    }
}
```

## Step 2: Configuration - Helm Chart plugin

```

```