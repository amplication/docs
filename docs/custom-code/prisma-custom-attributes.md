---
id: prisma-custom-attributes
title: Customize your Entities and Fields with Custom Prisma Attributes
sidebar_label: Customize your Entities and Fields with Custom Prisma Attributes
slug: /prisma-custom-attributes
---

# Customizing your Entities and Fields with Custom Prisma Attributes

Prisma is a central cog in [Amplication's open-source stack](/getting-started/) for creating and managing your generated app's database.

Prisma's ability to automatically generate fully customizable database schema helps to keep you focused on building new app features rather than hassling with refactoring for entity changes.

Amplication's UI allows you to declare entities and fields in an intuitive way that map back to common Prisma database schema.
But, what if you need to further customize your entities?
What if you need additional functionality on your entity's fields?

The best way to do this is with Prisma's _Custom Attributes_.

In this guide, you'll learn how to fully utilize Prisma's _Custom Attributes feature_ through the **Custom Attributes text field** available in your project's _Entities_ and _Fields_ settings page.

## How Amplication generates your database schema with Prisma

First, a quick primer on how Amplication manages and creates your app's database.

Every action that you take in Amplication's UI related to database changes is mapped back to the code that Amplication creates for your project.

For example, let's say you create a new service, choose MySQL as your database of choice, and also [add authentication](/authentication/).

Amplication will generate the following Prisma schema:

```ts
datasource mysql {
  provider = "mysql"
  url      = env("DB_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  createdAt DateTime @default(now())
  firstName String?
  id        String   @id @default(cuid())
  lastName  String?
  password  String
  roles     Json
  updatedAt DateTime @updatedAt
  username  String   @unique
}
```

:::important
The User entity is _only_ created for your Amplication service if you enable authentication.
:::

The above code snippet is an example of the `schema.prisma` file that Amplication automatically generates for your application.
Any modifications that you make to your project's _Entities_ and their _Fields_ get reflected as changes in your Prisma schema.

Now let's say you add some new fields to your service's _User_ entity.
For example, a new `projects` field and a `tasks` field.

After you commit your changes and Amplication builds your project, the newly generated `schema.prisma` file will look like the following:

```ts
model User {
  createdAt DateTime  @default(now())
  firstName String?
  id        String    @id @default(cuid())
  lastName  String?
  password  String
  projects  Project[]
  roles     Json
  tasks     Task[]
  updatedAt DateTime  @updatedAt
  username  String    @unique
}
```

:::important
The [Building New Versions of Your Service](/building-new-versions/) shows you the necessary steps for adding new entities and fields to your service and [committing those changes to your git provider](/sync-with-github/).
:::

All of the changes that you make through Amplication's UI always translate back to changes in your code, in this case (database changes), to the generated `schema.prisma` file.

**But, Prisma is powerful. It allows you to further refine and customize your schema beyond what Amplication allows you to do purely through the UI.**

This is why Amplication gives you access to the Custom Attributes text field to fully access that feature and further customize your entities

## What are Prisma Custom Attributes?

Prisma's Custom Attributes allow you to modify the behavior of an entire Entity or a specific Field.

Let's go through a few examples of when Custom Attributes prove to be useful:

1. **Make sure usernames are unique**: When a user signs up for your application, you want to ensure that each user has a unique username.
Using Prisma's custom attributes you can enforce this constraint at the field level.

```ts
model User {
  username String @unique
}
```

:::info
This is a simplified schema to showcase Prisma's `@unique` [field-level custom attribute](#field-level-custom-attributes).
Amplication supports the `@unique` out of the box directly from the UI.
But, if you use the unique field toggle, do not include `@unique` in the _Custom Attributes_ textarea.
You will see errors in your schema.
:::

2. **Enforce uniqueness on multiple fields**: In many applications, it's important to uniquely identify records by a combination of fields. Prisma lets you enforce this at the entity level with a composite unique index using the `@@unique` custom attribute.

```ts
model Customer {
  firstName String
  lastName String
  email String
  
  @@unique([firstName, lastName, email])
}
```

Here you can see an [entity-level custom attribute](#entity-level-custom-attributes) using two `@@` symbols, as opposed to the single `@` symbol used for field-level attributes.

3. **Customize the database column that a field maps to**: You can customize the name of the table that an entity maps to in the database using Prisma's `@@map` custom attribute.

This is useful when you want to map an entity (for example `Customer`) to a table with a different name that does not match model naming conventions (for example `customers`).

```ts
model Customer {
 id Int @id @default(autoincrement())
 createdAt DateTime @default(now())
 firstName String
 
 @@map("website_customers")
}
```

These are just a few examples of what Prisma's Custom Attributes allow you to do.

In the following sections, we're going to dive deeper into the nuances of the syntax, which custom attributes are available for you, and what they do.

## How to add Custom Attributes to your Entities and Fields

Amplication provides you with a text field in the UI known as the **Custom Attributes** text field.

This text field is available in 2 places: 

1. In the _Field Settings_ screen, for adding custom attributes to your individual Fields.
2. In the Entity's _General Settings_ page, for adding custom attributes to your Entities as a whole.

The custom attributes that you use for _Fields_ and the ones you use for _Entities_ are different syntactically and functionally.

Let's dive into the specifics of each with in-depth explanations and examples.

## How to add Field-level Custom Attributes

Field-specific Custom Attributes are prefixed with a single `@`.

You have access to custom attributes, like `@id`, and also custom attribute functions like `@default()`.

:::info
All entity-level custom attributes supported by Prisma can be used with Amplication.
See the [Prisma documentation on field attributes](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#attributes) for the full list.
:::

### Field-level Custom Attributes

Let's say that you want to add an Email Address Field to your User _Entity_.
After following the steps and adding the field, you want to ensure that it's unique so that there can't be multiple of the same email addresses.
In this case, you can use the `@unique` custom attribute.

In the Email Address Field's Field Settings page, you can enter the following into the Custom Attributes text field:

```
@unique
```

That'll ensure that this field has to contain a unique value.

When Amplication generates your app it will include the following in your `schema.prisma` file:

```ts
model User {
  emailAddress String @unique
}
```

:::important
If you use the unique field UI toggle, **do not** include `@unique` in the _Custom Attributes_ text field. Choose one method of making your field unique.
:::

### Field-level Custom Attribute Functions

Custom Attributes can also take parameters, and those are known as Custom Attribute Functions.

For example, let's say that you want your User Entity's Field Name to go to a column titled `first_name`.
In this case, you can use the `@map()` custom attribute function.

In the First Name Field's Field Settings page for the User Entity, enter the following into the Custom Attributes text field:

```
@map("first_name")
```

This will map First Name to a column with a different name in the database.

When Amplication generates your app that will include the following in your `schema.prisma` file:

```ts
model User {
  firstName String @map("first_name")
}
```

:::important
If you don't use `@map`, the Prisma field name matches the column name or document field name exactly.
:::

### Native Types

Lastly, there is a different type of custom attribute, known as a **Native Type** which you can also add to the Field level.

For example, if you have a Post _Entity_ and you want to ensure that the length of the title is never longer than 200 characters, you can do the following:

First, go to the Title Field's Field Settings page and add the following to the Custom Attributes text field:

```
@db.VarChar(200)
```

That will add a Native Type custom attribute to the Post's title field. It will ensure that it's never longer than 200 characters by utilizing MySQL's VarChar type.

That will include the following in your `schema.prisma` file:

```ts
model Post {
  title String @db.VarChar(200)
}
```

:::note
Native types are specific to the underlying database and they're prefixed with `@db`.
To learn more visit the [Prisma docs on Native Types](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#native-types-mapping).
:::

## How to add Entity-level Custom Attributes

Entity-level Custom Attributes are prefixed with a `@@`, two at symbols.

The way to add these to your Entity is by going into your Entity's General Settings page and inputting the custom attributes into the Custom Attributes text field.

:::info
All entity-level custom attributes supported by Prisma can be used with Amplication.
See the [Prisma documentation on field attributes](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#attributes) for the full list.
:::

### Entity-level Custom Attributes

Let's say you want to change the name of the table that your Users get saved into.
You can use the `@@map` entity-level custom attribute to use a different name.

In your User Entity's General Settings page, you can enter the following:

```
@@map("our_users")
```

That will map the entire table for the User entity into a table named `our_users`.

Amplication will include the following in your `schema.prisma` when generating your app:

```ts
model User {
  id   Int    @id @default(autoincrement())
  name String

  @@map("users")
}
```

## Important Considerations to make with Custom Attributes and Amplication's UI

1. Don't use the `@unique` custom attribute and the unique field UI toggle

If you use the `@unique` custom attribute by entering it into the **Custom Attributes text field**, and you also **turn on** the unique field toggle, you will see errors in your schema.

2. You _can_ the required UI field with custom attributes

The Required UI field, on the other hand, is okay to turn on while including custom attributes. Prisma modifies the type with the `?` modifier. If you don't include the `?` after the type, then the field will be required on every record of the model.

For example:

```ts
model Order {
  id String @id
  items String[]
  address String? // address is optional 
}
```

In this case, the `Order` entity's `address` field is optional, but `items` is mandatory.

:::note
To learn more, see [Prisma's documentation on optional and mandatory fields](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#optional-and-mandatory-fields).
:::

## References

1. [Prisma Custom Attributes](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#defining-attributes)
2. [Prisma Attribute Functions](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#attribute-functions)
3. [Prisma Native Types](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#native-types-mapping)
