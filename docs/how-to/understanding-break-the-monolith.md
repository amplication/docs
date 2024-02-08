---
id: understanding-break-the-monolith
title: Understanding Break The Monolith
sidebar_label: Understanding Break The Monolith
slug: /how-to/understanding-break-the-monolith
pagination_prev: premium-features/break-the-monolith
pagination_next: null
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

In one-to-one relationships, both entities involved in the relationship undergo a modification where their related field names are suffixed with `Id`. This approach maintains a virtual link between the entities. This means that while the entities reside in separate databases, the suffixed `Id` fields provide a means to reference each other virtually rather than through a direct database relationship.

#### Example

If an Orders table had a field called `customer`, it will now have a new field named `customerId`, with the type being the same as the Customer entity's ID field. This adjustment allows entities to reference each other accurately post-transition.

### Handling One-to-Many Relations

In a one-to-many relationships, the handling of fields is nuanced:

#### The "Many" Side

The entity on the "many" side of the relationship, upon being moved, retains a field representing the ID of the "one" side. This field, modified to `customerId` from `customer` in an Order entity, for example, remains an actual field in the database. It allows the service to reference the related entity in another service, preserving the integrity of the relationship even when the entities are separated.

#### The "One" Side

On the "one" side, a new field is created, retaining the original field name but now of JSON type. This change reflects the updated structure, accommodating the separation of services while maintaining a link to the "many" entities.

#### Example

If a Customer entity (one side) and Order entities (many side) are separated, Order entities retain a `customerId` field. Meanwhile, the Customer entity gains a new field named `customer`, of JSON type, to reference its orders, adapting to the new architecture.

### Handling Many-to-Many Relations

Each side involved in a many-to-many relationship now retains a field with the original field name, now of JSON type. This update allows for a structured way to maintain relationships between entities, even when they are distributed across different services, despite the complex nature of many-to-many relationships.

#### Example

If there are two entities, Product and Category, involved in a many-to-many relationship where each product can belong to multiple categories and each category can include multiple products, both entities will now include a field reflecting this relationship in JSON format.

The Product entity will have a `categories` field, and the Category entity will have a `products` field, both of JSON type.

### Data Migration Considerations

It's crucial to recognize that migrating entities between services often necessitates data migration. When entities are relocated, separate databases are created for each service. This division requires moving relevant data from the original database to the new service's database to maintain data consistency and integrity.

## Next Steps

This technical overview of "Break The Monolith" aims to provide you with a clear understanding of the implications and potential outcomes when restructuring your entities.

It's important to recognize that, due to the nature of service separation, some relationships and references may not function as they did within a monolithic structure. Grasping these nuances is key to successfully navigating the transition process.

For a comprehensive guide on using "Break The Monolith" in your projects, please visit our [Break The Monolith documentation page](/break-the-monolith).
