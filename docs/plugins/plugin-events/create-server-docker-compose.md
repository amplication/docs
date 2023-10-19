---
id: create-server-docker-compose
title: Create Server Docker Compose | Plugin Event
description: Creates the docker-compose.yml file of the service.
sidebar_label: Create Server Docker Compose
slug: /plugins/plugin-events/create-server-docker-compose
---

# Create Server Docker Compose

## Description

Creates the `docker-compose.yml` file of the service

## Event Params

```tsx
export interface CreateServerDockerComposeParams extends EventParams {
  fileContent: string;
  updateProperties: { [key: string]: any }[];
  outputFileName: string;
}
```

### fileContent

The default content of the file is a string. If needed, the value can be parsed as an object using a YAML utility.

In most cases, there is no need to manipulate the property directly. Instead, use the `updateProperties` param

### updateProperties

An array that accepts any object that will be merged into the docker-compose file.

The object will be deeply merged into the previous state of the file.

multiple plugins can add objects into this array, and they will be merged by the order of execution of the plugins

**Example**

```javascript
const mergeProperties: CreateServerDockerComposeParams["updateProperties"] =
  [
    {
      services: {
        server: {
          environment: {
            DB_URL: "postgres://${DB_USER}:${DB_PASSWORD}@db:5433",
          },
        },
        db: {
          image: "postgres:12",
          ports: ["${DB_PORT}:5432"],
          environment: {
            POSTGRES_USER: "${DB_USER}",
            POSTGRES_PASSWORD: "${DB_PASSWORD}",
          },
          volumes: ["postgres:/var/lib/postgresql/data"],
        },
      },
      volumes: {
        postgres: null,
      },
    },
  ];

beforeCreateServerDockerCompose(
    context: DsgContext,
    eventParams: CreateServerDockerComposeParams
  ) {
    eventParams.updateProperties.push(...mergeProperties);
    return eventParams;
  }
```

### outputFileName

The file name of the docker-compose file, the default value is `docker-compose.yml`

It is recommended not to change the file name unless specifically needed and the impact is understood.
