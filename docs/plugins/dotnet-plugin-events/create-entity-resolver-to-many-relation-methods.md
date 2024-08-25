---
id: create-entity-resolver-to-many-relation-methods
title: Create Entity Resolver To Many Relation Methods | .NET Plugin Event
description: Creates methods for handling to-many relationships in entity resolvers.
sidebar_label: Create Entity Resolver To Many Relation Methods
slug: /plugins/dotnet-plugin-events/create-entity-resolver-to-many-relation-methods
---

# Create Entity Resolver To Many Relation Methods


Creates methods for handling to-many relationships in entity resolvers.

### Event Name

`CreateEntityResolverToManyRelationMethods`

### Event Params

```ts
export interface CreateEntityResolverToManyRelationMethodsParams extends EventParams {
  field: EntityLookupField;
  entity: Entity;
}
```

Example:

```ts
async afterCreateEntityResolverToManyRelationMethods(
  context: DsgContext,
  eventParams: CreateEntityResolverToManyRelationMethodsParams,
  modules: ModuleMap
) {
  const { field, entity } = eventParams;
  const resolverPath = join(context.serverDirectories.srcDirectory, "Resolvers", `${entity.name}Resolver.cs`);
  const resolverFile = modules.get(resolverPath);

  if (resolverFile) {
    const methodName = `Get${field.name}`;
    const relatedEntityName = field.properties.relatedEntity.name;
    const updatedCode = resolverFile.code + `
    [GraphQLField]
    public async Task<IEnumerable<${relatedEntityName}>> ${methodName}([Parent] ${entity.name} parent)
    {
        return await _context.${relatedEntityName}s.Where(e => e.${entity.name}Id == parent.Id).ToListAsync();
    }
    `;

    modules.set({
      path: resolverPath,
      code: updatedCode
    });
  }

  return modules;
}
```