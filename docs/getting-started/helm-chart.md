---
id: helm-chart
title: Deploy to a Kubernetes cluster using Helm
sidebar_label: Deploy with Kubernetes and Helm
slug: /helm-chart
---

# Deploy Amplication to a Kubernetes cluster using Helm

Follow this article to deploy an Amplication server to a Kubernetes cluster using Helm.

The article focuses on deployment on a local server for testing and development purposes, but the same method can be implemented for a production environment.

## Prerequisites

Before you start you need to install Kubernetes and Helm.

### Install Kubernetes cluster

The easiest way to deploy a local Kubernetes cluster is using [Docker Desktop](https://www.docker.com/products/docker-desktop).

Once you have it installed, go to the _Kubernetes_ tab in the setting page and check _Enable Kubernetes_
![enable Kubernetes](./assets/helm-chart/enable-kubernetes.png)

There are a few other options that you can choose, you can find the list and instructions to install them [here](https://kubernetes.io/docs/tasks/tools).

### Install Helm

If it is not already installed, you also need to install Helm.

Follow the instructions [on this page](https://helm.sh/docs/intro/install/) to install it.

## Installing Amplication Helm Chart

Open the terminal and go to `./amplication/chart/amplication`

The amplication chart is shipped with a set of defaults that should get you running without any additional configuration.
Run this command

```
helm install amplication . --namespace amplication --create-namespace
```

Amplication Helm chart includes:

1. bitnami/postgresql server
2. Migration job for Amplication server.
3. A Docker Registry and Docker builder using https://hub.docker.com/_/docker, and a volume for the registry (docker image storage).
4. The Amplication server and a volume for `/artifacts`
5. The amplication scheduler

You can monitor the whole list of resources by running the following:

```sh
$ kubectl get all --namespace amplication

# Example output when all resources are completed and ready

NAME                                         READY   STATUS      RESTARTS   AGE
pod/amplication-app-5cb4f9d576-ldsvz         1/1     Running     0          53s
pod/amplication-app-migrate-f6xp4            0/1     Completed   0          53s
pod/amplication-docker-dd5bbd98f-5mrtj       1/1     Running     0          53s
pod/amplication-registry-5f969c6554-c4cbs    1/1     Running     0          53s
pod/amplication-scheduler-7b9557cdc5-dmjv2   1/1     Running     0          53s
pod/localpostgres-0                          1/1     Running     0          53s

NAME                             TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
service/amplication-app          ClusterIP   xx.xx.xx.xx     <none>        3000/TCP   53s
service/amplication-docker       ClusterIP   xx.xx.xx.xx   <none>        2375/TCP   53s
service/amplication-registry     ClusterIP   xx.xx.xx.xx   <none>        5000/TCP   53s
service/localpostgres            ClusterIP   xx.xx.xx.xx    <none>        5432/TCP   53s
service/localpostgres-headless   ClusterIP   None             <none>        5432/TCP   53s

NAME                                    READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/amplication-app         1/1     1            1           53s
deployment.apps/amplication-docker      1/1     1            1           53s
deployment.apps/amplication-registry    1/1     1            1           53s
deployment.apps/amplication-scheduler   1/1     1            1           53s

NAME                                               DESIRED   CURRENT   READY   AGE
replicaset.apps/amplication-app-5cb4f9d576         1         1         1       53s
replicaset.apps/amplication-docker-dd5bbd98f       1         1         1       53s
replicaset.apps/amplication-registry-5f969c6554    1         1         1       53s
replicaset.apps/amplication-scheduler-7b9557cdc5   1         1         1       53s

NAME                             READY   AGE
statefulset.apps/localpostgres   1/1     53s

NAME                                COMPLETIONS   DURATION   AGE
job.batch/amplication-app-migrate   1/1           22s        53s
```

## Port-Forwarding

The final step is port-forwarding the amplication-app port to your localhost so you can access it on a browser client.

```
kubectl port-forward deployment/amplication-app 3000:3000 --namespace amplication
```

Now you can access amplication locally on your browser at `http://localhost:3000` 👍
