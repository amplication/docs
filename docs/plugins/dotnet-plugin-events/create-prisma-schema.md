---
id: create-prisma-schema
title: Create Prisma Schema | .NET Plugin Event
description: Creates the Prisma schema for the application.
sidebar_label: Create Prisma Schema
slug: /plugins/dotnet-plugin-events/create-prisma-schema
---

# Create Prisma Schema


Creates the Prisma schema for the application.

### Event Name

`CreatePrismaSchema`

### Event Params

```ts
export interface CreatePrismaSchemaParams extends EventParams {
  entities: Entity[];
  dataSource: PrismaDataSource;
  clientGenerator: PrismaClientGenerator;
}
```

Example:

```ts
beforeCreatePrismaSchema(
  context: DsgContext,
  eventParams: CreatePrismaSchemaParams
) {
  // Modify Prisma schema generation
  return eventParams;
}
```