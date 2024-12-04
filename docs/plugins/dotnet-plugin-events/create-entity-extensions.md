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

### Example

```ts
afterCreateEntityExtensions(
  context: dotnetTypes.DsgContext,
  eventParams: dotnet.CreateEntityExtensionsParams,
  files: FileMap<Class>
): Promise<FileMap<Class>> {
  const { entity, resourceName, apisDir } = eventParams;
  const extensionsPath = `${apisDir}/${entity.name}/${pascalCase(entity.name)}Extensions.cs`;
  const extensionsFile = files.get(extensionsPath);

  if (extensionsFile) {
    // Add a custom extension method
    extensionsFile.code.addMethod(
      CsharpSupport.method({
        name: "ToAuditString",
        isStatic: true,
        returnType: CsharpSupport.Types.string(),
        parameters: [
          CsharpSupport.parameter({
            name: "this",
            type: CsharpSupport.Types.reference(entity.name),
            isThis: true,
          }),
        ],
        body: `
          return $"{entity.Id}|{entity.CreatedAt}|{entity.UpdatedAt}";
        `,
      })
    );

    // Add a custom mapper extension
    extensionsFile.code.addMethod(
      CsharpSupport.method({
        name: "ToDto",
        isStatic: true,
        returnType: CsharpSupport.Types.reference(`${entity.name}Dto`),
        parameters: [
          CsharpSupport.parameter({
            name: "this",
            type: CsharpSupport.Types.reference(entity.name),
            isThis: true,
          }),
        ],
        body: `
          return new ${entity.name}Dto
          {
            Id = entity.Id,
            // Map other properties here
            AuditString = entity.ToAuditString()
          };
        `,
      })
    );
  }

  return files;
}
```