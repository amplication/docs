---
id: private-plugins
sidebar_label: Private Plugins
slug: /private-plugins
toc_max_heading_level: 2
---

# Private Plugins

Private Plugins enable you to create plugins exclusively for your organization's use.
These plugins let you build secure, proprietary integrations and define your organization's standards. You can use them to protect sensitive business logic and enforce development best practices across your services.

:::note
Private Plugins are only **available for Enterprise Plan users**.
:::

Unlike community plugins hosted on public package managers, private plugins reside in your own Git repository, giving you complete control over your plugin infrastructure and code.

## Create Your Private Plugins Repository

First, set up a dedicated Git repository to host your plugin's source code and builds:

1. Create a new Git repository specifically for your private plugins
2. Create a `plugins` folder in the repository root

The `plugins` folder will contain separate folders for each of your private plugins.

![Private Plugins Repo](./assets/private-plugins/private-plugins-repo.png)

## Configure Git Settings In Platform Console

Next, configure your private plugins repository in the Platform Console:

1. Navigate to your project's **Platform Console** from the top header
2. Click the **Private Plugins** tab
3. Select **Git Settings** in the left sidebar
4. Enable the **Override default settings** toggle
5. Choose your dedicated plugin repository from the dropdown

:::important
Never use the same repository for private plugins and generated services to avoid build conflicts.
:::

![Publish Your Platform Console Changes](./assets/private-plugins/configure-git-settings.png)

## Set Up Your Private Plugin Folder

After creating the plugin entry in the Platform Console, set up your development environment.

### For Node.js Plugins:

You can get started using our Node.js plugin template.

![Node.js Plugin Template](./assets/private-plugins/plugin-template.png)

First, navigate to the plugins folder.

```bash
cd plugins
```

Next, clone the plugin template and name it with your plugin's `Plugin Id`.

```bash
git clone https://github.com/amplication/plugin-template your-plugin-id
```

### For .NET Plugins:

To create a new .NET plugin, we recommend copying and modifying the existing .NET Postgres Database plugin as a starting template.

![.NET Postgres Database Plugin](./assets/private-plugins/dotnet-postgres-db.png)

First, navigate to the `plugins` folder within your project:

```bash
cd plugins
```

Next, clone the .NET Postgres Database plugin.

To avoid downloading the entire repository, we'll use a sparse checkout to copy only the `dotnet-db-postgres` folder from Amplication's plugins repository.

Follow the steps below to complete this process:

1. **Initialize the Clone Without Checking Out Files**  
   Begin by cloning the Amplication plugins repository without checking out any files:

   ```bash
   git clone --no-checkout https://github.com/amplication/plugins
   ```

2. **Set Up Sparse Checkout for the Plugin**  
   Specify that you only want to download the `dotnet-db-postgres` folder:

   ```bash
   git sparse-checkout set plugins/dotnet-db-postgres
   ```

3. **Check Out the Specified Folder**  
   Now, check out the files. This will only download the `plugins/dotnet-db-postgres` folder:

   ```bash
   git checkout
   ```

4. **Rename the Folder to Your Plugin ID**  
   Finally, rename the cloned `dotnet-db-postgres` folder to match your plugin's `Plugin Id`:

   ```bash
   mv plugins/dotnet-db-postgres your-plugin-id
   ```

## Add a New Private Plugin

Next, add a new private plugin to your Platform Console:

1. In the Private Plugins tab's sidebar, click the `Add Private Plugin` field
2. A modal appears that scans your connected Git repository for private plugins
3. Select your plugin from the list of found plugins

:::note
Only plugins that are properly structured within the `plugins` folder of your connected Git repository will be detected.
:::

![Publish Your Platform Console Changes](./assets/private-plugins/add-new-plugin.png)

## Configure Your Plugin

After adding your plugin, you'll need to configure its settings:

1. **Plugin ID**: Automatically set based on your plugin's folder name in the Git repository. This can only be modified by renaming the folder and re-adding the plugin.
2. **Display Name**: The human-readable name for your plugin that appears in the UI. By default, it matches the Plugin ID but can be customized for better clarity.
3. **Icon**: Choose from a variety of technology-specific icons to help visually identify your plugin. You can also customize the icon's color to match your categorization system.
4. **Code Generator**: Select the appropriate code generator for your plugin:
  - Node.js
  - .NET
  - Blueprints (for custom blueprint solutions)
5. **Blueprint Compatibility**: Optionally restrict your plugin to work with specific blueprints by selecting them from the dropdown menu.
6. **Description**: Provide a detailed description of your plugin's purpose. A detailed description helps developers quickly understand and choose the right plugin for their needs.

:::tip
A meaningful display name, icon, and description will help developers quickly identify and understand your plugin's purpose when browsing the plugin list in services and templates.
:::

