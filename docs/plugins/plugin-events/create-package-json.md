---
id: CreatePackageJson
title: Create Package Json
sidebar_label: Create Package Json
slug: /plugins/plugin-events/CreatePackageJson
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
