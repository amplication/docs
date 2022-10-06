---
id: create-package-json-event
title: Create Package Json Event
sidebar_label: Create Package Json Event
slug: /plugins/plugin-events/create-package-json-event
---


# Create Package Json Event

## Description

Create the `package.json` file of the service

## Event Params

```javascript
export interface CreateServerPackageJsonParams extends EventParams {
  updateValues: { [key: string]: JsonValue };
}
```

### updateValues

TBC