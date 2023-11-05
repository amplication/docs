---
id: plugins
title: How To Use Plugins
description: Learn how to use Amplication plugins that extend the functionality of your generated application.
sidebar_label: Use Plugins
slug: /getting-started/plugins
pagination_next: plugins/overview
pagination_prev: getting-started/community-plugins
---

Amplication uses _Plugins_ to extend the functionality of your generated code.

Some plugins can be enabled when you first create your service.
For example, if you choose MySQL as your database, the _MySQL DB_ plugin will be enabled.
If you choose to turn on authentication for your service, that will enable the _NestJS Auth Module_ plugin.

All community plugins published by Amplication are available on the _All Plugins_ page.
Your installed plugins are shown on the _Installed Plugins_ page.
Plugins can be manually enabled or disabled on either of these pages.
The source code of all community Amplication plugins are [available on GitHub](https://github.com/amplication/plugins).

Besides the community plugins created by the Amplication team, you can [develop your own custom plugins](/plugins/overview/).

## Community Plugins List 

You can view all community plugins on the _All Plugins_ page.
They're also available on the [Community Plugins](/plugins-list) page here on the Amplication documentation.

## Viewing Open-Source Plugin Code

All Amplication plugins are open-source and available on GitHub.
You can find the plugin source code for each individual plugin in Amplication's [`plugins`](https://github.com/amplication/amplication-plugins) repository.

## How To Install A Plugin

To install a plugin:

1.  In the _All Plugins_ page, click **Install** for the required plugin.

![](./assets/all-plugins.png)

2. This will turn on the plugin's toggle into its _on_ state.

3. Go to the _Installed Plugins_ page. The installed plugins are listed.

4. To see the plugin's code on GitHub, select **View on GitHub**.

## How To Uninstall A Plugin

To uninstall, or deactivate, a plugin, click the toggle switch into its _off_ state.

## How To Modify Plugin Execution Order

The plugins are executed when Amplication generates code, according to their order on the *Installed Plugins* page.

:::tip
If a plugin execution is a prerequisite for another plugin, it must be located earlier in the list.
:::

- To change the order of the installed plugins, click the up or down arrow to the right of the plugin bar.

![](./assets/installed-plugins.png)

## How To Change a Plugin's Version

Amplication plugin developers may release several versions of a plugin over time.
Sometimes, you might need to generate a project with an earlier version of the plugin, to ensure compatibility.

By default, the latest version of the plugin will be available in the list of plugins.

1. To change the installed version of a plugin, in the **All Plugins** page, click the **Settings** icon.

   The plugin’s settings page opens.

   ![](./assets/plugin-versions.png)

2. Select the required plugin version from the Plugin version drop-down list and click **Save**.

   In the next build, the code will be generated with the selected plugin version.

:::note
Each version of the Plugin has its own settings, so when you replace the version you also replace its settings.
:::

## How To Develop a Custom Plugin

To add more functionality, you can develop your own plugins, or can use plugins developed by the community, as they become available.

See [Plugin Development Overview](/plugins/overview/) for more information.
