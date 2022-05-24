---
id: installation-slow
title: Installation is slow
tags:
 - node.js
 - npm
 - Typescript
 - Setup
sidebar_label: Installation is slow
slug: /errors/installation-slow
---

# Installation is slow 

## Overview
Installation npm with the following command often takes a long time to complete
`npm run setup:dev`

## Symptoms 
When running `npm run setup:dev` the installation may take much longer than expected to complete. 
This may cause the user to assume the process is stuck, and so abort the process. 

## Cause

`npm run setup:dev` runs multiple processes so it will often takes longer than expected. This may cause the user to assume that the process has stopped responding.

## Resolution

- Wait patiently until the process is completed. 

- If you stopped the process in the middle, delete node modules and re-install npm as follows:

 ```bash
 npm run clean
 npm install
 npm run setup:dev;
 ```

:::note
Stopping the installation process can result in changes to the package.json. We recommend checking that Lerna did not change the file, and if it did, to discard the changes.
:::

- Ask for help on our [Discord Server](https://discordapp.com/channels/757179260417867879/781089015548870695)


## Related Issue

 [Installation fails](./installation-fails.md)

## Additional Information

N/A

## Related Discord Thread

Discord Thread: [npm run setup:dev takes a long time to complete](https://discordapp.com/channels/757179260417867879/968914282978893874)