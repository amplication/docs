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
