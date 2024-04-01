---
title: Custom Types & Actions
sidebar_label: Custom Types & Actions
slug: /custom-types-and-actions
pagination_next: api/index
---

# Custom Types & Actions

Custom Types & Actions is an enhanced feature that gives you full control over your Data Transfer Objects (DTOs) and APIs. It offers a single source of truth for your APIs and DTOs, enabling fast creation of all your API endpoints and promoting standardization across your codebase.

Custom Types & Actions let you define custom data structures (Types), create API endpoints (Actions), and manage the relationships between them, all within the Amplication UI. 

It allows you to automatically generate both the default CRUD operations and your custom APIs that utilize custom DTOs, all within your REST and/or GraphQL APIs. These changes are automatically translated into production-ready code in your repository, ensuring the best quality and efficiency.

:::note
The Custom Types & Actions feature is available for Amplication's **Enterprise** plan, including trial plans.
:::

## What Are Types And Actions?

In Amplication, Types and Actions are fundamental concepts that define the data structures and API endpoints of your application.

### Types

Types in Amplication refer to the data structures used to define the shape and format of your application's data. There are two main categories of types:

1. **Data Transfer Objects (DTOs)**: DTOs are custom data structures that define the input and output data for your API endpoints (Actions). They encapsulate the data that is transferred between the client and the server or between different services within your application.

2. **Primitives**: Primitives are the basic data types supported by Amplication, such as String, Integer, Boolean, Date, and JSON. These primitives can be used as fields within your DTOs or as standalone types for your Actions.

### Actions

Actions in Amplication represent the API endpoints that define the operations available in your application. Each Action specifies the input, output, and other configurations specific to the API type (REST or GraphQL).

