---
id: add-graphql-query
title: How to add an query to a GraphQL resolver
sidebar_label: Add a query to a GraphQL resolver
slug: /custom-code/graphql-query
---

# How to add a query to a GraphQL resolver

## General

In this example, you will see how to add a query to a GraphQL resolver.

The _entity_.resolver.ts file is generated only once by Amplication, and you can freely customize it. Amplication will never override this file.

You can use this file to add new queries and mutations or override existing ones that are inherited from _entity_.resolver.base.ts

## Example

The example will demonstrate how to add a new query to the resolver class and call a service to execute the query.

### Adding a new query to user.resolver.ts

1. Open the file **user.resolver.ts**. The file is located in **./server/src/user/user.resolver.ts**.

Initially, the file should look like this

```typescript
import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { UserResolverBase } from "./base/user.resolver.base";
import { User } from "./base/User";
import { UserService } from "./user.service";

@graphql.Resolver(() => User)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class UserResolver extends UserResolverBase {
  constructor(
    protected readonly service: UserService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
```

2. Add import for _gqlUserRoles_. This is the decorator that provides the roles of the current user.

```typeScript
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
```

3. Add import for _UserFindManyArgs_. this is the args type that is used to find multiple Users. We will use it as the input parameter of our new function.

```typeScript
import { UserFindManyArgs } from "./base/UserFindManyArgs";
```

4. Add the following code at the bottom of the class.

```typescript
  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [User])
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
  async users(
    @graphql.Args() args: UserFindManyArgs,
  ): Promise<User[]> {
    return this.service.findMany({
      ...args,
      take: 100,
    });
  }
```

The above code overrides the default **users** query. It adds a value to the **take** property to limit the number of users to return.

#### line-by-line instructions

Follow this line-by-line explanation to learn more about the code you used:

This decorator uses [Nest interceptor](https://docs.nestjs.com/interceptors) that we created (AclFilterResponseInterceptor) 
to filter the response object based on the user permissions.

```typescript
@common.UseInterceptors(AclFilterResponseInterceptor)
```

This decorator defines that this function is a GraphQL query with a return type Array of User.

```typescript
  @graphql.Query(() => [User])
```

This decorator Uses nestJS Access Control to enforce access permissions based on the user's role permissions. This example validates that the current user can read user records.

```typescript
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "any",
  })
```

Create a function called **users**. with parameter of type **FindManyUserArgs** and return type **User[]**.

```typescript
async users(
    @graphql.Args() args: UserFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User[]> {
```

Call the user service to execute the findMany function, then check and filter the results before returning them to the client.

```typescript
return await this.service.findMany({
  ...args,
  take: 100,
});
```

## Check your changes

You are ready to check your changes. Just save all changes and restart your server.
Navigate to http://localhost:3000/graphql/ to see and execute the new query.

:::tip
You can run your server in watch mode so it automatically restarts every time a file in the server code is changed.
Instead of using **npm start** you should use this command

```
nest start --debug --watch
```

:::
