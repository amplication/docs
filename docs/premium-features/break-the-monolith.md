---
title: Break The Monolith
sidebar_label: Break The Monolith
slug: /break-the-monolith
---

# Break The Monolith

Amplication's new "Break The Monolith" feature helps you modernize monolithic architectures and transform them into microservices. Using AI, Amplication simplifies the transition of your entities to different services, streamlining your shift to a microservices architecture.

This guide will teach you everything so you can best utilize this feature for your apps.

:::note
The "Break The Monolith" feature is available exclusively to Enterprise workspaces, with trial workspaces having limited access.
:::

## What is "Break The Monolith"?

"Breaking the Monolith" is designed to help you transition a legacy app with a monolithic structure to a microservice architecture.

This feature consists of two parts:

1. **AI-powered Entity Analysis**: We assess your service's entities to suggest optimal division into microservices.
2. **Service Migration**: Based on that analysis, we migrate entities across services.

:::note
**This feature uses LLMs to analyze and suggest ideal microservices structures**. It requires sharing details of your entities and fields with LLMs for analysis. We ensure the highest privacy standards and use your data only to improve your project's architecture.
:::

## How To Use "Break The Monolith"

### Step 1: Access the Architecture Tab

A new "Architecture" tab is now part of every project interface.

It features two modes: **Overview** and **Redesign**.

#### Overview Mode

Overview mode is the view-only default mode for viewing your services and entities.

#### Redesign Mode

Redesign mode allows you make modifications to your service. It lets you rename your service, update descriptions, and most importantly, migrate entities.

To migrate entities to other services you can drag and drop them into the appropriate service. After making changes, you can click on the **Apply** button to implement those changes.

### Step 2: Use AI for Service Breakdown

The "AI Helper" or "Break the Monolith" button, present in both modes, activates the AI-driven process for suggesting how to move and name your services into a microservice architecture. This process requires selecting a service and reviewing the AI's recommendations.

### Step 3: Manage and Apply Changes

Once you're satisfied with the changes, use the "Apply" button to update your project's architecture. You can also reset modifications to revert to the original state.

:::note
Changes made in Redesign mode are auto-saved, but they're not applied until you click the **Apply** button.
:::

### Step 4: Reviewing and Committing Changes

After applying changes in the Architecture tab, the "Pending Changes" section of the dashboard will reflect those updates. If everything looks good, click on the **Commit Changes & Build** button and Amplication will create a new PR with your changes.

## Explore "Break The Monolith" in Our Interactive Sandbox

The "Break The Monolith" feature is accessible in a sandbox environment on Amplication's website. This will let you experiment and see the capabilities of the feature before using it with your own services. The sandbox includes a set of predefined entities and services for you to experiment with.
