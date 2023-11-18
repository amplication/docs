---
title: Use A Custom Git Base Branch
sidebar_label: Custom Git Base Branch
slug: /enterprise-git-custom-base-branch
---

# Use A Custom Git Base Branch

Enterprise plan users of Amplication can enhance their workflow by using our Git Base Branch feature. This lets you direct pull requests to a specific branch of your choice to accommodate various development workflows. For example, feature branching or environment-specific branches.

## Understanding the Custom Git Base Branch Feature

The base branch is where all the changes from other branches are merged into. By default, Amplication targets the `main` or `master` branch for pull requests. However, with this feature, users can redirect pull requests to any branch, like a development or staging branch, before they reach the main branch.

## Benefits of Using A Custom Git Base Branch

- **Workflow Flexibility**: Align pull requests with your existing Git workflow, whether it's GitFlow, GitHub Flow, or any custom process you've adopted.
- **Environment Management**: Facilitate environment-specific branches for development, testing, staging, or production, managing your deployment pipeline more effectively.
- **Team Collaboration**: Coordinate team efforts by segmenting features or releases into dedicated branches, streamlining review and integration processes.

## How to Configure Your Custom Base Branch

Here’s how you can set up a custom Git base branch for your projects and services:

### For Entire Projects

1. Navigate to your **project's Git Settings** page.
2. Locate the **Base Branch** text field.
3. Input the desired branch name you want Amplication to use for pull requests.
4. The new base branch is saved automatically when you click out of the text field.

### For Individual Services

1. Go to your **service's Git Settings** page.
2. Activate the `Override default settings` toggle.
3. Re-select your connected Git repository if required.
4. Find the **Base Branch** text field.
5. Type in the branch name you wish Amplication pull requests to target.
6. The new base branch is saved once you click out of the text field.

For comprehensive guidance on changing your base branch for pull requests and more details on Git provider integration, please refer to the [How To Change Base Branch For Pull Requests](/how-to/change-base-branch-for-pull-requests) documentation.
