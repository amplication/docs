---
id: event-hierarchy
title: Plugin Event Hierarchy
sidebar_label: Plugin Event Hierarchy
slug: /plugins/event-hierarchy
---

# Plugin Event Hierarchy

We have two main event hierarchies in our Data Service Generator (DSG) service: one for Node.js services and one for .NET services. Each of these hierarchies includes events to create the server's files and, in the case of Node.js, the admin-ui files.

## Node.js Event Hierarchy

For Node.js services, we have two main events: one for the server creation and the other for the admin-ui creation. **These events are running simultaneously, and there is no guarantee which will finish first.**

Each of these main events includes other events to create the server's files and the admin-ui files (in our source code, it is sometimes referred to as `modules`).

For a complete list of Node.js events, descriptions, parameters, and examples, refer to the [Node.js Plugin Events Reference](/plugins/plugin-events/create-server/) section.

The following diagram represents the execution order of the events in DSG for Node.js:

![A Diagram of Node.js Plugins Events](./assets/hierarchy.png)

## .NET Event Hierarchy

For .NET services, the event hierarchy is focused on server-side generation. It includes events for creating various components of the .NET service, such as controllers, services, database models, and infrastructure elements.

Key events in the .NET hierarchy include:

1. [`CreateServer`](/plugins/dotnet-plugin-events/create-server): The main event for creating the .NET server.
2. [`CreateProgramFile`](/plugins/dotnet-plugin-events/create-program-file): Creates the main program file for the .NET application.
3. [`CreateEntityController`](/plugins/dotnet-plugin-events/create-entity-controller) and [`CreateEntityService`](/plugins/dotnet-plugin-events/create-entity-service): Create controllers and services for each entity.
4. [`CreateServerAuth`](/plugins/dotnet-plugin-events/create-server-auth): Sets up authentication for the .NET server.

The order of execution is deterministic and events run synchronously. For a complete list of .NET events, descriptions, parameters, and examples, refer to the [.NET Plugin Events Reference](/plugins/dotnet-plugin-events/create-server) page.

:::note
The event hierarchies for Node.js and .NET are distinct and tailored to the specific needs and structures of each platform.
:::