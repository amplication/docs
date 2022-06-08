---
id: api-admin-ui-settings
title: How to configure selective code generation
sidebar_label: Configure selective code generation 
slug: /how-to/api-admin-ui-settings
---

# Configure Selective Code Generation

Amplication enables you to include or exclude the following components from the generated code. 

- GraphQL API
- REST API
- Admin UI




## Selecting which  elements to generate



1. In **App settings**, select **APIs and Admin UI**

![](./assets/api-admin-ui-settings.png)

2. Configure the settings as follows:
    - **Server** - activate or deactivate  **GraphQL API** and **REST API and Swagger UI**
    - **Admin UI** - activate or deactivate **Admin UI**
    - **Generate root files** -  activated or deactivate **Generate root files**

:::tip
Admin UI requires GraphQL to work, so if GraphQL is disabled, then Admin UI cannot be activated. 
::: 


## Next steps

Continue with one of the following:  

- View Code
- Commit changes to start deployment to sandbox
- Push to GitHub