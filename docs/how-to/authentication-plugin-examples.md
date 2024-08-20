---
title: Authentication Plugin Guide
sidebar_label: Authentication Plugin Guide
slug: /plugins/guides/authentication
pagination_next: getting-started/authentication
---

# Handle Authentication and Authorization in your Service

Authentication and authorization are crucial components of your Amplication service.

By following this guide and exploring the examples, you'll be well-equipped to implement authentication and authorization in your Amplication-generated service using the authentication plugin that best suits your needs.

## Creating The Authentication Entity

If you initially created your service _without_ authentication, you must first create and define the Authentication Entity. The Authentication Entity **is required** to enable authentication on your service.

1. Go to your service's Entities page.
2. Create an entity, usually named "User", to serve as your Authentication Entity.
3. In your service's settings, in the "Authentication Entity" option, choose the newly created entity.

:::tip
For detailed instructions, refer to the [Authentication Entity documentation](https://docs.amplication.com/user-entity).
:::

## Adding Authentication to Your Service

Once you have an Authentication Entity set up, follow these steps to add authentication:

1. Navigate to your service's Plugins page.
2. Go to the "Authentication" category in the left sidebar.
3. For Node.js services, ensure you install the "NestJS Auth Module" plugin first. For .NET services, it's not required.
4. Choose and add an Auth Provider plugin that suits your needs (e.g. Auth0, ASP.NET Core Identity, Supertokens, etc.).

After adding the required Authentication plugins:

1. Configure your authentication settings in the plugin options page (See the [Examples](#authentication-plugin-configuration-settings) section below).
2. Add authenticated users to your system.
3. Set up [roles and permissions](/configure-roles-and-permissions/) for authorization.

## Available Authentication Plugins

Amplication offers several authentication plugins to choose from. Each plugin has its own configuration options and setup process. 

### Node.js

1. [JWT Auth Provider](https://jwt.io/)
2. [Auth0 Auth Provider](https://auth0.com/)
3. [Supertokens Auth Provider](https://supertokens.com/)
4. [SAML Auth Provider](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language)
5. Basic Auth Provider
6. [KeyCloak Auth Provider](https://www.keycloak.org/)

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

#### Basic Auth Provider

- Enables a straightforward authentication scheme built into the HTTP protocol.
- Requires sending user's credentials in the form of a username and password, encoded in base64, included in the Authorization header of the request.

#### KeyCloak Auth Provider

- Integrates KeyCloak authentication and authorization into your service.
- Provides single sign-on (SSO) capabilities and support for various identity protocols.
- Requires setup of a KeyCloak server and configuration of a KeyCloak realm.
- For detailed setup instructions and configuration options, refer to the [KeyCloak Auth Provider GitHub README](https://github.com/amplication/plugins/tree/master/plugins/auth-keycloak).

### .NET

For .NET services, ASP.NET Core Identity is the primary authentication option.

#### ASP.NET Core Identity

If you're using a .NET service, refer to the [.NET Auth Core Identity plugin documentation](https://github.com/amplication/plugins/tree/master/plugins/dotnet-auth-core-identity) for setup and usage instructions.

## Best Practices for Authentication and Authorization

1. Choose the appropriate authentication method based on your project requirements.
2. Always use HTTPS to encrypt data in transit.
3. Implement proper error handling and logging for authentication failures.
4. Regularly update and rotate authentication secrets and keys.
5. Follow the principle of least privilege when assigning roles and permissions.

## Disable Authentication On Your Service

If you no longer need authentication on a specific service, you can disable it.

1. Visit your service's Plugins page and toggle the Authentication-related plugins into the off state.
2. Delete the User entity from your list of entities.
3. Re-build your project and commit your changes to your preferred git provider.

## Authentication Plugin Configuration Settings

Let's look at detailed configuration settings for some of the available authentication plugins:

### JWT Auth Provider (Node.js)

The JWT Auth Provider adds JSON Web Token (JWT) authentication and authorization to your service.

#### Configuration

```json
{
  "settings": {
    "tokenExpiresIn": 3600,
    "refreshTokenExpiresIn": 604800,
    "grantType": "PASSWORD",
    "jwtSecretKey": "Change_ME!!!"
  }
}
```

- `tokenExpiresIn`: Expiration time of the access token in seconds (default: 3600)
- `refreshTokenExpiresIn`: Expiration time of the refresh token in seconds (default: 604800)
- `grantType`: The grant type for token generation (default: "PASSWORD")
- `jwtSecretKey`: Secret key for JWT signing (default: "Change_ME!!!")

For detailed configuration, visit the [JWT Auth Provider GitHub README](https://github.com/amplication/plugins/tree/master/plugins/auth-jwt).

### Auth0 Auth Provider (Node.js)

The Auth0 Auth Provider integrates Auth0 authentication and authorization into your service.

#### Configuration

```json
{
  "settings": {
    "useManagementApi": true,
    "managementParams": {
      "identifier": "https://{TENANT_NAME}.{REGION}.auth0.com/api/v2/",
      "accessToken": "{ACCESS_TOKEN}",
      "actionName": "Add user details to access token",
      "clientName": "Custom SPA",
      "apiName": "Custom API",
      "audience": "http://example.com"
    }
  }
}
```

- `useManagementApi`: Set to `true` to use the Auth0 Management API
- `managementParams`: Configuration for the Management API
  - `identifier`: The identifier of the Auth0 Management API
  - `accessToken`: The access token of the Auth0 Management API
  - `actionName`: The name of the action to create in Auth0
  - `clientName`: The name of the client to create in Auth0
  - `apiName`: The name of the API to create in Auth0
  - `audience`: The audience/identifier of the API

For setup instructions and configuration options, check the [Auth0 Auth Provider GitHub README](https://github.com/amplication/plugins/tree/master/plugins/auth-auth0).

### Supertokens Auth Provider (Node.js)

The Supertokens Auth Provider adds Supertokens authentication to your service, supporting various authentication recipes.

#### Configuration

```json
{
  "settings": {
    "apiDomain": "http://localhost:3000",
    "appName": "Amplication App",
    "websiteDomain": "http://localhost:3001",
    "websiteBasePath": "/auth",
    "apiBasePath": "/api/auth",
    "connectionUri": "https://try.supertokens.com",
    "apiGatewayPath": "",
    "apiKey": "",
    "supertokensIdFieldName": "supertokensId",
    "recipe": {
      "name": "email-password"
    }
  }
}
```

- `apiDomain`: The API domain for Supertokens
- `appName`: The name of your application
- `websiteDomain`: The website domain for Supertokens
- `websiteBasePath`: The base path for authentication on the website
- `apiBasePath`: The base path for authentication API endpoints
- `connectionUri`: The URI for connecting to the Supertokens core
- `supertokensIdFieldName`: The field name to store the Supertokens user ID
- `recipe`: The authentication recipe to use (e.g., "emailpassword", "passwordless", "thirdparty")

For detailed configuration and usage, refer to the [Supertokens Auth Provider GitHub README](https://github.com/amplication/plugins/tree/master/plugins/auth-supertokens).

### Keycloak Auth Provider (Node.js)

The Keycloak Auth Provider integrates Keycloak authentication and authorization into your service.

#### Configuration

```json
{
  "settings": {
    "port": 8080,
    "realmID": "amplication-sample-realm",
    "clientID": "amplication-server",
    "realmName": "Amplication Sample Realm",
    "clientName": "Amplication Server",
    "clientDescription": "Sample client for Amplication Server",
    "adminUsername": "admin",
    "adminPassword": "admin",
    "recipe": {
      "emailFieldName": "email",
      "verifyEmail": false,
      "registrationAllowed": true,
      "payLoadMapping": {
        "username": "name",
        "name": "name"
      }
    }
  }
}
```

- `port`: The port on which to run the Keycloak server
- `realmID`: The ID of the Keycloak realm to use
- `clientID`: The ID of the Keycloak client to use
- `realmName`: The name of the Keycloak realm
- `clientName`: The name of the Keycloak client
- `adminUsername`: The username for the Keycloak admin user
- `adminPassword`: The password for the Keycloak admin user
- `recipe`: Configuration for the authentication recipe

For detailed setup instructions and configuration options, refer to the [Keycloak Auth Provider GitHub README](https://github.com/amplication/plugins/tree/master/plugins/auth-keycloak).


## Real Examples

This section provides you with in-depth examples on how to use and interact with some of the available authentication plugins.

### JWT Authentication (Node.js)

When generating an app with JWT authentication, the process includes the following two steps:

1. Send a login request to the server with username and password to get back from the server the JWT token.
2. Add an authentication header with the JWT token to every consecutive request.

Following are examples of how to log in with REST API and GraphQL API.

#### Rest API

```bash title="Rest API Curl Request Example"
curl -X 'POST' \
  'https://[server-url]/api/login' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "admin",
  "password": "admin"
}'
```

![Swagger playground for login endpoint.](./../getting-started/assets/authentication/auth-rest.png)

#### GraphQL API

```graphql
mutation {
  login(credentials: { username: "admin", password: "admin" }) {
    accessToken
  }
}
```

#### Header with JWT Included (example)

<!-- spell-checker: disable -->

```text title="JWT Authorization Header Example"
 Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoieW91IGFyZSBzb29vb28gY29vbCB0aGF0IHlvdSBjaGVjayB0aGF0ISIsIm5hbWUiOiJPZmVrIGdhYmF5IDspIiwiaWF0IjoxNTE2MjM5MDIyfQ.vaYJaP9SUlOU0u4NfFCRm5tmBVDKeCwvN6ByCkqJt8U
```

<!-- spell-checker: enable -->

### Basic Authentication (Node.js)

When using Basic HTTP authentication, when sending a request to the API you must provide a Basic HTTP authentication header with the format:

Authorization: 'type' 'credentials'

where type is Basic and credentials is the Base64 encoding of a string "username:password".

```text title="Basic Authentication Example"
Authorization: Basic YWRtaW46YWRtaW4=
```

By default, your app comes with one user with the username `admin` and password `admin`.

:::tip
You can use a tool to create the header. There are several generators available, such as [https://www.blitter.se/utils/basic-authentication-header-generator/](https://www.blitter.se/utils/basic-authentication-header-generator/)
:::
