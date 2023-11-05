---
id: base-directories
title: How To Configure Your Service's Git Folder Structure
sidebar_label: How To Configure Your Service's Git Folder Structure
slug: /how-to/base-directories 
---

# How To Configure Your Service's Git Folder Structure

When you first create your service using our Service Creation Wizard, you can choose whether to store your generated code in your git repository using a Monorepo or Polyrepo style.

But, you can't edit the individual folder names during creation. 

Amplication's **Base Directories** settings lets you customize both the default directory and folder name for your generated code.
This applies to both your Server and Admin UI code.

![](../how-to/assets/base-directories.png)

## How To Change Your Service's Base Directory Values

1. Go to your service's _Settings_ page.
2. Click the _Base directories_ tab.  
3. Set the base directory for your server code using the **Server base directory** text field.
4. Set the base directory for your admin UI code using the **Admin UI base directory** text field.
5. [Commit your changes](/how-to/commit-changes) to see your new folder structure in your git repository.

## Base Directory Default Values 

Your service's default base directory values (on creation) are:

### Monorepo

- Server base: `apps/[service-name]-service`
- Admin UI base: `apps/[service-name]-admin`

### Polyrepo

- Server base: `[service-name]-service`  
- Admin UI base: `[service-name]-admin`

:::tip
The only difference between a **Monorepo** and **Polyrepo** is that the Monorepo stores each service and admin UI in nested folders, while a polyrepo stores them in the root.
:::

## Example - Syncing Services in a Monorepo on GitHub

Let's say you have two services, _Customer Service_ and _Order Service_.
You want these services to sync to the `packages` directory in the same repo.

Use these **Base Directory** settings:

### _Customer Service_ 

- Server base: `./packages/customer-service`
- Admin UI base: `./packages/customer-service-admin`

### _Order Service_

- Server base: `./packages/order-service`
- Admin UI base: `./packages/order-service-admin` 

:::info
When you commit two or more services to the same repo, make sure you use different base directory paths for each one.
No action is needed when using separate repos, even with multiple services.
:::