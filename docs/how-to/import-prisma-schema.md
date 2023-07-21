---
id: import-prisma-schema
title: Import Custom Prisma Database Schema
sidebar_label: Import Custom Prisma Database Schema
slug: /how-to/import-prisma-schema
---

# Import Custom Prisma Database Schema

Amplication was primarily suited for brand new projects.
Developers create a new service and a fresh new database along with it.

Now with Amplication's Import Custom Prisma Schema feature you can utilize Amplication's full potential for your _existing_ databases. 

This feature reads your `schema.prisma` file for entities, fields, and their relationships and converts them into Amplication's internal structure.
That way you don't have to manually create entities, fields, and relationships from scratch saving you a lot of time.

This guide will walk you through how to generate a custom .prisma file from your existing database and upload it to Amplication. 
You'll also learn more about how the process works for converting the schema into Amplication's structure.

## How to create and upload your `schema.prisma` file

The first step is to run the Prisma introspection process on your existing database.
The introspection will generate a schema file representing your database's tables and columns.

Next, you'll upload the generated file into Amplication ensuring its free of errors before doing so.
You'll see a complete log of everything involved from translating the schema into Amplication's internal structure.
You can then decide to re-upload based on any warnings or continue as is. 

Let's go.

### Step 1: Run the Introspection process

Introspection is a feature of Prisma that scans your entire database and generates a `schema.prisma` file.
This feature generates a data model that reflects your current database schema.

Here's a quick overview of its main functions on SQL databases:

- Map tables in the database to Prisma models 
- Map columns in the database to the fields of Prisma models
- Map indexes in the database to indexes in the Prisma schema  
- Map database constraints to attributes or type modifiers in the Prisma schema

