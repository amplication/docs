---
title: Service Catalog
description: Learn about Amplication's Service Catalog. Manage, monitor, and configure your services through an intuitive interface.
sidebar_label: Service Catalog
slug: /service-catalog
---

The **Service Catalog** is your central hub for managing and monitoring all services within your Amplication project. It provides an intuitive interface to oversee your services, track their configurations, and manage changes effectively.

The Service Catalog's main focus is the catalog view, which offers a comprehensive grid-based interface for managing your application services. This interface is designed to provide maximum visibility and control over your entire project.

![Amplication Service Catalog](./assets/service-catalog/service-catalog.png)

## Grid Columns

The grid displays comprehensive information about each service through the following columns:

- **Type** - Displays the resource type with visual indicators: purple brackets icon for services, green icon for message brokers, and distinct icons for other resource types
- **Name** - The name of your service
- **Owner** - Shows the assigned team or individual member responsible for the service. Clicking this field takes you to settings where you can modify ownership
- **Code Generator** - Indicates whether the service uses Node.js or .NET
- **Repository** - Shows the connected Git repository. Can be modified through the service's "Sync with Git" tab
- **Description** - Custom description of your service, editable through the service settings
- **Pending Changes** - Displays the number of uncommitted changes since the last build
- **Last Build** - Shows build status (green checkmark for success) and timing (e.g., "2 days ago"). Clicking navigates to the specific commit details
- **Code Gen Version** - Displays the current code generator version with status indicators:
  - Lightning bolt: automatically updates to latest version
  - Lock icon: version is locked to specific release
- **Template** - Shows if the service was created from a template (orange icon). Clicking navigates to template details
- **Template Version** - Displays the current template version number, which increments with each template update
- **Actions** - Provides access to available operations for the service

## Customizing the Grid

### Column Management

- Drag columns left or right to reorder them
- Resize columns by dragging their edges
- Show/hide columns using the filter feature

### Sorting

Click any column header to sort the grid:

- First click: Sort in ascending order
- Second click: Sort in descending order
- Third click: Remove sorting

### Teams Organization

Teams provide an additional layer of service organization:

1. Access Teams through the Teams tab in your project dashboard
2. Create new teams with:
   - Custom names
   - Descriptions
   - Distinctive colors (appears in the service catalog grid)
3. Add team members who will receive notifications about service changes
4. Assign services to teams for ownership and notifications

### Properties

Properties allow custom organization of your services:

1. Access Properties through the Properties tab
2. Create new properties with:
   - Custom name and key
   - Optional description
   - Type selection:
     - **Select**: Single choice from predefined options
     - **Multi-select**: Multiple choices from predefined options
     - **Text**: Simple text field
     - **Link**: URL reference
3. For Select and Multi-select types:
   - Define custom options
   - Assign colors to options for visual organization in the grid

## Pending Changes Sidebar

The Pending Changes sidebar provides a real-time view of modifications across your services, including:

- Plugin additions or updates
- Entity modifications
- Service configuration changes
- Template applications

When you're ready to apply changes, click the "Generate the code" button to build all services with pending modifications.

![Amplication Service Catalog Pending Changes Sidebar](./assets/service-catalog/pending-changes-sidebar.png)

## Next Steps

Now that you're familiar with the Service Catalog, explore these additional capabilities:

- Create live templates to standardize service configurations
- Develop private plugins to extend functionality
- Build and deploy new versions of your services
- Integrate custom code into your generated services