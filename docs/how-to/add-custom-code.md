---
id: add-custom-code
title: How to add custom code to you application
sidebar_label: Add Custom Code
slug: /how-to/custom-code
---

# Add custom code to you application

Although your application built with Amplication is fully functional and you can start using it as it was shipped, you probably want to add your core business logic and other functionality to you app.

## The Vision

Our vision, and soon to be implemented, is that you will be able to add custom code to the application while keeping the ability to work on Amplication to update your data model, change permissions, add roles and more.

To do so, Amplication will merge changes via Git based on pre-defined policies that will allow you to add and update services, controllers, resolvers and more without loosing the link to Amplication. You will have the freedom and power of code, while saving time on the repetitive tasks with Amplication.

Until this feature is ready, you should keep track of changes yourself. It is recommended to do so using GitHub or other git services.

:::info
Until this feature is ready, if you find it too complicated to keep manually merging changes from Amplication, we recommend that you first think thoroughly about your requirements and then build your models and permission schema with Amplication. You can still save a ton of time on boilerplate, permissions, APIs, React structure and more.  
:::

## Example

In this example you will see how to add a new functionality to reset a user password.

The purpose of this example is to get familiar with the layers structure and the responsibility of each of the components in the server.

For simplicity purposes we are updating the existing files created by Amplication. In the future, we will release a set of policies and best-practices how to add custom code that will allow easier maintenance and merge of Amplication's code and your code without conflicts.

### Adding a new function to `user.service.ts`

1. Open your application and open the `user.service.ts`.
   The file in located in `./server/src/user/user.service.ts`.

2. Add import for `user.ts` at the top of the file. This type is required for the return type of our new function.

```typescript
import { User } from "./User";
```

3. Add the following function at the bottom of the file.

```typescript
class UserService {
  // ...
  
  async restPassword(args: FindOneUserArgs): Promise<User> {
    return this.prisma.user.update({
      where: args.where,
      data:{
        password:"123456"
      }
    });
  }
```

:::warning
For simplicity and demonstration purposes this function resets a password to a fixed string `"123456"`. It is against best practices to use this function in production as it is. You should instead use a random complex string as the new password.
:::

This function gets an object of type FindOneUserArgs as a parameter and uses the [prisma client ](https://www.prisma.io/docs/concepts/components/prisma-client) to find the user and reset its password.

### Adding a new endpoint to user.service.ts

1. Open the file `user.controller.ts`.
   The file in located in `./server/src/user/user.controller.ts`.

2. Add the following code at the bottom of the file.

```javascript
class UserController {
   // ...

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id/password")
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "update",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: User })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async resetPassword(
    @common.Param() params: UserWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "own",
      resource: "User",
    });
    const result = await this.service.restPassword({
      where: params,
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }
```

The above code gets a user ID from the request, checks for the user permissions, and calls the `UserService` to reset the password.

#### line-by-line instructions

Follow this line-by-line explanation to learn more about the code you used:

This decorator instructs morgan to log every request to this endpoint. This line is optional.

```typescript
@common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
```

This decorator instructs nestJS to guard this endpoint and prevent anonymous access.

```typescript
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
```

This decorator sets the route for the endpoint.

```typescript
  @common.Patch("/:id/password")
```

This decorator Uses nestJs Access Control to enforce access permissions based on the user's role permissions. In this example it validates that the current user can update users record.

```typescript
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "update",
    possession: "own",
  })
```

These 3 decorators provide information for Swagger UI documentation

```typescript
  @swagger.ApiOkResponse({ type: User })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
```

Create a function called **resetPassword** with parameter of type **UserWhereUniqueInput** and return type **User | null**.

```typescript
async resetPassword(
    @common.Param() params: UserWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<User | null> {
```

This line creates a parameter named **userRoles** and extract its value from the current context using nestAccessControl.
**UserWhereUniqueInput** and return type **User | null**.

```typescript
    @nestAccessControl.UserRoles() userRoles: string[]
```

Create a permission object to be user later for result filtering based on the user permissions.

```typescript
const permission = this.rolesBuilder.permission({
  role: userRoles,
  action: "update",
  possession: "own",
  resource: "User",
});
```

Call the user service to execute the resetPassword, then check and filter the results before return it to the client.

```typescript
const result = await this.service.restPassword({
  where: params,
});
if (result === null) {
  throw new errors.NotFoundException(
    `No resource was found for ${JSON.stringify(params)}`
  );
}
return permission.filter(result);
```

## Check your changes

You are ready to check you changes. Just save all changes and restart your server.
Navigate to http://localhost:3000/api/ to see and execute the new API endpoint.

:::tip
You can run your server in watch mode so it is automatically restarts every time a file in the server code is changed.
Instead of using **npm start** you should use this command

```
nest start --debug --watch
```

:::
