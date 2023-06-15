---
id: connect-server-to-github
title: Connect Amplication server to GitHub
sidebar_label: Connect Amplication server to GitHub
slug: /running-amplication-platform/connect-server-to-github
---

# Connect Amplication server to GitHub

Amplication already provides built-in integration with GitHub to push the generated application to a GitHub repository.

When running a local Amplication server you first need to configure the server to integrate with a new GitHub app, following the steps below.

## Step 1: Create a new GitHub App

1. Login in your GitHub account and create a new GitHub App [here](https://github.com/settings/apps/new)

![](./assets/register-new-github-app.png)

2. Enter the fields as follows:
   - **Application name** - `[your-github-username]-amplication-local`
   - **Homepage URL** - `http://localhost:3001`. _If you are hosting the Amplication client on any other address, use the specific address._
   - **Application description** - optional
   - **Callback URL** - `http://localhost:3000`. _If you are hosting the Amplication server on any other address, use the specific address._
   - Post installation > **Setup URL** - `http://localhost:3001/github-auth-app/callback`. _If you are hosting the Amplication server on any other address, use the specific address._
   - **Webhook > Active** - "unchecked"
   - **Permissions > Repository permissions**
     - **Administration** - `Access: Read and Write`
     - **Content** - `Access: Read and Write`
     - **Metadata** - `Access: Read-only`
     - **Pull requests** - `Access: Read and Write`
     - **Webhooks** - `Access: Read and Write`
3. Click `Create GitHub app`
4. Click `Generate a new client secret` and copy the resulting secret
5. Click `Generate a private key`, download, open the generated certificate, add `\n` at the end of each line except the last line and join all lines to obtain a single line string
6. Under the "Generate a private key" section, click "Generate private key" to download a PEM file containing your app's private key
7. Note the App ID shown on the "General" tab of your app's settings page
8. On your local machine, set the GITHUB_APP_APP_ID and GITHUB_APP_PRIVATE_KEY environment variables to the App ID and the contents of the PEM file, respectively
9. Once you have set up these credentials, you should be able to complete the build process locally using git pull.

## Step 2: Configure Amplication server to work with the new GitHub app

10. Clone [/packages/amplication-server/.env](https://github.com/amplication/amplication/blob/master/packages/amplication-server/.env) into `/packages/amplication-server/.env.local`
11. Update `/packages/amplication-server/.env.local` with the following variables

   ```sh
   # GitHub App (Git sync)
   GITHUB_APP_APP_ID="replace with the github App ID"
   GITHUB_APP_CLIENT_ID="replace with the github app Client ID"
   GITHUB_APP_CLIENT_SECRET="replace with secret created as step 1.4"
   GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----The key copied at step 1.5-----END RSA PRIVATE KEY-----"

   # replace [your-github-username]-amplication-local with your chosen name
   GITHUB_APP_INSTALLATION_URL='https://github.com/apps/[your-github-username]-amplication-local/installations/new?state={state}'
   ```

## Step 3: Configure Amplication git pull request service to work with the new GitHub app

12. Clone [/packages/amplication-git-pull-request-service/.env](https://github.com/amplication/amplication/blob/master/packages/amplication-git-pull-request-service/.env) into `/packages/amplication-git-pull-request-service/.env.local`
13. Update `/packages/amplication-git-pull-request-service/.env.local` with the following variables

   ```sh
   GITHUB_APP_APP_ID="replace with the github App ID"
   # replace [your-github-username]-amplication-local with your chosen name
   GITHUB_APP_INSTALLATION_URL='https://github.com/apps/[your-github-username]-amplication-local/installations/new?state={state}'
   GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----The key copied at step 1.5-----END RSA PRIVATE KEY-----"
   ```

14. Restart Amplication server.
