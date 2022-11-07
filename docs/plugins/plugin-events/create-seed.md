---
id: CreateSeed
title: Create Seed
sidebar_label: Create Seed
slug: /plugins/plugin-events/CreateSeed
---

# Create Seed

## Description

Creates the seed file. By default, this seed file contains only the seeding of the User entity.

## Event Name:
`CreateSeed`

## Event Params

```ts
export interface CreateSeedParams extends EventParams {
  template: namedTypes.File;
  templateMapping: { [key: string]: any };
  fileDir: string;
  outputFileName: string;
}
```

### template
This is the default template for this event.

You can manipulate the template or replace it completely with a new template in your plugin. 


### templateMapping

An object with values that are available in the interpolation process of the template.

You can find the available properties here:
https://github.com/amplication/amplication/blob/feat/4292-create-seed/packages/amplication-data-service-generator/src/server/seed/create-seed.ts#L86

You can manipulate the object by adding new values, or replacing existing values that will be used in the template when creating the seed file.


### fileDir
The target directory in which the seed file will be generated.


### outputFileName
The file name of the seed file. The default value is `seed.ts`

It is recommended not to change the file name unless specifically required and the impact is understood.