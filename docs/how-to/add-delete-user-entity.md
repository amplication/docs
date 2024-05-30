---
id: add-delete-user-entity
title: How To Add and Delete The User Entity
sidebar_label: How To Add, Delete, and Change The User Entity
slug: /user-entity
pagination_next: getting-started/authentication
---

# The User Entity

The _User_ entity is essential for the proper functioning of the authentication plugins in Amplication. It **is required** in order for you to enable authentication on your service.

If you choose to [create a service _without_ authentication](/authentication/#how-to-create-a-service-without-authentication) then the _User_ entity will not be created.

## Dependencies Between the User Entity and Authentication Plugins

The authentication plugins, such as the _NestJS Auth Module_ and others, rely on the existence of a _User_ entity to handle user authentication and authorization.

If the _User_ entity is not defined or is missing the required fields, the build process will fail, and the authentication plugins will not function correctly.

It's important to ensure that the _User_ entity is properly defined with the necessary fields before enabling any authentication plugins in your Amplication service.

## Default User Entity Fields

When you create a new _User_ entity in Amplication, it comes with a set of default fields that are necessary for the authentication plugins to work correctly:

- `id`: An automatically created unique identifier of the entity. It is a required and unique field.
- `createdAt`: An automatically created field of the time the entity was created. It is a required field.
- `updatedAt`: An automatically created field of the last time the entity was updated. It is a required field.
- `firstName`: An automatically created field for the first name of the user. It is a searchable single-line text field.
- `lastName`: An automatically created field for the last name of the user. It is a searchable single-line text field.
- `username`: An automatically created field for the username of the user. It is a required, unique, and searchable field.
- `email`: An automatically created field for the email of the user. It is a unique and searchable field.
- `password`: An automatically created field for the password of the user. It is a required field.
- `roles`: An automatically created field for the roles of the user. It is a required field.

These default fields provide the necessary information for user authentication and authorization.

## Default User Permissions

Amplication also sets up default permissions for various actions related to the _User_ entity. These permissions determine who can access and perform certain operations on the entity.

The default permissions for the _User_ entity are as follows:

- **View Users**: Allows users to view the list of users. By default, this permission is granted to "All Roles".
- **Create Users**: Allows users to create new user accounts. By default, this permission is granted to "All Roles".
- **Update Users**: Allows users to update existing user accounts. By default, this permission is granted to "All Roles".
- **Delete Users**: Allows users to delete user accounts. By default, this permission is granted to "All Roles".
- **Search Users**: Allows users to search for specific user accounts. By default, this permission is granted to "All Roles".

These default permissions provide a starting point for managing access to the _User_ entity. You can further customize these permissions based on your application's specific requirements by assigning different roles to each permission.

## Adding The User Entity

First, go into your service's _Entities_ page.
Click on the **Add Entity** button in the top right hand corner.
Type `User` into the entity name text field and then click on the **Create Entity** button.

![Add a new User entity to your Amplication service](./../getting-started/assets/authentication/new_user_entity.png)

A popup will appear and give you additional context on restoring the _User_ entity.
Click on the **Restore Default** button and the original _User_ entity provided by Amplication will be restored.

:::note
You have to add the _User_ entity first and then enable the [_NestJS Auth Module_ plugin](/authentication/#nestjs-auth-module-mandatory).
If you try to install the auth plugin first without the _User_ entity, **you will be offered to create it**.
:::

## Deleting The User Entity

Usually, it's possible to delete any Entity that you create on your service.
But, the _User_ entity is special.
In order to delete it, you must first disable the _NestJS Auth Module_.

:::caution
It's possible to restore the original _User_ entity provided by Amplication, but any additional fields or permissions you added will be permanently deleted.
:::

Follow these steps to delete the _User_ entity:

1. Visit your service's Plugins page and toggle the _NestJS Auth Module_ into the off state.

![Disable the NestJS Auth Module](./../getting-started/assets/authentication/disable_auth_plugin.png)

2. Visit your service's _Entities_ page.
You will notice that you can now click the _User_ entity's delete button. Click it and a popup will appear.

![Delete the User entity popup](./../getting-started/assets/authentication/delete_user_popup.png)

3. Click on the popup's **Delete** button. Now the User entity is deleted.

## Changing The Default User Entity

Amplication also gives you the ability to change the default User entity for each service.

![Change the default User entity](./assets/authentication-entity.png)

Follow these steps to change the default User entity:

1. Go to your service's **Settings**.
2. Go to the **Authentication Entity** page.
3. Pick the new Entity you want to be the User entity from the **Entity List** dropdown.
4. You have now set a new User entity.
