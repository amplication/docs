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

Example:

```ts
beforeCreateServerCsproj(
  context: DsgContext,
  eventParams: CreateServerCsprojParams
) {
  eventParams.propertyGroup = {
    ...eventParams.propertyGroup,
    "TargetFramework": "net6.0",
    "ImplicitUsings": "enable"
  };

  eventParams.packageReferences.push({
    include: "Swashbuckle.AspNetCore",
    version: "6.2.3"
  });

  return eventParams;
}
```