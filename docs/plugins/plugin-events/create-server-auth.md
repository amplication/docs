---
id: create-server-auth
title: Create Server Auth | Plugin Event
description: Creates the Authorization directory with the selected auth strategy.
sidebar_label: Create Server Auth
slug: /plugins/plugin-events/create-server-auth
---

# Create Server Authorization

## Description

Creates the Authorization directory with the selected strategy (basic/JWT)

## Event Name

` CreateServerAuth`

## Event Params

```ts
export interface CreateServerAuthParams extends EventParams {
  srcDir: string;
}
```

### srcDir

The target directory the auth folder will be generated in

**Example**
In order to set the auth strategy, we should use the `before` lifecycle event and call the `skipDefaultBehavior` util.
As a result, the default event won't run, but we would have to provide our logic in the `after` lifecycle event:

- the path to our static auth folder
- the path in which we want the auth folder to be generated in

```ts
beforeCreateServerAuth(
    context: DsgContext,
    eventParams: CreateAuthModulesParams
  ) {
    context.utils.skipDefaultBehavior = true;
    return eventParams;
  }

 async afterCreateServerAuth(
    context: DsgContext,
    eventParams: CreateAuthModulesParams,
    modules: ModuleMap
  ) {
    const staticPath = resolve(__dirname, "../static");
    const staticsFiles = await context.utils.importStaticModules(
      staticPath,
      context.serverDirectories.srcDirectory
    );

    modules.merge(staticsFiles)
    return modules;
  }
```

auth-basic plugin: https://github.com/amplication/plugins/tree/master/plugins/auth-basic

auth-jwt plugin: https://github.com/amplication/plugins/tree/master/plugins/auth-jwt

For example, you can see the diff on `defaultAuth.guard.ts` after the auth-basic plugin was installed on a newly generated app that uses the JWT approach:

```diff
@Injectable()
- export class DefaultAuthGuard extends BasicAuthGuard {
+ export class DefaultAuthGuard extends JwtAuthGuard
  constructor(private readonly reflector: Reflector) {
    super();
  }
```
