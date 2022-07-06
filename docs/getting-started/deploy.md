---
id: deploy
title: How to deploy your app
sidebar_label: How to deploy your app
slug: /deploy
---

# How to deploy your app

Applications created with Amplication comprise two main components — the server that runs the API and a database.

When it comes to deployment, you can choose one of the following options:

- Downloading the generated source code and continuing the process with your favorite IDE and local tools.
- Building a Docker container and deploying it to any cloud, data center, or server.

Let’s explore each of the options.


## Downloading the app’s source code

Everything you create on Amplication is generated to really neat and readable TypeScript code. Whether you already have a deployment process in-place, or whether you want full control of your app, at any time you can download the source code from Amplication and continue on your own.

Note that you can always come back and update your app on Amplication and then download an updated version.

To download the source code, click "Download" in the build panel. You'll get a ZIP file with two project:

1. A [NestJS](https://nestjs.com/) app, that includes all your modules, services, controllers, a [Prisma](https://www.prisma.io/) ORM client, and Swagger documentation of your API.
2. A [React](https://reactjs.org/) app, with an Admin UI for executing CRUD queries on your database in addition to using the API.

![](./assets/deploy/generated-app.png)

To use your code locally, you'll need to have [Node.js v16](https://nodejs.org/en/download/), npm, and [Docker](https://docs.docker.com/get-docker/) installed on your machine.

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
