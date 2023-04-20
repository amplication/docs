---
id: example-plugin
title: Example - Developing a Plugin
sidebar_label: Example - Developing a Plugin
slug: /plugins/example-plugin
---

Amplication includes several plugins - some allow you to choose an authentication strategy, some allow you to choose which database you want to integrate with and one allows you to connect your service to a message broker.

Before any development of a plugin, we take the following steps:

1. Generate a service with Amplication
2. Apply the changes that we need:
   - Add the missing functionality
   - Manipulate the existing functionality
3. use the knowledge from the previous step to design the plugin:
   - Which events need to be used
   - How to use the events with the before and after lifecycle functions
4. Create a public GitHub repository for you plugin
5. Copy and paste our [plugin template](https://github.com/amplication/plugins/tree/master/plugins/plugin-template)
6. Remove and change the emplate based on what you need. For example, if you don't need static files in your plugin, you can delete that folder.


### Example:

The most straightforward example to illustrate this development workflow is the [MySQL](https://github.com/amplication/plugins/tree/master/plugins/db-mysql) plugin, as we already have the functionality of a database connection:

- We use Prisma as a ORM and Prisma supports MySQL as a provider - changing the provider on Prisma Schema.
- We use environment variable for the Prisma schema database’s URL and for the docker-compose values - change the environment variables where needed and their values.
- Unexpected behaviors: the Prisma MySQL provider does not support lists of primitive types

Translating the above sections to events:

```tsx
register(): Events {
    return {
      CreateServer: {
        before: this.beforeCreateServer,
      },
      CreateServerDotEnv: {
        before: this.beforeCreateServerDotEnv,
      },
      CreateServerDockerCompose: {
        before: this.beforeCreateServerDockerCompose,
      },
      CreateServerDockerComposeDB: {
        before: this.beforeCreateServerDockerComposeDB,
        after: this.afterCreateServerDockerComposeDB,
      },
      CreatePrismaSchema: {
        before: this.beforeCreatePrismaSchema,
      },
    };
  }
```

`CreateServer` : before

On this event we are taking care of the Prisma limitation regrading list of primitives values on MySQL provider.

This is also a good example for a use case where the error should be thrown from the plugin itself.

```tsx
beforeCreateServer(context: DsgContext, eventParams: CreateServerParams) {
    const generateErrorMessage = (
      entityName: string,
      fieldName: string
    ) => `MultiSelectOptionSet (list of primitives type) on entity: ${entityName}, field: ${fieldName}, is not supported by MySQL prisma provider.
    You can select another data type or change your DB to PostgreSQL`;

    context.entities?.forEach(({ name: entityName, fields }) => {
      const field = fields.find(
        ({ dataType }) => dataType === EnumDataType.MultiSelectOptionSet
      );
      if (field) {
        context.logger.error(generateErrorMessage(entityName, field.name));
        throw new Error(generateErrorMessage(entityName, field.name));
      }
    });

    return eventParams;
  }
```

`CreateServerDotEnv` : before

On this event we send our [event params](https://docs.amplication.com/plugins/plugin-events/CreateServerDotEnv/#event-params) which are the environment variables for the MySQL database. As a result the `.env` file will be generated not only with the default variables that it is already holds, but also with our environment variables.

`CreateServerDockerCompose` : before

On this event we send our [event params](https://docs.amplication.com/plugins/plugin-events/CreateServerDockerCompose/#event-params) which are the YAML properties and values for the MySQL database. As a result the `docker-compose.yml` file will be generated in a way that the PostgreSQL properties will be replaced by the MySQL properties.

`CreateServerDockerComposeDB` : before

This event is responsible for generating the `docker-compose.db.yml` file. In this file we have the docker image of the PostgreSQL database. Therefore, here we have a good example for the skip default behavior usage. We can skip this file generation and provide a different functionality, in this case - a different file, later on - in the after function.

```tsx
beforeCreateServerDockerComposeDB(
    context: DsgContext,
    eventParams: CreateServerDockerComposeDBParams
  ) {
    context.utils.skipDefaultBehavior = true;
    return eventParams;
  }
```

`CreateServerDockerComposeDB` : after

On this event, after we skip the default behavior in the `before` function, we provide our `docker-compose.db.yml` file.

```tsx
async afterCreateServerDockerComposeDB(context: DsgContext) {
    const staticPath = resolve(__dirname, "../static");
    const staticsFiles = await context.utils.importStaticModules(
      staticPath,
      context.serverDirectories.baseDirectory
    );

    return staticsFiles;
  }
```

`CreatePrismaSchema` ⇒ before

This event is responsible to manipulate this part on the Prisma schema:

```tsx
export const dataSource: DataSource = {
  name: "mysql",
  provider: DataSourceProvider.MySQL,
  url: new DataSourceURLEnv("DB_URL"),
};
```

We use the [event params](https://docs.amplication.com/plugins/plugin-events/CreatePrismaSchema/#event-params) to:

- change the data source name form `postgres` to `mysql`
- change the provider from `postgresql` to `MySQL`

(the `DB_URL` is handled by `CreateServerDotEnv`)
