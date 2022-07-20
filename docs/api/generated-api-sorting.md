---
id: generated-api-sorting
title: API sorting
sidebar_label: Generated API - Sorting  
slug: api/generated-api-sorting
---
# Generated API - Sorting

The generated API comes with inbuilt support for sorting.  

Sorting uses the `orderBy` parameter which accepts an object with the name of the fields.  

:::note
- Amplication does not support sorting by fields of nested entities.

- The `orderBy` parameter is available only on endpoints and queries that return a list of items. 
For example: `/api/posts` `/api/posts/{id}/tags`
:::

## Sorting Examples

The following examples get all posts sorted by the `createdAt`  field.

### REST API

```jsx
curl -X 'GET' \
  'https://[server-url]/api/posts?orderBy%5BcreatedAt%5D=Asc' \
  -H 'accept: application/json' 
```

### GraphQL

```jsx
query{
  posts(
    orderBy:{
      createdAt:Desc
    }
  ){
    id
    title
  }
}
```
