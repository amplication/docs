---
id: generated-api-filtering
title: API Filtering
sidebar_label: API Filtering 
slug: api/generated-api-Filtering
---

# Generated API - Filtering

The generated API comes with inbuilt support for filtering.  

Filtering uses the `where` parameter to define filters. It can be used to filter on record properties (such as a user's email address) or related record properties (such as a user's top 10 most recent post titles).

:::note

The `where` parameter is available only on endpoints and queries that return a list of items. 
For example `/api/posts`  `/api/posts/{id}/tags`
:::

## Filter conditions and operators

The `where` parameter supports the following operators: 

- lt
- lte
- gt
- contains 
- startsWith
- endsWith
- mode
- not

To find out more about filters and operators,  we recommend reading the [Prisma Client API reference](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#filter-conditions-and-operators)

## Filtering Examples

The following example gets all posts where the title includes the text “Node.js”

### REST API

```jsx
curl -X 'GET' \
  'https://[server-url]/api/posts?where%5Btitle%5D[contains]=Node.js' \
  -H 'accept: application/json' 
```

### GraphQL

```jsx
query{
  posts(
    where:{
      title:{
        contains:"Node.js"
      }
    }
  ){
    id
    title
  }
}
```