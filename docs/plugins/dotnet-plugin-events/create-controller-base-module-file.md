---
id: create-controller-base-module-file
title: Create Controller Base Module File | .NET Plugin Event
description: Creates a base module file for controllers in the .NET application.
sidebar_label: Create Controller Base Module File
slug: /plugins/dotnet-plugin-events/create-controller-base-module-file
---

# Create Controller Base Module File


Creates a base module file for controllers in the .NET application.

### Event Name

`CreateControllerBaseModuleFile`

### Event Params

```ts
export interface CreateControllerBaseModuleFileParams extends EventParams {
  moduleActionsAndDtos: ModuleActionsAndDtos;
  resourceName: string;
  controllerBaseModuleBasePath: string;
}
```