---
id: add-business-logic
title: How to add a business logic to a service
sidebar_label: Add Business Login
slug: /custom-code/business-logic
---

# How to add a business logic to a service

In this example you will see how to add a new business logic to an existing service.
The example will demonstrate how to pass parameters to the service, how to access the database using [prisma client ](https://www.prisma.io/docs/concepts/components/prisma-client), and how to return the data from the service using your application models.

:::info
For simplicity purposes we are updating the existing files created by Amplication. In the future, we will release a set of policies and best-practices how to add custom code that will allow easier maintenance and merge of Amplication's code and your code without conflicts.
:::

### Adding a new function to user.service.ts

1. Open your application and open the **user.service.ts**. The file in located in **./server/src/user/user.service.ts**.

2. Add import for user.ts at the top of the file. The user.ts is the type that describe the User entity in the application and is required for the return type of our new function.

```javascript
import { User } from "./User";
```

3. Add the following function at the bottom of the file.

```javascript
async resetPassword(args: FindOneUserArgs): Promise<User> {
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
It uses the [prisma client ](https://www.prisma.io/docs/concepts/components/prisma-client) to find the user and reset its password, and then returns the updated user object.
