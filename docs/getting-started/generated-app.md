---
id: generated-app
title: The generated app
sidebar_label: The Generated App
slug: /getting-started
---

# The Generated App

Amplication auto-generates fully functional human-readable and editable apps based on TypeScript and Node.js.

Generated apps include NestJS, Prisma, REST API, GraphQL API, a React admin UI, authentication, authorization, and logging.

In this article you will find the details on the structure of the application and the technologies behind it.

## Technologies

The generated app is built with the following proven open-source technologies:

### Server-side

- [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [Prisma](https://www.prisma.io/) - Next-generation ORM
  for Node.js and TypeScript.
- [PostgreSQL](https://www.postgresql.org/) - The World's Most Advanced Open Source Relational Database
- [Passport](http://www.passportjs.org/) - Simple, unobtrusive authentication for Node.js
- [GraphQL](https://graphql.org/) - a query language for APIs.
- [Swagger UI](https://swagger.io/) - Visual documentation for REST API based on OpenAPI Specification.
- [Jest](https://jestjs.io/) - delightful JavaScript Testing Framework with a focus on simplicity.
- [Docker](https://www.docker.com/) - an open platform for developing, shipping, and running applications.

### Client-Side

- [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js.
- [Formik](https://formik.org/) - React hooks and components for hassle-free form validation.

## Projects Structure

The generated app is built from two projects, each in a separate folder

- Server - For all the server components including REST API, GraphQL, Services and more.
- Admin - For the Admin UI including forms for CRUD operations on all data models.

### Server

The server project provides all the back-end services of your application, like REST API, GraphQL API, authentication, authorization, logging, data validation, and connection to the database.

![](./assets/generated-app/app-components.png)

### Admin

The Admin project provide a React application with ready-made forms for creating and editing all the data models of your application. The React app is pre-configured to work with the server and comes with all the boilerplate and foundation for your client - routing and navigation, authentication, permissions, menu, breadcrumbs, error handling and much more.

![](./assets/generated-app/admin-ui.png)

## Learn more

- [How to add custom code to your application](/docs/how-to/custom-code)
