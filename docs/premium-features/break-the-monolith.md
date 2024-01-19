---
title: Break The Monolith
sidebar_label: Break The Monolith
slug: /break-the-monolith
---

# Break The Monolith

Amplication's "Break The Monolith" feature helps you modernize monolithic architectures and transform them into microservices. It introduces a new drag-and-drop interface to simplify the process of moving entities across different services.

Additionally, you have the option to utilize our new AI Helper for further guidance and automation in this transition, optimizing the process of moving to a microservices architecture.

This guide will show you how to effectively use this feature for your services.

:::note
The "Break The Monolith" feature is **available exclusively to Enterprise workspaces including trial workspaces**.
:::

## What is "Break The Monolith"?

"Break The Monolith" helps you transition any monolithic service, including monolithic legacy systems, to a modular microservice architecture. It allows for both manual and AI-driven restructuring of services.

"Breaking the Monolith" is designed to help you transition any app with a monolithic structure to a microservice architecture.

This feature focuses on the following 3 parts:

1. **Manual Service Redesign**: Manually move entities between existing or new services to create tailored micro-services.
2. **AI-powered Entity Analysis and Service Suggestions**: As an optional feature, AI analyzes and proposes the most optimal way to distribute your entities among services, offering smart recommendations for service composition and entity organization.
3. **Service and Database Creation**: Based on the new architecture, Amplication creates new services and updates databases to support service separation.

## How To Use "Break The Monolith"

### Step 1: Access the Architecture Tab

Visit the new "Architecture" tab in your project interface, featuring two modes: **Overview** and **Redesign**.

#### Overview Mode

Overview mode is the view-only default mode for viewing your services and entities.

#### Redesign Mode

Redesign mode allows you redesign one service at a time and migrate entities.

### Step 2: Manual Service Redesign

After entering Redesign Mode, you can manually move your entity between existing or new services to create miro-services.

To migrate entities to other services you can drag and drop them into the appropriate service. After making changes, you can click on the **Apply** button to implement those changes.

### Step 3: Use AI for Service Breakdown (Optional)

You can also optionally use AI to help you transition your entities and which micro-services should be created.

The "AI Helper" button, also present in the Project and Service Overview screens, activates the AI-driven process that suggests the most optimal way to name your services and move them into a microservice architecture. This process requires selecting a service and reviewing the AI's recommendations.

:::note
**This feature uses LLMs to analyze and suggest ideal microservices structures**. It requires sharing details of your entities and fields with LLMs for analysis. We ensure the highest privacy standards and use your data only to improve your project's architecture.
:::

### Step 4: Manage and Apply Changes

Once you're satisfied with the changes, use the "Apply" button to update your project's architecture. You can also reset modifications to revert everything back to its previous, unmodified state.

After applying changes in the Architecture tab, the "Pending Changes" section of your dashboard will reflect those updates. If everything looks good, click on the **Commit Changes & Build** button and Amplication will create a new PR to your git provider with your changes.

## Explore "Break The Monolith" in Our Interactive Sandbox

"Break The Monolith" can also be explored in a sandbox environment on Amplication's website. This environment lets you experience the feature before applying it to your services. You can experiment with a set of predefined entities and open-source repositories structured as monoliths.