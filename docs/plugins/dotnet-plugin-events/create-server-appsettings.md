---
id: create-server-appsettings
title: Create Server Appsettings | .NET Plugin Event
description: Creates or updates the appsettings.json file for the .NET server.
sidebar_label: Create Server Appsettings
slug: /plugins/dotnet-plugin-events/create-server-appsettings
---

# Create Server Appsettings


Creates or updates the appsettings.json file for the .NET server.

### Event Name

`CreateServerAppsettings`

### Event Params

```ts
export interface CreateServerAppsettingsParams extends EventParams {
  updateProperties: { [key: string]: any };
}
```

Example:

```ts
beforeCreateServerAppsettings(
  context: DsgContext,
  eventParams: CreateServerAppsettingsParams
) {
  eventParams.updateProperties = {
    ...eventParams.updateProperties,
    "Logging": {
      "LogLevel": {
        "Default": "Information",
        "Microsoft": "Warning",
        "Microsoft.Hosting.Lifetime": "Information"
      }
    },
    "AllowedHosts": "*"
  };
  return eventParams;
}
```