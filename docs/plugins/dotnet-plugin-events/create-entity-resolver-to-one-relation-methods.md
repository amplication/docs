---
id: create-entity-resolver-to-one-relation-methods
title: Create Entity Resolver To One Relation Methods | .NET Plugin Event
description: Creates methods for handling to-one relationships in entity resolvers.
sidebar_label: Create Entity Resolver To One Relation Methods
slug: /plugins/dotnet-plugin-events/create-entity-resolver-to-one-relation-methods
---

# Create Entity Resolver To One Relation Methods


Creates methods for handling to-one relationships in entity resolvers.

### Event Name

`CreateEntityResolverToOneRelationMethods`

### Event Params

```ts
export interface CreateEntityResolverToOneRelationMethodsParams extends EventParams {
  field: EntityLookupField;
  entity: Entity;
}
```

Example:

```ts
async afterCreateEntityResolverToOneRelationMethods(
  context: DsgContext,
  eventParams: CreateEntityResolverToOneRelationMethodsParams,
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
    public async Task<${relatedEntityName}> ${methodName}([Parent] ${entity.name} parent)
    {
        return await _context.${relatedEntityName}s.FirstOrDefaultAsync(e => e.Id == parent.${field.name}Id);
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