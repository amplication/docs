---
title: Customize Your Application
---

# Customize Your Application

Amplication enables you to generate code, manage custom files, and seed databases. We'll give you a brief overview what what Amplication can do in this area.

## Custom Code with Amplication

Amplication generates application code that can be customized to fit your specific needs. It provides several examples and guides on how to achieve this, including:

- [Add action to REST API Controller](/custom-code/controller-action/)
- [Add a custom DTO](/custom-code/add-custom-dto)
- [Adding a query to a GraphQL resolver](/custom-code/add-graphql-query)

These guides cover various aspects of customizing your application code, from adding new fields and relationships to creating custom resolvers and enforcing access control.

## Managing Custom Files

Amplication ensures that your custom files are not affected when it regenerates code. To provide even greater control, it includes the `.amplicationignore` file, which allows you to specify files that should be ignored during the code generation process.

For more information on how to manage custom files and use the `.amplicationignore` file, visit the [Managing custom files](/custom-code/amplicationignore) guide.

## Seeding a Database

Database seeding is the process of populating a database with initial data. Amplication enables you to use a custom script to seed your database on initialization. This can be useful for providing your application with required data or adding dummy data for testing and development purposes.

To learn more about seeding a database with Amplication, refer to the [Seeding a database guide](/custom-code/seed-a-db).