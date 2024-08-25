---
id: create-message-broker-client-options-factory
title: Create Message Broker Client Options Factory | .NET Plugin Event
description: Creates the client options factory for the message broker.
sidebar_label: Create Message Broker Client Options Factory
slug: /plugins/dotnet-plugin-events/create-message-broker-client-options-factory
---

# Create Message Broker Client Options Factory


Creates the client options factory for the message broker.

### Event Name

`CreateMessageBrokerClientOptionsFactory`

### Event Params

```ts
export interface CreateMessageBrokerClientOptionsFactoryParams extends EventParams {}
```

This event does not use any additional parameters.

### Example


```ts
afterCreateMessageBrokerClientOptionsFactory(
  context: dotnetTypes.DsgContext,
  eventParams: dotnet.CreateMessageBrokerClientOptionsFactoryParams,
  files: FileMap<Class>
): Promise<FileMap<Class>> {
  const optionsFactoryFile = files.get("MessageBroker/MessageBrokerClientOptionsFactory.cs");
  if (optionsFactoryFile) {
    optionsFactoryFile.code.addMethod(
      CsharpSupport.method({
        name: "CreateConsumerConfig",
        access: "public",
        returnType: CsharpSupport.Types.reference("ConsumerConfig"),
        body: "return new ConsumerConfig { GroupId = \"my-consumer-group\" };",
      })
    );
  }
  return files;
}
```