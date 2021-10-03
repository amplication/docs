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

Please run the command `amp config`. You should get below output stating AMP_SERVER_URL=http://localhost:3000/

AMP_CURRENT_APP=undefined
AMP_CURRENT_ENTITY=undefined
AMP_CURRENT_FIELD=undefined
AMP_SERVER_URL=http://localhost:3000/
AMP_OUTPUT_FORMAT=undefined

This means that AMP_SERVER_URL is set to http://localhost:3000/ We need to set the URL to https://app.amplication.com.

Run the below command to resolve this issue.

```$ amp config:set AMP_SERVER_URL https://app.amplication.com```

After running the above command the issue should be resolved. Post which you may run the command `amp auth TOKEN` with the token generated from the Amplication server UI.



