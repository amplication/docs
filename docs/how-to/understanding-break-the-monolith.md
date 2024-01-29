---
id: understanding-break-the-monolith
title: Understanding Break The Monolith
sidebar_label: Understanding Break The Monolith
slug: /how-to/understanding-break-the-monolith
---

# Understanding Break The Monolith

[Break The Monolith](/break-the-monolith) is a new feature, currently in Beta, for transitioning monolithic architectures into efficient, scalable microservices.

This page provides an in-depth technical overview of how it alters your project's architecture, particularly focusing on entity relationships and database schema transformations.

Let's explore how Amplication handles the technical specifics of this process.

## Technical Workings of "Break The Monolith"

### Handling Non-Relation Fields

When entities are moved between services in "Break The Monolith," non-relation fields are replicated exactly as they are. These fields retain all their properties, such as type, uniqueness, and searchability. This direct replication ensures consistency in the data model across different services.

#### Example

If an entity in your original monolith service has a non-relation field like `createdAt` (a date field), this field will appear in the new service with the same properties, ensuring data consistency.

### Handling One-to-One Relations

In one-to-one relationships, both entities involved in the relationship retain a single field representing the remote entity's ID. This approach maintains a link between the entities even after they are distributed across different services.

#### Example

Each entity will have a field, like `partnerId` in a `Customer` entity, which points to the corresponding entity in the other service. This mutual referencing ensures that the entities can still reference each other post-transition.

### Handling One-to-Many Relations

In a one-to-many relationships, the handling of fields is nuanced:

#### The "Many" Side

The entity on the "many" side of the relationship, upon being moved, retains a field representing the ID of the "one" side. This field, like `customerId` in an `Order` entity, is an actual field in the database. It allows the service to reference the related entity in another service, preserving the integrity of the relationship even when the entities are separated.

#### The "One" Side

On the "one" side of the relationship, no direct relational fields are created to represent the "many" side. This side, therefore, loses the direct link to the "many" entities, reflecting the separation of services.

#### Example

For example, if a `Customer` entity (one side) and `Order` entities (many side) are separated, the `Order` entities will retain a `customerId` field to refer to their corresponding `Customer`. However, the `Customer` entity won't have a direct reference to its orders in the new structure.

### Data Migration Considerations

It's crucial to recognize that migrating entities between services often necessitates data migration. When entities are relocated, separate databases are created for each service. This division requires moving relevant data from the original database to the new service's database to maintain data consistency and integrity.

## Next Steps

This technical overview of "Break The Monolith" aims to provide you with a clear understanding of the implications and potential outcomes when restructuring your entities.

It's important to recognize that, due to the nature of service separation, some relationships and references may not function as they did within a monolithic structure. Grasping these nuances is key to successfully navigating the transition process.

For a comprehensive guide on using "Break The Monolith" in your projects, please visit our [Break The Monolith documentation page](/break-the-monolith).