To learn more see [Prisma's documentation on Introspection](https://www.prisma.io/docs/concepts/components/introspection#what-does-introspection-do).

Run the `prisma db pull` command in the terminal to start the introspection process.
Using this command requires your **Connection URL** be set in your Prisma Schema `datasource`.

```bash
npx prisma db pull
```

:::caution
After generating your schema file, double check it in your code editor. The presence of any red squiggly lines indicates an invalid schema.
Make sure you fix any errors before you upload your `schema.prisma` file into Amplication.  
There are some cases where the introspection process ends with a schema that might have errors. 
:::

Here's an example of where the generated schema file might have an error:

```graphql title="schema.prisma"
model searchText {
  application_id   BigInt  @id @default(0) @db.UnsignedBigInt
  guid             String  @db.VarChar(50)  
  application_text String? @db.LongText   

  @@index([application_text], map: "idx_searchText_application_text")
}
```

In this case, it's because you cannot define an index on fields with a native type of **LongText** on MySQL. Please see the `length` argument in the field in the index definition to allow this.

To learn more about other prisma schema issues you might run into see the Prisma Schema errors in the [prisma documentation](https://www.prisma.io/docs/concepts/components/prisma-schema).

### Step 2: Upload your Prisma Schema File to Amplication  

First, visit the _Entities_ page of your service.

![Upload Prisma Schema Button](./assets/upload-prisma-schema-button.png)

If you're on the correct plan, you'll see the **Upload Prisma Schema** button in the top right corner.  

Click on this button and you'll be presented a form where you can upload your `schema.prisma` file.

![Upload Prisma Schema](./assets/upload-prisma-schema.png)

After uploading you'll begin to see logs of what's happening while Amplication is converting your prisma schema into its internal structure.  

Check the [Upload Log Warnings](#upload-log-warnings) section to get a bit more detail on what these logs are about. It's possible that you'll have to go back and modify your schema an then re-upload your file, so make sure that you're okay with everything the logs are displaying.

:::caution
If the `schema.prisma` file is invalid, doesn't contain entities, or one of the operations in the process receives an unexpected value — the process will stop immediately.
An error message will then by displayed showing you what happened.  
:::

### Step 3: Check your new entities  

After successfully uploading your `prisma.schema` file, you will see your newly created entities on your dashboard.

## Upload Log Warnings

While your `schema.prisma` file is processing you'll see various types of logs like `(Info)` and `(Warning)` giving you information on what's happening in real-time.

The schema will still process with warnings, but it's possible you might want to make some changes to your schema file and re-upload after correcting the warnings.

### 1. Custom Attributes on enum keys

Amplication currently does not support adding custom attributes to enum and enum keys.
Instead, Amplication instead allows you to define options as an `optionSet` or `multiSelectOptionSet`.

So if your Prisma schema includes `@map` or `@@map` custom attributes on an enum or enum keys, these attributes will not be accurately represented after processing.
The final Prisma schema file will not contain these mapping attributes.  

If your app logic relies on `@map` and `@@map` custom attributes, you'll need to manually adjust the generated `schema.prisma` file or your app code to ensure everything works correctly.

Here's how that log might look:

```bash title="Amplication Upload Log" 
2023-07-06T09:47:39.410Z (Warning) The option 'PENDING' has been created in the enum 'OrderStatus', but its value has not been mapped
2023-07-06T09:47:39.410Z (Info) The option 'COMPLETED' has been created in the enum 'OrderStatus'
2023-07-06T09:47:39.410Z (Info) The option 'CANCELLED' has been created in the enum 'OrderStatus'
2023-07-06T09:47:39.411Z (Warning) The option 'INDIVIDUAL' has been created in the enum 'CustomerType', but its value has not been mapped  
2023-07-06T09:47:39.411Z (Warning) The option 'COMPANY' has been created in the enum 'CustomerType', but its value has not been mapped
```

### 2. Composite IDs on models   

A model in Prisma can use the `@@id` custom attribute and combine fields to create a unique identifier for each record.
But, due to current limitations, Amplication requires that each model have a single, distinct `id` field.   

During schema processing. Amplication modifies IDs created with the `@@id` custom attribute to be `@@unique` custom attributes, which are supported.
It also introduces a new `id` field of type `String` to each model.   

For example, if your generated `schema.prisma` file looks like the following:

```tsx title="schema.prisma"
model Employee {
  firstName String
  lastName  String
  birthdate DateTime

  @@id([firstName, lastName, birthdate])
}
```

Amplication will transform it to look like the following:  

```diff title="schema.prisma"
model Employee {
+ id String @id @default(cuid())
  firstName String
  lastName  String
  birthdate DateTime

- @@id([firstName, lastName, birthdate])  
+ @@unique([firstName, lastName, birthdate])
}
```

As the schema is processed, we log warning entries if we encounter a model without an `id` field and an existing `@@id` attribute.

Here's an example of how that log might look:

```bash title="Amplication Upload Log"
2023-07-08T08:03:00.559Z (Warning) Attribute "id" was changed to "unique" on model "Employee"
2023-07-08T08:03:00.559Z (Warning) id field was added to model "Employee" 
```

This approach this maintains uniqueness and integrity for each record in the database, but it may impact how relationships and queries are designed, given the shift from a composite id with `@@id` to a singular one.

## How Amplication processes your `schema.prisma` file  

After your upload your schema to Amplication, it will then go through a series of transformations so that it matches Amplication's internal structure.
This is what you see in the [Upload Log](#upload-log-warnings) while your file is processing.

Ultimately, Amplication will process your schema by running it through 3 different phases:

1. Validate
2. Prepare
3. Convert

We're going to briefly explain those 3 steps that your schema goes through here.

### Step 1: Validate   

The first validation step is performed immediately after you upload your `schema.prisma` file.

The purpose of this step is to valid the structure and syntax of the `schema.prisma` file.
This validation process is grounded in the [Prisma conventions](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#naming-conventions) and other restrictions.

Besides checking structure and syntax, the validate step also checks if the schema contains any models to process. If no models are present, you see will an error, and the conversion process will stop.

### Step 2: Prepare   

Ultimately, Amplication runs the schema through 5 different operations:

1. prepareModelNames
2. prepareFieldNames  
3. prepareFieldTypes
4. prepareModelIdAttribute
5. prepareIdField

Each operation represents a transformation to be made on the schema, and their collective execution ensures the schema is in the correct format before being used for Amplication’s entities and fields creation.

#### Model Names

This part renames models in the Prisma schema to follow Amplication's specific format.

Amplication's format is model names in **PascalCase**, **no underscores**, and **singular**.

All original model names are preserved in the database with the `@@map` custom attribute where necessary.

:::note
If the model already has the **`@@map`** attribute, it won’t be added, even if the model name was formatted. 
:::

Here's an example of a transformation that would happen on one model:

```diff title="schema.prisma"
-model course_rating  
+model CourseRating {
  id        String    @id @default(cuid())
	createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
	rating    Int      

+@@map("course_rating") 
}
```

#### Field Names

Field names will also go through a similar conversion.

Amplication's format for field names is **camelCase** and **no underscores**.


It also ensures that original field names are preserved in the database by adding `@map` custom attributes where needed.

:::note
If the field already has the **`@map`** attribute, it won’t be added, even if the field name was formatted.
:::

Here's a quick example of a simple field name transformation:

```diff title="schema.prisma"
model Product {
  id          String   @id @default(cuid())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  name        String?
-item_price  Float?
+itemPrice  Float?    @map("item_price")
  description String?
  orders      Order[]
}
```

#### Field Types

Now that Amplication has updated both the model names and field names, it has to update the types of the fields.

For example, here's how two models could see transformations:

```diff name="schema.prisma"  
-model products
+model Product {
  id          String   @id @default(cuid())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  name        String?
  itemPrice   Float?
  description String? 
-orders      orders[]
+orders      Order[]
}

-model orders
+model Order {
  id         String    @id @default(cuid())
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
  totalPrice Int?
-product    products?  @relation(fields: [productId], references: [id])  
+product    Product?  @relation(fields: [productId], references: [id])
  productId  String?
}
```

#### Model IDs  

As stated in the [warnings section](#upload-log-warnings), users cannot use composite IDs in their models due to current limitations with Amplication.

This phase converts `@@id` attributes in your models to `@@unique` attributes.

It also introduces an `id` field of type `String` to every model that uses a composite ID.

Here's an example of this transformation:

```graphql title="schema.prisma"
model DomainUnit {
+id  String @id @default(cuid())
  domainId String
  unitId   String

-@@id([domainId, unitId])
+@@unique([domainId, unitId])
}
```

#### The ID field  

Finally, there's a conversion of all ID fields.

This part ensures that your Prisma schema aligns with Amplication's requirement of having an **`id`** field for each model.

non-ID fields named **`id`** are renamed to **`${modelName}Id`** to prevent any collisions with the actual ID field.

If an ID field (a field with an `@id` attribute) has a different name, it's renamed to **`id`**.

But, in either case, a `@map` custom attribute is added to the field with the original field name.

Here's an example:

```diff title="schema.prisma"
model RandomName {
-randomId.         Int     @id  
+id                Int     @id @map("randomId")
-id.               Int?
+randomNameId     Int?    @map("id")
  fullName         String
} 
```

### Step 3: Convert  

Following the preparation phase, we leverage the updated Prisma schema to generate Amplication's entity and field objects derived directly from this prepared schema.

The first thing that happens is that the Prisma Models get converted into Amplication entities.
This is based on the following information:

- Name
- Display Name
- Plural Display Name
- Description
- Custom Attribute
- Fields

The next thing that happens is that the Prisma data types get converted into Amplication data types.

Here is a re-written table summarizing the Prisma to Amplication data type conversions:

| Prisma | Amplication | Description |
|-|-|-|  
| String (ID) | Id | Converts ID field with String type to Amplication Id type, defaults to cuid |
| Int (ID) | Id (autoincrement) | Converts ID field with Int type to autoincrement Amplication Id |   
| Boolean | Boolean | Same Boolean type |
| DateTime (@default(now())) | CreatedAt | DateTime with now() default converts to CreatedAt |
| DateTime (@updatedAt) | UpdatedAt | DateTime with updatedAt attribute converts to UpdatedAt |
| DateTime | DateTime | Plain DateTime remains DateTime |
| Float, Decimal | Decimal | Float and Decimal convert to Decimal |
| Int, BigInt | WholeNumber | Int and BigInt convert to WholeNumber |
| String | SingleLineText | String converts to SingleLineText |    
| Json | Json | Json types are equivalent |  
| Enum | OptionSet | Enum converts to OptionSet |
| Enum[] | MultiSelectOptionSet | Enum array converts to MultiSelectOptionSet |
| Model relation | Lookup | Relation to another model becomes Lookup |


## Next Steps  

That's it!
Now you have your own custom database schema uploaded into Amplication.

If you haven't already, make sure you visit the [Prisma Custom Attributes](/custom-code/prisma-custom-attributes/) page to further familiarize yourself with custom attributes like `@id` and `@@map`.

Some of the transformations involve custom attributes in some way. Learning more about Prisma Custom Attributes will help you understand what's happening, but also how to effectively utilize them to add more functionality to your entities and fields.