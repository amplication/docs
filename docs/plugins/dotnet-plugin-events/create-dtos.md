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

### Example

```ts
afterCreateDTOs(
  context: dotnetTypes.DsgContext,
  eventParams: dotnet.CreateDTOsParams,
  files: FileMap<Class>
): Promise<FileMap<Class>> {
  const { entity, dtoName } = eventParams;
  const dtoFile = files.get(`DTOs/${dtoName}.cs`);
  if (dtoFile) {
    dtoFile.code.addProperty(
      CsharpSupport.property({
        name: "LastModified",
        type: CsharpSupport.Types.dateTime(),
      })
    );
  }
  return files;
}
```