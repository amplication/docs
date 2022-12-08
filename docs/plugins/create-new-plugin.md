---
id: CreateNewPlugin
title: Creating a New Plugin
sidebar_label: Creating a New Plugin
slug: /plugins/CreateNewPlugin
---

## Main steps

The creation of a plugin requires the following main steps:

1. Entry Point  (export async function `createDataServiceImpl`)
2. Create DTOs createDTOs
    
![](.\assets\NewPlugin1.png)
    

3. Create Server Modules `createServerModules`

4. Create admin modules `createAdminmodules`

![](.\assets\NewPlugin2.png)

**Summary:** So, if we look at the high level, there are three functions that create all the code: 

```jsx
createDTOs
createServerModules
createAdminmodules
```


