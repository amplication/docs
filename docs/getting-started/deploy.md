---
id: deploy
title: How to deploy your app
sidebar_label: Deploy your app
slug: /deploy
---

# How to deploy your app

Applications created with Amplication comprise two main components — the server that runs the API and a database.

When it comes to deployment, you can choose any of the following options:

- Deploying to the Amplication cloud for testing and development purposes.
- Downloading the generated source code and continuing the process with your favorite IDE and local tools.
- Building a Docker container and deploying it to any cloud, data center, or server.

Let’s explore each of the options.

## Continuous deployment to the Amplication cloud

When working with Amplication, all your committed changes are continuously deployed to a sandbox environment on the Amplication cloud so you can easily access your application for testing and development purposes.

Click the “Preview App” link in the build panel to access the login page of your application's Admin UI.

![](./assets/deploy/login.png)

By default, your app comes with one user: username "admin" and password "admin". Use these credentials to access your app and create other users.

:::tip
If encountered with "Invalid email or password" when using the credentials with username "admin" and password "admin" then rebuild the code to trigger a new deployment.This usually occurs when DB migration did not complete successfully.
:::

You can also navigate to _/api_ to see the REST API docs (Swagger) or _/graphql_ to see the GraphQL API playground. 


The sandbox environment provided by Amplication is not for production purposes (currently all existing data in the environment is purged following each deployment), but it’s a great starting point while developing your app. The sandbox environment is totally free of charge — like all other things in Amplication.

We are working to offer production-like (remember, we are still in beta) environments with data retention in an upcoming release. Stay tuned for news and updates.

## Downloading the app’s source code

Everything you create on Amplication is generated to really neat and readable TypeScript code. Whether you already have a deployment process in-place, or whether you want full control of your app, at any time you can download the source code from Amplication and continue on your own.

Note that you can always come back and update your app on Amplication and then download an updated version.

To download the source code, click "Download" in the build panel. You'll get a ZIP file with two project:

1. A [NestJS](https://nestjs.com/) app, that includes all your modules, services, controllers, a [Prisma](https://www.prisma.io/) ORM client, and Swagger documentation of your API.
2. A [React](https://reactjs.org/) app, with an Admin UI for executing CRUD queries on your database in addition to using the API.

![](./assets/deploy/generated-app.png)

To use your code locally, you'll need to have [Node v14](https://nodejs.org/en/download/), npm, and [Docker](https://docs.docker.com/get-docker/) installed on your machine.

To start using your app, extract the ZIP file to a local folder and execute the following commands:

```
npm i
npm run docker:db
npm run db:init
npm start
```

## Deploy a Docker container

You can also easily build a Docker container to prepare your app for deployment. Your app is always generated with all the configuration and scripts needed to do so.

First download the source code of your app and extract the ZIP file to a local folder (same as explained in previous section).

To run your app in Docker with a functional database, execute the docker-compose command

```
docker-compose up
```
