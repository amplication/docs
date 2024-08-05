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

### Example

```ts
afterCreateEntityInterface(
  context: dotnetTypes.DsgContext,
  eventParams: dotnet.CreateEntityInterfaceParams,
  files: FileMap<Interface>
): Promise<FileMap<Interface>> {
  const { entity } = eventParams;
  const interfaceFile = files.get(`Interfaces/I${entity.name}.cs`);
  if (interfaceFile) {
    interfaceFile.code.addMethod(
      CsharpSupport.method({
        name: "Validate",
        returnType: CsharpSupport.Types.boolean(),
      })
    );
  }
  return files;
}
```