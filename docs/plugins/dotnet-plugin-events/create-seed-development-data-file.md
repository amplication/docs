---
id: create-seed-development-data-file
title: Create Seed Development Data File | .NET Plugin Event
description: Creates a file for seeding development data in the .NET application.
sidebar_label: Create Seed Development Data File
slug: /plugins/dotnet-plugin-events/create-seed-development-data-file
---

# Create Seed Development Data File


Creates a file for seeding development data in the .NET application.

### Event Name

`CreateSeedDevelopmentDataFile`

### Event Params

```ts
export interface CreateSeedDevelopmentDataFileParams extends EventParams {
  seedFilePath: string;
  resourceName: string;
}
```

### Example

```ts
afterCreateSeedDevelopmentDataFile(
  context: dotnetTypes.DsgContext,
  eventParams: dotnet.CreateSeedDevelopmentDataFileParams,
  files: FileMap<Class>
): FileMap<Class> {
  const { seedFilePath, resourceName } = eventParams;
  const { entities } = context;

  if (!entities) return files;

  const seedFile = files.get(seedFilePath);
  seedFile?.code.addMethod(
    CsharpSupport.method({
      name: "SeedDevUser",
      access: "public",
      isAsync: true,
      body: CreateSeedDevelopmentDataBody(resourceName, context),
      type: MethodType.STATIC,
      parameters: [
        CsharpSupport.parameter({
          name: "serviceProvider",
          type: CsharpSupport.Types.reference(
            CsharpSupport.classReference({
              name: "IServiceProvider",
              namespace: `${resourceName}.Infrastructure.Models`,
            })
          ),
        }),
        CsharpSupport.parameter({
          name: "configuration",
          type: CsharpSupport.Types.reference(
            CsharpSupport.classReference({
              name: "IConfiguration",
              namespace: "",
            })
          ),
        }),
      ],
    })
  );

  return files;
}
```