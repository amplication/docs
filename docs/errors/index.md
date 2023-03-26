---
title: Troubleshooting
---

# Troubleshooting

The troubleshooting section of the docs is designed to help you debug and resolve some common issues you may encounter while using Amplication. This overview covers specific errors and their resolutions.

## Could not authorize user

Amplication CLI could not authenticate with the Amplication Server. This error may occur if you are working with the wrong Amplication server. [Learn more](/errors/could-not-authorize-user).

## Merge conflicts with a different app

This error occurs when the code in the linked GitHub repo was generated from a different app, potentially causing conflicts when merged with code generated from the current app. [Learn more](/errors/github-different-app-id).

## Installation fails

Installation issues can arise from unsupported versions of Node.js, npm, TypeScript not being installed globally, or a prematurely stopped installation. [Learn more](/errors/installation-fails).

## Installation is slow

A slow installation process may cause users to assume the process is stuck and abort it. If you have stopped the process midway, delete the node modules, reinstall npm, and run the setup again. [Learn more](/errors/installation-slow).

## Invalid code generation version ID

This error occurs when an invalid value is found for the dataServiceGeneratorVersion parameter in the ampconfig.json file. [Learn more](/errors/invalid-code-generation-version).

## Possible merge conflicts with custom code

In case of conflicts in code generation that cannot be merged automatically, you can commit the changes and manually resolve the conflicts. [Learn more](/errors/merge-conflict).

## Missing code generation version ID

This error occurs when the ampconfig.json file is missing or the dataServiceGeneratorVersion parameter is not present. [Learn more](/errors/missing-code-generation-version).

## Prisma is denied access to the PostgreSQL db

Access to the database may be denied due to another PostgreSQL process running on the same port. [Learn more](/errors/prisma-denied-access-on-postgres).

## We're here to help

If you still need assistance, we're here for you. Feel free to ask for help on our [Discord Server](https://amplication.com/discord).
