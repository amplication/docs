---
id: change-base-branch-for-pull-requests
title: How to change the base branch for pull requests
sidebar_label: Change the base branch for pull requests
slug: /how-to/change-base-branch-for-pull-requests
---

# How to change the base branch for pull requests 

By default, Amplication will create pull requests from the `amplication` branch into your repository's base branch.
This is usually `main` or `master` for many repositories. 

It's possible to change the base branch that Amplication uses for pull requests.
This allows you to merge changes into a different branch.

For example, you may want pull requests to merge into a development branch first before your main branch.

:::info
This feature is only available for **Enterprise Plan** users.
See the more [differences](/sync-with-git-differences-between-plans) between the Free, Pro, and Enterprise plan.
:::

## Change the base branch for _all_ services in your project

1. Go to your _project's_ Git Settings page.
2. You'll see a new **Base Branch** text field.  
3. Enter the name of the branch you want Amplication to merge changes into.
4. Click **Save Changes**.

## Change the base branch for a _specific_ service in your project

1. Visit your _service's_ Git Settings page.  
2. Click on the `Override default settings` toggle.
3. [Re-select](#select-your-repository) your GitHub repository.
4. You'll see a new **Base Branch** text field.
5. Enter the name of the branch you want Amplication to merge changes into.
6. Click **Save Changes**.

Amplication will now send pull requests into the new base branch you specified.
