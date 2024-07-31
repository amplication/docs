---
id: create-server-secrets-manager
title: Create Server Secrets Manager | .NET Plugin Event
description: Creates the configuration for the secrets manager in the server.
sidebar_label: Create Server Secrets Manager
slug: /plugins/dotnet-plugin-events/create-server-secrets-manager
---

# Create Server Secrets Manager


Creates the configuration for the secrets manager in the server.

### Event Name

`CreateServerSecretsManager`

### Event Params

```ts
export interface CreateServerSecretsManagerParams extends EventParams {
  secretsNameKey: SecretsNameKey[];
}
```

Example:

```ts
async afterCreateServerSecretsManager(
  context: DsgContext,
  eventParams: CreateServerSecretsManagerParams,
  modules: ModuleMap
) {
  const { secretsNameKey } = eventParams;
  const secretsManager = `
    public static class SecretsManager
    {
        public enum SecretsNameKey
        {
            ${secretsNameKey.map(snk => `${snk.name} = "${snk.key}"`).join(',\n            ')}
        }

        public static string GetSecret(SecretsNameKey key)
        {
            // Implement secret retrieval logic here
            return Environment.GetEnvironmentVariable(key.ToString());
        }
    }
  `;

  modules.set({
    path: join(context.serverDirectories.srcDirectory, "SecretsManager.cs"),
    code: secretsManager
  });

  return modules;
}
```