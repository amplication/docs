---
id: how-to-test-your-plugin
title: How to Test a Plugin
sidebar_label: How to test a plugin
slug: /plugins/how-to-test-plugin
---

During and after [plugin development](/plugins/how-to-create-plugin), you would probably want to test your plugin locally before publishing it. 
In this section we will discuss how you can test and debug your plugin locally, within the context of Amplication's entire code generation flow.

The component that is responsible for the generation of source code by Amplication, and allows the integration of plugins into the code generation process, is called the **Data Service Generator (DSG)**.
In order to test your plugin locally, you need to run the DSG locally with your plugin configured for a local run. This will allow you to debug the code generation process in general, and your new plugin in particular.

## Run Data Service Generator locally

After creating a new plugin on your local environment and build it locally, you can test it or continue developing it following these few steps:

* run ```npx nx generate-example-input-json data-service-generator``` . This command will create an *input-example-json* file under *.amplication/generated-local-code/input.json*
* add to this file under the `pluginInstallations` key the details of you local plugin:
  ```
  {
    "id": "clb3p3ov800cplc01a8f6uwje", // uuid
    "npm":"@amplication/my-plugin", // name of npm package
    "enabled": true,
    "version": "0.0.1", // the current version on your package.json
    "pluginId": "my-plugin", // plugin id
    "settings": { "local": true, "destPath": "plugins/plugins/<plugin-name>" } 
  }
  ```
  **important!!! set the `local` key to `true` and the `destPath` to your plugin folder *relative to amplication folder*.**

now your plugin should be part of the generated code flow.

If you want to check the generated code you should run:
`npx nx generate-local-code data-service-generator`
This command will generate the code under *.amplication/generate-local-code/generated*

If you want to debug the code you should run in debug mode: 
`npm run debug:dsg`
in order to debug your local plugin you should add a `debugger` statement in your code and it will stop the process there. now you can go inside/out your plugin functions. you can also add breakpoints at our DSG code and check it there.



