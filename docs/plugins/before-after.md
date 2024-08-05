---
id: plugin-events-before-after
title: Before and After Lifecycle Functions
sidebar_label: Before and After Lifecycle Functions
slug: /plugins/plugin-events/plugin-events-before-after
---

# Before and After Lifecycle Functions

All events expose an identical interface with two functions that can be handled by the plugin and responsible for a different step in the lifecycle of the event. One for "before" the event is emitted and another for "after" the event is emitted.

## Event Structure and Parameters

```tsx
export interface PluginEventType<T extends EventParams> {
  before?: PluginBeforeEvent<T>;
  after?: PluginAfterEvent<T>;
}
```

For each event, the type of `EventParams` is different, providing access to relevant data for the specific event.

```tsx
export interface EventParams {}
```

## Before and After Function Signatures

```tsx
export type PluginBeforeEvent<T extends EventParams> = (
  dsgContext: DsgContext,
  eventParams: T
) => Promisable<T>;

// Node.js [version](https://github.com/amplication/amplication/blob/master/libs/util/code-gen-types/src/plugins.types.ts#L21)
export type PluginAfterEvent<T extends EventParams> = (
  dsgContext: DsgContext,
  eventParams: T,
  modules: ModuleMap
) => Promisable<ModuleMap>;

// .NET [version](https://github.com/amplication/amplication/blob/master/libs/util/code-gen-types/src/dotnet-plugins.types.ts#L22)
export type PluginAfterEvent<T extends EventParams, F> = (
  dsgContext: DsgContext,
  eventParams: T,
  files: FileMap<F>
) => Promisable<FileMap<F>>;
```

In the `before` and `after` functions, we have an access to the context and the event params.
The [context](docs\plugins\context.md) is used to gather common parts between events.
The event params manipulate the default behavior by passing different values.

## Accessing and Modifying Generated Files

In the `after` function, we also have access to the generated files. An example of using this parameter is when you want to restructure the generated files in a different folder structure.

:::info
In the `after` function for .NET plugins, we use a [`FileMap`](https://github.com/amplication/amplication/blob/master/libs/util/code-gen-types/src/files/file-map.ts). For Node.js plugins' `after` function we use a [`ModuleMap`](https://github.com/amplication/amplication/blob/master/libs/util/code-gen-types/src/code-gen-types.ts#L149).
:::

## Function Examples

Most of the functions include examples. But, if you're looking for more comprehensive and real-world examples, you can explore the [code of the Amplication plugins](https://github.com/amplication/plugins/tree/master/plugins) directly. These plugins showcase various implementations and use cases for the before and after lifecycle functions.

## Best Practices and Cautions

1. In the `after` function, avoid unintentionally overriding the entire generated file. Opt for smaller changes instead.
2. In the `before` function, take care when modifying templates to not unintentionally affect code generation.
3. In the `before` function, only choose `skipDefaultBehavior` if skipping code generation entirely, including default generation, is intended.
