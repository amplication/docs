---
id: connect-server-to-github
title: Connect Amplication server to GitHub
sidebar_label: Connect Amplication server to GitHub
slug: /connect-server-to-github
---

# Connect Amplication server to GitHub

Amplication already provides built-in integration with GitHub to push the generated application to a GitHub repository.

When running a local Amplication server you first need to configure the server to integrate with a new GitHub app, following the steps below.

:::info
When using the hosted service on https://app.amplication.com, the integration is pre-configured and you just need to follow [this guide](/docs/sync-with-github) to sync your application with GitHub.
:::

### Create a new GitHub App

1. Go to https://github.com/settings/developers.
2. Click on **OAuth Apps**.
3. Click on **Register a new application**.
4. Give the application any name.
5. Set the **Authorization callback URL** URL to **http://localhost:3001**

:::info
In case you are hosting the Amplication server on any other address, use the specific address instead of http://localhost:3001
:::

6. Copy and save the client secret and client ID of your new GitHub application.

### Configure Amplication server to work with the new GitHub app

1. Go the **../packages/amplication-server/**

2. Add a **.env.local** file in the root of the server directory

```
../packages/amplication-server/.env.local
```

3. Add the following content to the file

```
GITHUB_APP_CLIENT_SECRET = [use-secret-manager]
GITHUB_APP_CLIENT_ID = [github-app-client-id]
GITHUB_APP_APP_ID = [github-app-app-id]
GITHUB_APP_PRIVATE_KEY = [github-app-private-key]
GITHUB_APP_INSTALLATION_URL = [github-app-installation-url]
```

4. Replace **[client_secret_here]** with the client secret of the new GitHub application.
5. Replace **[client_id_here]** with the client ID of the new GitHub application.

6. Restart Amplication server.
