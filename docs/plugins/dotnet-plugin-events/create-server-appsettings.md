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

### Example

```ts
beforeCreateServerAppsettings(
  context: dotnetTypes.DsgContext,
  eventParams: dotnet.CreateServerAppsettingsParams
) {
  const { port, password, user, host, dbName } = getPluginSettings(
    context.pluginInstallations
  );

  eventParams.updateProperties = {
    ...eventParams.updateProperties,
    ConnectionStrings: {
      [CONNECTION_STRING]: `Host=${host}:${port};Username=${user};Password=${password};Database=${dbName}`,
    },
  };
  return eventParams;
}
```