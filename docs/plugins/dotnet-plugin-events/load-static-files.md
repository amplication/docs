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

### Example

```ts
async afterLoadStaticFiles(
  context: dotnetTypes.DsgContext,
  eventParams: dotnet.LoadStaticFilesParams,
  files: FileMap<CodeBlock>
): Promise<FileMap<CodeBlock>> {
  const { resourceInfo } = context;
  if (!resourceInfo) return files;

  const resourceName = pascalCase(resourceInfo.name);

  const destPath = `${eventParams.basePath}/src/APIs/Common/Auth/ProgramAuthExtensions.cs`;
  const filePath = resolve(
    __dirname,
    "./static/common/auth/ProgramAuthExtensions.cs"
  );

  const programAuthExtensionsFileMap = await createStaticFileFileMap(
    destPath,
    filePath,
    context,
    [
      CsharpSupport.classReference({
        name: `${resourceName}DbContext`,
        namespace: `${resourceName}.Infrastructure`,
      }),
    ]
  );
  
  return files;
}
```