---
title: One Git Branch Per Service
sidebar_label: One Git Branch Per Service
slug: /one-git-branch-per-service
pagination_next: getting-started/smart-git-sync
---

# One Git Branch Per Service

With Amplication's Enterprise Plan, teams can now streamline their workflow in multi-service repositories with **dedicated git branches and PRs for each service**.
This feature enables faster delivery of changes, as only the team members responsible for a specific service need to review the associated PR.

## Benefits

- **Isolated Reviews**: Teams can review changes specific to their services without the interference from other unrelated services.
- **Faster Deployment**: With fewer reviewers needed for each PR, changes can be approved and deployed faster.
- **Cleaner History**: Each service's changes are contained within its branch, leading to a more organized and readable git history.

## How It Works

1. **Automatic Branch Creation**: Whenever a change is made to a service in Amplication, a new branch is automatically created with the naming convention `amplication-serviceName`. If the branch already exists, changes are added to it.
2. **Pull Request Creation**: A PR is created from the `amplication-serviceName` branch to the default branch of the repository. This ensures that every service's changes are isolated and can be reviewed independently.
3. **Integration with Smart Git Sync**: This feature works seamlessly with [Smart Git Sync](/sync-with-github/), ensuring that all changes made in Amplication are reflected in the associated git repository.

## Enable One Git Branch Per Service

To enable the **One Git Branch Per Service** feature, make sure you have subscribed to Amplication's Enterprise Plan.
As soon as you upgrade, simply continue working on your services, and Amplication will handle the branching and PRs for you.

For more details on how Git sync works in Amplication, refer to the [Smart Git Sync](/sync-with-github/) page.

To learn more about the various features available to you in Amplication's Enterprise plan, visit our [pricing page](https://amplication.com/pricing).
