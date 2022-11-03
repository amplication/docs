---
id: PluginEvents
title: Plugin Events Overview
sidebar_label: Plugin Events Overview
slug: /plugins/PluginEvents
---


All events expose an identical interface with two functions that can be handled by the plugin, one for “before” the event is running and another for “after” the event run. 

For each event, the type of eventParams is different, providing access to data that is relevant for the specific event.


```javascript
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


Each event has:

- Generic context (available for all events)
- Event parameters - specific to the event
