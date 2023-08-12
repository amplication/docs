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
This feature requires a Pro or Enterprise plan.
Review plan differences on the [Git Sync Plan Differences](sync-with-git-differences-between-plans) page.
:::

## Change the base branch for _all_ services in your project

1. Go to your _project's_ Git Settings page.
2. You'll see a new **Base Branch** text field.  
3. Enter the name of the branch you want Amplication to merge changes into.
4. Your new base branch is saved when you click out of the text field.

## Change the base branch for a _specific_ service in your project

1. Visit your _service's_ Git Settings page.  
2. Click on the `Override default settings` toggle.
3. [Re-select](#select-your-repository) your GitHub repository.
4. You'll see a new **Base Branch** text field.
5. Enter the name of the branch you want Amplication to merge changes into.
6. Your new base branch is saved when you click out of the text field.

Amplication will now send pull requests into the new base branch you specified.
