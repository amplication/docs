---
id: add-custom-code
title: How To Add Custom Code To Your Service
sidebar_label: Add Custom Code To Your Service
slug: /how-to/add-custom-code-to-your-service
---

# How To Add Custom Code To Your Service

While Amplication generates a robust, production-ready backend for your application, you'll often need to add custom business logic or additional functionality. This guide will walk you through the process of adding custom code to your Amplication-generated service while maintaining compatibility with future builds.

## Prerequisites

Before you begin, make sure you have:

1. [Created your first service](/first-service/)
2. [Set up entities](/set-up-entities/) for your service
3. [Configured roles and permissions](/configure-roles-and-permissions/)
4. [Added plugins to your service](/add-plugins-service/)
5. [Committed changes and built a new version](/commit-and-build-new-versions/)

## Understanding Custom Code in Amplication

When adding custom code to your Amplication-generated service, it's important to understand how Amplication manages and preserves your changes:

1. Custom code is added to specific files that Amplication recognizes and preserves during rebuilds.
2. You'll work directly in your git repository, making changes to the generated code.
3. Amplication uses a folder structure that separates customizable and non-customizable code.
4. The `base` folder contains files that should not be modified, as they will be overwritten by Amplication.
5. Files outside the `base` folder can be safely customized and will be preserved across builds.

Let's walk through the process of adding custom code to implement a password reset feature for the User entity.

## Step 1: Merge the Amplication Branch

First, ensure that your local repository is up-to-date with the latest Amplication-generated code:

1. Open your terminal and navigate to your project's root directory.
2. Switch to your main branch:
   ```bash
   git checkout main
   ```
3. Pull the latest changes:
   ```bash
   git pull origin main
   ```
4. Merge the `amplication` branch into your main branch:
   ```bash
   git merge amplication
   ```
5. Push the merged changes to your remote repository:
   ```bash
   git push origin main
   ```

## Step 2: Create a New Branch for Custom Code

Create a new branch from the main branch to make your custom code changes:

```bash
git checkout -b feature/password-reset main
```

## Step 3: Locate the Correct Files

Navigate to your service's `src` folder. You'll find a folder for each entity. In this case, we'll be working with the `user` folder:

```
src
└── user
    ├── base
    │   ├── user.controller.base.ts
    │   ├── user.service.base.ts
    │   └── ...
    ├── user.controller.ts
    ├── user.module.ts
    ├── user.resolver.ts
    └── user.service.ts
```

We'll be modifying `user.service.ts` and `user.controller.ts` to add our custom password reset functionality.

## Step 4: Add Custom Logic to the Service

Open `src/user/user.service.ts`. This file extends the base service and is where we'll add our custom method.

1. Add the necessary imports at the top of the file:

```typescript
import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { UserServiceBase } from "./base/user.service.base";
import { PasswordService } from "../auth/password.service";
import { User } from "./base/User";
import { UserWhereUniqueInput } from "./base/UserWhereUniqueInput";
```

2. Add the custom `resetPassword` method to the `UserService` class:

```typescript
@Injectable()
export class UserService extends UserServiceBase {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly passwordService: PasswordService
  ) {
    super(prisma, passwordService);
  }

  async resetPassword(args: UserWhereUniqueInput): Promise<User> {
    const newPassword = Math.random().toString(36).slice(-8); // Generate a random password
    const hashedPassword = await this.passwordService.hashPassword(newPassword);
    
    const updatedUser = await this.prisma.user.update({
      where: args,
      data: {
        password: hashedPassword
      }
    });

    // In a real-world scenario, you'd want to send this password to the user securely
    console.log(`New password for user ${updatedUser.id}: ${newPassword}`);

    return updatedUser;
  }
}
```

## Step 5: Add a New Endpoint to the Controller

Now, let's add a new endpoint to the User controller to expose our password reset functionality. Open `src/user/user.controller.ts`:

1. Add the necessary imports at the top of the file:

```typescript
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { UserService } from "./user.service";
import { UserControllerBase } from "./base/user.controller.base";
import { User } from "./base/User";
import { UserWhereUniqueInput } from "./base/UserWhereUniqueInput";
import { AclValidateRequestInterceptor } from "../interceptors/aclValidateRequest.interceptor";
```

2. Add the new `resetPassword` endpoint to the `UserController` class:

```typescript
@swagger.ApiTags("users")
@common.Controller("users")
export class UserController extends UserControllerBase {
  constructor(
    protected readonly service: UserService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @common.Patch("/:id/reset-password")
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "update",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: User })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async resetPassword(
    @common.Param() params: UserWhereUniqueInput
  ): Promise<User> {
    return this.service.resetPassword(params);
  }
}
```

## Step 6: Commit and Push Your Changes

After adding your custom code, commit the changes to your git repository:

```bash
git add .
git commit -m "Added custom password reset functionality"
git push origin feature/password-reset
```

## Step 7: Create a Pull Request

Go to your repository on GitHub (or your chosen git provider) and create a new pull request:

1. Set the base branch to `main`
2. Set the compare branch to `feature/password-reset`
3. Give your pull request a descriptive title and description
4. Create the pull request

## Step 8: Merge the Pull Request

After reviewing your changes, merge the pull request into the main branch. This step integrates your custom code with the main codebase.

## Step 9: Rebuild Your Service in Amplication

Now that you've added custom code to your repository and merged it into the main branch, you need to rebuild your service in Amplication to ensure everything works together:

1. Go to your service in the Amplication web interface.
2. Click on "Commit Changes & Build" in the right sidebar.
3. In the commit message, write "Integrated custom password reset functionality".
4. Click "Commit Changes & Build" to start the build process.

Amplication will now rebuild your service, integrating your custom code with the generated code.

## You're Done!

Congratulations! You've successfully added custom code to implement a password reset feature in your Amplication-generated service. This custom logic will now be available through your API, allowing users to reset their passwords.

## More Custom Code Examples

Here are more examples of how to add custom code in different layers of your service.

The purpose of these examples is to get familiar with the structure and responsibility of each of the components in the server.

- **Example**: [How to add business logic to a service](/custom-code/business-logic/)
- **Example**: [How to add an action to a REST API controller](/custom-code/controller-action/)
- **Example**: [How to add a query to a GraphQL resolver](/custom-code/graphql-query/)

## Best Practices for Custom Code

When adding custom code to your Amplication service, keep these best practices in mind:

1. Always add custom code to the non-base files (e.g., `user.service.ts` instead of `user.service.base.ts`).
2. Use the types and interfaces generated by Amplication to ensure type safety.
3. Leverage the existing services and utilities provided by Amplication (like `PasswordService` in this example).
4. Document your custom code to make it easier for team members to understand and maintain.
5. Always create a new branch for your custom code changes.
6. Regularly merge the `amplication` branch into your main branch to stay up-to-date with Amplication-generated changes.

## Next Steps

Now that you know how to add custom code to your Amplication service, you can extend its functionality in various ways:

- Implement complex business logic specific to your application
- Add custom API endpoints for specialized operations
- Integrate with external services or APIs
- Implement advanced validation and data processing

Amplication is designed to be flexible, allowing you to leverage its powerful code generation while still giving you the freedom to customize your service as needed.
