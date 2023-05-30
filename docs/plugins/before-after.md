---
id: plugin-events-before-after
title: Before and After Lifecycle Functions
sidebar_label: Before and After Lifecycle Functions
slug: /plugins/plugin-events/plugin-events-before-after
---

# Before and After Lifecycle Functions

All events expose an identical interface with two functions that can be handled by the plugin and responsible for a different step in the lifecycle of the event. One for “before” the event is emitted and another for “after” the event is emitted.

```tsx
export interface PluginEventType<T extends EventParams> {
  before?: PluginBeforeEvent<T>;
  after?: PluginAfterEvent<T>;
}
```

For each event, the type of `EventParams` is different, providing access to relevant data for the specific event.

```tsx
export interface EventParams {}

export type PluginBeforeEvent<T extends EventParams> = (
  dsgContext: DsgContext,
  eventParams: T
) => Promisable<T>;

export type PluginAfterEvent<T extends EventParams> = (
  dsgContext: DsgContext,
  eventParams: T,
  modules: ModuleMap
) => Promisable<ModuleMap>;
```

In the `before` and `after` functions, we have an access to the context and the event params.
The [context](docs\plugins\context.md) is used to gather common parts between events.
The event params manipulate the default behavior by passing different values.

In the `after` function, we also have access to the generated modules. An example of using this parameter is when you want to restructure the generated modules in a different folder structure.
