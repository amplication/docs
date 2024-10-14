---
id: add-custom-code
title: Adding Custom Code to Your Amplication Service
sidebar_label: Add Custom Code To Your Service
slug: /add-custom-code-to-your-service
---

# Add Custom Code To Your Service

Amplication generates a robust, production-ready backend for your app, but you'll often need to add your own custom business logic with custom code.
In this guide you'll learn how to add custom code to your Amplication service with a simple example.

## Prerequisites

Before you begin, make sure you know to:

1. [Create your first service](/first-service/)
2. [Set up entities](/set-up-entities/) for your service
3. [Configure roles and permissions](/configure-roles-and-permissions/)
4. [Add plugins to your service](/add-plugins-service/)
5. [Commit changes and build a new version](/commit-and-build-new-versions/)

:::note
For more a more in-depth explanation of how custom code works, read [Understanding Custom Code in Amplication](/custom-code-overview/).
:::

## Adding Custom Code: Retrieve The User's Full Name

Let's walk through a simple example of adding custom code to your service.
In this example, we'll add a method with custom code to get the user's full name.

### Step 1: Create A New Feature Branch

Ensure that your local repository is up-to-date with the latest Amplication-generated code:

```bash
git checkout main && git merge amplication && git push
```

Next, create a new branch from the main branch to make your custom code changes:

```bash
git checkout -b feature/user-full-name
```

### Step 2: Locate the Correct File

Navigate to the code of your generated service's `src` folder and find the `user` folder:

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

We'll modify the `user.service.ts` to add our custom functionality.

:::tip
Notice that we're adding our changes to `user.service.ts` instead of `base/user.service.base.ts` file.
To learn more why we recommend doing this, read [Understanding Custom Code in Amplication](/custom-code-overview/).
:::

### Step 3: Add Custom Logic to the Service

Open `src/user/user.service.ts`. This file extends the base service and is where we'll add our custom method that retrieves the user's full name.

```typescript
import { Injectable } from "@nestjs/common";
import { UserServiceBase } from "./base/user.service.base";

@Injectable()
export class UserService extends UserServiceBase {
  async getUserFullName(userId: string): Promise<string> {
    const user = await this.findOne({ where: { id: userId } });
    return `${user.firstName} ${user.lastName}`;
  }
}
```

Note how it uses the `findOne` method from the base service.

### Step 4: Push Your Changes

After adding your custom code, commit the changes to the git feature branch you created in Step 1:

```bash
git add .
git commit -m "Added full name functionality"
git push origin feature/user-full-name
```

After going through any review process, merge the feature branch into your working branch:

```bash
git checkout main && git merge feature/user-full-name && git push
```

## Next Steps

Now that you know how to add custom code to your Amplication service, you can:

- Implement complex business logic specific to your application
- Create custom utilities and helpers
- Integrate with external services or APIs
- Implement advanced validation and data processing
