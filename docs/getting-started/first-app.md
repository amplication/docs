---
id: first-app
title: Create your first application with Amplication
sidebar_label: Your first application
slug: /getting-started
---

# Your first application

Not sure how to get started? In this tutorial, you’ll walk through the steps of creating an application, adding an entity, adding roles, and setting permissions on entities.

Also, you'll see how to commit changes and manage versions, and finally how to build your app and get it ready for deployment.

Let’s get started.

## Create a New App

1. Sign in to [app.amplication.com](https://app.amplication.com). You should land on the _My Apps_ page. If you're not on the My Apps page, click the Amplication logo in the top-left corner to reach this page, as this is our starting point.
2. In the My Apps page, click **Create New App**.
3. In the _New App_ dialog, name your app “Task Management” and enter this description: “My first app for task management”.
4. Click **Create App**.

![](./assets/pic0.jpg)

## Create an Entity

Click the Entities icon (left sidebar, a.k.a. main menu) to reach the Entities page, here you see all the entities in your application.

![](./assets/pic-1.jpg)

:::tip
Currently, there's only a “User” entity that was auto-generated when you created the new app.
:::

For the purpose of this tutorial, we'll now add another entity called “Project”.

1. Click **Create New**.
2. In the _New Entity_ dialog, type in “Project”.
3. Click **Create Entity**.

![](./assets/pic-2.jpg)

You now have a new “Project” entity. Notice that the added entity comes with auto-generated values like “Plural Display Name” and some default fields – ID, Created At, and Updated At.

## Add Entity Fields

To describe your project add some new fields. For the purpose of this tutorial, add these fields:

- Name – for saving the project name
- Description – for saving a more detailed description of the project
- Start Date – for saving the date on which this project starts
- Owner – for assigning a user to be an owner of the project

### Create the Name Field

1. In the _Entity Fields_ text box (above the list of fields), type in “Name”.
2. Click **Add field** (or just press Enter). The new field is added to the list.
3. The field's property panel opens. Click the **Required Field** toggle to make the _Name_ field required.
4. Leave the defaults for the other properties (_Searchable_ inactive, _Data Type_ "Single Line Text", and _Max Length_ "256".)

![](./assets/pic-3.jpg)

:::tip
All changes are saved automatically.
:::

### Create the Description Field

1. In the _Entity Fields_ text box type “Description”.
2. Click **Add field** (or just press Enter). The new field is added to the list.
3. The field's property panel opens. Leave the defaults (_Required Field_ and _Searchable_ inactive, _Data Type_ "Multi Line Text", and _Max Length_ "1000".)

### Create the Start Date Field

1. In the _Entity Fields_ text box type “Start Date”.

:::info
White spaces are supported, which is useful when you want to enter a descriptive field name. The value is saved as the field’s display name.
In addition to the display name, each field has an auto-generated _Name_ that does not contain spaces or special characters. This name is later used for the API endpoint and in other places in the generated code.
If needed, you can manually change the field name in the field's properties panel.
:::

2. Click **Add field** (or just press Enter). The new field is added to the list.
3. The field's property panel opens. Leave the defaults (_Required Field_ and _Searchable_ inactive, _Data Type_ "Date Time", and _Time Zone_ "Local Time".)

### Create the Owner Field

1. In the _Entity Fields_ text box type “Owner”.
2. Click **Add field** \(or just press Enter\). The new field is added to the list.
3. The field's property panel opens. Change the _Data Type_ from "Single Line Text" to "Relation to another Entity".
4. In the _Related Entity Id_ field select “User”.
5. Click the **Required Field** toggle to make the “Owner” field required.

:::tip
You might find it easier to first add all the fields you want, one after another, and only afterwards set the properties of each field.
:::

## Set Access Permissions

In order to allow users to access the entity, we need to set its permissions.

Permissions can be controlled separately for each of the following actions:

- **View**
- **Create**
- **Update**
- **Delete**
- **Search**

By default, ALL these actions are NOT permitted, so we need to decide which actions are allowed for whom.
This is where roles are handy.

### Create Roles

Click the Roles icon (left sidebar, a.k.a. the main menu) to reach the _Roles_ page, here you see all the roles in your application.

:::tip
Currently, there's only a default “User” role that was auto-generated when you created the new app.
:::

For the purpose of this tutorial, we'll now add another two roles: “Admin” and "Manager".

1. In the _Type role name_ text box, type "Admin".
2. Click **Add Role** \(or just press Enter\). The new role is added to the list.
3. Repeat these steps to add the "Manager" role.

![](./assets/pic-4.jpg)

### Set Entity Permissions

1. Click the Entities icon in the main menu to open the _Entities_ page.
2. Click the _Project_ entity.
3. In the Project's page _Permissions_ panel click the edit icon (pencil). This opens the Permissions settings.
4. Start by making sure that all actions (View, Create, Update, Delete, and Search) are enabled for all roles.
5. Fine tune permissions by changing the _Delete_ permissions from "All Roles" to "Granular" and then select from the presented roles the "Admin" role.
   This ensures that only users filling the Admin role can delete projects.

![](./assets/pic-5.jpg)

:::info
You can set action permissions for specific fields, instead of globally for all the action's fields. For example, you can prevent users from changing (updating) the Due Date of a project, while permitting managers to do so.
To specify permissions at the field level:

1. Set the action's permission scope to "Granular".
2. Select the role(s) relevant to this action.
3. Click **+ Add Field**. (For the _Delete_ action there's no option to set permissions for specific fields.)
4. Select the field(s) from the list.
5. For each of these fields set which role(s) can perform the action by clicking it. For example, click **Admin** beneath "Update Field" _owner_.
:::

## Commit Your Changes

While working in Amplication your changes are saved automatically, but are not committed. Only committed changes will be included in the next version of your application.

In the _Pending_ control (top bar, on the right) you can see how many pending changes are waiting to be committed.

![](./assets/pic8.jpg)

For the purpose of this tutorial, let's make our first commit.

1. Click **Pending** to open the _Pending Changes_ page.
2. In this page, you can see that the creation of the _Project_ entity hasn't been committed. Click **Commit Changes**.
3. In the _Commit Pending Changes_ dialog, enter a short description of the changes you're committing. For example, "Created project entity".

![](./assets/pic9.jpg)

4. Click **Commit**. All changes are committed. You can now build the first version of your app!

## Build a New Version

For the purpose of this tutorial we will now build a version of the app that includes everything we did up to this point.

1. If you just committed changes, you'll have the **Publish** option available in the committed change confirmation page, click it. Otherwise, click the Publish icon in the main menu to open the _Publish_ page.
2. The _Publish_ page lists all commits made since the last build. Per the context of this tutorial, there are two commits. The first one was made automatically when starting your new application, and the second one was done in the previous segment where we committed the _Project_ entity.

![](./assets/pic6.jpg)

3. Click **Build** to open the _New Build_ dialog.
4. For the purpose of this tutorial use the suggested build number "0.0.1". In your forthcoming builds, control the version number by selecting whether to create a major version, a minor version, or a patch.

![](./assets/pic7.jpg)

5. The descriptions you entered for your commits are listed in the description box of this dialog. You can add more information if needed.
6. Click **Build New Version**.
7. The Build log is visible on the right side of this page. After the build process completes, click the download icon in the _Generate Code_ row to get a .zip file of your app. It is now ready to be deployed anywhere you want. 🚀

![](./assets/pic10.jpg)

## Taking your app a bit further

Now that you know how to create entities, commit changes, and build new versions, let's take it a bit further by adding another entity and learning how to compare changes before committing.

### Create the Task Entity

For the purpose of this tutorial, we'll now add another entity called “Task”.

1. Click the Entities icon (left sidebar, a.k.a. main menu) to reach the Entities page.
2. Click **Create New**.
3. In the _New Entity_ dialog, type in “Task”.
4. Click **Create Entity**.
5. The entity comes with a few default fields. We'll add some more fields as follows.
   If you don't remember how to add a field refer to the [Add Entity Fields section above](#add-entity-fields).

| Field Name        | Data Type                  | Properties                                                                              |
| ----------------- | -------------------------- | --------------------------------------------------------------------------------------- |
| Title             | Single Line Text           | Required                                                                                |
| Estimation (days) | Whole Number               |                                                                                         |
| Start Date        | Date Time                  |                                                                                         |
| Status            | Option Set                 | Required, 4 options: <ul><li>New</li><li>Pending</li><li>Ongoing</li><li>Done</li></ul> |
| Project           | Relation to another Entity | Related to: Project                                                                     |
| Assigned To       | Relation to another Entity | Related to: User                                                                        |

The Task's field list should now look like this:

![](./assets/pic11.jpg)

### Update the Project Entity

We'll now make a few changes to the _Project_ entity.

1. Click the Entities icon (left sidebar, a.k.a. main menu) to reach the Entities page.
2. Select the _Project_ entity.
3. Add a new field called "Due Date" and set its data type to "Date Time".
4. Select the existing _Owner_ field and change its _Display Name_ to "Project Owner".

### Compare Pending Changes Before Commit

It's always good to check what was changed before you commit to verify that these changes were intentional.
To do so:

1. Click **Compare Changes**.
2. The _Pending Changes_ page opens and indicates what was changed and what was added.

- The _Task_ entity was created
- The _Project_ entity was updated

![](./assets/pic12.jpg)

![](./assets/pic13.jpg)

3. Since these changes were intentional and we're happy to commit them, click **Commit Changes**.

**You are now ready to build a new version of your app. Great work!**
