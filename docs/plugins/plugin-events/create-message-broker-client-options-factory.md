---
id: create-message-broker-client-options-factory
title: Create Message Broker Client Options Factory
sidebar_label: Create Message Broker Client Options Factory
slug: /plugins/plugin-events/create-message-broker-client-options-factory
---

# Create Message Broker Client Options Factory

## Description

Creates the client options of the message broker.

This event does NOTHING by default. All of the logic is handled by the broker-kafka plugin https://github.com/amplication/plugins/tree/master/plugins/broker-kafka

## Event Name

`CreateMessageBrokerClientOptionsFactory`

## Event Params

There are no additional params to this event

```ts
export interface CreateMessageBrokerClientOptionsFactoryParams
  extends EventParams {}
```

Example:

```ts
  async afterCreateMessageBrokerClientOptionsFactory(
    context: DsgContext,
    eventParams: CreateMessageBrokerClientOptionsFactoryParams
  ): Promise<ModuleMap> {
    const { serverDirectories } = context;
    const filePath = resolve(staticDirectory, "generateKafkaClientOptions.ts");
    const file = await readFile(filePath, "utf8");
    const generateFileName = "generateKafkaClientOptions.ts";

    const path = join(
      serverDirectories.messageBrokerDirectory,
      generateFileName
    );
    modules.set({ code: file, path });
    return modules;
  }
```
