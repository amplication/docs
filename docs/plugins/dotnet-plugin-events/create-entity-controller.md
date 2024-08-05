---
id: create-entity-controller
title: Create Entity Controller | .NET Plugin Event
description: Creates a controller for a specific entity in the .NET application.
sidebar_label: Create Entity Controller
slug: /plugins/dotnet-plugin-events/create-entity-controller
---

# Create Entity Controller


Creates a controller for a specific entity in the .NET application.

### Event Name

`CreateEntityController`

### Event Params

```ts
export interface CreateEntityControllerParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
  entityActions: entityActions;
}
```

#### entity

The entity object for which the controller is being created.

#### resourceName

The name of the resource (typically the entity name).

#### apisDir

The directory where the API controllers are being generated.

#### entityActions

An object containing the CRUD actions available for the entity.

### Example

```ts
afterCreateEntityController(
  context: dotnetTypes.DsgContext,
  eventParams: dotnet.CreateEntityControllerParams,
  files: FileMap<Class>
): Promise<FileMap<Class>> {
  const { entity, resourceName, apisDir } = eventParams;
  const controllerPath = `${apisDir}/${entity.name}/${pascalCase(entity.name)}Controller.cs`;
  const controllerFile = files.get(controllerPath);

  if (controllerFile) {
    // Add a custom action to the controller
    controllerFile.code.addMethod(
      CsharpSupport.method({
        name: "ExportToCsv",
        access: "public",
        isAsync: true,
        returnType: CsharpSupport.Types.task(CsharpSupport.Types.reference("IActionResult")),
        decorators: [
          CsharpSupport.decorator({
            name: "HttpGet",
            arguments: ["export-csv"],
          }),
        ],
        body: `
          var allItems = await _service.List();
          var csv = ConvertToCsv(allItems);
          return File(Encoding.UTF8.GetBytes(csv), "text/csv", "${entity.name}Export.csv");
        `,
      })
    );

    // Add necessary imports
    controllerFile.code.addImport("System.Text");
    controllerFile.code.addImport("Microsoft.AspNetCore.Mvc");
  }

  return files;
}
```