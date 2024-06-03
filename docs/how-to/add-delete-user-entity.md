---
id: add-delete-user-entity
title: How To Add and Delete The Authentication Entity
sidebar_label: How To Add, Delete, and Change The Authentication Entity
slug: /user-entity
pagination_next: getting-started/authentication
---

# The Authentication Entity

The _Authentication_ entity (formerly known as the _User_ entity) is essential for the proper functioning of the authentication plugins in Amplication. It **is required** in order for you to enable authentication on your service.

If you choose to [create a service _without_ authentication](/authentication/#how-to-create-a-service-without-authentication) then the _Authentication_ entity will not be created.

:::note
The Authentication entity was previously known as the User entity. It serves as the default entity for handling user authentication and authorization in Amplication. While you can customize the Authentication entity to fit your specific needs, it is essential for the proper functioning of the authentication plugins.
:::

## Dependencies Between the Authentication Entity and Authentication Plugins

The authentication plugins, such as the _NestJS Auth Module_ and others, rely on the existence of an _Authentication_ entity to handle user authentication and authorization.

If the _Authentication_ entity is not defined or is missing the required fields, the build process will fail, and the authentication plugins will not function correctly.

It's important to ensure that the _Authentication_ entity is properly defined with the necessary fields before enabling any authentication plugins in your Amplication service.

## Default Authentication Entity Fields

When you create a new _Authentication_ entity in Amplication, it comes with a set of default fields that are necessary for the authentication plugins to work correctly:

- `id` (required by all authentication plugins): An automatically created unique identifier of the entity. It is a required and unique field.
- `createdAt` (required by all authentication plugins): An automatically created field of the time the entity was created. It is a required field.
- `updatedAt` (required by all authentication plugins): An automatically created field of the last time the entity was updated. It is a required field.
- `firstName`: An automatically created field for the first name of the user. It is a searchable single-line text field.
- `lastName`: An automatically created field for the last name of the user. It is a searchable single-line text field.
- `username` (required by NestJS Auth Module): An automatically created field for the username of the user. It is a required, unique, and searchable field.
- `email` (required by NestJS Auth Module): An automatically created field for the email of the user. It is a unique and searchable field.
- `password` (required by NestJS Auth Module): An automatically created field for the password of the user. It is a required field.
- `roles` (required by NestJS Auth Module): An automatically created field for the roles of the user. It is a required field.

These default fields provide the necessary information for user authentication and authorization.

## Default Permissions Based on Authentication Entity Values

Amplication sets up default permissions for various actions related to each entity based on the values defined in the _Authentication_ entity. These permissions determine who can access and perform certain operations on the various entities.

The default permissions for each entity are as follows:

- **View Entity**: Allows users to view the list of entities. By default, this permission is granted to "All Roles".
- **Create Entity**: Allows users to create new entity instances. By default, this permission is granted to "All Roles".
- **Update Entity**: Allows users to update existing entity instances. By default, this permission is granted to "All Roles".
- **Delete Entity**: Allows users to delete entity instances. By default, this permission is granted to "All Roles".
- **Search Entity**: Allows users to search for specific entity instances. By default, this permission is granted to "All Roles".

These default permissions provide a starting point for managing access to the various entities. You can further customize these permissions based on your application's specific requirements by assigning different roles to each permission.

## Adding The Authentication Entity

First, go into your service's _Entities_ page.
Click on the **Add Entity** button in the top right hand corner.
Type `User` into the entity name text field and then click on the **Create Entity** button.

![Add a new Authentication entity to your Amplication service](./../getting-started/assets/authentication/new_user_entity.png)

A popup will appear and give you additional context on restoring the _Authentication_ entity.
Click on the **Restore Default** button and the original _Authentication_ entity provided by Amplication will be restored.

:::note
You have to add the _Authentication_ entity first and then enable the [_NestJS Auth Module_ plugin](/authentication/#nestjs-auth-module-mandatory).
If you try to install the auth plugin first without the _Authentication_ entity, **you will be offered to create it**.
:::

## Deleting The Authentication Entity

Usually, it's possible to delete any Entity that you create on your service.
But, the _Authentication_ entity is special.
In order to delete it, you must first disable the _NestJS Auth Module_.

:::caution
It's possible to restore the original _Authentication_ entity provided by Amplication, but any additional fields or permissions you added will be permanently deleted.
:::

Follow these steps to delete the _Authentication_ entity:

1. Visit your service's Plugins page and toggle the _NestJS Auth Module_ into the off state.

![Disable the NestJS Auth Module](./../getting-started/assets/authentication/disable_auth_plugin.png)

2. Visit your service's _Entities_ page.
You will notice that you can now click the _Authentication_ entity's delete button. Click it and a popup will appear.

![Delete the Authentication entity popup](./../getting-started/assets/authentication/delete_user_popup.png)

3. Click on the popup's **Delete** button. Now the Authentication entity is deleted.

## Changing The Default Authentication Entity

Amplication also gives you the ability to change the default Authentication entity for each service.

![Change the default Authentication entity](./assets/authentication-entity.png)

Follow these steps to change the default Authentication entity:

1. Go to your service's **Settings**.
2. Go to the **Authentication Entity** page.
3. Pick the new Entity you want to be the Authentication entity from the **Entity List** dropdown.
4. You have now set a new Authentication entity.