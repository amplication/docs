---
id: load-static-files
title: Load Static Files | .NET Plugin Event
description: Loads static files into the project.
sidebar_label: Load Static Files
slug: /plugins/dotnet-plugin-events/load-static-files
---

# Load Static Files


Loads static files into the project.

### Event Name

`LoadStaticFiles`

### Event Params

```ts
export interface LoadStaticFilesParams extends EventParams {
  source: string;
  basePath: string;
}
```

Example:

```ts
async afterLoadStaticFiles(
  context: DsgContext,
  eventParams: LoadStaticFilesParams,
  modules: ModuleMap
) {
  const { source, basePath } = eventParams;
  const staticFiles = await readDir(source);
  
  for (const file of staticFiles) {
    const content = await readFile(join(source, file));
    modules.set({
      path: join(basePath, file),
      code: content
    });
  }

  return modules;
}
```