---
id: could-not-authorize-user
title: Could not authorize user
sidebar_label: Could not authorize user
slug: /errors/could-not-authorize-user
---

# Could not authorize user

## Message

CLI Error: Could not authorize user

## What went wrong?

Amplication CLI could not authenticate with Amplication Server. 

This error may happen if you are working with the wrong Amplication server. 


## What to do?

Run the command ```amp config``` to see the URL of the Amplication server used by the CLI.

The results should look like the below

```
AMP_CURRENT_APP=undefined
AMP_CURRENT_ENTITY=undefined
AMP_CURRENT_FIELD=undefined
AMP_SERVER_URL=http://localhost:3000/
AMP_OUTPUT_FORMAT=undefined
```
Use this command to set the correct URL for the Amplication server

```$ amp config:set AMP_SERVER_URL https://server.amplication.com```
