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

Example:

```ts
async afterCreateEntityModel(
  context: DsgContext,
  eventParams: CreateEntityModelParams,
  modules: ModuleMap
) {
  const { entity, resourceName, apisDir } = eventParams;
  const modelPath = join(apisDir, "Models", `${resourceName}.cs`);
  const modelFile = modules.get(modelPath);

  if (modelFile) {
    const updatedCode = modelFile.code.replace(
      "public class",
      "[Table(\"" + entity.name + "\")]\npublic class"
    );

    modules.set({
      path: modelPath,
      code: updatedCode
    });
  }

  return modules;
}
```