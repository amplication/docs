---
id: CreateMessageBrokerServiceBase
title: Create Message Broker Service Base
sidebar_label: Create Message Broker Service Base
slug: /plugins/plugin-events/CreateMessageBrokerServiceBase
---

# Create Message Broker Service Base

## Description

Creates the base service of the Kafka message broker.

This event does NOTHING by default. All of the logic is handled by the broker-kafka plugin https://github.com/amplication/plugins/tree/master/plugins/broker-kafka

## Event Name:
`CreateMessageBrokerServiceBase`

## Event Params
There are no additional params to this event
```ts
export interface CreateMessageBrokerServiceBaseParams extends EventParams {}
```

Example:
```ts
  async afterCreateMessageBrokerServiceBase(
    context: DsgContext,
    eventParams: CreateMessageBrokerServiceBaseParams
  ): Promise<Module[]> {
    const { serverDirectories } = context;
    const { messageBrokerDirectory } = serverDirectories;
    const filePath = resolve(staticDirectory, `kafka.service.base.ts`);

    const file = await readFile(filePath, "utf8");
    const generateFileName = `kafka.service.base.ts`;

    const path = join(messageBrokerDirectory, "base", generateFileName);
    return [{ code: file, path }];
  }
```

