---
id: run-dev-env
title: How to Run Your Service on a Development Environment
sidebar_label: Run Your Services on a Development Environment
slug: /getting-started/dev-env
---

# Run Your Service on a Development Environment

It's possible to run the code that Amplication generates for your service locally on your machine.
This page will guide you through 7 steps to get your service working in a development environment.

Let's get started.

## Prerequisites

Before proceeding with this guide, make sure that you have the following technologies installed:

- Node.js >= 14
- NPM >= 6.14.4
- Docker

:::info
Also, make sure your service is already connected to a git provider. To do that, please see the [Sync With GitHub](/sync-with-github/) or [Sync With Bitbucket](/sync-with-bitbucket/) page.
:::

## Step 1 - Clone Your Service's Repo

First, visit the git repo that you're syncing your service to.
Clone the repo into a separate folder on your computer.

- [Cloning a repository on GitHub](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
- [Cloning a repository on Bitbucket](https://support.atlassian.com/bitbucket-cloud/docs/clone-a-git-repository/)

## Step 2 - Install Packages from NPM for the Server

Your application is using NPM for package management. To install all the necessary packages, follow these steps:

1. Open a command-line tool
2. Move to the **Server** folder

```
cd server
```

:::note
Depending on how you chose a **Monorepo** or **Polyrepo** style to push your code to your git repo, you will have to `cd` into an additionl folder.
:::

For example, if your service is named `Order Service` and you chose a [_Monorepo_](/first-service/#step-4-select-your-repo-style) style, your server folder would be at `apps/order-service`.

If you chose the [_Polyrepo_](/first-service/#step-4-select-your-repo-style) style, there will be a folder named `order-service` at the root of your repo.
In that case, run `cd order-service`.

3. Execute `npm install` or `npm i` to download and install all the packages

```
npm install
```

:::caution
If you run into issues during the installation step, please see our troubleshooting guide on [installation fails](/errors/installation-fails/).
:::

## Step 3 - Start a Docker Container for Your Database

To start the database, you need to run a Docker container using the following command:

```
npm run docker:db
```

## Step 4 - Initialize Your Database

Now you need to create your application schema in the database. To do so, Amplication uses Prisma and the Prisma migrate command.

First, execute the following command in the command-line tool to generate the Prisma client

```
npm run prisma:generate 
```

:::caution
If Prisma is denied access to the PostgreSQL DB, please see [our troubleshooting guide](/errors/prisma-denied-access-on-postgres/) to fix that.
:::

Now, execute the following command in the command-line tool to generate the schema in the database

```
npm run db:init
```

:::tip
To view the full Prisma commands or any other script, you can open the `package.json` file and look for the relevant command in the scripts section.  
:::

## Step 5 - Run Your Server

That's it, your server is ready!
Execute the following command to start your server

```
npm run start
```

By default, your server is now available at `http://localhost:3000`

Open one of these URLs and have fun.

- [`http://localhost:3000/api`](http://localhost:3000/api)
- [`http://localhost:3000/graphql`](http://localhost:3000/graphql)

To read more about the technologies and structure of your server, read [this article](../../getting-started).

## Step 6 - Install Packages from NPM for the Admin UI

Now that your server is ready, you can build and run the Admin UI - a React client with ready-made forms for creating and editing all the data models of your application.

To install all the packages needed for the client, follow these steps:

1. In the command-line tool, move to the Admin folder. If you are still in the Server folder, execute this command

```
cd ../admin-ui
```

:::note
Depending on the name of your service and your repo style, the name of the admin UI folder can be different.
:::

2. Execute `npm install` or `npm i` to download and install all the packages

```
npm install
```

## Step 7 - Run the Admin UI

To run the React application with the Admin UI, execute the following command

```
npm run start
```

By default, your client is now available at `http://localhost:3001`

:::tip
Make sure that the server is started and running in the background _before_ starting the admin UI. You can run `npm run start` for the admin UI in a separate shell from the one running the server.
:::