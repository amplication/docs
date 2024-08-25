---
id: create-entity-module-base
title: Create Entity Module Base | .NET Plugin Event
description: Creates a base module for entities in the .NET application.
sidebar_label: Create Entity Module Base
slug: /plugins/dotnet-plugin-events/create-entity-module-base
---

# Create Entity Module Base


Creates a base module for entities in the .NET application.

### Event Name

`CreateEntityModuleBase`

### Event Params

```ts
export interface CreateEntityModuleBaseParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
}
```

Example:

```ts
async afterCreateEntityModuleBase(
  context: DsgContext,
  eventParams: CreateEntityModuleBaseParams,
  modules: ModuleMap
) {
  const { resourceName, apisDir } = eventParams;
  const moduleBasePath = join(apisDir, `${resourceName}ModuleBase.cs`);
  const moduleBaseFile = modules.get(moduleBasePath);

  if (moduleBaseFile) {
    const updatedCode = moduleBaseFile.code + `
    protected virtual void ConfigureAdditionalServices(IServiceCollection services)
    {
        // Add additional service configuration here
    }
    `;

    modules.set({
      path: moduleBasePath,
      code: updatedCode
    });
  }

  return modules;
}
```