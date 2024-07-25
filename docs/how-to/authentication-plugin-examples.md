---
title: Authentication Plugin Guide
sidebar_label: Authentication Plugin Guide
slug: /plugins/guides/authentication
pagination_next: getting-started/authentication
---

# How To Update Your Authentication and Authorization Setup

Authentication and authorization are important parts of your Amplication service. Amplication provides flexible options for implementing these security measures.

This guide will walk you through the process of updating your authentication and authorization setup in your Amplication-generated service.

## Creating a Service Without Authentication

If you initially created your service without authentication, you can still add it later. Here are the key steps:

1. Go to your service's Plugins page.
2. Choose and add an Auth Provider plugin (e.g., JWT, Auth0, etc.) that suits your needs.
3. Configure the Authentication Entity in your service settings.

For detailed instructions on this process, refer to the [Authentication Entity documentation](https://docs.amplication.com/user-entity).

## Node.js vs .NET Authentication Options

It's important to note that authentication options differ between Node.js and .NET services in Amplication:

- For Node.js services, you can choose from the various authentication plugins mentioned above.
- For .NET services, ASP.NET Core Identity is currently the primary authentication option. However, more authentication options for .NET will be added in the future.

## Available Authentication Plugins

Amplication offers several authentication plugins to choose from. Each plugin has its own configuration options and setup process. 

### Node.js

1. Auth0 Auth Provider
2. Basic Auth Provider
4. JWT Auth Provider
5. KeyCloak Auth Provider
6. SAML Auth Provider
7. Supertokens Auth Provider

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

As of now, .NET services only support **ASP.NET Core Identity** but we will add more authentication providers soon.

#### ASP.NET Core Identity

If you're using a .NET service, refer to the [.NET Auth Core Identity plugin documentation](https://github.com/amplication/plugins/tree/master/plugins/dotnet-auth-core-identity) for setup and usage instructions.

## Best Practices for Authentication and Authorization

1. Choose the appropriate authentication method based on your project requirements.
2. Always use HTTPS to encrypt data in transit.
3. Implement proper error handling and logging for authentication failures.
4. Regularly update and rotate authentication secrets and keys.
5. Follow the principle of least privilege when assigning roles and permissions.
