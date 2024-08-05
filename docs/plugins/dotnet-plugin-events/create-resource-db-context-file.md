---
id: create-resource-db-context-file
title: Create Resource Db Context File | .NET Plugin Event
description: Creates the database context file for the .NET application.
sidebar_label: Create Resource Db Context File
slug: /plugins/dotnet-plugin-events/create-resource-db-context-file
---

# Create Resource Db Context File


Creates the database context file for the .NET application.

### Event Name

`CreateResourceDbContextFile`

### Event Params

```ts
export interface CreateResourceDbContextFileParams extends EventParams {
  entities: Entity[];
  resourceName: string;
  resourceDbContextPath: string;
}
```

### Example

```ts
afterCreateResourceDbContextFile(
  context: dotnetTypes.DsgContext,
  eventParams: dotnet.CreateResourceDbContextFileParams,
  files: FileMap<Class>
): FileMap<Class> {
  const { resourceDbContextPath, resourceName } = eventParams;

  const modelFile = files.get(
    `${resourceDbContextPath}${resourceName}DbContext.cs`
  );

  if (!modelFile) return files;

  modelFile.code.parentClassReference = CsharpSupport.genericClassReference({
    reference: CsharpSupport.classReference({
      name: `IdentityDbContext`,
      namespace: "Microsoft.AspNetCore.Identity.EntityFrameworkCore",
    }),
    innerType: CsharpSupport.Types.reference(
      CsharpSupport.classReference({
        name: `IdentityUser`,
        namespace: "Microsoft.AspNetCore.Identity",
      })
    ),
  });

  return files;
}
```