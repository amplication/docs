---
id: create-server-docker-compose-dev
title: Create Server Docker Compose Dev
sidebar_label: Create Server Docker Compose Dev
slug: /plugins/plugin-events/create-server-docker-compose-dev
pagination_next: plugins/plugin-events/create-server-dot-env
---

# Create Server Docker Compose Dev

## Description

Creates the `docker-compose.dev.yml` file of the service

## Event Name

`CreateServerDockerComposeDev`

## Event Params

```ts
export interface CreateServerDockerComposeDevParams extends EventParams {
  fileContent: string;
  updateProperties: { [key: string]: any }[];
  outputFileName: string;
}
```

### fileContent

The default content of the file as a string.
If needed, the value can be parsed as an object using a YAML utility.

In most cases, there is no need to manipulate the property directly. Instead, use the `updateProperties` param.

### updateProperties

An array that accepts any object that will be merged into the docker-compose file.

The object will be deeply merged into the previous state of the file.

Multiple plugins can add objects into this array, and they will be merged by the order of execution of the plugins.

:::note
Unlike the [`CreateServerDockerCompose`](/plugins/plugin-events/create-server-docker-compose) event, it makes more sense to replace the whole file with `CreateServerDockerComposeDev`.
The reason for that is that in a `docker-compose.db.yml` file, you usually take the DB image from Docker Hub and you want to replace the whole file's content.
:::

The way to do it is by using the `before` lifecycle event and in the body of the function **skip** the default behavior.

```ts {5}
beforeCreateServerDockerComposeDev(
    context: DsgContext,
    eventParams: CreateServerDockerComposeDevParams
  ) {
    context.utils.skipDefaultBehavior = true;
    return eventParams;
  }
```

As a result, `CreateServerDockerComposeDev` is not run and you would have to provide your logic in the `after` lifecycle event.
For that, you need to provide the path to your `docker-compose.db.yml` and set the path in which you want the `docker-compose.db.yml` will be generated.

```ts
  async afterCreateServerDockerComposeDev(
    context: DsgContext,
    eventParams: CreateServerDockerComposeDevParams,
    modules: ModuleMap) {
    const staticPath = resolve(__dirname, "../static");
    const staticsFiles = await context.utils.importStaticModules(
      staticPath,
      context.serverDirectories.baseDirectory
    );

    modules.merge(staticsFiles)
    return modules;
  }
```

### outputFileName

The file name of the docker-compose file, the default value is `docker-compose.db.yml`

:::note
Our recommendation is not to change the file name unless it's specifically required and you understand the impact.
:::
