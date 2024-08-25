---
id: create-admin-git-ignore
title: Create Admin Git Ignore | .NET Plugin Event
description: Creates the .gitignore file for the admin UI.
sidebar_label: Create Admin Git Ignore
slug: /plugins/dotnet-plugin-events/create-admin-git-ignore
---

# Create Admin Git Ignore


Creates the .gitignore file for the admin UI.

### Event Name

`CreateAdminGitIgnore`

### Event Params

```ts
export interface CreateAdminGitIgnoreParams extends EventParams {
  gitignorePaths: string[];
}
```

Example:

```ts
beforeCreateAdminGitIgnore(
  context: DsgContext,
  eventParams: CreateAdminGitIgnoreParams
) {
  eventParams.gitignorePaths.push(
    "node_modules",
    "build",
    ".env.local"
  );
  return eventParams;
}
```