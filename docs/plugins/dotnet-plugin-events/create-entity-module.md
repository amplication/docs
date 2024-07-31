---
id: create-entity-module
title: Create Entity Module | .NET Plugin Event
description: Creates a module for a specific entity in the .NET application.
sidebar_label: Create Entity Module
slug: /plugins/dotnet-plugin-events/create-entity-module
---

# Create Entity Module


Creates a module for a specific entity in the .NET application.

### Event Name

`CreateEntityModule`

### Event Params

```ts
export interface CreateEntityModuleParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
}
```

Example:

```ts
async afterCreateEntityModule(
  context: DsgContext,
  eventParams: CreateEntityModuleParams,
  modules: ModuleMap
) {
  const { resourceName, apisDir } = eventParams;
  const modulePath = join(apisDir, `${resourceName}Module.cs`);
  const moduleFile = modules.get(modulePath);

  if (moduleFile) {
    const updatedCode = moduleFile.code.replace(
      "public class",
      "[Module]\npublic class"
    );

    modules.set({
      path: modulePath,
      code: updatedCode
    });
  }

  return modules;
}
```