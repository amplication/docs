---
id: add-custom-code
title: Adding Custom Code to Your Amplication Service
sidebar_label: Adding Custom Code
slug: /add-custom-code-to-your-service
---

# Adding Custom Code to Your Amplication Service

While Amplication generates a robust, production-ready backend for your application, you'll often need to add custom business logic or additional functionality. This guide explains how Amplication manages custom code alongside generated code, and provides best practices for adding your own code to an Amplication-generated service.

## Prerequisites

Before you begin, make sure you know to:

1. [Create your first service](/first-service/)
2. [Set up entities](/set-up-entities/) for your service
3. [Configure roles and permissions](/configure-roles-and-permissions/)
4. [Add plugins to your service](/add-plugins-service/)
5. [Commit changes and build a new version](/commit-and-build-new-versions/)

:::note
For more a more in-depth explanation, read [Understanding Custom Code in Amplication](/custom-code-overview/)
:::

## Adding Custom Code: A Simple Example

Let's walk through a simple example of adding custom code to your service.

### Step 1: Create A New Feature Branch

Ensure that your local repository is up-to-date with the latest Amplication-generated code:

```bash
git checkout main && git merge amplication && git push
```

Next, create a new branch from the main branch to make your custom code changes:

```bash
git checkout -b feature/user-full-name
```

### Step 2: Locate the Correct Files

Navigate to your service's `src` folder and find the `user` folder:

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

We'll be modifying `user.service.ts` to add our custom functionality.

### Step 3: Add Custom Logic to the Service

Open `src/user/user.service.ts`. This file extends the base service and is where we'll add our custom method.

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

This example adds a simple method to get a user's full name. Note how it uses the `findOne` method from the base service.

### Step 4: Push Your Changes

After adding your custom code, commit the changes to your git repository:

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
