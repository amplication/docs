---
id: create-dtos
title: Create DTOs | .NET Plugin Event
description: Creates Data Transfer Objects (DTOs) for a specific entity in the .NET application.
sidebar_label: Create DTOs
slug: /plugins/dotnet-plugin-events/create-d-t-os
---

# Create DTOs


Creates Data Transfer Objects (DTOs) for a specific entity in the .NET application.

### Event Name

`CreateDTOs`

### Event Params

```ts
export interface CreateDTOsParams extends EventParams {
  entity: Entity;
  dtoName: string;
  dtoBasePath: string;
}
```

Example:

```ts
async afterCreateDTOs(
  context: DsgContext,
  eventParams: CreateDTOsParams,
  modules: ModuleMap
) {
  const { entity, dtoName, dtoBasePath } = eventParams;
  const dtoPath = join(dtoBasePath, `${dtoName}.cs`);
  const dtoFile = modules.get(dtoPath);

  if (dtoFile) {
    const updatedCode = dtoFile.code + `
    public class ${entity.name}SummaryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
    `;

    modules.set({
      path: dtoPath,
      code: updatedCode
    });
  }

  return modules;
}
```