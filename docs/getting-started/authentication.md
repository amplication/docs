---
id: authentication
title: Authentication
sidebar_label: Authentication
slug: /authentication
---

# Authentication

While we are working to add more authentication providers, currently your server can generate or jwt or http security methods, we recommend to stick to jwt as the more safe and secure one.

In this article we will talk about working with both http and jwt

## Jwt vs Http

As you what to send or recide data from your server you must provide a "key" that show your are allow to get and send this data, the key is called "Token".

The common method to provide this token to the server is by adding the Authentication Header to the http requests.

[(more about headers)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

### The Bearer (jwt) header example

This schema take data that your server provide and signing it with a key that you provide it via the SecretsManeger, in that way no sensitive data is transfer over the network and its safe from mutilation.

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoieW91IGFyZSBzb29vb28gY29vbCB0aGF0IHlvdSBjaGVjayB0aGF0ISIsIm5hbWUiOiJPZmVrIGdhYmF5IDspIiwiaWF0IjoxNTE2MjM5MDIyfQ.vaYJaP9SUlOU0u4NfFCRm5tmBVDKeCwvN6ByCkqJt8U
```

[(more about jwt)](https://jwt.io/introduction)

### The Basic (base64) header example

This schema take the username and password of the user and pass it over the network as base64 text (not safe)

By default, your app comes with one user with the username "admin" and password "admin". You can use the following header to authenticate with the default user.

```
Authorization: Basic YWRtaW46YWRtaW4=
```

[(more about basic authentication scheme)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#basic_authentication_scheme)

:::tip
You can use a tool to create the header. There are several generators [available online](https://www.google.com/search?q=http+basic+authentication+header+generator).
:::

[(more about authentication)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization)
