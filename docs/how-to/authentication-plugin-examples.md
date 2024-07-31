---
title: Authentication Plugin Guide
sidebar_label: Authentication Plugin Guide
slug: /plugins/guides/authentication
pagination_next: getting-started/authentication
---

# Handle Authentication and Authorization in your Service

Authentication and authorization are important parts of your Amplication service. Amplication provides flexible options for implementing these security measures.

This guide will walk you through the process of updating your authentication and authorization setup in your Amplication-generated service.

## Adding Authentication to Your Service

If you initially created your service without authentication, you can still add it later. Here are the key steps:

1. Go to your service's Plugins page.
2. Navigate to the "Authentication" category in the left sidebar.
3. Choose and add an Auth Provider plugin (e.g., JWT, Auth0, etc.) that suits your needs.
4. Install the "NestJS Auth Module" plugin if it's not already installed. It's a pre-requisite if you're adding Authentication to a Node.js service.
5. Configure the Authentication Entity in your service settings.

For detailed instructions on this process, refer to the [Authentication Entity documentation](https://docs.amplication.com/user-entity).

After adding the required plugins, you'll need to:
1. Configure your authentication settings in the plugin options.
2. Add authenticated users to your system.
3. Set up roles and permissions for authorization.

## Available Authentication Plugins

Amplication offers several authentication plugins to choose from. Each plugin has its own configuration options and setup process. 

### Node.js

1. [Auth0 Auth Provider](https://auth0.com/)
2. Basic Auth Provider
3. [JWT Auth Provider](https://jwt.io/)
4. [KeyCloak Auth Provider](https://www.keycloak.org/)
5. [SAML Auth Provider](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language)
6. [Supertokens Auth Provider](https://supertokens.com/)

#### JWT Auth Provider

- Adds JSON Web Token (JWT) authentication and authorization to your service.
- Must be installed with the "NestJS Auth Module" plugin.
- For detailed configuration, visit the [JWT Auth Provider GitHub README](https://github.com/amplication/plugins/tree/master/plugins/auth-jwt).

#### Auth0 Auth Provider

- Integrates Auth0 authentication and authorization into your service.
- Requires an Auth0 account and configuration of an Auth0 application.
- For setup instructions and configuration options, check the [Auth0 Auth Provider GitHub README](https://github.com/amplication/plugins/tree/master/plugins/auth-auth0).

#### Supertokens Auth Provider

- Adds Supertokens authentication to your service.
- Supports various authentication recipes (e.g., email-password, passwordless, third-party).
- Requires setup of the Supertokens core service.
- For detailed configuration and usage, refer to the [Supertokens Auth Provider GitHub README](https://github.com/amplication/plugins/tree/master/plugins/auth-supertokens).

#### SAML Auth Provider

- Enables SAML authentication on your service.
- Uses Passport SAML strategy and generates JWT tokens for authorization.
- For usage details, check the [SAML Auth Provider GitHub README](https://github.com/amplication/plugins/tree/master/plugins/auth-saml).

### .NET 

For .NET services, ASP.NET Core Identity is currently the primary authentication option.

#### ASP.NET Core Identity

If you're using a .NET service, refer to the [.NET Auth Core Identity plugin documentation](https://github.com/amplication/plugins/tree/master/plugins/dotnet-auth-core-identity) for setup and usage instructions.

## Best Practices for Authentication and Authorization

1. Choose the appropriate authentication method based on your project requirements.
2. Always use HTTPS to encrypt data in transit.
3. Implement proper error handling and logging for authentication failures.
4. Regularly update and rotate authentication secrets and keys.
5. Follow the principle of least privilege when assigning roles and permissions.

## Examples

Here are some examples of how to use authentication in your service:

### JWT Authentication

When using JWT authentication, the process typically includes:

1. Sending a login request to the server with username and password to get a JWT token.
2. Adding an authentication header with the JWT token to every subsequent request.

#### REST API Example

```bash
curl -X 'POST' \
  'https://[server-url]/api/login' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "admin",
  "password": "admin"
}'
```

#### GraphQL API Example

```ts
mutation {
  login(credentials: { username: "admin", password: "admin" }) {
    accessToken
  }
}
```
