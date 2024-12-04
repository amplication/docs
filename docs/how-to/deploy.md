---
id: deploy
title: Amplication Deployment
sidebar_label: Overview
slug: /deploy
---

# Amplication Deployment

Amplication provides flexible and powerful deployment options for services generated using our platform.
This guide provides an overview of deployment options and links to specific instructions for various deployment targets.

## Understanding Amplication's Deployment Architecture

Every Amplication service consists of core components that work together to deliver your application:

### Core Components

1. **API Server**: Your main application server
2. **Database**: Persistent data storage

### Optional Components

Depending on your service requirements, you may include:

- Admin Interface (Pre-built administrative dashboard)
- Message brokers (e.g., Kafka, RabbitMQ)
- Caching solutions (e.g., Redis)
- Other plugins

All components are containerized and defined in your generated `docker-compose` file, making deployment consistent across environments.

## Deployment Options

When it comes to deployment, you have several options to choose from, allowing you to select the best approach for your development workflow and production needs.

### Docker

Amplication generates all necessary configuration and scripts for Docker deployment, making it easy to containerize your application.

[Learn more about deploying with Docker](/deploy/docker-desktop)

### Kubernetes

For those looking to leverage the power of Kubernetes orchestration, Amplication provides the necessary plugins for a smooth deployment process.

[Learn more about deploying to Kubernetes](/deploy/kubernetes)

### Amazon Web Services (AWS) ECS

Amplication has plugins that enable deployment to Amazon Web Services using Elastic Container Service (ECS). This option allows you to leverage AWS's managed container orchestration service for deploying, managing, and scaling your containerized applications.

[Learn more about deploying to AWS ECS](/deploy/aws/ecs)

## Request New Deployment Guides

We're always looking to expand our deployment options to meet the needs of our users. Is there a specific deployment target or cloud provider you'd like to see covered in our documentation? We'd love to hear from you!

[Contact us with your deployment guide requests](https://meetings-eu1.hubspot.com/paz-yanover/product-overview-vp-product)
