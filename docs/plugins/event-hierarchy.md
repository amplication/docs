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

![](.\assets\hierarchy.png) 
