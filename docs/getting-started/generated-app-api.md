---
id: generated-app-api
title: REST and GraphQL API
sidebar_label: REST and GraphQL API
slug: /api
# The slug of this page should not be changed since it is referenced from the Admin UI sign in page
---

# REST and GraphQL API

Amplication generates production-ready REST and GraphQL APIs with documentation and playgrounds for all your data models.
Easily connect to your data with any HTTP client.

## REST APIs

Amplication generates REST APIs that provide a way to interact with your data models. Generated APIs include [authentication and authorization](#authentication) and follow strict RESTful conventions. Each generated REST API also comes with **sorting**, **filtering**, and **pagination** features.

The REST API is available at `/api` at the root of your application.

### Sorting

Retrieve data in a specific order by applying sorting to your API requests. Sort data based on different fields in your data model.

```
GET /api/posts?orderBy[createdAt]=Asc
```

[Learn about sorting](/api/generated-api-sorting/#rest-api) REST API requests.

### Filtering

Filter data based on specific criteria by using query parameters in your API requests. Combine multiple filters for more specific results.

```
GET /api/posts?where[title][contains]=Node.js
```

[Learn about filtering](/api/generated-api-filtering/#rest-api) REST API requests.

### Pagination

Paginate API results to manage large datasets and provide a better user experience. Use the `skip` and `take` query parameters to control the number of results per page and the starting point.

```
GET /api/posts?skip=20&take=20
```

[Learn about paginating](/api/generated-api-pagination/#rest-api) REST API requests.

### Swagger UI 

For development purposes, you can use Swagger UI to execute requests against the API.
When you navigate directly to `/api` you will see the swagger documentation of your API with a list of all resources and actions.

First, click on the **Authorize** button and enter the username and password. 
It will add the authorization header automatically.

![Swagger UI](./assets/generated-app-api/swagger-ui.png)

## GraphQL APIs

Besides REST APIs, Amplication also generates a GraphQL API as an alternative way to help you interact with your data models. The GraphQL API also support sorting, filtering, pagination, and **meta queries**.

The GraphQL API is available at `/graphql` at the root of your application.

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
        contains:"Node.js"
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

### GraphQL Playground

For development purposes, you can use the GraphQL Playground to execute queries and mutations against the API.
When you navigate directly to `/graphql` you will see the GraphQL Playground provided by Apollo Server.

First, click on the **HTTP HEADERS** tab at the bottom of teh screen and add the authorization header in the following format:

```
{
  "Authorization": "Basic YWRtaW46YWRtaW4="
}
```

![Swagger UI](./assets/generated-app-api/graphql-playground.png)

:::tip
The GraphQL Playground available at `/graphql` is only available for development.
If you want to **enable it for production**, set the following two flags to *true*:

- `GRAPHQL_PLAYGROUND`
- `GRAPHQL_INTROSPECTION`
:::

## Authentication

Amplication generates authentication mechanisms based on the NestJS/Passport library. It supports various authentication mechanisms like JWT-based authentication and custom authentication with Passport.

[Learn more about authorizing](/authentication/) your API requests.
