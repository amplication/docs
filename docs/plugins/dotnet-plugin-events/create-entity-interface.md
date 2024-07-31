---
id: create-entity-interface
title: Create Entity Interface | .NET Plugin Event
description: Creates an interface for entities in the .NET application.
sidebar_label: Create Entity Interface
slug: /plugins/dotnet-plugin-events/create-entity-interface
---

# Create Entity Interface


Creates an interface for entities in the .NET application.

### Event Name

`CreateEntityInterface`

### Event Params

```ts
export interface CreateEntityInterfaceParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
  moduleContainers: ModuleContainer[];
  moduleActions: ModuleAction[];
  entities: Entity[];
}
```

Example:

```ts
async afterCreateEntityInterface(
  context: DsgContext,
  eventParams: CreateEntityInterfaceParams,
  modules: ModuleMap
) {
  const { entity, apisDir } = eventParams;
  const interfacePath = join(apisDir, "Interfaces", `I${entity.name}.cs`);
  const interfaceFile = modules.get(interfacePath);

  if (interfaceFile) {
    const updatedCode = interfaceFile.code + `
    Task<bool> IsUnique(string name);
    `;

    modules.set({
      path: interfacePath,
      code: updatedCode
    });
  }

  return modules;
}
```