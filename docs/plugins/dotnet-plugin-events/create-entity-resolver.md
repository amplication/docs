---
id: create-entity-resolver
title: Create Entity Resolver | .NET Plugin Event
description: Creates a resolver for a specific entity in the .NET application.
sidebar_label: Create Entity Resolver
slug: /plugins/dotnet-plugin-events/create-entity-resolver
---

# Create Entity Resolver


Creates a resolver for a specific entity in the .NET application.

### Event Name

`CreateEntityResolver`

### Event Params

```ts
export interface CreateEntityResolverParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
}
```

Example:

```ts
async afterCreateEntityResolver(
  context: DsgContext,
  eventParams: CreateEntityResolverParams,
  modules: ModuleMap
) {
  const { resourceName, apisDir } = eventParams;
  const resolverPath = join(apisDir, `${resourceName}Resolver.cs`);
  const resolverFile = modules.get(resolverPath);

  if (resolverFile) {
    const updatedCode = resolverFile.code.replace(
      "public class",
      "[GraphQLResolver]\npublic class"
    );

    modules.set({
      path: resolverPath,
      code: updatedCode
    });
  }

  return modules;
}
```