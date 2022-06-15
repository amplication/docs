---
id: seed-db
title: How to Seed a database
sidebar_label: Seed a database
slug: /how-to/seed-db
---

# How to Seed a database

You can  use a custom script to populate the database on initialization.

This is done in the  [`customSeed.ts`](https://github.com/amplication/amplication/blob/master/ee/packages/amplication-git-pull-service/scripts/customSeed.ts) file. 


```typescript
import { PrismaClient } from '@prisma/client';

export async function customSeed() {
  const client = new PrismaClient();
  const repositoryOwner = 'test-organization-name';
  const id = 123;

  //replace this sample code to populate your databases
  //with data that is required for your application to start
  await client.gitPullEvent.update({
    where: { id: id },
    data: {
      repositoryOwner,
    },
  });

  client.$disconnect();
}
```