---
id: create-message-broker-service
title: Create Message Broker Service | .NET Plugin Event
description: Creates the service for the message broker.
sidebar_label: Create Message Broker Service
slug: /plugins/dotnet-plugin-events/create-message-broker-service
---

# Create Message Broker Service


Creates the service for the message broker.

### Event Name

`CreateMessageBrokerService`

### Event Params

```ts
export interface CreateMessageBrokerServiceParams extends EventParams {}
```

This event does not use any additional parameters.

### Example

```ts
async afterCreateMessageBrokerService(
  dsgContext: dotnetTypes.DsgContext,
  eventParams: dotnet.CreateMessageBrokerServiceParams,
  files: FileMap<Class>
): Promise<FileMap<Class>> {
  const messageBrokerFiles = await createMessageBroker(dsgContext);
  await files.merge(messageBrokerFiles);
  return files;
}
```
