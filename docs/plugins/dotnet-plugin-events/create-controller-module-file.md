---
id: create-controller-module-file
title: Create Controller Module File | .NET Plugin Event
description: Creates a module file for controllers in the .NET application.
sidebar_label: Create Controller Module File
slug: /plugins/dotnet-plugin-events/create-controller-module-file
---

# Create Controller Module File


Creates a module file for controllers in the .NET application.

### Event Name

`CreateControllerModuleFile`

### Event Params

```ts
export interface CreateControllerModuleFileParams extends EventParams {
  moduleActionsAndDtos: ModuleActionsAndDtos;
  resourceName: string;
  controllerModuleBasePath: string;
}
```

Example:

```ts
async afterCreateControllerModuleFile(
  context: DsgContext,
  eventParams: CreateControllerModuleFileParams,
  modules: ModuleMap
) {
  const { resourceName, controllerModuleBasePath } = eventParams;
  const controllerModuleFile = modules.get(controllerModuleBasePath);

  if (controllerModuleFile) {
    const updatedCode = controllerModuleFile.code + `
    [ApiExplorerSettings(GroupName = "${resourceName}")]
    public class ${resourceName}ControllerModule : ControllerBase
    {
        // Add your custom controller logic here
    }
    `;

    modules.set({
      path: controllerModuleBasePath,
      code: updatedCode
    });
  }

  return modules;
}
```