---
id: generated-api-filtering
title: API Filtering
sidebar_label: Generated API - Filtering
slug: /api/generated-api-filtering
---

# Generated API - Filtering

The generated API includes built-in support for filtering, which enables users to specify search criteria for their queries.

Filtering is done using the `where` parameter, which defines filters based on record properties or related record properties, such as a user's email address or their top 10 most recent post titles.

:::note

The `where` parameter can only be used on endpoints and queries that return a list of items, such as `/api/posts` or `/api/posts/{id}/tags`.
:::

## Filter conditions and operators

The `where` parameter supports the following operators:

- `lt`
- `lte`
- `gt`
- `contains`
- `startsWith`
- `endsWith`
- `mode`
- `not`

:::note
The `Searchable` flag in the entity field settings determines whether a record can be included in a search. This flag is activated by default.
:::

To find out more about filters and operators, we recommend reading the [Prisma Client API reference](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#filter-conditions-and-operators)

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
