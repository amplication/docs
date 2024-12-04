---
id: create-server-git-ignore
title: Create Server Git Ignore | .NET Plugin Event
description: Creates the .gitignore file for the server.
sidebar_label: Create Server Git Ignore
slug: /plugins/dotnet-plugin-events/create-server-git-ignore
---

# Create Server Git Ignore


Creates the .gitignore file for the server.

### Event Name

`CreateServerGitIgnore`

### Event Params

```ts
export interface CreateServerGitIgnoreParams extends EventParams {
  gitignorePaths: string[];
}
```

### Example

```ts
beforeCreateServerGitIgnore(
  context: dotnetTypes.DsgContext,
  eventParams: dotnet.CreateServerGitIgnoreParams
): Promise<dotnet.CreateServerGitIgnoreParams> {
  eventParams.gitignorePaths.push(
    "*.user",
    "*.userosscache",
    "*.sln.docstates",
    "[Tt]est[Rr]esult*"
  );
  return eventParams;
}
```