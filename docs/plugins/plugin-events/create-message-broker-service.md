---
id: create-message-broker-service
title: Create Message Broker Service
sidebar_label: Create Message Broker Service
slug: /plugins/plugin-events/create-message-broker-service
---

# Create Message Broker Service

## Description

Creates the service of the Kafka message broker.

This event does NOTHING by default. All of the logic is handled by the broker-kafka plugin https://github.com/amplication/plugins/tree/master/plugins/broker-kafka

## Event Name

`CreateMessageBrokerService`

## Event Params

There are no additional params to this event

```ts
export interface CreateMessageBrokerServiceParams extends EventParams {}
```

Example:

```ts
async afterCreateMessageBrokerService(
    context: DsgContext,
    eventParams: CreateMessageBrokerServiceParams,
    modules: ModuleMap
  ): Promise<ModuleMap> {
    const { serverDirectories } = context;
    const { messageBrokerDirectory } = serverDirectories;
    const filePath = resolve(staticDirectory, `kafka.service.ts`);

    const file = await readFile(filePath, "utf8");
    const generateFileName = `kafka.service.ts`;

    const path = join(messageBrokerDirectory, generateFileName);
    modules.set({ code: file, path });
    return modules;  }
```
