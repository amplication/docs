---
id: generated-app
title: The Generated Service
sidebar_label: Introduction
slug: /getting-started
---

# The Generated Service

When you use Amplication to create your backend service, we automatically generate a codebase that follows best practices for software development and is fully functional, human-readable, and editable.

Some of the key features of our generated backend services include:

- **Comprehensive APIs**: Every service includes REST APIs with built-in validation, documentation, and testing capabilities. Optional GraphQL support is available for enhanced data querying.
- **Authentication & Authorization**: Built-in user management, role-based access control, and security best practices.
- **Database Integration**: Robust database connectivity with your choice of modern ORMs and data validation.
- **Developer Experience**: Generated services include logging, testing frameworks, and development tools configured according to industry standards.
- **Production-ready**: Includes Docker configurations and CI/CD pipelines for straightforward deployment to your preferred platform.
- **Extensible Architecture**: Clean, modular architecture that separates business logic from infrastructure concerns, making the code easy to maintain and customize.

:::info Generated Service Example
See an example of a generated service in our [sample application repository](https://github.com/amplication/sample-app).
:::

## Technologies

The generated services utilize a suite of proven, robust technologies tailored for each supported technology.

Below are the technologies used for Amplication's supported tech stacks, ensuring efficient, reliable, and scalable server-side apps.

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

### Databases

Amplication supports multiple databases to cater to your application's specific needs. The following databases are currently supported:

- [MySQL](https://www.mysql.com/) - A popular, open-source relational database known for its reliability, simplicity, and performance.
- [MongoDB](https://www.mongodb.com/) - A source-available, cross-platform, document-oriented NoSQL database program designed for ease of development and scaling.
- [PostgreSQL](https://www.postgresql.org/) - A powerful, open-source object-relational database system with over 30 years of active development.
- [MS SQL Server](https://www.microsoft.com/en-us/sql-server) - A high-performance, secure relational database by Microsoft, providing a reliable and scalable platform for applications.

If you require support for a database not listed above, please [contact us](https://amplication.com/contact-us) to discuss potential integration options.

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
