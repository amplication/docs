---
id: CreateServerDockerComposeDb
title: Create Server Docker Compose DB
sidebar_label: Create Server Docker Compose DB
slug: /plugins/plugin-events/CreateServerDockerComposeDb
---


# Create Server Docker Compose DB

## Description

Creates the `docker-compose.db.yml` file of the service

## Event Name:
`CreateServerDockerComposeDB`

## Event Params

```ts
export interface CreateServerDockerComposeDBParams extends EventParams {
    fileContent: string;
    updateProperties: {[key: string]: any;}[];
    outputFileName: string;
}
```

### fileContent

The default content of the file as a string. If needed, the value can be parsed as an object using a YAML utility. 

In most cases, there is no need to manipulate the property directly. Instead, use the `updateProperties` param.

### updateProperties

An array that accepts any object that will be merged into the docker-compose file.

The object will be deeply merged into the previous state of the file. 

multiple plugins can add objects into this array, and they will be merged by the order of execution of the plugins

**Example**
Unlike the example of `CreateServerDockerCompose` https://github.com/amplication/amplication/issues/4095, in this example, it makes more sense to replace the whole file. The reason for that is that in a `docker-compose.db.yml` file you usually take the DB image from Docker Hub and you want to replace the whole file's content.

The way to do it is by using the `before` lifecycle event and in the body of the function **skip** the default behavior:
`context.utils.skipDefaultBehavior = true`.

```ts
beforeCreateServerDockerComposeDB(
    context: DsgContext,
    eventParams: CreateServerDockerComposeDBParams
  ) {
    context.utils.skipDefaultBehavior = true;
    return eventParams;
  }
```

 As a result the`CreateServerDockerComposeDB` is not running and you would have to provide your logic in the `after` lifecycle event.
For that, you need to provide the path to your `docker-compose.db.yml` and set the path in which you want the `docker-compose.db.yml` will be generated.

```ts
  async afterCreateServerDockerComposeDB(context: DsgContext) {
    const staticPath = resolve(__dirname, "../static");
    const staticsFiles = await context.utils.importStaticModules(
      staticPath,
      context.serverDirectories.baseDirectory
    );

    return staticsFiles;
  }
```

### outputFileName

The file name of the docker-compose file, the default value is `docker-compose.db.yml` 

It is recommended not to change the file name unless specifically required and the impact is understood.