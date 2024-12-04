---
id: create-entity-service
title: Create Entity Service | .NET Plugin Event
description: Creates a service for a specific entity in the .NET application.
sidebar_label: Create Entity Service
slug: /plugins/dotnet-plugin-events/create-entity-service
---

# Create Entity Service


Creates a service for a specific entity in the .NET application.

### Event Name

`CreateEntityService`

### Event Params

```ts
export interface CreateEntityServiceParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
  entityActions: entityActions;
}
```

### Example

```ts
afterCreateEntityService(
  context: dotnetTypes.DsgContext,
  eventParams: dotnet.CreateEntityServiceParams,
  files: FileMap<Class>
): Promise<FileMap<Class>> {
  const { entity, resourceName, apisDir } = eventParams;
  const servicePath = `${apisDir}/${entity.name}/${pascalCase(entity.name)}Service.cs`;
  const serviceFile = files.get(servicePath);

  if (serviceFile) {
    // Add a custom method to the service
    serviceFile.code.addMethod(
      CsharpSupport.method({
        name: "GetRecentlyModified",
        access: "public",
        isAsync: true,
        returnType: CsharpSupport.Types.task(CsharpSupport.Types.list(CsharpSupport.Types.reference(entity.name))),
        parameters: [
          CsharpSupport.parameter({
            name: "days",
            type: CsharpSupport.Types.int(),
            defaultValue: "7",
          }),
        ],
        body: `
          var cutoffDate = DateTime.UtcNow.AddDays(-days);
          return await _repository.GetAll()
            .Where(e => e.UpdatedAt >= cutoffDate)
            .OrderByDescending(e => e.UpdatedAt)
            .ToListAsync();
        `,
      })
    );

    // Add necessary imports
    serviceFile.code.addImport("System");
    serviceFile.code.addImport("System.Linq");
    serviceFile.code.addImport("Microsoft.EntityFrameworkCore");
  }

  return files;
}
```