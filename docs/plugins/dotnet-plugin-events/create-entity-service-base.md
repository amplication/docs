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

### Example

```ts
afterCreateEntityServiceBase(
  context: dotnetTypes.DsgContext,
  eventParams: dotnet.CreateEntityServiceBaseParams,
  files: FileMap<Class>
): Promise<FileMap<Class>> {
  const { entity } = eventParams;
  const serviceBaseFile = files.get(`Services/Base/${entity.name}ServiceBase.cs`);
  if (serviceBaseFile) {
    serviceBaseFile.code.addMethod(
      CsharpSupport.method({
        name: "SoftDelete",
        access: "protected",
        returnType: CsharpSupport.Types.task(CsharpSupport.Types.void()),
        parameters: [
          CsharpSupport.parameter({
            name: "id",
            type: CsharpSupport.Types.string(),
          }),
        ],
        body: "// Implement soft delete logic here",
      })
    );
  }
  return files;
}
```