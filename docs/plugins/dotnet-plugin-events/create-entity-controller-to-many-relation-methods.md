---
id: create-entity-controller-to-many-relation-methods
title: Create Entity Controller To Many Relation Methods | .NET Plugin Event
description: Creates methods for handling to-many relationships in entity controllers.
sidebar_label: Create Entity Controller To Many Relation Methods
slug: /plugins/dotnet-plugin-events/create-entity-controller-to-many-relation-methods
---

# Create Entity Controller To Many Relation Methods


Creates methods for handling to-many relationships in entity controllers.

### Event Name

`CreateEntityControllerToManyRelationMethods`

### Event Params

```ts
export interface CreateEntityControllerToManyRelationMethodsParams extends EventParams {
  field: EntityLookupField;
  entity: Entity;
}
```

Example:

```ts
async afterCreateEntityControllerToManyRelationMethods(
  context: DsgContext,
  eventParams: CreateEntityControllerToManyRelationMethodsParams,
  modules: ModuleMap
) {
  const { field, entity } = eventParams;
  const controllerPath = join(context.serverDirectories.srcDirectory, "Controllers", `${entity.name}Controller.cs`);
  const controllerFile = modules.get(controllerPath);

  if (controllerFile) {
    const methodName = `Get${field.name}`;
    const relatedEntityName = field.properties.relatedEntity.name;
    const updatedCode = controllerFile.code + `
    [HttpGet("{id}/${field.name.toLowerCase()}")]
    public async Task<ActionResult<IEnumerable<${relatedEntityName}>>> ${methodName}(int id)
    {
        var entity = await _context.${entity.name}s.FindAsync(id);
        if (entity == null)
        {
            return NotFound();
        }
        return await _context.${relatedEntityName}s.Where(e => e.${entity.name}Id == id).ToListAsync();
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