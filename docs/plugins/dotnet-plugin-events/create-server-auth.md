---
id: create-server-auth
title: Create Server Auth | .NET Plugin Event
description: Sets up authentication for the .NET server.
sidebar_label: Create Server Auth
slug: /plugins/dotnet-plugin-events/create-server-auth
---

# Create Server Auth


Sets up authentication for the .NET server.

### Event Name

`CreateServerAuth`

### Event Params

```ts
export interface CreateServerAuthParams extends EventParams {}
```

This event does not use any additional parameters.

### Example

```ts
afterCreateServerAuth(
  context: dotnetTypes.DsgContext,
  eventParams: dotnet.CreateServerAuthParams,
  files: FileMap<Class>
): Promise<FileMap<Class>> {
  const authFile = files.get("Auth/AuthService.cs");
  if (authFile) {
    authFile.code.addMethod(
      CsharpSupport.method({
        name: "ValidateToken",
        access: "public",
        returnType: CsharpSupport.Types.boolean(),
        parameters: [
          CsharpSupport.parameter({
            name: "token",
            type: CsharpSupport.Types.string(),
          }),
        ],
        body: "// Add token validation logic here\nreturn true;",
      })
    );
  }
  return files;
}
```