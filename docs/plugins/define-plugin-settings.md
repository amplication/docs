---
id: define-plugin-settings
title: How To Define Plugin Settings
sidebar_label: How To Define Plugin Settings
slug: /plugins/define-plugin-settings
---

# How To Define Plugin Settings

The `.amplicationrc.json` file lets you configure settings for your custom Amplication plugin.
This file lives at the root of your plugin directory.

It contains two properties at the root level:

- `settings`: User-facing configuration.
- `systemSettings`: Internal configuration.

```json title=".amplicationrc.json"
{
  "settings": {
    "host": "localhost",
    "port": 27017,
    "user": "admin",
    "password": "admin",
    "dbName": "my-db"
  },
  "systemSettings": {
    "requireAuthenticationEntity": true
  }
}
```

### `settings`

The `settings` property contains values that will appear in the Amplication UI when a user installs your plugin. This allows the user to customize your plugin's behavior.

For example:

```json
"settings": {
  "apiKey": "123456789",
  "endpoint": "https://example.com/api"
}
```

Define all user-facing configuration in the `settings` object.

### `systemSettings`

The `systemSettings` property is used to contain internal configuration that you as the plugin developer can use in your plugin's code. For example, you might want to do something during a plugin's installation or enforce prerequisites.

These settings are **not visible to the user** and are solely for use in your plugin's code.

:::caution
`requireAuthenticationEntity` is the only property available in the systemSettings configuration object. Also, **`systemSettings` is currently only available for internal developers** and not community developers.
:::

## Examples

You can look at the `.amplicationrc.json` file of the following plugins to get a sense for how to structure yours:

1. [CI GitHub Actions Plugin](https://github.com/amplication/plugins/blob/master/plugins/ci-github-actions/.amplicationrc.json)
2. [MySQL Plugin](https://github.com/amplication/plugins/blob/master/plugins/db-mysql/.amplicationrc.json)
3. [MongoDB Plugin](https://github.com/amplication/plugins/blob/master/plugins/db-mongo/.amplicationrc.json)
