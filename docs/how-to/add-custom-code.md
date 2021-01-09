---
id: add-custom-code
title: How to add custom code to you application
sidebar_label: Add Custom Code
slug: /how-to/custom-code
---

# Add custom code to you application

Although your application built with Amplication is fully functional and you can start using it as it was shipped, you probably want to add your core business logic and other functionality to your app.

## The Vision

Our vision, and soon to be implemented, is that you will be able to add custom code to the application while keeping the ability to work on Amplication to update your data model, change permissions, add roles and more.

To do so, Amplication will merge changes via Git based on pre-defined policies that will allow you to add and update services, controllers, resolvers and more without loosing the link to Amplication. You will have the freedom and power of code, while saving time on the repetitive tasks with Amplication.

Until this feature is ready, you should keep track of changes yourself. It is recommended to do so using GitHub or other git services.

:::info
Until this feature is ready, if you find it too complicated to keep manually merging changes from Amplication, we recommend that you first think thoroughly about your requirements and then build your models and permission schema with Amplication. You can still save a ton of time on boilerplate, permissions, API's, React structure and much more.  
:::

## Examples

Following are some examples of how to add custom code in different layers of the application.

The purpose of these examples is to get familiar with the layers structure and the responsibility of each of the components in the server.

- [Example: How to add a business logic to a service](/docs/custom-code/business-logic)
- [Example: How to add an action to a REST API controller](/docs/custom-code/controller-action)
