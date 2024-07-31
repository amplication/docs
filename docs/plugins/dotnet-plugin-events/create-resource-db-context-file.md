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

Example:

```ts
async afterCreateResourceDbContextFile(
  context: DsgContext,
  eventParams: CreateResourceDbContextFileParams,
  modules: ModuleMap
) {
  const { resourceName, resourceDbContextPath } = eventParams;
  const dbContextFile = modules.get(resourceDbContextPath);

  if (dbContextFile) {
    const updatedCode = dbContextFile.code.replace(
      "public class",
      "public class " + resourceName + "DbContext : DbContext\n{\n"
    ) + `
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Add your custom configurations here
    }
    `;

    modules.set({
      path: resourceDbContextPath,
      code: updatedCode
    });
  }

  return modules;
}
```