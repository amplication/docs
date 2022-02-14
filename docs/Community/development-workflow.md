---
id: development-workflow
title: Development Workflow
sidebar_label: Development Workflow
slug: /community/development-workflow
---

# Development Workflow

This article describes the Amplication development workflow.

All requests and plans for development are created as Issues in the [Amplication GitHub repository](https://github.com/orgs/amplication/projects/1)


## About Sprints 

A sprint is a time period, typically one or two weeks, during which the team works to complete a predetermined set of tasks. 

The sprint board has the following options to track the progress of the issue in the following order: 

**Backlog → Next Sprint → Current Sprint → Closed Sprints**

| Option | Description  |
|---|---|
| Backlog  | Tasks that are waiting to be assigned to the next sprint  |
| Next Sprint  |  The work to be done in the next sprint |
|  Current Sprint | The work to be done in the current sprint  |
| Closed Sprints  |  Archived sprints. yyyy-mm-dd represents the end date of the sprint. |


## Assinging an Issue to a Sprint and a Developer 

Issues can be assigned to a sprint and a developer by a product manager or a development manager.

**To assign a task to a sprint and team member:**

1. Move the issue from **Backlog** or **Next Sprint** to **Current Sprint** **Table/Board.**
2. Set the status to **Todo**. 
3. Assign the issue to a team member.

The issue is now ready for development.


# Developing the Issue

This section describes the tasks performed by the developer. 

**After being assigned an issue, the developer performs the following steps:** 

1. Sets the status to **In Progress.**
2. Opens a branch for the issue.
The branch type is determined by the labels and the issue type. 
The following branch types are available: **Fix, New Feature, Documentation, Release, Hotfix**
3. Works on resolving the Issue. 
4. Labels the PR with the **release version** label.
5. Requests a review by changing the task status to **Review**. 
6. Following review, if changes are required, change the task status to **In progress** and repeat the above steps. 
7. When the issue is **Done**, open a pull request (PR).

:::tip
- To avoid a stale PR, open only when the work is done.
- Ensure that the PR target is for the correct release branch (the same as for the issue milestone).
- Pull requests must always be associated with an issue, except when the update comes from a member of the community, in which case the branch can be created without an issue. 
:::

# What’s Next?
A member of the Amplication team approves the update and merges the pull request.
