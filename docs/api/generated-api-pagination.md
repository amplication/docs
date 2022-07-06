---
id: generated-api-pagination
title: API Pagination
sidebar_label: Generated API Pagination
slug: api/generated-api-pagination
---

# Generated API Pagination

The generated API comes with inbuilt support for Offset pagination.

Offset pagination uses the `skip` parameter to exclude the first N items and the `take` parameter to define the number of items to be included on each page.

:::note

The `skip` and `take` parameters are available only on endpoints and queries that return a list of items.
For example: `/api/posts` `/api/posts/{id}/tags`
:::

Pagination requires an implied ordering. This is determined by the `orderBy` parameter. For more information see [Generated API Sorting](../generated-api-sorting)

## Pagination Examples

The following examples take items 21-40 from a list of blog posts (equals to 2nd page, in a list with 20 items per page).

Skip=20

Take=20

### REST API

```
curl -X 'GET' \
  'https://[server-url]/api/posts?skip=20&take=20' \
  -H 'accept: application/json'
```

### GraphQL

```
query{
  posts(
    skip:20
    take:20
  )
  {
    id
    title
  }
}
```
