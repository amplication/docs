---
id: create-server-docker-compose
title: Create Server Docker Compose | .NET Plugin Event
description: Creates or updates the Docker Compose file for the .NET server.
sidebar_label: Create Server Docker Compose
slug: /plugins/dotnet-plugin-events/create-server-docker-compose
---

# Create Server Docker Compose


Creates or updates the Docker Compose file for the .NET server.

### Event Name

`CreateServerDockerCompose`

### Event Params

```ts
export interface CreateServerDockerComposeParams extends EventParams {
  fileContent: string;
  updateProperties: { [key: string]: any }[];
  outputFileName: string;
}
```

Example:

```ts
beforeCreateServerDockerCompose(
  context: DsgContext,
  eventParams: CreateServerDockerComposeParams
) {
  const additionalServices = {
    services: {
      redis: {
        image: "redis:alpine",
        ports: ["6379:6379"]
      }
    }
  };

  eventParams.updateProperties.push(additionalServices);
  return eventParams;
}
```