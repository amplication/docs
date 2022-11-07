---
id: CreateSwagger
title: Create Swagger
sidebar_label: Create Swagger
slug: /plugins/plugin-events/CreateSwagger
---

# Create Swagger

## Description

Creates the Swagger file.

## Event Name:

`CreateSwagger`

## Event Params

```ts
export interface CreateSwaggerParams extends EventParams {
  template: namedTypes.File;
  templateMapping: { [key: string]: any };
  fileDir: string;
  outputFileName: string;
}
```

### template

A template file, used to generate the service.

This is the default template for this event.

You can manipulate the template or replace it completely with a new template in your plugin. 


### templateMapping
An object with values that are available in the interpolation process of the template.  


You can find the available properties here: https://github.com/amplication/amplication/blob/next/packages/amplication-data-service-generator/src/server/swagger/create-swagger.ts#L33

example:
```ts
const templateMapping = {
    TITLE: builders.stringLiteral(appInfo.name),
    DESCRIPTION: builders.stringLiteral(description),
    VERSION: builders.stringLiteral(appInfo.version),
    AUTH_FUNCTION: builders.identifier(
      authProvider === EnumAuthProviderType.Http
        ? "addBasicAuth"
        : "addBearerAuth"
    ),
  };
```

You can manipulate the object by adding new values, or replacing existing values that will be used in the template when creating the swagger file. 



### fileDir
The target directory in which the swagger file will be generated. 


### outputFileName
The file name of the swagger file. The default value is `swagger.ts`

It is recommended not to change the file name unless specifically required and the impact is understood.

