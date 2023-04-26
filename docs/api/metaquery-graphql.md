---
id: meta-query-graphql
title: Meta Query in GraphQL 
sidebar_label: Meta Query in GraphQL
slug: /api/meta-query-graphql
---

# Meta Query in GraphQL 

## Obtaining the record count of a query

You can use the `_EntitiesMeta API` to obtain the total record count of a query. The meta query supports all the parameters that are supported in the `FindMany` query.

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
This will return a JSON object with a single property: `count`, which represents the total number of records that match the query.

## Obtaining the result count of a query

You can also use the meta query together with the `findMany` query to obtain the result count for a specific query.


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
This query will return two objects: `items` and `total`. The `items` object contains an array of records that match the specified criteria, while the `total` object contains the total number of records that match the query, as determined by the `_customersMeta` meta query.