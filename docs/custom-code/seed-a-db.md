---
id: seed-db
title: Seeding a database
sidebar_label: Seeding a database 
slug: /custom-code/seed-db
---

# Seeding a database

Database seeding is the initial seeding of a database with data.

You can  use a custom script to populate the database on initialization.

This can be useful for populating your database with necessary data that is required for your application to start, or it can be dummy data for validating and using your application in a development environment.

Seeding the database is done using the `customSeed.ts` file. 

:::info
For more information about seeding, see [Prisma docs](https://www.prisma.io/docs/guides/database/seed-database)
:::



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
