---
id: create-entity-grpc-controller
title: Create Entity Grpc Controller | .NET Plugin Event
description: Creates a gRPC controller for a specific entity in the .NET application.
sidebar_label: Create Entity Grpc Controller
slug: /plugins/dotnet-plugin-events/create-entity-grpc-controller
---

# Create Entity Grpc Controller


Creates a gRPC controller for a specific entity in the .NET application.

### Event Name

`CreateEntityGrpcController`

### Event Params

```ts
export interface CreateEntityGrpcControllerParams extends EventParams {
  entity: Entity;
}
```

#### entity

The entity object for which the gRPC controller is being created.

Example:

```ts
async afterCreateEntityGrpcController(
  context: DsgContext,
  eventParams: CreateEntityGrpcControllerParams,
  modules: ModuleMap
) {
  const { entity } = eventParams;
  const controllerPath = join(context.serverDirectories.srcDirectory, "GrpcControllers", `${entity.name}GrpcController.cs`);
  const controllerFile = modules.get(controllerPath);

  if (controllerFile) {
    const updatedCode = controllerFile.code.replace(
      "public class",
      "[GrpcService]\npublic class"
    );

    modules.set({
      path: controllerPath,
      code: updatedCode
    });
  }

  return modules;
}
```