---
title: Break The Monolith
sidebar_label: Break The Monolith
slug: /break-the-monolith
---

# Break The Monolith

Amplication's "Break The Monolith" feature helps you seamlessly update monolithic architectures into modern, scalable, and maintainable microservices. It introduces a new project-level tab to simplify the process of moving entities across different services.

This guide will walk you through the steps to effectively utilize this feature for enhancing your application's architecture.

:::note
The "Break The Monolith" feature is **available to Enterprise workspaces including trial workspaces**.
:::

## What is "Break The Monolith"?

"Break The Monolith" helps you transition any monolithic service, including monolithic legacy systems, to a modular microservice architecture. <!-- It allows for both manual and AI-driven restructuring of services. -->

This feature focuses on the following 3 parts:

1. **Overview of Current Services**: Get a comprehensive view of your project's services, their entities, fields, and relationships with our Overview mode.
2. **Redesign and Service Distribution**: <!-- Manually or with AI assistance, r--> Redesign your service, whether it's a monolith or otherwise, and move entities between services to create a balanced microservice structure.
3. **Applying the New Architecture**: Amplication facilitates the creation of new microservices, handles all the moved entities, and manages the intricate relations. It comes complete with their entities, APIs, and data models, to support the new microservice architecture and ensure your code is ready for production.

## How To Use "Break The Monolith"

### Step 1: Access the Architecture Tab

Visit the new "Architecture" tab in your project interface, featuring two modes: **Overview** and **Redesign**.

#### Overview Mode

Overview mode is the view-only default mode for viewing your services and entities.

#### Redesign Mode

Redesign mode allows you to redesign and restructure services, facilitating the movement of entities between them.

:::note
**Free users** have access to Overview mode _without_ the Redesign capabilities.
:::

### Step 2: Manual Service Redesign

After entering Redesign Mode, manually move entities between services. You can select multiple entities using the dedicated menu and move them in bulk to create micro-services.

To migrate entities to other services, you can drag and drop them into the appropriate service. After making changes, you can click on the **Apply** button to implement those changes.

<!--
### Step 3: Utilize AI for Smart Architecture Suggestions (Optional)

The "Break the Monolith" button, available in the Project and Service Overview screens, triggers AI analysis to suggest an efficient new microservice architecture, including service distribution and entity organization. Review the AI's recommendations before making any changes.

:::note
**This feature uses LLMs to analyze and suggest ideal microservices structures**. It requires sharing details of your entities and fields with LLMs for analysis. We ensure the highest privacy standards and use your data only to improve your project's architecture.
:::
-->

<!--
### Step 3: Utilize AI for Smart Architecture Suggestions (Optional)

The "AI Helper" button in the Architecture tab, also available in both the Project and Service Overview screens as "Break The Monolith" button, offer AI-driven suggestions for transforming services into an efficient microservice architecture. Select a service to initiate AI analysis, which includes service distribution and entity organization recommendations.

:::note
**This feature uses advanced LLMs for optimal microservices structuring suggestions**. Only anonymous data is shared during analysis, and it occurs exclusively when users proactively engage features utilizing LLMs. Users can opt out of LLM features, maintaining control over their data privacy.
:::
-->

<!--
### Step 4: Manage and Apply Changes
-->

### Step 3: Manage and Apply Changes

Once you're satisfied with the changes, use the **Apply** button to update your project's architecture. You can also reset modifications to revert everything back to its previous, unmodified state.

After applying changes in the Architecture tab, the "Pending Changes" section of your dashboard will reflect those updates. If everything looks good, click on the **Commit Changes & Build** button and Amplication will create a new PR to your git provider with your changes.

:::note
Changes made in Redesign Mode are auto-saved, but they're not applied or visible to other team members until you click the **Apply** button.
:::

<!--
## Starting with Prisma Schema in Break The Monolith

Start with our [Import Prisma Schema](/how-to/import-prisma-schema) feature to leverage your existing database schemas instead of manually creating entities. Rapidly transition to optimized microservice configurations saving you even more time.

This approach allows you to import your existing database structure into Amplication, where the Intelligent AI Helper can then suggest optimal microservice configurations.

To get started with your Prisma schema upload, visit our [Import Prisma Schema](/how-to/import-prisma-schema) documentation for step-by-step instructions.
-->

<!--
## Learn the Technical Mechanisms of Break The Monolith

For a deeper understanding of the technical details behind "Break The Monolith" and how it transforms your monolithic architecture into microservices, visit our detailed technical guide on the [Understanding Break The Monolith](/understanding-break-the-monolith) page.
-->

<!-- 
## Explore "Break The Monolith" in Our Interactive Sandbox

"Break The Monolith" can also be explored in a sandbox environment on Amplication's website. This environment lets you experience the feature before applying it to your services. You can experiment with a set of predefined entities and open-source repositories structured as monoliths.
-->