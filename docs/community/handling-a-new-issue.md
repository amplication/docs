---
id: handling-a-new-issue
title: Handling a New Issue
sidebar_label: Handling a New Issue
slug: /community/handling-a-new-issue
---

# Handling a New Issue 

**This article describes how the Amplication team responds to a new issue in GitHub.**

Members of the Amplication community can contribute to the development of Amplication by opening an issue in the [Amplication repository on GitHub](https://github.com/amplication). The issue can be a feature request, a bug report,  a documentation update, or a dependency issue. 

The process described in this document begins after a new issue has been created . The issue will have been added to the **Backlog** project automatically and Maintainers will have received a notification from **Discord** that a new issue has been opened. 

It is expected that the Contributor will have entered a detailed description of the issue, explaining what problems need to be solved, including any suggestions regarding which steps are required to resolve them. 

## Processing a New Issue

**A new issue processed in GitHub as follows:** 

1. Maintainers change **Backlog** status from **New** to **Baking** and add the appropriate labels. The Issue is validated and researched to gain a deep understanding of the issue. Contributors and Maintainers can add comments and participate in discussions in the GitHub Issue. 
    
:::tip
**For Internal use only:** If a subject is not relevant for public discussion, the Maintainers can open the issue for an internal discussion in a Discord thread.  If a thread is opened on Discord, it should be named according to the following format:
    **issue-#[]-discussion** (for example, **issue-#2176-discussion**)
:::
   
2.  When the Maintainers have an adequate level of understanding and the issue is ready to be developed, they change **Backlog** status from **Baking** to **Candidate** and apply the appropriate Labels.
3. The Maintainers update the **Status** and **Label** as the project progresses, as described in the [Set Status](#set-status) and [Apply Labels](#apply-labels) sections below. 
    

> The **Status Label** must be the same as the project **Status.** Both are set manually.

   

## Set Status

The status indicates to what stage the issue has progressed in the workflow. 

| Status  | Description   |  Owner |
|---|---|---|
| New  | The issue has been created in GitHub	 | Maintainers and Contributors   |
|  Baking | Are still researching the issue. Understanding the problem and developing an idea of how the problem can be solved. | Maintainers and Contributors. Typically, a discussion will take place between Contributors and Maintainers in the GitHub Issue where the details will be examined. |
| Candidate | Once enough information has been gathered to fully understand the issue, the steps that must be taken to resolve it, and its priority. | Maintainers. Typically, a discussion will take place in the GitHub Issue |
| Accepted | A decision has been made that the Candidate is going to be resolved. | Product team |
| Scheduled | The issue is added to the roadmap. | Product team  |
|  Closed | The issue has been resolved. | Product team 

## **Apply Labels**

Applying labels to the issue enables us to categorize and monitor the issue. Labels are metadata that enable us to understand with greater accuracy the nature of the issue. The labels are used, for example, when filtering the list of issues and can be useful in categorizing the contents of the Release Notes.

| Label | Mandatory? | Options |
|---|---|---|
| Type | Mandatory | Dependency, Bug, Feature request, Documentation |
| Status | Mandatory | Baking, Candidate, Accepted, Scheduled, Assigned, Wontfix, Duplicate |
|  Scope |  Mandatory|  The Scope label follows the following format:  **@amplication/[package name]** and indicates which part of Amplication is involved. **Examples:** @amplication/server,@amplication/client, @amplication/cli, @amplication/design-system | 
| Call to the community | Optional | help wanted, good first issue |

### **Help Wanted**

When the issue has the status **Candidate** or **Accepted**, it is possible to add a label **Help wanted.** This indicates that Amplication is not planning to work on the issue at this stage, but members of the community are invited to resolve it.

### Good First Issue

This indicates that the issue is suitable for an inexperienced contributor to resolve. 

### **Won’t Fix**

If it is decided by the Amplication team that the issue will not be fixed, either by Amplication developers or the community, then it is given the status **Wontfix**. In this case, an explanation must be entered to explain the decision.

### **Duplicated Issues**

Before closing a duplicated issue, first set the status **duplicate** and write an explanation including the number of the duplicated item.

## What’s Next?

When the steps described in this article have been completed the issue is ready for the development phase.
