---
id: prisma-custom-attributes
title: Customize your Entities and Fields with Custom Prisma Attributes
sidebar_label: Customize your Entities and Fields with Custom Prisma Attributes
slug: /custom-code/custom-prisma-attributes
---

# Customize your Entities and Fields with Custom Prisma Attributes

Prisma is a central cog in [Amplication's open-source stack](/getting-started/) for creating and managing your generated app's database.

Prisma's ability to automatically generate fully customizable database schema helps to keep you focused on building new app features rather than hassling with refactoring for entity changes.

Amplication's UI allows you to declare entities and fields in an intuitive way that map back to Prisma database schema.
But, wha if you need to further customize your entities?
What if you need additional functionality on your entity's fields?

The best way to do this is with Prisma's _Custom Attributes_.

In this guide, you'll learn how to fully utilize Prisma's _Custom Attributes feature_ through the **Custom Attributes text field** available in your project's _Entities_ and _Fields_ settings page.

Let's get started.

## How Amplication generates your database schema with Prisma

First, a quick primer on how Amplication manages and creates your app's database.

Every action that you take in the UI related to database changes is mapped back to the code that Amplication creates for your project.

For example, let's say you create a new service and choose MySQL as your database of choice.
Amplication will generate the following schema:

```
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
The User entity is always created by default for every Amplication service.
:::

That's an example of the `schema.prisma` file that Amplication automatically generates for your application.

Any modifications that you make to your project's Entities and their fields get reflected as changes in your Prisma schema.

For example, let's say you've gone through the [Building New Versions of Your Service]() guide and you've added some new fields to your `User` Entity.

The newly generated schema will look something like the following:

```
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

All of the changes that you make through Amplication's UI always translate back to changes in your code, in this case, to the generated `prisma.schema` file.

**But, Prisma is powerful software. It allows you to further refine and customize your schema beyond what Amplication allows you to do purely through the UI.**

**This is why Amplication gives you access to the Custom Attributes field to fully access that feature and further customize your entities**

First, let's explain what Custom Attributes even are, and then we'll do an in-depth explanation of what's possible with them in the context of Amplication.

## What are Prisma's custom attributes?

Modifications that you make to your Entities and Fields get reflected as changes in your Prisma schema along with the other changes in the app that those changes entail.

Prisma's Custom Attributes allow you to modify the behavior of a field or entity.

Here are a few examples:

1. **Make sure usernames are unique**: When a user signs up to your application, you want to ensure that each user has a unique username.
Using Prisma's custom attributes you can enforce this constraint at the field level.

```
model User {
  username String @unique
}
```

:::important
Please note that the above is a simplified Prisma schema in order to properly showcase the @unique custom attribute.
:::

2. **Auto generating IDs**: In many applications, it's important to have a unique ID for each record, but it can be error-prone to generate these manually.
Prisma provides you with custom attributes to ensure each record has a unique, automatically-incremented ID.

```
model Customer {
  id Int @id @default(autoincrement())
}
```

Here we see two field-level attributes being used for the id field.
The first is the `@id` custom attribute to indicate the `id` field is the one that will used to act as the ID on the entity.
Next is the `@default()` custom attribute.
As you can see the `@default()` has parenthesis associated with it indicating that you can pass parameters to it. In this case the parameter is `autoincrement()` , a Prisma function that can auto-generate an ID.
`@default` is a custom attribute that can be used to define a default value for a field.

3. **Customize the database column that a field maps to**: You can customize the name of the table that can entity maps to in the database with Prisma's `@@map` custom attribute.

This is useful when you want to map an entity (for example `Customer`) to a table with a different name that does not match model naming conventions (for example `customers`).

```
model Customer {
 id Int @id @default(autoincrement())
 createdAt DateTime @default(now())
 firstName String
 
 @@map("website_customers")
}
```

As you can see from the examples above, Prisma provides you with ways to modify fields with Field-level custom attributes, using the `@` syntax. For example, `@id`.

You can also modify the entity as a whole using the `@@` syntax. For example, with the `@@map()` custom attribute.

Also, you can see that some custom attributes you can use as is, like `@id`, and some custom attributes also require parameters for example the `@default` parameter.

In the following sections we're going to dive deeper into the nuances of syntax, which custom attributes are available for you, and what they do.

## Adding custom attributes to your Entities and Fields

So, how can you utilize this powerful feature from Prisma in your Amplication Entities and Fields?

Amplication provides you with a text field in the UI known as the _Custom Attributes_ field.

This text field is available in 2 places: 

1. In the _Field Settings_ screen for your Entity's Field.
2. In the Entity's _General Settings_ page.

Let's dive into the specifics of each one with in-depth explanations and examples. Let's start with Fields.

## Adding custom attributes to your Fields

:::important
One important to to remember is that the custom attributes you set always map back to custom attributes on the generated model that Prisma generaetes for you for each of your custom entities.
:::

```
Add custom attributes to fields using the format @attribute([parameters]) or @attribute. For example: @map(name: "fieldName") @unique @default(value)
```

Field attributes are prefixed with `@`

The syntax is similar to adding custom attributes to the model, but you'll notice that for the model, you have to add two @ symbols. For the field there is only one @symbol that's required.

It needs to be heavily example focused. At least 3 examples with the attributes. This is how you'd input it into Amplication, and this is what would be generated by Amplication.

Here are the attributes that you have access to on the field level:

- `@id` 
- `@default`
- `@unique`
- `@relation`
- `@map`
- `@updatedAt`
- `@ignore`

### Custom Field Attribute Examples

From here on we're going to write out 3 examples to really drive the point home.

Besides attributes, you also have access to various functions. Here is a list of functions.

For more specifics on the attribute functions and on what's available and nuances for each function, please see the Prisma Documentation.

https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#attribute-functions

## Important things to consider when modifying a field with Amplication's UI.

One important thing to consider is that Amplication allows you to customize your field with a few toggles and change the datatype right from the UI.

This is important to remember because if you use the `@unique` attribute from above, and you also **turn on** the unique field toggle, you will see errors.

If you use the unique field toggle, do not include `@unique` in the _Custom Attributes_ textarea.

The Required field, on the other hand, is okay to turn on while including custom attributes. There is no `@required` custom attribute. Intead, what Prisma does is modify the type with the `?` modifer. If you don't include the `?` after the type, then the field will be required on every record of the model.

For example:

```

```

To learn more about optional and mandatory fields, see Prisma's documentation.

https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#optional-and-mandatory-fields

Finally, the search setting relates to that field's visibility within search. It does not modify the custom Prisma settings.

To learn more about Amplication's field search setting, see our documentation on that one here. https://docs.amplication.com/how-to/create-entity-field/#searchable-setting

### Available Field Functions 

Here is a list of functions that are available 

- [`auto()`](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#auto)
- [`autoincrement()`](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#autoincrement)
- [`sequence()`](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#sequence)
- [`cuid()`](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#cuid)
- [`uuid()`](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#uuid)
- [`now()`](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#now)
- [`dbgenerated()`](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#dbgenerated)

Note that some of these functions are not fully supported by Prisma's MongoDB connector. So if you choose MongoDB as your databsae when creating your Amplication service, this is somethign you'll have to keep in mind. See the Prisma documentation for specifics on which functions are available for which database.

## Native 
## Adding custom attributes to the entity

Block attributes are prefixed with `@@`

One way is by going into your project's General Settings and setting the custom attributes on the model level.

You can add custom attributes to the model in one of two ways:

```
Add custom attributes to model using the format @@attribute([parameters]) or @@attribute(). For example: @@index([field_1, field_2])  @@map("modelName")
```

1. `@@attribute([parameters])`
2. `@@attribute()`

For example, `@@index([field_1, field_2])` or `@@map("modelName")`

These are two different syntaxes for accomplishing the same thing.

# References


# Things to consider

[x] People will want to know where they can access a list of commands. It's better to just include them right on the documentation page.

Amplication takes care of adding attributes for you automatically (although these are not displayed in the text field). 

For example, if you turn on the `Unique` toggle on a field, you can think of that as `@unique` being added to your field.

So ensure that you don't add additional unecessary fields. Either turn on the unique field, or add `@unique` to your field. Don't do both at once.

The documentation should include details on the types of custom attributes that can be set at the entity level, how to manage them via the UI, and any constraints or rules related to the custom attributes. Additionally, there should be in-app help or tooltips to guide users while using this feature.

The above is from: https://github.com/amplication/amplication/issues/5989