![Configure Your Private Plugin's Settings](./assets/private-plugins/configure-plugin.png)

## Develop Your Plugin

Now that your plugin structure is set up, it's time to start building your plugin.

First, enable dev versions by toggling the `Enable Dev Version` into the on state.

![Enable Dev Versions](./assets/private-plugins/enable-dev-versions.png)

Dev Versions streamline the plugin development process by automatically using the latest code from your repository's base branch.
This eliminates the need to publish new versions during development and testing.

Dev Versions makes the development process much smoother.
The plugin code will be pulled from the base branch set at the Git Settings.
The new changes in your plugin folder are immediately available for testing.

Next, we've prepared several resources and reference materials to help guide your plugin development process.

Core Documentation:

- [Private Plugins Overview](https://docs.amplication.com/plugins/overview/)
- [.NET Plugin Events Reference Guide](https://docs.amplication.com/plugins/dotnet-plugin-events/create-server/)
- [Node.js Plugin Events Reference Guide](https://docs.amplication.com/plugins/plugin-events/create-server/)

Community Plugin Examples:

- Browse the [official plugins repository](https://github.com/amplication/plugins/tree/master/plugins) for real-world examples

:::note
Study the published Node.js and .NET community plugins for best practices and guidance on how to structure your code effectively.
:::

### Add Plugin Settings

Plugin settings allow you to define customizable options that users can configure when using your plugin. These settings can include API keys, feature flags, or other configuration values that modify your plugin's behavior.

1. Click the **Edit** button (pencil icon) next to your version
2. Configure user-facing settings in the **Settings** field:
   ```json
   {
      "apiKey": "default-api-key",
      "enableFeatureX": true
   }
   ```
3. Set internal configurations in the **Configurations** field:
   ```json
   {
      "requireAuthenticationEntity": true
   }
   ```

![Publish Your Platform Console Changes](./assets/private-plugins/settings.png)

:::note
For a real-world example of using settings in your plugin, see the [Supertokens authentication plugin](https://github.com/amplication/plugins/blob/a94dac7956e51903df0240eef7b704999fc6a752/plugins/auth-supertokens/src/index.ts#L160).
:::

## Publish Your Plugin

After developing your plugin it's time to get it for release.
To do this, you'll need to add a version to your plugin, tag your repository, and finally publish it through the Amplication UI.

Publishing makes your plugin version available for use in services and templates, and sets it as the latest version.

### Add Versions to Your Plugin

After developing your plugin and to get it ready for release, you'll need to version it in both Amplication and your Git repository.

First, disable dev versions by toggling the `Enable Dev Version` into the off state.

![Disable Dev Versions](./assets/private-plugins/disable-dev-version.png)

Next, let's add a version through the Amplication UI:

1. Navigate to the Private Plugins tab and select your plugin
2. Scroll to **Add New Version** and click `Add Version`
3. Note the version number you assign (e.g., `0.1.0`)

![Publish Your Platform Console Changes](./assets/private-plugins/add-new-version.png)

### Tag Your Git Repository

Next, let's add a git tag to your plugin.
Amplication uses Git tags to identify plugin versions during code generation.

Create a tag with your Plugin ID and version from the previous step:

```bash
git tag "your-plugin-id@0.1.0"
```

Push the tag to your remote repository:

```bash
git push origin "your-plugin-id@0.1.0"
```

### Publish Your Plugin

1. Go to your Platform Console
2. Click on "Publish New Version" in your Platform Changes sidebar
3. Add an optional version message
4. Click **Publish** to make your changes available

![Publish Your Platform Console Changes](./assets/private-plugins/publish-changes.png)

## Use Private Plugins in Templates and Services

You can use your private plugins in both templates and services, provided the code generator matches your plugin's code generator.

### Include the Plugin in a Template

1. Navigate to the Templates tab in your Platform Console
2. Click on Create Template or navigate to an existing Template
3. Ensure that your template's code generator matches your private plugin's code generator
4. In your template's overview page, click on Plugins
5. Go to the Private Plugins tab on the left sidebar
6. Click Install on your private plugin

### Include Plugin in a Service

1. Navigate to your service in the Service Catalog
2. Click on the Plugins tab
3. Look for your private plugin in the Private Plugins section
   :::note
   Your plugin will only appear if its code generator matches your service's code generator
   :::
4. Click Install to add the plugin to your service

![Include Plugin in a service](./assets/private-plugins/add-private-plugin-to-service.png)

### Configure Plugin Settings

1. Go to the Installed Plugins tab in the left sidebar
2. Click Settings next to your private plugin
3. Enter the JSON configuration that matches your plugin's user-facing settings

## Best Practices and Common Pitfalls

### Repository Management

- Keep private plugins in a dedicated git repository separate from services
- Maintain proper version control with meaningful commits

### Code Generator Compatibility

- Always match plugin and service code generators
- Verify compatibility before starting development

### Version Control

- Use correct tag format: `PluginId@Version`
- Always push tags to remote repository that match the tag you set in the UI

### Code Generation Errors

- Build failures during code generation: Review logs and ensure proper repository setup
- Undefined property errors during code generation: Verify plugin versions and ensure the plugin is properly published
- Dependency errors during service generation: Check `package.json` configuration

## Next Steps

You successfully created your private plugin.
It's version-controlled in your Git repository and available for use in both templates and services that match its code generator.

For more information or assistance:
- Join our [Discord community](https://amplication.com/discord) for technical discussions and support
- Enterprise customers can contact our support team through their designated support channels
