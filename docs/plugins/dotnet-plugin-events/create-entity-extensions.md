---
id: create-entity-extensions
title: Create Entity Extensions | .NET Plugin Event
description: Creates extension methods for entities in the .NET application.
sidebar_label: Create Entity Extensions
slug: /plugins/dotnet-plugin-events/create-entity-extensions
---

# Create Entity Extensions


Creates extension methods for entities in the .NET application.

### Event Name

`CreateEntityExtensions`

### Event Params

```ts
export interface CreateEntityExtensionsParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
}
```

Example:

```ts
async afterCreateEntityExtensions(
  context: DsgContext,
  eventParams: CreateEntityExtensionsParams,
  files: FileMap<F>
) {
  const { entity, apisDir } = eventParams;
  const extensionsPath = join(apisDir, "Extensions", `${entity.name}Extensions.cs`);
  const extensionsFile = files.get(extensionsPath);

  if (extensionsFile) {
    const updatedCode = extensionsFile.code + `
    public static string GetDisplayName(this ${entity.name} entity)
    {
        return $"{entity.FirstName} {entity.LastName}";
    }
    `;

    files.set({
      path: extensionsPath,
      code: updatedCode
    });
  }

  return files;
}
```