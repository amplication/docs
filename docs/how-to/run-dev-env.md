---
id: run-dev-env
title: How to run your app on development environment
sidebar_label: Run in Dev Environment
slug: /how-to/dev-env
---

# Run your application in development environment

To build and run your generated application in a local development environment follow this tutorial.
VS code is used for demonstration in this article, but the process can be done on any IDE or directly in the command line with npm CLI.

## Summary

Im this article you will go through the following steps:

1. Download your application
2. Install packages from npm for the server
3. Start docker container for your database
4. Initialize your database
5. Run your server
6. Install packages from npm for the Admin UI
7. Run the Admin UI

:::important
Before you start make sure you have Node.js 14, npm, and Docker installed.
:::

## Download your application

First, you will need to download your application source code from Amplication.

1. Commit all your changes so Amplication generate the updated source code.
2. click on the **Download** button on the latest commit. You'll get a ZIP file.
3. Extract the ZIP file to a local folder.
4. Open your application with your favorite IDE

![](./assets/download-code.png)

## Install packages from npm for the server

Your application is using npm for package management. To install all the necessary package follow these steps:

1. Open a command line tool
2. Move to the **Server** folder

```
cd server
```

3. Execute npm install or npm i to download and install all the packages

```
npm install
```

![](./assets/npm-server-install.png)

## Start docker container for your database

Your application is shipped with a built-in connection to postgreSQL DB. To start the database you need to run a docker container using the following command:

```
npm run docker:db
```

## Initialize your database

Now you need to create your application schema on the database. To do so Amplication uses Prisma and the prisma migrate command.

Execute the following command in the command line tool:

```
npm run db:init
```

:::tip
To view the full prisma commands or any other script you can open the package.json file and look for the relevant command in the scripts section  
:::

## Run your server

That's it, your server is ready!
Execute the following command to start your server

```
npm run start
```

By default, your server is now available at http://localhost:3001

Try to open one of these URLs and have fun

- http://localhost:3001/api
- http://localhost:3001/graphql

To read more about the technologies and structure of your server read [this article](../getting-started)

## Install packages from npm for the Admin UI

Now that your server is ready, you can build and run the Admin UI - a React client with ready-made forms for creating and editing all the data models of your application.

To install all the packages needed for the client, follow these steps:

1. in the command line tool, move the the Admin folder. In case you are still in the Server folder, execute this command

```
cd ../admin
```

2. Execute npm install or npm i to download and install all the packages

```
npm install
```

## Run the Admin UI

To run the React application with the Admin UI execute the following command

```
npm run start
```

By default, your client is now available at http://localhost:3000

![](../getting-started/assets/generated-app/admin-ui.png)
