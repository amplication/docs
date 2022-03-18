---
id: how-to-create-entity-field
title: How to create an entity field
sidebar_label: Create an Entity Field
slug: /how-to/create-entity-field
---

# Create a new entity field

To create a new entity field, you first need to navigate to the _Entity_ page - click the **Entities** icon on the main menu (left toolbar) to reach the Entities page. Here you see all the entities in your application. Click on the Entity you want to edit, to get into the Entity's page.

1. In the _Entity Fields_ text box (above the list of fields), type in a name for the new field.
2. Click **Add field** (or just press Enter). The new field is added to the list.
3. The field's property panel opens, so you can edit its other properties like _Description_, _Required_, and _Data Type_.

:::tip
You might find it easier to first add all the fields you want, one after another, and only afterwards set the properties of each field.
:::

![](../getting-started/assets/pic-3.jpg)


:::info
White spaces are supported, which is useful when you want to enter a descriptive field name. The value is saved as the field’s display name.
In addition to the display name, each field has an auto-generated _Name_ that does not contain spaces or special characters. This name is later used for the API endpoint and in other places in the generated code.
If needed, you can manually change the field name in the field's properties panel.
:::
 
 ### Searchable Setting

 If the **Searchable** setting is not activated, the search cannot be based on the field. The field visibility is determined by the settings on the Permissions tab. 

For example, if the customer's email address is visible (permissions set to **All Roles** for search), but the field is not set as **Searchable** the user will be able to search for customers by name, phone, or any other field but not by email address. However, the results will still include the email address.
