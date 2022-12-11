---
id: EventHierarchy
title: Event Hierarchy
sidebar_label: Event Hierarchy
slug: /plugins/EventHierarchy
---


# Event Hierarchy


We have two main events in our `Data Service Generator (DSG)` service. One for the server creation and the other for the admin-ui creation. **These events are running simultaneously, and there is no guarantee which will finish first**

Each of these main events includes other events to create the server’s files and the admin-ui files (in our source code it is sometimes referred as and `modules`). 

The following diagram represents the execution order of the events in DSG.

- The rectangles with the purple background are functions wrapped with a plugin wrapper and the title represents the event names
- Resource creation (the yellow rectangle) is a function that executes the events of the resources (services, controllers, resolvers) creation.
- Create message broker (the pink rectangle) is a function wrapped with a plugin wrapper (meaning that the title is the event name), but also executes the other events of the message broker creation.

![](.\assets\events-hierarchy.drawio.svg)

# Plugin Events

0. [Create Server](plugins\plugin-events\create-server.md)


1. [Create Package Json](plugins\plugin-events\create-package-json.md)


2. Resources Creation

  a. [Create Entity Service](plugins\plugin-events\create-entity-service.md)

  b. [Create Entity Service Base](plugins\plugin-events\create-entity-service-base.md)

  c. [Create Entity Controller](plugins\plugin-events\create-entity-controller.md)

  d. [Create Entity Controller Base](plugins\plugin-events\create-entity-controller-base.md)

  e. [Create Entity Resolver](docs\plugins\plugin-events\create-entity-resolver.md)

  f. [Create Entity Resolver Base](docs\plugins\plugin-events\create-entity-resolver.md)

  g. [Create Entity Controller Spec](docs\plugins\plugin-events\create-entity-controller-spec.md) 

3. [Create Swagger](docs\plugins\plugin-events\create-swagger.md)

4.  Create Server App Module

5. [Create Seed](docs\plugins\plugin-events\create-seed.md)

6. [Create Server Auth](docs\plugins\plugin-events\create-server-auth.md)

7.  [Create Message Broker](plugins\plugin-events\create-message-broker.md)

   a. [Create Message Broker Topic Enum](plugins\plugin-events\create-message-broker-topics-enum.md)

   b. [Create Message Broker Client Options Factory](plugins\plugin-events\create-message-broker-client-options-factory.md)

   c. [Create Message Broker NestJS Module](plugins\plugin-events\create-message-broker-nestjs-module.md)

   d. [Create Message Broker Service Base](plugins\plugin-events\create-message-broker-service-base.md)
   
8. [Create Prisma Schema](plugins\plugin-events\create-prisma-schema.md)

9. [Create Server Dot Env](plugins\plugin-events\create-server-dot-env.md)

10. [Create Server Docker Compose](plugins\plugin-events\create-server-docker-compose.md)

11. [Create Server Docker Compose DB](docs\plugins\plugin-events\create-server-docker-compose-db.md)

                                                                        
