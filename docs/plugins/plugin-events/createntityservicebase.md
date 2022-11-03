---
id: CreateEntityServiceBase
title: Create Entity Service Base
sidebar_label: Create Entity Service Base
slug: /plugins/plugin-events/CreateEntityServiceBase
---

# Create Entity Service Base

## Description

Creates the base service of an entity

## Event Name:
`CreateEntityServiceBase`

## Event Params

```tsx
export interface CreateEntityServiceBaseParams extends EventParams {
  entityName: string;
  entity: Entity;
  templateMapping: { [key: string]: any };
  passwordFields: EntityField[];
  serviceId: namedTypes.Identifier;
  serviceBaseId: namedTypes.Identifier;
  delegateId: namedTypes.Identifier;
  template: namedTypes.File;
}
```

### entityName
The name of the entity for which we are generating the service

### entity
The entity which we are generating in the service

### template
A template file that is used to generate the service
This is the default template that is used for this event.
https://github.com/amplication/amplication/blob/master/packages/amplication-data-service-generator/src/server/resource/service/service.template.ts

You can manipulate the template or replace it completely with a new template in your plugin.

### templateMapping
An object with values that are available in the interpolation process of the template.
This default object with the available parameters can be found here
https://github.com/amplication/amplication/blob/master/packages/amplication-data-service-generator/src/server/resource/service/create-service.ts#L378

You can manipulate the object by adding new values, or replacing existing values that will be used in the template when creating the service file.

### passwordFields
List of fields of type Password that are used in this entity

### serviceId
The Identifier of the service that is used as the class name. e.g. CustomerService

### serviceBaseId
The Identifier of the base service that is used as the class name. e.g. CustomerServiceBase

### delegateId
TBC




