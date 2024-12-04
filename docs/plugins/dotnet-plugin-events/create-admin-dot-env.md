---
id: create-admin-dot-env
title: Create Admin Dot Env | .NET Plugin Event
description: Creates the .env file for the admin UI.
sidebar_label: Create Admin Dot Env
slug: /plugins/dotnet-plugin-events/create-admin-dot-env
---

# Create Admin Dot Env


Creates the .env file for the admin UI.

### Event Name

`CreateAdminDotEnv`

### Event Params

```ts
export interface CreateAdminDotEnvParams extends EventParams {
  envVariables: VariableDictionary;
}
```

Example:

```ts
beforeCreateAdminDotEnv(
  context: DsgContext,
  eventParams: CreateAdminDotEnvParams
) {
  eventParams.envVariables.push(
    { REACT_APP_API_URL: "http://localhost:3000/api" },
    { REACT_APP_SERVER_URL: "http://localhost:3000" }
  );
  return eventParams;
}
```