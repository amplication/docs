---
id: create-entity-controller-base
title: Create Entity Controller Base | .NET Plugin Event
description: Creates a base controller for entities in the .NET application.
sidebar_label: Create Entity Controller Base
slug: /plugins/dotnet-plugin-events/create-entity-controller-base
---

# Create Entity Controller Base


Creates a base controller for entities in the .NET application.

### Event Name

`CreateEntityControllerBase`

### Event Params

```ts
export interface CreateEntityControllerBaseParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
  moduleActions: ModuleAction[];
  entities: Entity[];
}
```

#### moduleActions

An array of module actions available for the entity.

#### entities

An array of all entities in the application.

Example:

```ts
async afterCreateEntityControllerBase(
  context: DsgContext,
  eventParams: CreateEntityControllerBaseParams,
  files: FileMap<F>
) {
  const { resourceName, apisDir } = eventParams;
  const controllerBasePath = join(apisDir, `${resourceName}ControllerBase.cs`);
  const controllerBaseFile = files.get(controllerBasePath);

  if (controllerBaseFile) {
    const updatedCode = controllerBaseFile.code.replace(
      "public abstract class",
      "[ApiController]\n[Route(\"api/[controller]\")]\npublic abstract class"
    );

    files.set({
      path: controllerBasePath,
      code: updatedCode
    });
  }

  return files;
}
```