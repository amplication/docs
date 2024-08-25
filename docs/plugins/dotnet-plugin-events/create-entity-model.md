---
id: create-entity-model
title: Create Entity Model | .NET Plugin Event
description: Creates a model class for a specific entity in the .NET application.
sidebar_label: Create Entity Model
slug: /plugins/dotnet-plugin-events/create-entity-model
---

# Create Entity Model


Creates a model class for a specific entity in the .NET application.

### Event Name

`CreateEntityModel`

### Event Params

```ts
export interface CreateEntityModelParams extends EventParams {
  entity: Entity;
  entities: Entity[];
  resourceName: string;
  apisDir: string;
}
```

### Example

```ts
afterCreateEntityModel(
  context: dotnetTypes.DsgContext,
  eventParams: dotnet.CreateEntityModelParams,
  files: FileMap<Class>
): Promise<FileMap<Class>> {
  const { entity, resourceName } = eventParams;
  const modelFile = files.get(`${resourceName}/Models/${entity.name}.cs`);
  if (modelFile) {
    modelFile.code.addAttribute(
      CsharpSupport.attribute({
        name: "Table",
        arguments: [`"${entity.name}s"`],
      })
    );
  }
  return files;
}
```