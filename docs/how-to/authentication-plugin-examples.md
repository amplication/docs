---
title: Authentication Plugin Examples
sidebar_label: Authentication Plugin Examples
slug: /authentication-plugin-examples
pagination_next: getting-started/authentication
---

# Authentication Plugin Examples

Amplication provides you with various plugins for [Authentication](/authentication).

This page provides you with in-depth examples on how to use and interact with the available authentication plugins.

## JWT Authentication

When generating an app with JWT authentication, the process includes the following two steps:

1. Send a login request to the server with username and password to get back from the server the JWT token.
2. Add an authentication header with the JWT token to every consecutive request.

Following are examples of how to log in with REST API and GraphQL API.

### Rest API

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

### GraphQL API

```graphql
mutation {
  login(credentials: { username: "admin", password: "admin" }) {
    accessToken
  }
}
```

### Header with JWT Included (example)

<!-- spell-checker: disable -->

```text title="JWT Authorization Header Example"
 Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoieW91IGFyZSBzb29vb28gY29vbCB0aGF0IHlvdSBjaGVjayB0aGF0ISIsIm5hbWUiOiJPZmVrIGdhYmF5IDspIiwiaWF0IjoxNTE2MjM5MDIyfQ.vaYJaP9SUlOU0u4NfFCRm5tmBVDKeCwvN6ByCkqJt8U
```

<!-- spell-checker: enable -->

## Basic Authentication

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

Read here to find out more: [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication).
