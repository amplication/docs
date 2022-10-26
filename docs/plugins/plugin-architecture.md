---
id: PluginArchitecture
title: Plugin Architecture
sidebar_label: Plugin Architecture
slug: /plugins/PluginArchitecture
---

A plugin is a NPM package that is installed and executed as part of the code generation process to allow the plugin writer to manipulate and extended the default behavior.

A plugin is a class with a register function that exposes plugin events.

An event is a hook that enables the developer to intervene before or after the execution of a Function, to create new logic This intervention can occur at any logical junction in the code.

Each plugin contains events which can intervene before or after the following high-level functions.

- Entry point - start creating code
- Create DTOs (createDTOs)
- Create Server Modules (createServerModules)
- Create Admin Modules (createAdminModules)

Each function can be preceded and followed by an event. Each functions can encapsulate functions at a lower level, each of which can be a point of intervention.
