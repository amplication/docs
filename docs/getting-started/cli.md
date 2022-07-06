---
id: cli
title: Amplication CLI
sidebar_label: Amplication CLI
slug: /cli
---

# Amplication CLI

The Amplication CLI is a command-line tool that allow you to create and manage your apps on Amplication. You can use this tool to perform many common tasks either from the command line or in scripts and other automations.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@amplication/cli.svg)](https://npmjs.org/package/@amplication/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@amplication/cli.svg)](https://npmjs.org/package/@amplication/cli)

## Installation

The CLI is built with Node.js and is installable via npm

```sh-session
$ npm install -g @amplication/cli
```

## Verifying your installation

To verify your CLI installation, use the **--version** command:

```sh-session
$ amp --version

```

You should see the current version number of the cli

```
@amplication/cli/x.x.x
```

## Getting Started

### Changing Amplication server url

By default, Amplication CLI works with the hosted version on https://server.amplication.com.  If you want to use the CLI with another Amplication server, you can use the **config:set** command

```sh-session
$ amp config:set AMP_SERVER_URL http://localhost:3000
```

### Authentication

After you install the CLI, generate a token on Amplication server UI and use the token with the **auth** command

```sh-session
$ amp auth TOKEN
```

## Commands

Visit the project repository for the full list of available commands

https://github.com/amplication/amplication/tree/master/packages/amplication-cli
