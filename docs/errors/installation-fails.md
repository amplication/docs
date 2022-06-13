---
id: installation-fails
title: Installation fails
tags:
 - node.js
 - npm
 - Typescript
 - Setup
sidebar_label: Installation fails
slug: /errors/installation-fails
---

## Overview
Attempting to install npm with the following command fails:
`npm run setup:dev`

## Symptoms 
Attempting to run `npm run setup:dev` is not successful. An error message may, or may not, be displayed.

## Cause

The most common causes are:

- Using unsupported versions of Node.js and or npm

- Typescript is not installed globally

- Installation is stopped before completion of the process.

    >npm run setup:dev runs multiple processes so it will often takes longer than expected. This may cause the user to assume that the process has stopped responding.

## Resolution

We recommend doing the following:

- Check that supported versions of node.js and npm are installed and that TypeScript is installed globally.

- If you stopped the process in the middle, delete node modules and re-install npm as follows:

 ```bash
 npm run clean
 npm install
 npm run setup:dev;
 ```

:::note
Stopping the installation process can result in changes to the package.json. We recommend checking that Lerna did not change the file, and if it did, to discard the changes.
:::

- If the process failed after stage 5, check that Docker is running.

- Ask for help on our [Discord Server](https://discordapp.com/channels/757179260417867879/781089015548870695)


## Related Issue

[Installation is slow](./Installation-is-slow.md)

## Additional Information

See [ReadMe](https://github.com/amplication/amplication/blob/master/README.md#initializing-all-the-packages)

## Related Discord Thread

Discord Thread: [npm run setup:dev takes a long time to complete](https://discordapp.com/channels/757179260417867879/968914282978893874)