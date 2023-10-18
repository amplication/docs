---
id: create-entity-controller-base
title: Create Entity Controller Base
sidebar_label: Create Entity Controller Base
slug: /plugins/plugin-events/create-entity-controller-base
---

# Create Entity Controller Base

## Description

Creates the base controller of an entity

## Event Name:

`CreateEntityControllerBase`

## Event Params

```tsx
export interface CreateEntityControllerBaseParams extends EventParams {
  template: namedTypes.File;
  entity: Entity;
  entityName: string;
  entityType: string;
  entityServiceModule: string;
  templateMapping: { [key: string]: any };
  controllerBaseId: namedTypes.Identifier;
  serviceId: namedTypes.Identifier;
}
```

### template

A template file that is used to generate the service
This is the default template that is used for this event.
https://github.com/amplication/amplication/tree/master/packages/data-service-generator/src/server/resource/controller/controller.base.template.ts

You can manipulate the template or replace it completely with a new template in your plugin.

### entity

The entity which we are generating in the service

### entityName

The name of the entity for which we are generating the controller

### entityType

The type of the entity for which we are generating the controller

### entityServiceModule

TBC

### templateMapping

An object with values that are available in the interpolation process of the template.
This default object with the available parameters can be found here
https://github.com/amplication/amplication/tree/master/packages/data-service-generator/src/server/resource/service/create-service.ts#L378

You can manipulate the object by adding new values, or replacing existing values that will be used in the template when creating the service file.

### controllerBaseId

The Identifier of the base service that is used as the class name. e.g. CustomerControllerBase

### serviceId

The Identifier of the service that is used as the class name. e.g. CustomerService
