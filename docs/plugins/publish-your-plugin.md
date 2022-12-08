---
id: PublishPlugin
title: Publishing Your Plugin
sidebar_label: Publishing Your Plugin
slug: /plugins/PublishPlugin
---




Step 1. Create the Plugin

Step 2. Publish the Plugin in NPM. For details, see [NPM documentation](https://docs.npmjs.com/cli/v6/commands/npm-publish)

Step 3. Send a pull request with the configuration and details of the repo that you want to add to the catalog to the plugin-catalog [repo](https://github.com/amplication/plugin-catalog) This will make your plugins available to the Amplification server without the need for data in the database. 


In the plugin `catalog/plugins/` page create an file with the name of the Plugin, in this example, `auth-basic`. 


```ts
id: auth-basic  

name: Basic Auth

description: Add basic (username-password) authentication and authorization to your apps

repo: amplication/plugins

npm: '@amplication/plugin-auth-basic'

icon: auth-basic.png

github: https://github.com/amplication/plugins/tree/main/plugins/auth-basic

website: https://github.com/amplication/plugins/tree/main/plugins/auth-basic

type: official 

categories: [security]

resourceTypes: [service]

```
**where: **  

- **id:**, **name:**, **description:**, and **npm:**, are the same as in NPM

- **type:**, **categories:**, and **resourceTypes:** remain with their  default values

- **website:** is not mandatory

- **icon:** is the name of the icon file, located at  https://github.com/amplication/plugin-catalog/tree/master/assets/icons


 
