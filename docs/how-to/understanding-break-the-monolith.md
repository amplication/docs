---
id: understanding-break-the-monolith
title: Understanding Break The Monolith
sidebar_label: Understanding Break The Monolith
slug: /understanding-break-the-monolith
---

# Understanding Break The Monolith

[Break The Monolith](/break-the-monolith) is a comprehensive tool for transforming monolithic architectures into modern, scalable, and maintainable microservices.

This page explains the technical workings of this feature to help you understand how it operates under the hood.

## How "Break The Monolith" Works

The "Break The Monolith" feature consists of several steps, each designed to help you smoothly transition your monolithic service into a set of microservices.

### 1. Overview of Current Services

First, the feature provides an **Overview** mode where you can see a detailed view of your project's current services, entities, fields, and their relationships. This helps you understand the existing structure before making any changes.

Overview mode provides you with a service mesh visualization, showing the services in your project, the entities owned by each service, and the relations between the entities.

### 2. Redesign and Breaking Services

In the Redesign mode, you can manually or with the assistance of AI, restructure your monolith or individual services. This includes the ability to:

- Move entities between existing or new services.
- Utilize the Intelligent AI Helper for suggestions on optimal microservice configurations.
- Create tailored micro-services based on the suggested architecture.

The AI Helper identifies logical groupings of entities based on their relationships and usage patterns. It also suggests ways to cut relations between entities beyond group boundaries.

:::note
**The AI Helper uses advanced LLMs for insightful microservice architecture suggestions**, analyzing your entity details with a commitment to high privacy standards.
:::

### 3. Applying the New Architecture

Once you are satisfied with the new design, "Break The Monolith" facilitates the creation of new microservices complete with their entities and APIs that bridge the entity relations separated across services, transforming foreign keys into remote IDs where necessary.

This process ensures that your code is production-ready and supports the new microservice architecture.

## Next Steps

After understanding how "Break The Monolith" works, you can start using this feature in your project. For a step-by-step guide on how to use "Break The Monolith," refer to our [Break The Monolith documentation page](/break-the-monolith).
