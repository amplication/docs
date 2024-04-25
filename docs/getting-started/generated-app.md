---
id: generated-app
title: The Generated Service
sidebar_label: Introduction
slug: /getting-started
---

# The Generated Service

When you use Amplication to create your backend service, we automatically generate a codebase that follows best practices for software development and is fully functional, human-readable, and editable.

Some of the key features of our generated backend services include:

- **Extensive Functionality**: The generated services provide a wide range of features, including authentication, authorization, data validation, logging, and a database. For Node.js services, they also offer REST and GraphQL APIs for efficient data communication and a React-based admin UI.
- **Clean Architecture**: Both Node.js and .NET services are structured following the clean architecture principles, ensuring that the business logic is decoupled from the infrastructure and UI layers. This makes the code easier to maintain and test.
- **Ready for Production**: The generated services include Docker configurations, CI/CD pipelines, and are optimized for cloud deployment, making it straightforward to move from development to production.
- **Customizable and Extendable**: While the service provides a solid foundation, it is fully customizable. Developers can extend the generated code with custom features and integrate additional services as needed.

:::note
You can see an example of a Node.js service generated with Amplication in this [GitHub repository](https://github.com/amplication/sample-app).
:::

## Technologies

The generated services utilize a suite of proven, robust technologies tailored for each supported technology.

Below are the technologies employed for Node.js and .NET, ensuring efficient, reliable, and scalable server-side applications.

### Server-side

#### Node.js

- [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js and TypeScript.
- [Passport](https://www.passportjs.org/) - Simple, unobtrusive authentication for Node.js
- [GraphQL](https://graphql.org/) - a query language for APIs.
- [Swagger UI](https://swagger.io/) - Visual documentation for REST API based on OpenAPI Specification.
- [Jest](https://jestjs.io/) - delightful JavaScript Testing Framework with a focus on simplicity.
- [Docker](https://www.docker.com/) - an open platform for developing, shipping, and running applications.

#### .NET

- [ASP.NET Core](https://dotnet.microsoft.com/en-us/apps/aspnet) - A framework for building internet-connected, web-based applications.
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/) - A modern object-database mapper for .NET. It supports queries, change tracking, updates, and schema migrations.
- [Swagger](https://swagger.io/tools/swagger-ui/) - A Swagger tool implementation for API's built with ASP.NET Core, generating beautiful API documentation including a UI to explore and test operations, directly from your routes, controllers, and models.
- [Docker](https://www.docker.com/) - Same as above, used for creating, deploying, and running applications using containers.

### Client-Side

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [React-Admin](https://marmelab.com/react-admin/) - A frontend Framework for building B2B applications running in the browser on top of REST/GraphQL APIs, using ES6, React and Material Design.

## Projects Structure

The code for your generated service is built from a `server` project folder, and an optional `admin` folder for Node.js services:

```
/
|-- server/
|   |-- (Your generated Server code)
|-- admin/
|-- (Your generated Admin UI code for Node.js services)
```

Let's review what these two folders contain:

### Server

The server project provides all the back-end services of your application, like REST API, GraphQL API (for Node.js), authentication, authorization, logging, data validation, and connection to the database.

:::note
The following diagram shows a Node.js-generated service as an example. Both Node.js and .NET are supported.
:::

![](./assets/generated-app/app-components2.jpg)

### Admin

For Node.js services, the Admin project provides a React application with ready-made forms for creating and editing all the data models of your application. The React app is pre-configured to work with the server and comes with all the boilerplate and foundation for your client - routing and navigation, authentication, permissions, menu, breadcrumbs, error handling and much more.

![](./assets/generated-app/admin-ui.png)

## Learn more

- [How to add custom code to your application](/how-to/custom-code)
