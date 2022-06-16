---
id: seed-db
title: How to Seed a database
sidebar_label: Seed a database
slug: /how-to/seed-db
---

# How to Seed a database

You can  use a custom script to populate the database on initialization.

This can be useful for populating your database with data that is required for your application to start, or to provide basic data for validating and using your application in a development environment.

Seeding the database is done using the `customSeed.ts` file. 


```typescript
const client = new PrismaClient();
  const data = {
    username: "admin",
    password: await hash("admin", bcryptSalt),
    roles: ["user"],
  };

  //replace this sample code to populate your databases
  //with data that is required for your application to start

   await client.user.upsert({
    where: { username: data.username },
    update: {},
    create: data,
  });
  void client.$disconnect();
}
```
:::info
For more information about seeding, see [Prisma docs](https://www.prisma.io/docs/guides/database/seed-database)
:::