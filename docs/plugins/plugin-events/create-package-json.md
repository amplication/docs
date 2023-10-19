---
id: create-package-json
title: Create Package Json | Plugin Event
description: Create the package.json file of the service.
sidebar_label: Create Package Json
slug: /plugins/plugin-events/create-package-json
---

# Create Package Json

## Description

Create the `package.json` file of the service.

## Event Params

```javascript
export interface CreateServerPackageJsonParams extends EventParams {
  updateValues: { [key: string]: JsonValue };
}
```

## Event Name

`CreatePackageJson`

### updateValues

TBC
