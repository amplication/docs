---
id: createmessagebroker
title: CreateMessageBroker
sidebar_label: Create Message Broker
slug: /plugins/plugin-events/createmessagebroker
---

# Create Message Broker

## Description

Creates the message broker. 

This event does NOTHING by default. All of the logic is handled by the broker-kafka plugin https://github.com/amplication/plugins/tree/master/plugins/broker-kafka

## Event Name:
`CreateMessageBroker`

## Event Params
There are no additional params to this event

```ts
export interface CreateMessageBrokerParams extends EventParams {}
```

Example:
```ts
  beforeCreateBroker(
    dsgContext: DsgContext,
    eventParams: CreateMessageBrokerParams
  ): CreateMessageBrokerParams {
    dsgContext.serverDirectories.messageBrokerDirectory = join(
      dsgContext.serverDirectories.srcDirectory,
      "kafka"
    );
    return eventParams;
  }
```

