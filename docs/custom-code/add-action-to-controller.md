---
id: add-action-to-controller
title: How to add an action to a REST API controller
sidebar_label: Add REST API Action
slug: /custom-code/controller-action
---

# How to add an action to a REST API controller

In this example you will see how to add an action to a REST API controller.

The example will demonstrate how to get the parameters from the request and call a service to execute the operation.

It will also demonstrate how to check the user's permissions, how to add Swagger UI documentation, and how to log the request.

:::info
For simplicity purposes we are updating the existing files created by Amplication. In the future, we will release a set of policies and best-practices how to add custom code that will allow easier maintenance and merge of Amplication's code and your code without conflicts.
:::

### Adding a new endpoint to user.controller.ts

1. Open the file **user.controller.ts**. The file in located in **./server/src/user/user.controller.ts**.

2. Add the following code at the bottom of the file.

```javascript
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

The above code gets a user ID from the request, checks for the user permissions, and calls the userService to reset the password.

#### line-by-line instructions

Follow this line-by-line explanation to learn more about the code you used:

This decorator instructs morgan to log every request to this endpoint. This line is optional.

```javascript
@common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
```

This decorator instructs nestJS to guard this endpoint and prevent anonymous access.

```javascript
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
```

This decorator sets the route for the endpoint.

```javascript
  @common.Patch("/:id/password")
```

This decorator Uses nestJs Access Control to enforce access permissions based on the user's role permissions. In this example it validates that the current user can update users record.

```javascript
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "update",
    possession: "own",
  })
```

These 3 decorators provide information for Swagger UI documentation

```javascript
  @swagger.ApiOkResponse({ type: User })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
```

Create a function called **resetPassword** with parameter of type **UserWhereUniqueInput** and return type **User | null**.

```javascript
async resetPassword(
    @common.Param() params: UserWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<User | null> {
```

This line creates a parameter named **userRoles** and extract its value from the current context using nestAccessControl.
**UserWhereUniqueInput** and return type **User | null**.

```javascript
    @nestAccessControl.UserRoles() userRoles: string[]
```

Create a permission object to be used later for result filtering based on the user permissions.

```javascript
const permission = this.rolesBuilder.permission({
  role: userRoles,
  action: "update",
  possession: "own",
  resource: "User",
});
```

Call the user service to execute the resetPassword, then check and filter the results before return it to the client.

```javascript
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
