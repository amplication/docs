---
id: deploy
title: Amplication Deployment
sidebar_label: Overview
slug: /deploy
---

# Amplication Deployment

Amplication provides flexible and powerful deployment options for services generated using our platform.
This guide provides an overview of Amplication's deployment options and links to specific instructions for various deployment targets.

## Understanding Amplication's Deployment Architecture

Services created with Amplication, which automatically generates the code, comprise of at least two main parts:

1. The server that runs the API
2. A database

There can be other parts like a Kafka message broker, or a Redis cache, other integration that your service needs.
These will all be additional containers that will be specified in the `docker-compose` file.

When it comes to deployment, you have several options to choose from, allowing you to select the best approach for your development workflow and production needs.

## Deployment Options

### Docker

Amplication generates all necessary configuration and scripts for Docker deployment, making it easy to containerize your application.

[Learn more about deploying with Docker](/deploy/docker-desktop)

### Kubernetes

For those looking to leverage the power of Kubernetes orchestration, Amplication provides the necessary components for a smooth deployment process.

[Learn more about deploying to Kubernetes](/deploy/kubernetes)

### Amazon Web Services (AWS) ECS

Amplication supports deployment to Amazon Web Services using Elastic Container Service (ECS). This option allows you to leverage AWS's managed container orchestration service for deploying, managing, and scaling your containerized applications.

[Learn more about deploying to AWS ECS](/deploy/aws/ecs)

## Request New Deployment Guides

We're always looking to expand our deployment options to meet the needs of our users. Is there a specific deployment target or cloud provider you'd like to see covered in our documentation? We'd love to hear from you!

[Contact us with your deployment guide requests](https://meetings-eu1.hubspot.com/paz-yanover/product-overview-vp-product)
