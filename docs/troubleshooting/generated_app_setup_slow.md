---
id: npm-run-setup:dev-takes-longer-than-expected 
title: npm run setup:dev takes longer than expected 
tags:
  - node.js
  - npm
  - Typescript
  - Setup
sidebar_label: npm run setup:dev takes longer than expected
slug: /troubleshooting/npm-run-setup:dev-takes-longer-than-expected 
---

## Overview

`npm run setup:dev` for the generated Amplication app often takes longer than expected. As a result, the user may assume that the process is stuck, and so abort the setup. 

## Symptoms

The `npm run setup:dev` process takes a long time to complete. 

## Cause

`npm run setup:dev` runs multiple processes and so takes a while to complete. This is the expected behavior. 

## Resolution

Try the following in the given order: 

- Wait patiently for the process to complete.
- If you have stopped the process before completion, delete node modules and re-install npm:

  ```jsx
  Delete node_modules or npm run clean
  npm install
  npm run setup:dev 
  ```

## Related Troubleshooting Docs

[npm run setup:dev fails](\troubleshooting\generated-app-install-fails.md)


## Additional Information

See [ReadMe](https://github.com/amplication/amplication/blob/master/README.md#initializing-all-the-packages)

## Related Discord Threads

[Setup troubleshooting](https://discordapp.com/channels/757179260417867879/967072827087937656)






