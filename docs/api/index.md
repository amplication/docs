---
title: Generated APIs
---

# Generated APIs

Amplication generates production-ready REST and GraphQL APIs with [Swagger UI](https://swagger.io/tools/swagger-ui/) documentation for all your data models. Easily connect to your data with any HTTP client.

## REST APIs

Amplication generates REST APIs that provide you with a way to interact with your data models. Generated APIs include [authentication and authorization](#authentication) and follow strict RESTful conventions. Each generated REST API also comes with **sorting**, **filtering**, and **pagination** features.

### Sorting

Retrieve data in a specific order by applying sorting to your API requests. Sort data based on different fields in your data model.

```
GET /api/posts?orderBy[createdAt]=Asc
```

[Learn about sorting](/api/generated-api-sorting/#rest-api) REST API requests.

### Filtering

Filter data based on specific criteria by using query parameters in your API requests. Combine multiple filters for more specific results.

```
GET /api/posts?where[title][contains]=Development
```

[Learn about filtering](/api/generated-api-filtering/#rest-api) REST API requests.

### Pagination

Paginate API results to manage large datasets and provide a better user experience. Use the `skip` and `take` query parameters to control the number of results per page and the starting point.

```
GET /api/posts?skip=20&take=20
```

[Learn about paginating](/api/generated-api-pagination/#rest-api) REST API requests.

## GraphQL APIs

Besides REST APIs, Amplication also generates GraphQL APIs as an alternative way to help you interact with your data models. GraphQL APIs also support sorting, filtering, pagination, and **meta queries**.

### Sorting

Sort the retrieved data in a specific order by adding sorting arguments to your GraphQL queries. Control the sorting order based on fields defined in your data model.

```
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

[Learn about sorting](/api/generated-api-sorting/#graphql) GraphQL API requests.

### Filtering

Filter data based on specific criteria by adding filter arguments to your GraphQL queries. Combine multiple filters for more precise results.

```
query{
  posts(
    where:{
      title:{
        contains:"Development"
      }
    }
  ){
    id
    title
  }
}
```

[Learn about filtering](/api/generated-api-filtering/#graphql) GraphQL API requests.

### Pagination

Implement pagination in your GraphQL queries to handle large datasets and improve the user experience. Use the `skip` and `take` arguments to control the number of results and the starting point.

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

[Learn about paginating](/api/generated-api-pagination/#graphql) GraphQL API requests.

### Meta Queries

Use meta queries to gather additional information about your data, such as the total number of records or the aggregation of certain fields.

```
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

[Learn more about meta queries](/api/meta-query-graphql/) with your GraphQL API requests.

## Authentication

Amplication generates authentication mechanisms based on the NestJS/Passport library. It supports various authentication mechanisms like JWT-based authentication and custom authentication with Passport.

[Learn more about authorizing](/authentication/) your API requests.
