---
id: first-app
title: Create your first service with Amplication
sidebar_label: Create your first service
slug: /first-app
---

# Create Your First Service

Not sure how to get started? These instructions will walk you through the steps of creating a service, adding an entity, adding roles, and setting permissions on entities.

Also, you'll see how to commit changes and manage versions, and finally, how to build your app and download the generated source-code.

Let’s get started.

## Step 1 - Create a New Service

1. Sign-in to [app.amplication.com](https://app.amplication.com).

   You should land on the _New Service_ page. If you're not on the _New Service_ page, click the Amplication logo in the top-left corner to reach the _Projects_ page.

2. Click the **Add Resource** button, and then click on **Service**
3. In the _New Service_ page, leave the default selections to create an empty service.
4. Click the **Create Service** button

   ![](./assets/pic0.png)

   The Overview window opens.

   ![](./assets/first-app/overview-window.png)

## Step 2 - Create an Entity

1. On the _Overview_ page, click **Go to Entities**, or from the main menu (left sidebar) click the **Entities** icon.
   The _Entities_ page opens. Here you see all the entities in your service.

:::tip
When creating an Entity, make sure you do not use a reserved name for the name of the Entity or for any of its fields. Go [here](https://github.com/amplication/amplication/blob/master/packages/amplication-server/src/core/entity/reservedNames.ts) to check the list of reserved names.
:::

Click the **Entities** icon on the main menu (left sidebar) to reach the _Entities_ page. Here you see all the entities in your application.

![](./assets/first-app/entities.png)

:::tip
At this stage, there's only one entity, **User**. This is auto-generated when you created the new service.
:::

In this example, we'll now add another entity called “Project”.

2. Click **Add Entity**.
3. In the _New Entity_ dialog, type “Project”.
4. Click **Create Entity**.

![](./assets/first-app/created-entity.png)

You now have a new entity named _Project_. Notice that the added entity comes with auto-generated values such as “Plural Display Name” and some default fields – **ID**, **Created At**, and **Updated At**.

## Step 3 - Add Entity Fields

To describe your project add some new fields. For this example, add these fields:

- **Name** – for saving the project name
- **Description** – for saving a more detailed description of the project
- **Start Date** – for saving the date on which this project starts
- **Owner** – for assigning a user to be an owner of the project

### Create the Name Field

1. In the _Entity Fields_ text box (above the list of fields), type “Name”.
2. Click **Add field** (or just press Enter). The new field is added to the list and the field's property panel opens.
3. Click the **Required Field** toggle to configure the _Name_ field as required.
4. Leave the defaults for the other properties (_Searchable_ active, _Data Type_ "Single Line Text", and _Max Length_ "1000".)

![](./assets/first-app/name-field.png)

:::tip
All changes are saved automatically.
:::

### Create the Description Field

1. In the _Entity Fields_ text box type “Description”.
2. Click **Add field** (or just press Enter). The new field is added to the list and the field's property panel opens.
3. Leave the defaults (_Required Field_ inactive _Searchable_ active, _Data Type_ "Multi Line Text", and _Max Length_ "1000".)

:::info

If the **Searchable** setting is not activated, the search cannot be based on the field. The field visibility is determined by the settings on the **Permissions** tab.

For example, if the customer's email address is visible (permissions set to **All Roles** for search), but the field is not set as **Searchable** the user will be able to search for customers by name, phone, or any other field but not by email address. However, the results will still include the email address.

:::

### Create the Start Date Field

1. In the _Entity Fields_ text box type “Start Date”.

:::info
White spaces are supported, which is useful when you want to enter a descriptive field name. The value is saved as the field’s display name.
In addition to the display name, each field has an auto-generated _Name_ that does not contain spaces or special characters. This name is later used for the API endpoint and in other places in the generated code.
If needed, you can manually change the field name in the field's properties panel.
:::

2. Click **Add field** (or just press Enter). The new field is added to the list.
3. The field's property panel opens. Leave the defaults (_Required Field_ inactive, _Searchable_ active, _Data Type_ "Date Time", and _Time Zone_ "Local Time".)

### Create the Owner Field

1. In the _Entity Fields_ text box type “Owner”.
2. Click **Add field** \(or just press Enter\). The new field is added to the list and the field's property panel opens.
3. Change the _Data Type_ from **Single Line Text** to **Relation to Entity**.
4. In the _Related Entity Id_ field select **User**.
5. Click the **Required Field** toggle to make the _Owner_ field required.

:::tip
You might find it easier to first add all the fields you want, one after another, and only afterwards set the properties of each field.
:::

## Step 4 - Create Roles

1. Click the Roles icon on the main menu (left sidebar) to reach the _Roles_ page. Here you see all the roles in your service.
1. On the _Overview_ page, click **Go to roles**, or from the main menu (left sidebar) click the **Roles** icon.

:::tip
Currently, there's only a default **User** role that was auto-generated when you created the new app.
:::

In this example, we add another two roles: _Admin_ and _Manager_.

1. In the _Type role name_ text box, type "Admin".
2. Click **Add Role** \(or just press Enter\). The new role is added to the list.
3. Repeat these steps to add the "Manager" role.

![](./assets/first-app/roles.png)

## Step 5 - Set Access Permissions

In order to allow users to access the entity, we need to set its permissions.

Permissions can be controlled separately for each of the following actions:

- **View**
- **Create**
- **Update**
- **Delete**
- **Search**

These actions can be set to one of the following:

- **Public** - no authentication is required, so the action is available to all users, not only those with defined roles
- **All Roles** - all roles can perform the action
- **Granular** - only specified roles can perform the action

### Set Entity Permissions

By default, all of the actions are set as **All Roles**.

In this example, some of the actions have been changed to **Public**, while the others remain as **All Roles**

![](./assets/first-app/permissions.png)

In the following example, we use the **Granular** setting to find tune the permissions for a role.

1. On the _Overview_ page, click **Go to Entities**, or from the main menu (left sidebar) click the **Entities** icon.
2. Click the _Project_ entity.
3. In the _Project_ page click the _Permissions_ tab. This opens the Permissions settings.
4. By default, all actions (_View_, _Create_, _Update_, _Delete_, and _Search_) are set to **All Roles**.
5. Fine tune permissions by changing the *Delete* permissions from **All Roles** to **Granular** and then select from the displayed roles the _Admin_ role. This ensures that only users with the _Admin_ role can delete projects.

![](./assets/first-app/granular-permissions.png)

:::tip
Once you have selected **Granular** on an action such as _Delete_, you have to select specific roles, or no one at all can use that action.
:::

### Set Field Permissions

We will now set permissions at the field level.

1.  In the **Update** action, click **+ Add Field** and select the **Start Date** and **ID** fields from the drop-down list.

![](./assets/first-app/granular-fields.png)

2. We now select the roles to associate with each selected field.

   In this example, for the _Update_ action, apply **Admin** permissions to the **startDate**, and apply both **Admin** and **Manager** permissions to the **id** field. To do this, you first need to select **Admin** and **Manager** from the roles on this action, so you can apply those roles on the specific fields.

![](./assets/first-app/granular-fields-2.png)

## Step 6 - Commit Your Changes

While working in Amplication your changes are saved automatically, but are not committed. Only committed changes will be included in the next version of your generated application.

In the _Pending Changes_ control in the right sidebar you can see the list of pending changes that are waiting to be committed.

![](./assets/first-app/pending-changes.png)

We'll now make our first commit.

In this page, you can see that the creation of the _Project_ entity hasn't been committed.

1. In the _commit message_ dialog, write a description of the changes you're committing. For example: "Added Project Entity and Manager and Admin roles".
2. Click **Commit Changes**. All changes are committed. A build of the first version of your service is automatically created!

:::tip
Use Code View to view and explore the generated code. You can see the updated code before it is synced with GitHub or downloaded. Click the [View Code](./view-generated-code.md) icon to view the generated code.
:::

3. After the build process completes, click the download icon in the _Generate Code_ row to get a .zip file of your app. It is now ready to be deployed anywhere you want. 🚀

## Step 7 - Taking your app a bit further

Now that you know how to create entities, commit changes, and build new versions, let's take it a bit further by adding another entity and learning how to compare changes before committing.

### Create the Task Entity

We'll now add another entity called “Task”.

1. On the _Overview_ page, click **Go to Entities**, or from the main menu (left sidebar) click the **Entities** icon.
2. Click **Add entity**.
3. In the _New Entity_ dialog, type in “Task”.
4. Click **Create Entity**.
5. The entity comes with a few default fields. We'll add some more fields as follows.

| Field Name        | Data Type          | Properties                                                                              |
| ----------------- | ------------------ | --------------------------------------------------------------------------------------- |
| Title             | Single Line Text   | Required                                                                                |
| Estimation (days) | Whole Number       |                                                                                         |
| Start Date        | Date Time          |                                                                                         |
| Status            | Option Set         | Required, 4 options: <ul><li>New</li><li>Pending</li><li>Ongoing</li><li>Done</li></ul> |
| Project           | Relation to Entity | Related to: Project                                                                     |
| Assigned To       | Relation to Entity | Related to: User                                                                        |

The Task's field list should now look like this:

![](./assets/first-app/task.png)

### Update the Project Entity

We'll now make a few changes to the _Project_ entity.

1. On the _Overview_ page, click **Go to Entities**, or from the main menu (left sidebar) click the **Entities** icon.
2. Select the _Project_ entity.
3. Add a new field called **Due Date** and set its data type to "Date Time".
4. Select the existing _Owner_ field and change its _Display Name_ to "Project Owner".

### Compare Pending Changes Before Commit

It's always good to check what was changed before you commit to verify that these changes were intentional.
To do so:

1. Click **Compare Changes**. (Note: **Compare Changes** icon is next to **Delete** icon)
2. The _Pending Changes_ page opens and indicates what was changed and what was added.

- The _Task_ entity was created
- The _Project_ entity was updated

![](./assets/first-app/commit.png)

3. Since these changes were intentional and we're happy to commit them, click **Commit changes and build**.

**You are now ready to build a new version of your app. Great work!**
