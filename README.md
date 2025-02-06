

| 📝 **Note** |
|------------|
| Amplication Documentation moved to https://github.com/amplication/amplication-docs |

# Amplication Documentation
Welcome to the [Amplication documentation](https://docs.amplication.com/) repository! This repository contains the documentation for the Amplication open-source development platform. Amplication is a low-code development platform that allows developers to quickly build scalable and maintainable applications.

The documentation provides detailed information on how to use the platform, including tutorials, guides, and reference material.
This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.


## Installation

```console
npm ci
```

## Local Development

```console
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```console
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

```console
GIT_USER=<Your GitHub username> USE_SSH=true npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

# Contributing

We welcome contributions to the Amplication documentation! If you find an issue or want to suggest an improvement, please [open a GitHub issue](https://github.com/amplication/amplication/issues/new/choose) and then submit a pull request.