For [REST API](/api/#rest-apis), an Action defines:

- HTTP verb (GET, POST, PUT, DELETE, etc.)
- Route (e.g., `/users` or `/products/:id`)
- Input parameters (query, path, or request body)
- Output data structure (response body)

For [GraphQL API](/api/#graphql-apis), an Action defines:

- Operation type (Query or Mutation)
- Input type (arguments)
- Output type (return type)

Actions can be of two types:

1. **Default CRUD Actions**: Amplication automatically generates default CRUD (Create, Read, Update, Delete) Actions based on your application's entities. These Actions provide standard API endpoints for interacting with your data.

   - For REST API, the default CRUD Actions typically include:
     - `GET /entities` (Read all)
     - `GET /entities/:id` (Read by ID)
     - `POST /entities` (Create)
     - `PUT /entities/:id` (Update)
     - `DELETE /entities/:id` (Delete)

   - For GraphQL API, the default CRUD Actions typically include:
     - `entities` (Read all)
     - `entity(id: ID!)` (Read by ID)
     - `createEntity(input: CreateEntityInput!)` (Create)
     - `updateEntity(id: ID!, input: UpdateEntityInput!)` (Update)
     - `deleteEntity(id: ID!)` (Delete)

Amplication also generates Default _Relation_ CRUD Actions for all of your entities. For example, Get all books for a specific author, or get an author for a specific book.

2. **Custom Actions**: Custom Actions are user-defined API endpoints that extend the functionality of your application beyond the default CRUD operations. You can create Custom Actions to implement specific business logic, perform complex data transformations, or integrate with external services.

## Accessing Custom Types & Actions

To access the Custom Types & Actions feature, navigate to the new **APIs** tab in your Amplication dashboard.

The APIs tab provides a centralized view of all your project's Modules, DTOs, and Actions. It's also further divided into sections for each Module, making it easy to browse and manage your project's custom types and actions.

![APIs Tab Overview](./assets/custom-types-and-actions/api-tab-overview.png)

## Modules

Modules are organizational units that group related DTOs and Actions together. They help structure your application in a logical and maintainable way by encapsulating a unit of business logic related to one application domain.

By default, Amplication creates a module for each database entity in your application. These entity-related modules contain all the CRUD operations and associated code for that specific entity. However, creating modules is not limited to database entities alone.

You can create your own custom modules based on your business needs and requirements. Custom modules allow you to organize and encapsulate business logic that may not directly correspond to a single database entity but rather spans across multiple entities or represents a specific functionality in your application.

Whether it's an entity-related module or a custom module you've created, you can add custom DTOs and custom Actions to a module to define the data structures and API endpoints specific to that module's responsibilities.

### Create Module

To create a new Module, follow these steps:

1. In the APIs tab, click on "All Modules" in the sidebar.
2. Click on the "Add Module" button.
2. Provide a name for your Module.
3. Click the "Create Module" button to finalize the creation process.

![Add Module](./assets/custom-types-and-actions/add-module.png)

### Edit Module

To edit an existing Module, follow these steps:

1. In the APIs tab, locate the Module you want to edit.
2. Click on the Module name to open the Module details page.
3. Click on the "Edit Module" button to open the Module edit page.
3. Modify the Module name and description as needed.
4. Your changes will be saved automatically.

![Edit Module](./assets/custom-types-and-actions/edit-module.png)

### Delete Module

To delete a Module, follow these steps:

1. In the APIs tab, locate the Module you want to delete.
2. Click on the Module name to open the Module details page.
3. Click on the "Edit Module" button to open the Module edit page.
4. Click the delete icon next to the Module name.
5. Confirm the deletion when prompted.

:::danger
You can only delete Modules that you have created. Amplication-generated Modules (based on entities) cannot be deleted.

Deleting a Module will also delete all the DTOs and Actions within that Module. Exercise caution when deleting Modules.
:::

![Delete Module](./assets/custom-types-and-actions/delete-module.png)

## DTOs and Enums

Data Transfer Objects (DTOs) define the structure and format of data that is transferred between different parts of your application, particularly between the client and the server, or between different services within the application.

In Amplication, DTOs serve several purposes:

- They define the input and output data structures for API endpoints (Actions).
  - For REST APIs, they can be used as request and response bodies.
  - For GraphQL APIs, they can be used as input types (arguments) and return types.
- They can define the data transferred between services as part of an event-driven architecture using a message broker (planned for future versions).

Amplication provides built-in DTOs for common use cases, such as pagination, sorting, and filtering. These DTOs are automatically generated based on your application's entities to support the CRUD APIs generated out-of-the-box. However, you can also create custom DTOs to suit your specific requirements and use them in your custom APIs.

### Differences between DTOs and Enums

Enums are used to define a fixed set of constants. DTOs are used to define the structure and shape of data objects that are transferred between different parts of the project.

In Amplication, you can create and manage both enums and DTOs using the Custom Types & Actions feature, allowing you to define the data contracts and constraints for your application's API endpoints. A specific enum can also function as a DTO and can be defined as the input or output DTO for an API.

### Create DTO

To create a new DTO, follow these steps:

:::note
If you create a new DTO / Enum from the "All Modules" screen, you can choose which Module it will reside in.
:::

#### DTO Name and Description

1. Click on the "Add DTO" button in the top right of the APIs tab.
2. In the dropdown, click on "Add DTO".
3. Provide a name for your DTO, such as "MyNewDtoName". This will automatically populate the Name field with the provided name.
4. Optionally, add a description for your DTO.

#### Adding Properties

1. In the "Properties" section, click on "Add property" to define the DTO's properties.
2. For each property:
   - Specify the Name of the property (e.g., "firstProperty").
   - Choose the Type of the property from the dropdown (e.g., "String", "Number", "Boolean", "Date", "JSON", "DTO", "Enum").
   - If needed, you can change the property to an array by toggling the "Array" switch.
   - If needed, mark the property as optional by checking the "Optional" checkbox.
3. Repeat step 2 for each additional property you want to add to the DTO.

### Create Enum

To create a new Enum, follow these steps:

#### Enum Name and Description

1. Click on the "Add DTO" button in the top right of the APIs tab.
2. In the dropdown, click on "Add Enum".
3. Provide a name for your Enum, such as "MyNewEnum". This will automatically populate the Name field with the provided name.
4. Optionally, add a description for your Enum.

#### Adding Members

1. In the "Members" section, click on "Add member" to define the Enum's members.
2. For each member:
   - Specify the Name of the member.
   - Provide the Value for the member.
3. Repeat step 2 for each additional member you want to add to the Enum.

### Edit DTO or Enum

To edit an existing DTO, click on the DTO within its associated Module in the APIs tab. You can modify the DTO's name, description, and properties as needed.

## Actions

Actions represent the API endpoints that define the operations available in your application. They specify the HTTP verbs, routes, input, and output data structures for each endpoint.

Actions use DTOs to define their input and output data. Each Action can have a request DTO (for input) and a response DTO (for output). Amplication generates built-in Actions based on your application's entities for CRUD operations, but you can also create custom Actions to implement specific functionality.

:::note
By default, the generated Amplication service exposes its endpoints over HTTP to allow HTTPS termination at a higher level (like an API Gateway, etc.). However, our [HTTPs plugin](https://amplication.com/plugins/transport-https) adds support for HTTPS mode and TLS termination at the app level.
:::

### Create Action

To create a new Action, follow these steps:

#### Module Name and Description

1. Click on the "Add Action" button in the top right of the APIs tab.
2. Provide a Display Name for your new Action, such as "My New Module Name". This will automatically populate the Name field with a generated name like "MyNewModuleName".
3. Optionally, add a description for your Action.

:::note
If you create a new Action from the "All Modules" screen, you can choose which Module the Action will reside in.
:::

#### Choosing Types

1. In the "Types" section, select the input and output types for your Action:
   - For the Input Type, choose the type of the property from the dropdown (e.g., "String", "Number", "Boolean", "Date", "JSON", "DTO", "Enum").
   - If you choose "DTO", click "Select..." to pick an existing DTO or create a new one.
   - Repeat the same steps for the Output Type.
2. If needed, you can change the Input Type or Output Type to an array by toggling the "Array" switch.

#### REST API Settings

1. Choose the appropriate HTTP verb from the dropdown (e.g., "get", "post", "put", "delete").
2. Specify the route for your Action (e.g., "/id/my-new-module-name").
3. Select the Input Source for your Action's parameters (e.g., "body", "query", "params", or "split") from the dropdown.

#### GraphQL API Settings

Choose the Operation Type for your Action (e.g., "query" or "mutation").

![Create Action](./assets/custom-types-and-actions/create-action.png)

### Enable and Disable Actions

Amplication gives you a complete overview of all Actions associated with a specific Module.

This is useful when you want to temporarily disable certain endpoints without completely removing them from your application.

To enable or disable an Action, simply toggle the switch next to the Action's name in the APIs tab.

:::caution
Disabling an Action will cause Amplication not to generate the code for that Action.
:::

![Enable and Disable Actions](./assets/custom-types-and-actions/all-actions.png)

### Edit and Delete Action

To edit an Action, click on the Action within its associated Module in the APIs tab. You can modify the Action's properties, such as the HTTP verb, route, input DTO, output DTO, and other settings as needed.

To delete an Action, click on the delete button next to the Action's name. Be cautious when deleting Actions, as it may impact other parts of your application that depend on them.

:::note
Actions generated by Amplication **cannot be deleted**.
:::

## Conclusion

Custom Types & Actions in Amplication streamline the process of creating and managing your application's APIs and data structures. With a single source of truth, fast creation capabilities, and standardization benefits, you can focus on building the core functionality of your application while Amplication takes care of generating high-quality, production-ready code for your APIs in your repository.
