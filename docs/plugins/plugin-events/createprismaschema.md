---
id: CreatePrismaSchema
title: Create Prisma Schema
sidebar_label: Create Prisma Schema
slug: /plugins/plugin-events/CreatePrismaSchema
---

# Create Prisma Schema

## Description

Creates the Prisma schema

## Event Name:
`CreatePrismaSchema`

## Event Params

```ts
export interface CreatePrismaSchemaParams extends EventParams {
  entities: Entity[];
  dataSource: PrismaDataSource;
  clientGenerator: PrismaClientGenerator;
}
```

### entities
The entities that will be generated as models in the Prisma schema and represent the table name.
By default, this param value is the entities that the user sets in the UI (Amplication dashboard).

### dataSource
Represents the data source type of Prisma provider (PostgreSQL, MySQL, MongoDB, etc.)

```ts
type PrismaDataSource = {
  name: string;
  provider: DataSourceProvider;
  urlEnv: string;
};
```

Example:

```ts
const dataSource: PrismaDataSource = {
  name: "mysql",
  provider: "MySQL",
  urlEnv: "DB_URL",
};

 beforeCreatePrismaSchema(
    context: DsgContext,
    eventParams: CreatePrismaSchemaParams
  ) {
    return {
      ...eventParams,
      dataSource: dataSource,
    };
  }
}
```

### clientGenerator
A generator determines which assets are created when you run the Prisma generate command.

```ts
type PrismaClientGenerator = {
  name: string;
  provider: string;
};

const CLIENT_GENERATOR: PrismaClientGenerator = {
  name: "client",
  provider: "prisma-client-js",
};
```
For more information: https://www.prisma.io/docs/concepts/components/prisma-schema/generators
