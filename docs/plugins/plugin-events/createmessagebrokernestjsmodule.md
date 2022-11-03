---
id: CreateMessageBrokerNestjsModule
title: Create Message Broker NestJS Module
sidebar_label: Create Message Broker NestJS Module
slug: /plugins/plugin-events/CreateMessageBrokerNestjsModule
---

# Create Message Broker NestJS Module

## Description

Creates the NestJS of the message broker.

This event does NOTHING by default. All of the logic is handled by the broker-kafka plugin https://github.com/amplication/plugins/tree/master/plugins/broker-kafka


## Event Name:
`CreateMessageBrokerNestJSModule`

## Event Params

There are no additional params to this event

```ts
export interface CreateMessageBrokerNestJSModuleParams extends EventParams {}
```

Example:
```ts
  async afterCreateMessageBrokerNestJSModule(
    context: DsgContext,
    eventParams: CreateMessageBrokerNestJSModuleParams
  ) {
    const filePath = resolve(staticDirectory, "kafka.module.ts");

    const { serverDirectories } = context;
    const { messageBrokerDirectory } = serverDirectories;
    const file = await readFile(filePath, "utf8");
    const generateFileName = "kafka.module.ts";

    this.moduleFile = {
      code: file,
      path: join(messageBrokerDirectory, generateFileName),
    };
    return [this.moduleFile];
  }
```



