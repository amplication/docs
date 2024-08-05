---
id: create-entity-controller-base
title: Create Entity Controller Base | .NET Plugin Event
description: Creates a base controller for entities in the .NET application.
sidebar_label: Create Entity Controller Base
slug: /plugins/dotnet-plugin-events/create-entity-controller-base
---

# Create Entity Controller Base


Creates a base controller for entities in the .NET application.

### Event Name

`CreateEntityControllerBase`

### Event Params

```ts
export interface CreateEntityControllerBaseParams extends EventParams {
  entity: Entity;
  resourceName: string;
  apisDir: string;
  moduleActions: ModuleAction[];
  entities: Entity[];
}
```

#### moduleActions

An array of module actions available for the entity.

#### entities

An array of all entities in the application.

### Example

```ts
afterCreateEntityControllerBase(
  context: dotnetTypes.DsgContext,
  eventParams: dotnet.CreateEntityControllerBaseParams,
  files: FileMap<Class>
): Promise<FileMap<Class>> {
  const { entity, resourceName, apisDir } = eventParams;
  const controllerBasePath = `${apisDir}/${entity.name}/Base/${pascalCase(entity.name)}ControllerBase.cs`;
  const controllerBaseFile = files.get(controllerBasePath);

  if (controllerBaseFile) {
    // Add a protected method to the base controller
    controllerBaseFile.code.addMethod(
      CsharpSupport.method({
        name: "ValidateEntityState",
        access: "protected",
        returnType: CsharpSupport.Types.boolean(),
        parameters: [
          CsharpSupport.parameter({
            name: "entity",
            type: CsharpSupport.Types.reference(entity.name),
          }),
        ],
        body: `
          if (entity == null)
            return false;
          
          // Add custom validation logic here
          return true;
        `,
      })
    );

    // Modify existing methods to use the new validation
    const methods = controllerBaseFile.code.getMethods();
    methods.forEach(method => {
      if (method.name === `Create${entity.name}` || method.name === `Update${entity.name}`) {
        const existingBody = method.body;
        method.body = `
          if (!ValidateEntityState(${camelCase(entity.name)}))
            return BadRequest("Invalid entity state");
          
          ${existingBody}
        `;
      }
    });
  }

  return files;
}
```