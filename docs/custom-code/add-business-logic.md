---
id: add-business-logic
title: How to add business logic to a service
sidebar_label: Add business logic to a service
slug: /custom-code/business-logic
---

# How to add business logic to a service

## General

In this example, you will see how to add a new function with your business logic to an existing service.
The _entity_.service.ts file is generated only once by Amplication, and you can freely customize it. Amplication will never override this file.

You can use this file to add new functions, override existing functions that are inherited from _entity_.service.base, import libraries and modules to the file, or anything else you may need.

You may also use the super keyword to call the functions in the base class.

```typescript
//this code invoke the update function on the base class
super.update(args);
```

## example

This example will demonstrate how to pass parameters to the service, how to access the database using [prisma client ](https://www.prisma.io/docs/concepts/components/prisma-client), and how to return the data from the service using your application models.

### Adding a new function to user.service.ts

1. Open your application and open the `user.service.ts`. The file is located in `./server/src/user/user.service.ts`.

Initially, the files should look like this

```typescript
import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { UserServiceBase } from "./base/user.service.base";
import { PasswordService } from "../auth/password.service";

@Injectable()
export class UserService extends UserServiceBase {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly passwordService: PasswordService
  ) {
    super(prisma, passwordService);
  }
}
```

2. Add import for _User_. This is the type that describes the User entity in the application and is required for the return type of our new function.

```javascript
import { User } from "./base/User";
```

2. Add import for _UserFindUniqueArgs_. this is the args type that is used to find a single User by its ID. We will use it as the input parameter of our new function.

```javascript
import { UserFindUniqueArgs } from "./base/UserFindUniqueArgs";
```

3. Add the following function to the bottom of the *UserService* class.

```javascript
async resetPassword(args: UserFindUniqueArgs): Promise<User> {
    return this.prisma.user.update({
      where: args.where,
      data:{
        password:"123456"
      }
    });
  }
```

:::warning
For simplicity and demonstration purposes this function resets a password to a fixed string "123456". It is against best practices to use this function in production as it is. You should instead use a random complex string as the new password.
:::

This function gets an object of type FindOneUserArgs as a parameter.
It uses the [prisma client ](https://www.prisma.io/docs/concepts/components/prisma-client) to find the user and reset its password and then returns the updated user object.
