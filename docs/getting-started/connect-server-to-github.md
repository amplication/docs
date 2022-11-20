---
id: connect-server-to-github
title: Connect Amplication server to GitHub
sidebar_label: Connect Amplication server to GitHub
slug: /getting-started/connect-server-to-github
---

# Connect Amplication server to GitHub

Amplication client and server rely on GitHub OAuth mechanism to secure user interactions.

In order to configure GitHub auth and sync integration when running client and server locally,
you can follow the steps below.

:::info
When using the hosted service on https://app.amplication.com, the integration is pre-configured and you just need to follow [this guide](/sync-with-github) to sync your application with GitHub.
:::

## GitHub OAuth for user authentication

![Auth flow](./assets/amplication-auth-flow.png)

Amplication leverage GitHub OAuth implementation that supports the standard [authorization code grant type](https://www.rfc-editor.org/rfc/rfc6749#section-4.1).

### Step 1: Create a new GitHub OAuth App

1. Login in your GitHub account and create a new GitHub OAuth application [here](https://github.com/settings/applications/new)

![](./assets/register-new-oauth-app.png)

2. Enter the fields as follows:
   - **Application name** - `[your-github-username]-amplication-local`
   - **Homepage URL** - `http://localhost:3000`. _If you are hosting the Amplication client on any other address, use the specific address._
   - **Application description** - optional
   - **Authorization callback URL** - `http://localhost:3001`. _If you are hosting the Amplication server on any other address, use the specific address._
3. Click Save.

![](./assets/app-settings.png)

4. Click `Generate new client secret` and copy the resulting secret

### Step 2: Configure Amplication server and client to work with the new GitHub app

5. Clone [/packages/amplication-server/.env](https://github.com/amplication/amplication/blob/master/packages/amplication-server/.env) into `/packages/amplication-server/.env.local`
6. Update `/packages/amplication-server/.env.local` with the following variables
   ```sh
   GITHUB_REDIRECT_URI=http://localhost:3000/github/callback
   GITHUB_CLIENT_ID="replace with the github auth application client id"
   GITHUB_CLIENT_SECRET="replace with secret created as step 4""
   ```
7. Clone [/packages/amplication-client/.env](https://github.com/amplication/amplication/blob/master/packages/amplication-client/.env) into `/packages/amplication-client/.env.local`
8. Update `/packages/amplication-client/.env.local` with the following variables
   ```sh
   NX_REACT_APP_GITHUB_AUTH_ENABLED=true
   NX_REACT_APP_GITHUB_CONTROLLER_LOGIN_URL=http://localhost:3000/github
   ```
9. Restart Amplication server and client.

## GitHub app for sync

Amplication leverage GitHub Apps to integrate with GitHub and sync your generated code to the git GitHub remotes.

### Step 1: Create a new GitHub App

1. Login in your GitHub account and create a new GitHub App [here](https://github.com/settings/apps/new)

![](./assets/register-new-github-app.png)

2. Enter the fields as follows:
   - **Application name** - `[your-github-username]-amplication-local`
   - **Homepage URL** - `http://localhost:3000`. _If you are hosting the Amplication client on any other address, use the specific address._
   - **Application description** - optional
   - **Callback URL** - `http://localhost:3001`. _If you are hosting the Amplication server on any other address, use the specific address._
   - **Webhook > Active** - "unchecked"
   - **Permissions > Repository permissions**
     - **Administration** - `Access: Read and Write`
     - **Checks** - `Access: Read and Write`
     - **Content** - `Access: Read and Write`
3. Click Save
4. Click `Generate new client secret` and copy the resulting secret
5. Click `Generate a private key`, download, open the generated certificate, add `\n` at the end of each line and join all lines to obtain a single line string

### Step 2: Configure Amplication server to work with the new GitHub app

6. Clone [/packages/amplication-server/.env](https://github.com/amplication/amplication/blob/master/packages/amplication-server/.env) into `/packages/amplication-server/.env.local`
7. Update `/packages/amplication-server/.env.local` with the following variables

   ```sh
   # GitHub App (Git sync)
   GITHUB_APP_APP_ID="replace with the github App ID"
   GITHUB_APP_CLIENT_ID="replace with the github app Client ID"
   GITHUB_APP_CLIENT_SECRET="replace with secret created as step 4"
   GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----The key copied at step 4-----END RSA PRIVATE KEY-----"

   # replace [your-github-username]-amplication-local with your chosen name
   GITHUB_APP_INSTALLATION_URL='https://github.com/apps/[your-github-username]-amplication-local/installations/new?state={state}'
   ```

8. Restart Amplication server.
