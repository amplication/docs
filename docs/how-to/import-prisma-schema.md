---
id: import-prisma-schema
title: Import Prisma Schema
sidebar_label: Import Prisma Schema
slug: /how-to/import-prisma-schema
pagination_next: getting-started/how-prisma-schema-is-converted-into-entities
---

# Import Prisma Schema

Amplication's **Import Prisma Schema** feature lets you use your _existing_ databases for a head start on development.

This way you don't have to manually create entities, fields, and relationships from scratch saving you a lot of time.

Just upload your `schema.prisma` file.
Amplication will then search for models and [convert them into Amplication's internal structure](/getting-started/how-prisma-schema-is-converted-into-entities).

This guide walks you through how to generate a custom `schema.prisma` file from your existing database and upload it to Amplication.

## How to create and upload your `schema.prisma` file

First, you will run the Prisma introspection process on your existing database.
The introspection process will generate a schema file representing your database's tables and columns.

Next, you'll upload the generated file into Amplication, ensuring it's free of errors before doing so.
After upload, you'll see an upload log of everything that happens to [convert the schema into Amplication's internal structure](/getting-started/how-prisma-schema-is-converted-into-entities).
If any warnings appear in the upload log you can then choose to modify your `schema.prisma` file and re-upload it or continue as is.

### Step 1: Run the Introspection process

Introspection is a feature of Prisma that scans your entire database and generates a `schema.prisma` file.
This feature generates a data model that reflects your current database schema.

Here's a quick overview of its main functions on SQL databases:

- Map tables in the database to Prisma models 
- Map columns in the database to the fields of Prisma models
- Map indexes in the database to indexes in the Prisma schema  
- Map database constraints to attributes or type modifiers in the Prisma schema

To learn more see [Prisma's Introspection docs](https://www.prisma.io/docs/concepts/components/introspection#what-does-introspection-do).

Run the `prisma db pull` command in the terminal to start the introspection process.
Using this command requires your database's **Connection URL** be set in your Prisma Schema `datasource`.

```bash
npx prisma db pull
```

:::caution
After generating your schema file, double check it in your code editor for errors.
Make sure you fix any errors before you upload your `schema.prisma` file into Amplication.
There are some cases where the introspection process ends with a schema that might have errors. 
:::

Here's an example of where the generated schema file could have an error:

```graphql title="schema.prisma"
model searchText {
  application_id   BigInt  @id @default(0) @db.UnsignedBigInt
  guid             String  @db.VarChar(50)  
  application_text String? @db.LongText   

  @@index([application_text], map: "idx_searchText_application_text")
}
```

In this case, it's because you cannot define an index on fields with a native type of **LongText** on MySQL. You have to use the `length` argument to the field in the index definition to allow this.

To learn more about other prisma schema issues you might run into, see [Prisma's Error Message Reference](https://www.prisma.io/docs/reference/api-reference/error-reference).

### Step 2: Upload your Prisma Schema File to Amplication

First, visit the _Entities_ page of your service.

![Upload Prisma Schema Button](./assets/upload-prisma-schema-button.png)

If you're subscribed to a Pro or Enterprise plan, you'll see the **Upload Prisma Schema** button in the top right corner.

Click on this button and you'll be presented a form where you can upload your `schema.prisma` file.

![Upload Prisma Schema](./assets/upload-prisma-schema.png)

### Step 3: Check the conversion logs

After uploading the file, you'll see a log of what's happening while Amplication is [converting your prisma schema](/getting-started/how-prisma-schema-is-converted-into-entities) into its internal structure.  

Here's how that log might look:

```bash title="Prisma Schema Conversion Log" 
2023-07-06T09:47:39.410Z (Warning) The option 'PENDING' has been created in the enum 'OrderStatus', but its value has not been mapped
2023-07-06T09:47:39.410Z (Info) The option 'COMPLETED' has been created in the enum 'OrderStatus'
2023-07-06T09:47:39.410Z (Info) The option 'CANCELLED' has been created in the enum 'OrderStatus'
2023-07-06T09:47:39.411Z (Warning) The option 'INDIVIDUAL' has been created in the enum 'CustomerType', but its value has not been mapped  
2023-07-06T09:47:39.411Z (Warning) The option 'COMPANY' has been created in the enum 'CustomerType', but its value has not been mapped
```

These logs detail exactly what is happening during the conversion process.
Make sure that you're okay with everything the logs are displaying.

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