---
id: prisma-denied-access-on-postgres
title: Prisma is denied access to the PostgreSQL db
tags:
 - Prisma
 - PostgreSQL 
 - db

sidebar_label: Prisma is denied access to the PostgreSQL db
slug: /errors/prisma-denied-access-on-postgres
---

## Overview
`npm run setup:dev` failed on step 6 with the following message:

![](./assets/prism-postgresql-access.png)


## Symptoms 
Access to the db was denied while trying to start the db.
Docker is running.

## Cause

This error and similar errors (related to accessing db) is usually caused by another PostgreSQL process that runs on the same port (5432).

## Resolution

Stop the other process that runs on port 5432 or change the port on the Amplication generated app.

## Related Issue

N/A

## Additional Information

N/A

