---

id: create-entity-controller-spec
title: Create Entity Controller Spec
sidebar_label: Create Entity Controller Spec
slug: /plugins/plugin-events/create-entity-controller-spec
---# Create Entity Controller Spec

## Description

Creates the controller spec file for the entity controller.

## Event Name:

`CreateEntityControllerSpec`

## Event Params

```tsx
export interface CreateEntityControllerSpecParams extends EventParams {
  entity: Entity;
  entityType: string;
  template: namedTypes.File;
  templateMapping: { [key: string]: any };
  entityServiceModulePath: string;
  entityControllerModulePath: string;
  entityControllerBaseModulePath: string;
  controllerId: namedTypes.Identifier;
  serviceId: namedTypes.Identifier;
}
```

### entity

The `entity` for which we are generating the controller spec.

### entityType

The type of the `entity` for which we are generating the controller spec.

### template

A template file that is used to generate the controller spec file.
This is the default template that is used for this event.
https://github.com/amplication/amplication/blob/master/packages/data-service-generator/src/server/resource/test/controller.spec.template.ts

You can manipulate the template or replace it completely with a new template in your plugin.

### templateMapping

An object with values that are available in the interpolation process of the template.
This default object with the available parameters can be found here
https://github.com/amplication/amplication/blob/master/packages/data-service-generator/src/server/resource/test/create-controller-spec.ts#L60

You can manipulate the object by adding new values, or replacing existing values that will be used in the template when creating the controller spec file.

### entityServiceModulePath:

The path to the `entity` service module

### entityControllerModulePath:

The path to the `entity` controller module

### entityControllerBaseModulePath:

The path to the `entity` service base module

### controllerId

The Identifier of the controller that is used as the class name. For example, CustomerController

### serviceId

The Identifier of the service that is used as the class name. For example, CustomerService
