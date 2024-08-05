---
id: create-program-file
title: Create Program File | .NET Plugin Event
description: Creates the main Program.cs file for the .NET application.
sidebar_label: Create Program File
slug: /plugins/dotnet-plugin-events/create-program-file
---

# Create Program File


Creates the main Program.cs file for the .NET application.

### Event Name

`CreateProgramFile`

### Event Params

```ts
export interface CreateProgramFileParams extends EventParams {
  builderServicesBlocks: CodeBlock[];
  appBlocks: CodeBlock[];
}
```

### Example

```ts
beforeCreateProgramFile(
  { resourceInfo }: dotnetTypes.DsgContext,
  eventParams: dotnet.CreateProgramFileParams
) {
  const serviceNamespace = pascalCase(resourceInfo?.name ?? "");
  const serviceDbContext = `${pascalCase(resourceInfo?.name ?? "")}DbContext`;
  eventParams.builderServicesBlocks.push(
    new CodeBlock({
      code: `builder.Services.AddDbContext<${serviceDbContext}>(opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("${CONNECTION_STRING}")));`,
      references: [
        new ClassReference({
          name: "AddDbContext",
          namespace: "Microsoft.EntityFrameworkCore",
        }),
        new ClassReference({
          name: serviceDbContext,
          namespace: `${serviceNamespace}.Infrastructure`,
        }),
      ],
    })
  );

  return eventParams;
}
```