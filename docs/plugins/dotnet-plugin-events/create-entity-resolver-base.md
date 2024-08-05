---
id: create-entity-resolver-base
title: Create Entity Resolver Base | .NET Plugin Event
description: Creates a base resolver for entities in the .NET application.
sidebar_label: Create Entity Resolver Base
slug: /plugins/dotnet-plugin-events/create-entity-resolver-base
---

# Create Entity Resolver Base


Creates a base resolver for entities in the .NET application.

### Event Name

`CreateEntityResolverBase`

### Event Params

```ts
export interface CreateEntityResolverBaseParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
}
```

Example:

```ts
async afterCreateEntityResolverBase(
  context: DsgContext,
  eventParams: CreateEntityResolverBaseParams,
  modules: ModuleMap
) {
  const { resourceName, apisDir } = eventParams;
  const resolverBasePath = join(apisDir, `${resourceName}ResolverBase.cs`);
  const resolverBaseFile = modules.get(resolverBasePath);

  if (resolverBaseFile) {
    const updatedCode = resolverBaseFile.code + `
    protected virtual IQueryable<TEntity> ApplyDefaultOrdering(IQueryable<TEntity> query)
    {
        return query.OrderBy(e => e.Id);
    }
    `;

    modules.set({
      path: resolverBasePath,
      code: updatedCode
    });
  }

  return modules;
}
```