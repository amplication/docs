---
id: how-to-create-plugin
title: How to Create a Plugin
sidebar_label: How to create a plugin
slug: /plugins/how-to-create-plugin
---

Amplication includes several plugins - some allow you to choose an authentication strategy, some allow you to choose which database you want to integrate with and one allows you to connect your service to a message broker.

### Planning and POC:
Before any development of a plugin, we take the following steps:

1. Generate a service with Amplication
2. Apply the changes that we need:
   - Add the missing functionality
   - Manipulate the existing functionality
3. use the knowledge from the previous step to design the plugin:
   - Which events need to be used
   - How to use the events with the before and after lifecycle functions

### Creating a GitHub Repository From Amplication Plugin Template Repository
4. Go to [amplication plugin template](https://github.com/amplication/plugin-template) and create a GitHub repository from this template. Make sure it's a **public** repository.
![amplication-plugin-template.png](.\assets\amplication-plugin-template.png)
![create-new-repo-from-template](.\assets\create-new-repo-from-template.png)
6. When your new repository is ready, clone it and start building your plugin
7. You can remove and change things based on what you need. For example, if you don't need static files in your plugin, you can delete that folder.

:::note
If your plugin was published on npm under your organization, your plugin's full name would be: 

`
@{your-organization-name}/plugin-{your-plugin-name}
`

For example: @amplication/plugin-db-mysql

As a result, in the `README.md` file, you would have to change the title and the npm downloads to this:

```md
# @{your-organization-name}/plugin-{your-plugin-name}

[![NPM Downloads](https://img.shields.io/npm/dt/@{your-organization-name}/plugin-{your-plugin-name})](https://www.npmjs.com/package/plugin-{your-plugin-name})
```

:::

### Keeping My Repository Up to Date with The Template
Your newly created repository is independent and does not maintain a direct link to the original template. Consequently, any changes made to the template will not automatically update your repository.

To keep your repository up to date, you can manually incorporate changes from the template repository by adding it as an additional remote and merging the updates.

Here are the steps to do that:
1. **Add the template repository as a remote:**
```shell
cd <your_repository>
git add remote amplication-plugin-template https://github.com/amplication/plugin-template.git
```
`amplication-plugin-template` is the origin name. You can name it however you wan't, but make sure you change it in all commands below.

2. **Fetch changes from the template repository**
```shell
git fetch amplication-plugin-template
```

3. **Merge or rebase the changes from the template repository**
- Merge:
```shell
git merge amplication-plugin-template/main
```
This will create a new merge commit in your repository that includes the changes from the template repository
- Rebase:
```shell
git rebase amplication-plugin-template/main
```
 This will apply the changes from the template repository on top of your local commits, effectively rewriting your local commit history.
 
 4. **Resolve conflicts, if any** - if there are conflicts between your repository and the template repository, Git will prompt you to resolve them. Edit the affected files to manually resolve the conflicts, then stage and commit the changes
 
 5. **Push the changes to your remote repository:**
 ```shell
 git push origin <your_default_branch_name> 
 ```

:::note
This process only updates your repository with the changes made in the template repository at the time of fetching. You'll need to repeat steps 2-5 whenever you want to update your repository with the latest changes from the template repository.
:::
### Example: How we created the MySQL Plugin

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

On this event we send our [event params](/plugins/plugin-events/create-server-dot-env/#event-params) which are the environment variables for the MySQL database. As a result the `.env` file will be generated not only with the default variables that it is already holds, but also with our environment variables.

In the following example you can see how we leveraged the [amplicationrc](/plugins/amplicationrc) and the plugin setting in order to add the additional environment variables that this plugin needs.

```typescript
beforeCreateServerDotEnv(
    context: DsgContext,
    eventParams: CreateServerDotEnvParams
  ) {

    const { port, password, user, host, dbName } = getPluginSettings(context.pluginInstallations);

    eventParams.envVariables = [
      ...eventParams.envVariables,
      ...[
        { DB_USER: user },
        { DB_PASSWORD: password },
        { DB_PORT: port.toString() },
        { DB_NAME: dbName },
        {
          DB_URL: `mysql://${user}:${password}@${host}:${port}/${dbName}`,
        },
      ],
    ];

    return eventParams;
  }
```

`CreateServerDockerCompose` : before

On this event we send our [event params](/plugins/plugin-events/create-server-docker-compose/#event-params) which are the YAML properties and values for the MySQL database. As a result the `docker-compose.yml` file will be generated in a way that the PostgreSQL properties will be replaced by the MySQL properties.

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
  url: {
    name: "DB_URL",
  },
};
```

We use the [event params](/plugins/plugin-events/create-prisma-schema/#event-params) to:

- change the data source name form `postgres` to `mysql`
- change the provider from `postgresql` to `MySQL`

(the `DB_URL` is handled by `CreateServerDotEnv`)
