---
id: create-entity-service-base
title: Create Entity Service Base | .NET Plugin Event
description: Creates a base service for entities in the .NET application.
sidebar_label: Create Entity Service Base
slug: /plugins/dotnet-plugin-events/create-entity-service-base
---

# Create Entity Service Base


Creates a base service for entities in the .NET application.

### Event Name

`CreateEntityServiceBase`

### Event Params

```ts
export interface CreateEntityServiceBaseParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
  moduleActions: ModuleAction[];
  entities: Entity[];
}
```

Example:

```ts
async afterCreateEntityServiceBase(
  context: DsgContext,
  eventParams: CreateEntityServiceBaseParams,
  modules: ModuleMap
) {
  const { resourceName, apisDir } = eventParams;
  const serviceBasePath = join(apisDir, `${resourceName}ServiceBase.cs`);
  const serviceBaseFile = modules.get(serviceBasePath);

  if (serviceBaseFile) {
    const updatedCode = serviceBaseFile.code + `
    protected async Task<bool> EntityExists(int id)
    {
        return await _context.Set<TEntity>().AnyAsync(e => e.Id == id);
    }
    `;

    modules.set({
      path: serviceBasePath,
      code: updatedCode
    });
  }

  return modules;
}
```