---
id: create-entity-grpc-controller-base
title: Create Entity Grpc Controller Base | .NET Plugin Event
description: Creates a base gRPC controller for entities in the .NET application.
sidebar_label: Create Entity Grpc Controller Base
slug: /plugins/dotnet-plugin-events/create-entity-grpc-controller-base
---

# Create Entity Grpc Controller Base


Creates a base gRPC controller for entities in the .NET application.

### Event Name

`CreateEntityGrpcControllerBase`

### Event Params

```ts
export interface CreateEntityGrpcControllerBaseParams extends EventParams {
  entity: Entity;
}
```

#### entity

The entity object for which the base gRPC controller is being created.

Example:

```ts
async afterCreateEntityGrpcControllerBase(
  context: DsgContext,
  eventParams: CreateEntityGrpcControllerBaseParams,
  modules: ModuleMap
) {
  const { entity } = eventParams;
  const controllerBasePath = join(context.serverDirectories.srcDirectory, "GrpcControllers", `${entity.name}GrpcControllerBase.cs`);
  const controllerBaseFile = modules.get(controllerBasePath);

  if (controllerBaseFile) {
    const updatedCode = controllerBaseFile.code.replace(
      "public abstract class",
      "public abstract class"
    );

    modules.set({
      path: controllerBasePath,
      code: updatedCode
    });
  }

  return modules;
}
```