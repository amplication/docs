---
id: EventList
title: List of Plugin Events
sidebar_label: List of Plugin Events
slug: /plugins/EventList
---


# List of Plugin Events

## Understanding Plugin Events
At the heart of Amplication is the Data Service Generator (DSG), responsible for the generation of source code.

The DSG supports the integration of plugins into the code generation process, turning DSG into a dynamic code generator, enabling developers to change configurations, add files, add functions, add constants and to make changes to the generated code.

For more about DSG, see the [Amplication Data Service Generator Readme](https://github.com/amplication/amplication/tree/master/packages/amplication-data-service-generator#readme)

To achieve the integration of plugins, Amplication wraps the DSG functions with events that run before and after the DSG function. The before and after events have the same signature. The before event is usually used to change the settings of parameters before the DSG function runs. The after event gets the result of the DSG function and typically manipulates the results, gets some new files, or changes the results.

Each plugin can contain many events, so a single plugin can utilize many functions inside the DSG.

All events expose an identical interface with two functions that can be handled by the plugin, one for before the event is running and another for afterthe event run.

For each event, the type of eventParams is different, providing access to data that is relevant for the specific event.

### Example of before and after events:


```ts
export interface EventParams {}

export type PluginBeforeEvent<T extends EventParams> = (
  dsgContext: DsgContext,
  eventParams: T
) => Promisable<T>;

export type PluginAfterEvent<T extends EventParams> = (
  dsgContext: DsgContext,
  eventParams: T,
  modules: Module[]
) => Promisable<Module[]>;
```

**Each event has:**

Generic context (available for all events)

Event parameters - specific to the event


## Plugin Events - Reference


- [Create Server](plugins\plugin-events\create-server.md)
- [Create Package Json](plugins\plugin-events\create-package-json.md)
- Resources 
  - [Create Entity Service](plugins\plugin-events\create-entity-service.md)
  - [Create Entity Service Base](plugins\plugin-events\create-entity-service-base.md)
  - [Create Entity Controller](plugins\plugin-events\create-entity-controller.md)
  - [Create Entity Controller Base](plugins\plugin-events\create-entity-controller-base.md)
  - [Create Entity Resolver](docs\plugins\plugin-events\create-entity-resolver.md)
  - [Create Entity Resolver Base](docs\plugins\plugin-events\create-entity-resolver.md)
  - [Create Entity Controller Spec](docs\plugins\plugin-events\create-entity-controller-spec.md)
- Create Entity DTO 
- [Create Swagger](docs\plugins\plugin-events\create-swagger.md)
- Create Server App Module
- [Create Seed](docs\plugins\plugin-events\create-seed.md)
- [Create Server Auth](docs\plugins\plugin-events\create-server-auth.md)
- [Create Message Broker](plugins\plugin-events\create-message-broker.md)
   - [Create Message Broker Topic Enum](plugins\plugin-events\create-message-broker-topics-enum.md)
   - [Create Message Broker Client Options Factory](plugins\plugin-events\create-message-broker-client-options-factory.md)
   - [Create Message Broker NestJS Module](plugins\plugin-events\create-message-broker-nestjs-module.md)
   - [Create Message Broker Service Base](plugins\plugin-events\create-message-broker-service-base.md)
- [Create Server Auth](docs\plugins\plugin-events\create-server-auth.md)
- [Create Prisma Schema](plugins\plugin-events\create-prisma-schema.md)
- [Create Server Dot Env](plugins\plugin-events\create-server-dot-env.md)
- [Create Server Docker Compose](plugins\plugin-events\create-server-docker-compose.md)
- [Create Server Docker Compose DB](docs\plugins\plugin-events\create-server-docker-compose-db.md)

                                                                        
