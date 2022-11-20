---
id: CreateEntityResolver
title: Create Entity Resolver
sidebar_label: Create Entity Resolver
slug: /plugins/plugin-events/CreateEntityResolver
---

# Create Entity Resolver

## Description



## Event Name
`CreateEntityResolver`

## Event Params

```ts
export interface CreateEntityResolverParams extends EventParams {
  template: namedTypes.File;
  entityName: string;
  entityServiceModule: string;
  serviceId: namedTypes.Identifier;
  resolverBaseId: namedTypes.Identifier;
  templateMapping: { [key: string]: any };
}
```

### entityName
The name of the entity for which we are generating the resolver 

### template
A template file that is used to generate the resolver
This is the default template that is used for this event.
https://github.com/amplication/amplication/blob/master/packages/amplication-data-service-generator/src/server/resource/resolver/resolver.template.ts

You can manipulate or replace the template with a new template in your plugin. 


### templateMapping
An object with values that are available in the interpolation process of the template.  
This default object with the available parameters can be found here 
https://github.com/amplication/amplication/blob/master/packages/amplication-data-service-generator/src/server/resource/resolver/create-resolver.ts#L88

You can manipulate the object by adding new values, or replacing existing values that will be used in the template when creating the resolver file. 

### entityServiceModule
The path to the entity service module

### servicId
The Identifier of the service that is used as the class name. For example `CustomerService`

### resolverBaseId
The Identifier of the base resolver that is used as the class name. For example `CustomerServiceBase`