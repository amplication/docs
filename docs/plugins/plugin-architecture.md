---
id: PluginArchitecture
title: Plugin Architecture
sidebar_label: Plugin Architecture
slug: /plugins/PluginArchitecture
---

Amplication's `Data Service Generator (DSG)` service is responsible for the code generation process. This process is divided into several functions, where each function plays a different part in this process.

To enable intervention in the code generation process, we wrap these functions in a function named `pluginWrapper` 

The `pluginWrapper` function is invoked with the following arguments:

- **func** - the DSG function we want to wrap.
- **event** - the name of event we want to capture, and change something in the triggered process. 
- **args** - the original parameters of the DSG function. There are most likely will be used as the parameters of the event, for the plugin developer to have access to these params and manipulate the returned value of the function.

For the purpose of this architecture overview, remember that every event has before and after property (which is a function), representing the event's lifecycle in which you can intervene (before the emission of the event and after the emission of the event). For more information about `before` and `after` event see [Before and After Lifecycle Functions](docs\plugins\before-after.md)

When the `pluginWrapper` function is invoked, it checks whether the event argument that was passed has a `before` or `after` property. If so, it invokes other functions that are responsible for calculating the final behavior when this event is emitted, or in other words
the outcome of the function that this event is responsible to execute.

If no part of the event lifecycle was provided or if non of its params were changed, the default behavior will be executed.                       