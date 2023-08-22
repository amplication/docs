---
id: sync-with-git-differences-between-plans
title: Git Sync Plan Differences
sidebar_label: Git Sync Plan Differences
slug: /sync-with-git-differences-between-plans
---

The Git provider sync process is for the Amplication Pro and Enterprise editions is different to the Free edition. 

### Sync with git (Free Plan)

When synchronizing with git using the Free Plan, the following occurs: 
- GitHub is the only git provider we are able to support in this plan
- Every commit you create in Amplication Free Plan will push a new Pull Request to your GitHub repository with the updated code.
- The pull request will be created in a new branch, with the default branch of your repository (usually **master** or **main**) as a base.
- The code from Amplication will be created relative to the root of the selected repository.
- The selected repository must not be empty, so create at least one file in the root folder.

### Sync with Git provider (Pro and Enterprise Plans)

When synchronizing with git provider using the Pro or Enterprise Plan, the following occurs: 

- When you first create a build in Amplication Pro and Enterprise Plans, it will create a branch named Amplication and create inside. Pull Request inside a branch that is created named “Amplication.”
- Subsequent builds will create additional commits within the Amplication branch if there is an open pull request. If there is no open pull request, it will open a new pull request.
- After the PR has been merged, the next build will create a new Pull Request from the first commit of the default branch. Subsequent builds will add additional commits until the next merge, and so on.

### Sync with Git provider (Enterprise Plans)
- support for Bitbucket

### Advantages of Git provider Sync in the Pro and Enterprise Plans

 The Sync with Git provider in the Pro and Enterprise editions has the advantage over the process in    the Free editions, as follows:

- The commits are all in the same branch, creating a more organized and easily managed structure.
- Prevents conflicts that occurred when each build was in a separate Pull Request.
