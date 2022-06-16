---
id: meta-query-graphql
title: Meta Query in GraphQL 
sidebar_label: Meta Query in GraphQL
slug: /api/meta-query-graphql
---

# Meta Query in GraphQL 

## Obtaining the record count of a query

The `_EntitiesMeta API` can be used to obtain the record count of a query.
The meta query supports all the parameters that are supported in the `FindMany` query.

 ```bash
query{
  _customersMeta(where:{
    firstName:{
      contains:"jack"
    }
  }){
    count
  }
}


```

## Obtaining the result count of a query

The meta query can be used together with the `findMany` query in order to get the result count.


```bash
query customers($where: CustomerWhereInput, $orderBy: CustomerOrderByInput, $skip: Float, $take: Float) {
  items: customers(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {
    id
    createdAt
    updatedAt
    firstName
    lastName
    __typename
  }
  total: _customersMeta(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {
    count
    __typename
  }
}
```
