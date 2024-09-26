---
id: create-message-broker
title: Message Broker Plugin Guide
sidebar_label: Message Broker Plugin Guide
pagination_next: concepts/event-driven-architecture
slug: /how-to/create-message-broker
---

# Message Broker Plugin Guide

Message brokers play a crucial role in enabling event-driven architectures and facilitating communication between microservices in your Amplication-generated applications.

By following this guide and exploring the examples, you'll be well-equipped to implement message brokers in your Amplication-generated service using the message broker plugin that best suits your needs.

## Creating a Message Broker Resource

To use a message broker in your Amplication project:

1. In your workspace, click **Add Resource +** and select **Message Broker** from the list.
2. Click **Create Message broker** in the Message Broker Creation Wizard.
3. Configure your message broker settings in the configuration dashboard.

## Defining Topics

Topics are essential for organizing and routing messages in your event-driven architecture:

1. In your message broker configuration, click the **Topics** icon on the left sidebar.
2. Enter the topic name in the **Add topic** field and click the **+** symbol.
3. Provide a **Display Name**, **Name**, and **Description** for your topic.
4. Click **Commit changes & build** to save your topic configuration.

## Connecting Services to the Message Broker

For each service that needs to interact with the message broker:

1. Navigate to your service's **Connections** tab.
2. Enable the message broker integration by toggling the **enabled** switch.
3. Specify whether the service should act as a producer or consumer for each relevant topic by setting the message pattern to "Send" or "Receive" respectively.

## Adding a Message Broker Plugin

To use a specific message broker technology, you need to install the appropriate plugin:

1. Go to your service's **Plugins** page.
2. Navigate to the "Message broker" category in the left sidebar.
3. Choose and install the message broker plugin that best fits your needs (e.g., Kafka, MQTT, Redis Message Broker).

## Available Message Broker Plugins

Amplication offers several message broker plugins to choose from. Each plugin has its own configuration options and setup process.

### MQTT Plugin

The MQTT plugin adds basic support for MQTT brokers in your Amplication-generated service.

#### Configuration

- `mqttBroker`: The name of the MQTT broker to be used. (Optional, Default: `emqx`, Supported: `emqx`, `mosquitto`, `hivemq` and `hivemq-enterprise`)
- `mqttBrokerHost`: The host of the MQTT broker. (Optional, Default: `localhost`)
- `mqttClientID`: The client ID to connect to the MQTT broker. (Optional, Default: `broker-mqtt-(resourceID)`)
- `mqttPort`: The port of the MQTT broker. (Optional, Default: `1883`)
- `mqttUsername`: The username to connect to the MQTT broker. (Optional, Default: `admin`)
- `mqttPassword`: The password to connect to the MQTT broker. (Optional, Default: `admin`)
- `mqttWsPort`: The port of the MQTT broker for WebSockets. (Optional, Default: `8073`)
- `mqttWebUiPort`: The port of the MQTT broker for the Web UI. (Optional, Default: `8080`)
- `sparkplugConfig`: Configuration for Sparkplug (Optional)
  - `enabled`: Whether to enable Sparkplug. (Default: `false`)
  - `groupIdentifier`: The group identifier for Sparkplug. (Default: `amplication-sparkplug-group`)
  - `edgeNodeIdentifier`: The edge node identifier for Sparkplug. (Default: `amplication-sparkplug-edge`)
  - `clientIdentifier`: The client identifier for Sparkplug. (Default: `amplication-sparkplug-client-(resource-id)`)

For detailed setup instructions, refer to the [MQTT Plugin GitHub README](https://github.com/amplication/plugins/tree/master/plugins/broker-mqtt).

### NATS Plugin

The NATS plugin provides basic integration with NATS servers for your Amplication-generated service.

#### Usage

To use the NATS plugin effectively:

1. Ensure your service boots up with microservice support in the `bootstrap` function in `main.ts`.
2. Call `app.connectMicroservice` with a NATS transport and `app.startAllMicroservices` function.
3. Make sure the `NatsModule` is called from `app.module.ts`.

For more information, check the [NATS Plugin GitHub README](https://github.com/amplication/plugins/tree/master/plugins/broker-nats).

### Redis Message Broker Plugin

The Redis Message Broker plugin adds support for using Redis as a message broker in your Amplication-generated service.

#### Configuration

- `port`: The port for the Redis server. (Default: `6379`)
- `host`: The host for the Redis server. (Default: `localhost`)
- `retryAttempts`: Number of times to retry a message. (Default: `3`)
- `retryDelay`: Delay between each message retry attempt. (Default: `3`)
- `enableTls`: Set to true when TLS should be used. (Default: `false`)

For usage examples and more details, visit the [Redis Message Broker Plugin GitHub README](https://github.com/amplication/plugins/tree/master/plugins/broker-redis).

### RabbitMQ Plugin

The RabbitMQ plugin implements RabbitMQ as the message broker in your Amplication-generated services.

#### Usage

This plugin provides a pre-configured NestJS module for RabbitMQ integration. To customize client options, update the `.env` file with the relevant options.

For more information, check the [RabbitMQ Plugin GitHub README](https://github.com/amplication/plugins/tree/master/plugins/broker-rabbitmq).

### Kafka Plugin

The Kafka plugin implements Kafka as the message broker in your Amplication-generated services.

#### Usage

This plugin provides a pre-configured NestJS module for Kafka integration. To customize client options, update the `.env` file with the relevant options.

For more details, refer to the [Kafka Plugin GitHub README](https://github.com/amplication/plugins/tree/master/plugins/broker-kafka).

## Implementing Event Production and Consumption

After setting up your message broker and topics, you'll need to implement the logic for producing and consuming events in your services.

### Producing Events

In your producer services, use the message broker client to publish events to the appropriate topics. Here's a general example:

```typescript
import { Injectable } from "@nestjs/common";
import { KafkaProducerService } from "src/kafka/kafka.producer.service";
import { MyMessageBrokerTopics } from "src/kafka/topics";

@Injectable()
export class MyService {
  constructor(private readonly kafkaProducer: KafkaProducerService) {}

  async createOrder(orderData: any) {
    // ... create order logic ...
    
    await this.kafkaProducer.emitMessage(MyMessageBrokerTopics.OrderCreated, {
      key: order.id,
      value: orderData
    });
  }
}
```

### Consuming Events

In your consumer services, implement event handlers to process incoming messages:

```typescript
import { Injectable } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MyMessageBrokerTopics } from 'src/kafka/topics';

@Injectable()
export class NotificationService {
  @EventPattern(MyMessageBrokerTopics.OrderCreated)
  handleOrderCreated(orderData: any) {
    // Process the order created event
    console.log('New order created:', orderData);
    // Send notification, update analytics, etc.
  }
}
```

## Conclusion

By leveraging message brokers and event-driven architecture, you can build scalable, loosely-coupled microservices that communicate efficiently. Amplication's support for various message broker plugins makes it easy to implement event-driven communication in your generated services.

For a more detailed walkthrough and practical implementation of event-driven architecture using Amplication and Kafka, check out our blog post: [Building Real-time Applications with Amplication and Kafka](https://amplication.com/blog/building-real-time-applications-with-amplication-and-kafka).
