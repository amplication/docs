---
id: create-admin-ui-package-json
title: Create Admin UI Package Json | .NET Plugin Event
description: Creates or updates the package.json file for the admin UI.
sidebar_label: Create Admin UI Package Json
slug: /plugins/dotnet-plugin-events/create-admin-ui-package-json
---

# Create Admin UI Package Json


Creates or updates the package.json file for the admin UI.

### Event Name

`CreateAdminUIPackageJson`

### Event Params

```ts
export interface CreateAdminUIPackageJsonParams extends EventParams {
  updateProperties: { [key: string]: any };
}
```

Example:

```ts
beforeCreateAdminUIPackageJson(
  context: DsgContext,
  eventParams: CreateAdminUIPackageJsonParams
) {
  eventParams.updateProperties = {
    ...eventParams.updateProperties,
    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "eject": "react-scripts eject"
    }
  };
  return eventParams;
}
```