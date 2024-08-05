---
id: create-entity-controller-spec
title: Create Entity Controller Spec | .NET Plugin Event
description: Creates the controller spec file for the entity controller.
sidebar_label: Create Entity Controller Spec
slug: /plugins/dotnet-plugin-events/create-entity-controller-spec
---

# Create Entity Controller Spec


Creates the controller spec file for the entity controller.

### Event Name

`CreateEntityControllerSpec`

### Event Params

```ts
export interface CreateEntityControllerSpecParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
}
```

Example:

```ts
async afterCreateEntityControllerSpec(
  context: DsgContext,
  eventParams: CreateEntityControllerSpecParams,
  modules: ModuleMap
) {
  const { entity, resourceName, apisDir } = eventParams;
  const specPath = join(apisDir, "Tests", `${resourceName}ControllerTests.cs`);
  const specFile = modules.get(specPath);

  if (specFile) {
    const updatedCode = specFile.code.replace(
      "public class",
      "[TestClass]\npublic class"
    );

    modules.set({
      path: specPath,
      code: updatedCode
    });
  }

  return modules;
}
```