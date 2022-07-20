---
id: phone-home
title: Phone Home - Collecting Usage Data
sidebar_label: Phone Home - Collecting Usage Data 
slug: getting-started/phone-home
---

# Phone Home - Collecting Usage Data

Amplication’s open-source server includes Phone Home, a call-back operation where every deployed server contacts a central server to indicate to the Amplication core team that it is up and running.

This works by adding a notification event to the server load, sending a loading notification message to [Posthog](https://posthog.com/), a monitoring/analytics tool that enables the Amplication core team to see the number of deployments.

The purpose of this information gathering is to get a better understanding of how new features are impacting the use and adoption of Amplication. 

## Information Gathered

The following information is gathered for each deployment:

- Build version
- Server version
- Runtime environments (OS, node version, etc.)


:::note
No personal or private information is collected. The statistics are anonymous, and users are not identified.
:::


## Disabling Phone Home

If you don’t want Amplication to add your deployment to its usage statistics, you can disable the feature as follows: 

Set `DISABLE_EVENT_TRACKING` to 1. 

Where `DISABLE_EVENT_TRACKING`  is an environment variable.
