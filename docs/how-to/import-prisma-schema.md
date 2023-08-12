---
id: import-prisma-schema
title: Import Prisma Schema
sidebar_label: Import Prisma Schema
slug: /how-to/import-prisma-schema
pagination_next: getting-started/how-prisma-schema-is-converted-into-entities
---

# Import Prisma Schema

Amplication's **Import Prisma Schema** feature lets you use your _existing_ databases for a head start on development.

For example, if you want to build a new application or [API](/api/) using an existing database, you can import its schema to quickly generate Amplication entities, fields, and relationships, saving significant time.

Just upload your `schema.prisma` file.
Amplication will then search for models and [convert them into Amplication's internal structure](/getting-started/how-prisma-schema-is-converted-into-entities).

This guide walks you through how to generate a custom `schema.prisma` file from your existing database and upload it to Amplication.

## How to create and upload your `schema.prisma` file

To import your schema into Amplication, you first need to run Prisma's introspection process on your existing database.

### Step 1: Run the Introspection process

Introspection is a feature of Prisma that scans your entire database and generates a `schema.prisma` file.
This feature generates a data model that reflects your current database schema.

Here's a quick overview of its main functions on SQL databases:

- Map tables in the database to Prisma models 
- Map columns in the database to the fields of Prisma models
- Map indexes in the database to indexes in the Prisma schema  
- Map database constraints to attributes or type modifiers in the Prisma schema

To learn more see [Prisma's Introspection docs](https://www.prisma.io/docs/concepts/components/introspection#what-does-introspection-do).

Here are the steps to introspect your database:

#### Install Prisma

If you don't have Prisma CLI installed globally, install it:

```bash
npm install -g prisma
```

#### Set the connection URL in `prisma.schema`

Next, create a `prisma.schema` file.

Now add your database's **connection URL** to the `url` parameter in the datasource block of your new `prisma.schema` file.

Here's an example:

```graphql title="prisma.schema"
datasource db {
  provider = "postgresql"
  url      = "postgresql://janedoe:mypassword@localhost:5432/mydb?schema=sample"
}
```

The format of the `url` parameter depends on your database provider.
For example, PostgreSQL connection URLs start with `postgresql://`.

Visit the [Prisma docs' section on connection URLs](https://www.prisma.io/docs/reference/database-reference/connection-urls) for details on constructing yours.

#### Run The Prisma Introspection Command

Run the following command in the same directory as your `schema.prisma` file:

```bash
prisma db pull
```

:::caution
After generating your schema file, double check it in your code editor for errors.
Make sure you fix any errors before you upload your `schema.prisma` file into Amplication.
There are some cases where the introspection process ends with a schema that might have errors.

Visit [Prisma's Error Message Reference](https://www.prisma.io/docs/reference/api-reference/error-reference) to learn more about other prisma schema issues you might run into.
:::

Here's a simple example of what happens when you run the introspection process on a Postgres database:

```graphql title="prisma.schema"
model posts {
  id Int @id

  @@map("posts")
}

model User {
  user_id    Int    @id 
  first_name String

  @@map("users") 
}
```

The introspection process generated Prisma models matching the original PostgreSQL database structure.
It created a `posts` model and `user_id` field for the `User` model based on the database table and column names.

However, changes are needed for the schema to follow Prisma conventions:

- The `posts` model should be named Post for PascalCase.
- The `user_id` field needs the `@id` directive to indicate the primary key
- Any foreign key fields need `@relation` directives to define relationships

Additional conversions are also required to generate Amplication entities from 
Additional conversions are also required to generate Amplication entities from the schema.
You'll learn more about that process on the **[How Prisma Schemas Are Converted Into Amplication Entities](/getting-started/how-prisma-schema-is-converted-into-entities)** page.

### Step 2: Upload your Prisma Schema File to Amplication

Visit the _Entities_ page of your service.

![Upload Prisma Schema Button](./assets/upload-prisma-schema-button.png)

You'll now see the **Upload Prisma Schema** button in the top right corner.

Click on this button and you'll be presented a form where you can upload your `schema.prisma` file.

![Upload Prisma Schema](./assets/upload-prisma-schema.png)

### Step 3: Check the conversion logs

After uploading the file, you'll see a log of what's happening while Amplication is [converting your prisma schema](/getting-started/how-prisma-schema-is-converted-into-entities) into its internal structure.  

Here's how that log might look:

![Amplication Import Prisma Schema Upload Log](./../getting-started/assets/import-prisma-schema-log.png)

These logs detail what is happening during the conversion process.

:::caution
If the `schema.prisma` file is invalid, doesn't contain entities, or one of the operations in the process receives an unexpected value — the process will stop immediately.
An error message will then by displayed showing you what happened.  
:::

Check the [Log Warnings](/getting-started/how-prisma-schema-is-converted-into-entities#log-warnings) section to get a bit more detail on what these logs are about.

### Step 4: Check your new entities

After a successful upload and conversion process, you will see your newly created entities on your dashboard.

## Next Steps  

Now you have your own custom database schema uploaded into Amplication.

To learn more about the mechanisms Amplication uses to convert your schema.prisma file into Amplication's internal structure, visit the **[How Prisma Schemas Are Converted Into Amplication Entities](/getting-started/how-prisma-schema-is-converted-into-entities)** page.

You can also visit the **Prisma Custom Attributes** page to further familiarize yourself with custom attributes like `@id` and `@@map`.

Some of the transformations involve custom attributes in some way. Learning more about Prisma Custom Attributes will help you understand what's happening, but also how to effectively utilize them to add more functionality to your entities and fields.