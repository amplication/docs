---
id: create-server-csproj
title: Create Server Csproj | .NET Plugin Event
description: Creates or updates the .csproj file for the .NET server.
sidebar_label: Create Server Csproj
slug: /plugins/dotnet-plugin-events/create-server-csproj
---

# Create Server Csproj


Creates or updates the .csproj file for the .NET server.

### Event Name

`CreateServerCsproj`

### Event Params

```ts
export interface CreateServerCsprojParams extends EventParams {
  propertyGroup: Record<string, string>;
  packageReferences: {
    include: string;
    version: string;
    includeAssets?: string;
    privateAssets?: string;
  }[];
}
```

### Example

```ts
beforeCreateServerCsproj(
  _: dotnetTypes.DsgContext,
  eventParams: dotnet.CreateServerCsprojParams
) {
  eventParams.packageReferences.push({
    include: "Npgsql.EntityFrameworkCore.PostgreSQL",
    version: "8.0.4",
  });

  return eventParams;
}
```