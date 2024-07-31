---
id: create-entity-controller
title: Create Entity Controller | .NET Plugin Event
description: Creates a controller for a specific entity in the .NET application.
sidebar_label: Create Entity Controller
slug: /plugins/dotnet-plugin-events/create-entity-controller
---

# Create Entity Controller


Creates a controller for a specific entity in the .NET application.

### Event Name

`CreateEntityController`

### Event Params

```ts
export interface CreateEntityControllerParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
  entityActions: entityActions;
}
```

#### entity

The entity object for which the controller is being created.

#### resourceName

The name of the resource (typically the entity name).

#### apisDir

The directory where the API controllers are being generated.

#### entityActions

An object containing the CRUD actions available for the entity.

Example:

```ts
async afterCreateEntityController(
  context: DsgContext,
  eventParams: CreateEntityControllerParams,
  modules: ModuleMap
) {
  const { entity, resourceName, apisDir } = eventParams;
  const controllerPath = join(apisDir, `${resourceName}Controller.cs`);
  const controllerFile = modules.get(controllerPath);

  if (controllerFile) {
    const updatedCode = controllerFile.code.replace(
      "public class",
      "[ApiVersion(\"1.0\")]\npublic class"
    );

    modules.set({
      path: controllerPath,
      code: updatedCode
    });
  }

  return modules;
}
```