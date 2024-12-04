---
id: react-todos-step-002
title: Create the Backend | React Todos
sidebar_label: Create the Backend
slug: /tutorials/react-todos/step-002
---

# Create the Backend | React Todos

## Table of Contents

- [Step 1 - Create a New App](#step-1---create-a-new-app)
- [Step 2 - Create an Entity](#step-2---create-an-entity)
- [Step 3 - Create a Role](#step-3---create-a-role)
- [Step 4 - Assign Permissions](#step-4---assign-permissions)
- [Step 5 - Connect to GitHub](#step-5---connect-to-github)
- [Step 6 - Build the Backend](#step-6---build-the-backend)
- [Step 7 - Run the Backend](#step-7---run-the-backend)
- [Step 8 - Wrap Up](#step-8---wrap-up)

## Step 1 - Create a New App

1. Hopefully, you've had the chance to create an Amplication account, but if not, don't fret! Visit [https://app.amplication.com/](https://app.amplication.com/) and you'll be directed to the login screen. Here you can log in to an existing Amplication account, or create one, by signing in with a GitHub account.

   You should end up at the `New App` page, but if not you can get to it [here](https://app.amplication.com/).

2. Click the `New App` button in the top right corner.

   ![create an Amplication app](./assets/step-002-001.png)

3. Name your application whatever you'd like, and then click "Create Project."

4. Click "New service +," in the top right corner, and then "Create Service" in the bottom right of the new page.

   ![Click "New service +"](./assets/step-002-002.png)

   ![then "Create Service"](./assets/step-002-003.png)

## Step 2 - Create an Entity

An entity is equivalent to a collection in a NoSQL database or a table in a  relational database. By default, a User entity is created for you. This entity will eventually help us handle authentication. But first, let's deal with the backend. The main entity will be used to store tasks created by users.

1. Click the "Entities" button in the left hand bar to go to the entities page.

   ![Click the "Entities" button](./assets/step-002-004.png)

2. Click `Add entity`.

   ![add entity](./assets/step-002-005.png)

3. When a `New Entity` modal appears, input `Task` into the input field and click `Create Entity`.

   With the entity created we'll want to define a few fields for task elements.

4. On the left-hand panel, you'll see the `Fields` this entity has, and at the very bottom, there will be an option to add a field.

   ![Add field option](./assets/step-002-006.png)

5. The first field will be `Text`. Type that into the `Add field` input and hit `enter`.

   The new field will be created and a few options will appear.

   ![text field](./assets/step-002-007.png)

6. Notice a dropdown for the `Data Type` of this field is set to `Single Line Text`. That's perfect as it'll be a string input of a task. There are many different data types Amplication can enforce for fields.

7. The only change that needs to be made here is this will be a required field. Toggle the `Required Field` switch.

   Changes will be automatically saved.

8. Like before, create a new field called `Completed`. This field should also be a required field, but we will change the data type. Click the `Data Type` dropdown and change this field to be a `Boolean`.

9. The final field we will need to create should be called `UID`. This field will be used to relate a task to a user. Mark this as a required field. In the `Data Type` dropdown select `Relation to Entity`.

10. The `Related Entity` dropdown should appear, select `User`. A modal asking to create a relation between a Task and a User will appear. Click `Create` to create the relation. To learn more about entity relations, there's an article on the docs website [here](/relations/).

## Step 3 - Create a Role

Amplication allows for granular permission to create, read, update, and delete entries in the different entities of the backend.

User's who will be creating tasks in the Todo app will need to be granted certain permissions to create, read, and update their tasks and prevent them from doing other things.

1. Click the `Roles` icon on the left-hand panel.

   ![roles button](./assets/step-002-008.png)

2. Then, much like the properties, we added to the `Task` entity, create a role called `Todo User`.

   ![create a new role](./assets/step-002-009.png)

## Step 4 - Assign Permissions

   With a role for users of the Todo app created, we'll want to assign certain permissions to the `Todo User`  role.

1. Return to the entities page by clicking the `Entities` icon on the left-hand panel, again.

   By default, every role has CRUD (create, read, update, and delete) access to every entity. It is important  to limit the scope of our Todo users.

2. Select the `User` entity from the list of entities, and on the left-hand, panel select `Permissions`.

   Every type of command is granted to `All Roles`. Users with the `User` or `Todo User` role have full access to the `User` entity. This can be dangerous.

   The default admin account created by the backend has the role `User`, so we don't want to mess with that. What we will eventually do is have it so all new users are assigned the `Todo User` role, and we will limit their access to certain commands.

3. Toggle the permissions for each of the entity's commands to `Granular` and toggle on the `User` role. Now the only user who can access `User` accounts will have the `User` role, which will belong only to the admin account.

   ![users permissions](./assets/step-002-010.png)

4. Return to the `Entities` page and now select the `Task` entity. Click `Permissions`. Toggle the `Delete` command, to `Granular` and enable access to the `User` role. Both `User`s (the admin) and `Todo User`s (regular users of the app) will be able to create, read, and update tasks; but only `User`s will be able to delete tasks.

   ![tasks permissions](./assets/step-002-011.png)

## Step 5 - Connect to GitHub

Amplication provides [code sync with GitHub](/sync-with-github/). We'll want to set this up with the repository we created in the previous step.

:::note
If you're an Enterprise plan user you can also sync with other git providers like [Bitbucket](/sync-with-bitbucket/).
:::

1. Click the `Connect to Github` icon on the left-hand panel. Then click `Go to project settings.`

   ![Connect to GitHub](./assets/step-002-012.png)
   ![Go to project settings](./assets/step-002-013.png)

2. Click `Connect to Github.` This will allow you to connect with either your GitHub account, or with a GitHub organization.

   ![Connect to GitHub](./assets/step-002-014.png)

3. Finally click `Select repository.` From here select the GitHub repository we created previously.

   ![Select repository](./assets/step-002-015.png)

## Step 6 - Build the Backend

With the new Task entity created, and a relation with User's created, and connecting our project with GitHub. We're now ready to commit our changes and build the application.

On the right-side panel is the `Pending changes` where the changes to `Task` and `User`, as well as other changes, will appear.

   ![pending changes](./assets/step-002-016.png)

1. Click `Commit changes & build` to finalize the changes and to create a Pull Request on GitHub with the backend we created.

   Amplication by default creates a secure environment where all requests need to be authenticated. For this use case, we will want to ease some of those protections. Thanks to Amplication's extensibility, we can build on top of everything that was generated for us.

2. Visit GitHub and navigate to the repository that's linked to this project. You'll see that a new pull request has been opened!

   ![Go to view code](./assets/step-002-017.png)

3. Review the pull request and the code that was generated for yourself, then merge the pull request.

4. Finally, return to your code editor and pull down the changes made on GitHub.

## Step 7 - Run the Backend

1. The `admin-ui` and `server` folders generated by Amplication are two new node projects that need to be set up. One thing both will need is their dependencies. In the `package.json` update the `postinstall` script:

   ```json
   "postinstall": "npm i --prefix web && npm i --prefix apps/first-service-admin && npm i --prefix apps/first-service"
   ```

:::caution
Make sure that you replace `first-service` with the name of the service that you created in [Step 1](#step-1---create-a-new-app) in the above `postinstall` script.
:::

2. Open a new terminal and run this command

   ```bash
   npm run postinstall
   ```

   This command will install the dependencies of all the subfolders. Another useful aspect of this command is that if you were to push this project to GitHub and cloned the repo when you run `npm install` this script will occur after the install to install the dependencies of the subfolders automatically.

3. There will be some minor conflicts with the code `create-react-app` created for us and the code Amplication created for us. This should be easy to correct though.Install `cross-env` and `npm-run-all` as a dev dependency as follows:

   ```bash
   npm install -D cross-env npm-run-all
   ```

4. Update the `start` script in `package.json` and add the following script as well:

   ```json
   "start": "npm-run-all -p start:frontend start:backend",
   "start:frontend": "cross-env PORT=5000 npm --prefix web start",
   "start:admin": "npm --prefix admin-ui start",
   "start:backend": "npm --prefix server start",
   ```

   By doing this the Todo app UI will now run on port `5000` during development so it won't conflict with Amplication's default port for the server (which is `3000`).

   We've also set the `start` script to run our frontend and backend code at the same time.

6. Before starting the server there are a few additional steps required. Read `server/README.md` for directions to:

   - Create a Prisma client
   - Start a database in Docker
   - Initiate the database

7. When those steps have been completed run the following command:

   ```bash
   npm run start
   ```

> **Note:** If you encounter an error indicating that port `5000` is already in use, it means another software may be using the port, causing a conflict. This issue can be resolved by changing the port used for the frontend in `package.json`. Update the start script for the frontend to use a different port, for instance:
> ```json
> "start:frontend": "cross-env PORT=5001 npm --prefix web start",
> ```

## Step 8 - Wrap Up

The frontend of the Todo app will be running at [http://localhost:5000/](http://localhost:5000/), and the backend will be running at [http://localhost:3000/](http://localhost:3000/).

Visiting [http://localhost:3000/](http://localhost:3000/) will greet you with a `404` error. Instead, visit [http://localhost:3000/api/](http://localhost:3000/api/) to see all the endpoints of the backend and to see what our REST endpoints will look like.

With our backend created and running locally, we're almost ready to link it to the frontend. First, we'll need to make some additions to the code.

To view the changes for this step, [visit here](https://github.com/amplication/react-todos/compare/step-001...step-002).
