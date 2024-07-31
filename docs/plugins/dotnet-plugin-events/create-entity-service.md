---
id: create-entity-service
title: Create Entity Service | .NET Plugin Event
description: Creates a service for a specific entity in the .NET application.
sidebar_label: Create Entity Service
slug: /plugins/dotnet-plugin-events/create-entity-service
---

# Create Entity Service


Creates a service for a specific entity in the .NET application.

### Event Name

`CreateEntityService`

### Event Params

```ts
export interface CreateEntityServiceParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
  entityActions: entityActions;
}
```

Example:

```ts
async afterCreateEntityService(
  context: DsgContext,
  eventParams: CreateEntityServiceParams,
  modules: ModuleMap
) {
  const { entity, resourceName, apisDir } = eventParams;
  const servicePath = join(apisDir, `${resourceName}Service.cs`);
  const serviceFile = modules.get(servicePath);

  if (serviceFile) {
    const updatedCode = serviceFile.code + `
    public async Task<${entity.name}> CustomOperation(int id)
    {
        // Add custom business logic here
        return await _context.${entity.pluralName}.FindAsync(id);
    }
    `;

    modules.set({
      path: servicePath,
      code: updatedCode
    });
  }

  return modules;
}
```