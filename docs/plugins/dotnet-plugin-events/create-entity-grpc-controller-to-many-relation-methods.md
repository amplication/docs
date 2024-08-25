---
id: create-entity-grpc-controller-to-many-relation-methods
title: Create Entity Grpc Controller To Many Relation Methods | .NET Plugin Event
description: Creates methods for handling to-many relationships in entity gRPC controllers.
sidebar_label: Create Entity Grpc Controller To Many Relation Methods
slug: /plugins/dotnet-plugin-events/create-entity-grpc-controller-to-many-relation-methods
---

# Create Entity Grpc Controller To Many Relation Methods


Creates methods for handling to-many relationships in entity gRPC controllers.

### Event Name

`CreateEntityGrpcControllerToManyRelationMethods`

### Event Params

```ts
export interface CreateEntityGrpcControllerToManyRelationMethodsParams extends EventParams {
  field: EntityLookupField;
  entity: Entity;
}
```

Example:

```ts
async afterCreateEntityGrpcControllerToManyRelationMethods(
  context: DsgContext,
  eventParams: CreateEntityGrpcControllerToManyRelationMethodsParams,
  modules: ModuleMap
) {
  const { field, entity } = eventParams;
  const controllerPath = join(context.serverDirectories.srcDirectory, "GrpcControllers", `${entity.name}GrpcController.cs`);
  const controllerFile = modules.get(controllerPath);

  if (controllerFile) {
    const methodName = `Get${field.name}`;
    const relatedEntityName = field.properties.relatedEntity.name;
    const updatedCode = controllerFile.code + `
    public override async Task<${relatedEntityName}List> ${methodName}(${entity.name}Id request, ServerCallContext context)
    {
        var entities = await _context.${relatedEntityName}s.Where(e => e.${entity.name}Id == request.Id).ToListAsync();
        var response = new ${relatedEntityName}List();
        response.Items.AddRange(entities.Select(e => new ${relatedEntityName}Message { /* map properties */ }));
        return response;
    }
    `;

    modules.set({
      path: controllerPath,
      code: updatedCode
    });
  }

  return modules;
}
```