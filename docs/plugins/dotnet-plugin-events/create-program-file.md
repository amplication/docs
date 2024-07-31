---
id: create-program-file
title: Create Program File | .NET Plugin Event
description: Creates the main Program.cs file for the .NET application.
sidebar_label: Create Program File
slug: /plugins/dotnet-plugin-events/create-program-file
---

# Create Program File


Creates the main Program.cs file for the .NET application.

### Event Name

`CreateProgramFile`

### Event Params

```ts
export interface CreateProgramFileParams extends EventParams {
  builderServicesBlocks: CodeBlock[];
  appBlocks: CodeBlock[];
}
```

Example:

```ts
beforeCreateProgramFile(
  context: DsgContext,
  eventParams: CreateProgramFileParams
) {
  eventParams.builderServicesBlocks.push({
    code: "builder.Services.AddSwaggerGen();",
    comment: "Add Swagger generator"
  });

  eventParams.appBlocks.push({
    code: `
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}`,
    comment: "Configure Swagger middleware"
  });

  return eventParams;
}
```