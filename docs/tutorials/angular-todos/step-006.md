---
id: angular-todos-step-006
title: Using GraphQL | Angular Todos
sidebar_label: Using GraphQL
slug: /tutorials/angular-todos/step-006
---

# Using GraphQL | Angular Todos

## Table of Contents

- [Step 1 - GraphQL](#step-1---graphql)
- [Step 2 - Updating `AuthService`](#step-2---updating-authservice)
- [Step 3 - Updating `TasksService`](#step-3---updating-tasksservice)
- [Step 4 - Wrap Up](#step-4---wrap-up)

## Step 1 - GraphQL

So far we've handled communication with the Amplication backend by making HTTP requests. However, Amplication provides another way of interacting with the backend, GraphQL. GraphQL is a querying language that allows for readable commands with many benefits. If you want to know more about why GraphQL may be a better choice for your application I'd recommend reading [this article](https://www.apollographql.com/blog/graphql/basics/why-use-graphql/) by the Apollo team.

If you're running the backend (`npm run start:backend`) you can tinker with queries on the GraphQL Playground [http://localhost:3000/graphql](http://localhost:3000/graphql).

![GraphQL Playground](./assets/step-006-001.webp)

1. To make the GraphQL queries to the backend we'll use a library called `apollo-angular`, an Angular focused for the `@apollo/client` library. First, add `apollo-angular` as a dependency in the `web` subfolder:

   ```bash
   cd web
   ng add apollo-angular
   ```

   > You'll see a few prompts during the process, just click enter or `Y` to move forward.

   The command above will install all required dependencies for the `apollo-angular` library as well as create a GraphQL module and import it into the `AppModule`. There are some minor tweaks to the generated `GraphQLModule` we will want to make though.

2. We'll want to add the GraphQL API url to our `environment` object. In `web/src/environments/environment.ts` and `web/src/environments/environment.prod.ts` add the following property to the `environment` export:

   ```diff
   export const environment = {
      production: false,
      apiUrl: 'http://localhost:3000',
      jwtKey: 'accessToken',
   +   graphQL: 'http://localhost:3000/graphql',
   };
   ```

3. Open `web/src/app/graphql.module.ts` and add the following imports:

   ```diff
   import { NgModule } from '@angular/core';
   import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
   import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
   import { HttpLink } from 'apollo-angular/http';
   + import { setContext } from '@apollo/client/link/context';
   + import { environment } from '../environments/environment';
   ```

4. Replace the `uri` variable with the following:

   ```ts
   const uri = environment.graphQL;
   ```

5. Add the following function to add the JWT access token to the GraphQL requests:

   ```ts
   const authLink = setContext((_, { headers }) => {
     const token = localStorage.getItem(environment.jwtKey);
     return {
       headers: {
         ...headers,
         authorization: token ? `Bearer ${token}` : "",
       },
     };
   });
   ```

6. We'll also want to include the functions that check if an access token exists and to save a new access token.

   ```diff
   export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
      return {
   -      link: httpLink.create({ uri }),
   +      link: authLink.concat(httpLink.create({ uri })),
         cache: new InMemoryCache(),
      };
   }
   ```

> Since we will no longer be directly using the Angular `HttpClientModule` we can remove the `intercept` method from the `JWTService` (`web/src/app/jwt.service.ts`). Also in the `AppModule`'s (`web/src/app/app.module.ts`) `providers` replace `{ provide: HTTP_INTERCEPTORS, useClass: JWTService, multi: true }` with `JWTService`.

## Step 2 - Updating `AuthService`

Open up `web/src/app/auth.service.ts` and update the imports as so:

```diff
import { Injectable } from '@angular/core';
- import { HttpClient } from '@angular/common/http';
+ import { Apollo, gql } from 'apollo-angular';
import { of } from 'rxjs';
- import { catchError, mergeMap } from 'rxjs/operators';
+ import { catchError, map, mergeMap } from 'rxjs/operators';
import { JWTService } from './jwt.service';
- import { environment } from '../environments/environment';
```

Then replace the `HttpClient` in the `AuthService` constructor with `Apollo`:

```diff
export class AuthService {
-    constructor(private http: HttpClient, private jwt: JWTService) { }
+    constructor(private apollo: Apollo, private jwt: JWTService) { }

   me() {
```

1. First we'll update the `me` method by adding this `GET_ME` variable to the `auth.service.ts` file (above the `AuthService` class):

   ```ts
   const GET_ME = gql`
     query me {
       me {
         id
       }
     }
   `;
   ```

   Then replace the `me` method with the following:

   ```ts
   me() {
      return this.jwt.isStoredJwt
         ? this.apollo.query({ query: GET_ME }).pipe(
            catchError(() => of()),
            map(({ data }: any) => data?.me)
         )
         : of();
   }
   ```

   You'll notice that the query for the user account is broken up into two parts: `GET_ME` and `me`. The first variable, `GET_ME` is where the query is written. One of the benefits of GraphQL is that we tell the backend what data we want. In this case, all we need is the `id` of a user, so that's all these query requests.

   The `me` method will actually run the query.

2. Next we'll update the `login` method by adding this `LOGIN` variable to the `auth.service.ts` file (above the `AuthService` class):

   ```ts
   const LOGIN = gql`
     mutation login($credentials: Credentials!) {
       login(credentials: $credentials) {
         accessToken
       }
     }
   `;
   ```

   Then replace the `login` method with the following:

   ```ts
   login(username: string, password: string) {
      return this.apollo
         .mutate({
            mutation: LOGIN,
            variables: { credentials: { username, password } },
         })
         .pipe(
            catchError(() => of()),
            mergeMap(({ data }: any) => {
               const { login } = data;
               if (!login) {
                  alert('Could not login');
                  return of();
               }
               this.jwt.jwt = login.accessToken;
               return this.me();
            })
         );
   }
   ```

   Now, instead of referring to this as a query, we'll call this function a mutation. Queries are used to read data, mutations are used to write data. Logging in and signing up are technically writing data, as a session is being created in the backend.

   `LOGIN` is a mutation that takes the `username` and `password` of a user as an object and returns only the `accessToken` from the request.

   The `login` method will execute the mutation like the HTTP implementation. Instead of sending the credentials in the BODY of an HTTP request, credentials (and other arguments in general) are passed in a `variables` object. The key values of `variables` map to the variable names in the `mutation` we write. So `variables.credentials` in `this.apollo.mutate` maps to `$credentials` in `mutation login($credentials: Credentials!)`.

3. Finally we'll update the `signup` method by adding this `SIGNUP` variable to the `auth.service.ts` file (above the `AuthService` class):

   ```ts
   const SIGNUP = gql`
     mutation signup($credentials: Credentials!) {
       signup(credentials: $credentials) {
         accessToken
       }
     }
   `;
   ```

   Then replace the `signup` method with the following:

   ```ts
   signup(username: string, password: string) {
      return this.apollo
         .mutate({
            mutation: SIGNUP,
            variables: { credentials: { username, password } },
         })
         .pipe(
            catchError(() => of()),
            mergeMap(({ data }: any) => {
               const { signup } = data;
               if (!signup) {
                  alert('Could not sign up');
                  return of();
               }
               this.jwt.jwt = signup.accessToken;
               return this.me();
            })
         );
   }
   ```

## Step 3 - Updating `TasksService`

We'll next need to update the `TasksService` to use GraphQL. Open up `web/src/app/tasks.service.ts` and replace the code with the following:

```ts
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const CREATE_TASK = gql`
  mutation createTask($data: TaskCreateInput!) {
    createTask(data: $data) {
      completed
      createdAt
      id
      text
    }
  }
`;

const GET_TASKS = gql`
  query tasks($where: TaskWhereInput, $orderBy: [TaskOrderByInput!]) {
    tasks(where: $where, orderBy: $orderBy) {
      completed
      createdAt
      id
      text
    }
  }
`;

const UPDATE_TASK = gql`
  mutation updateTask($data: TaskUpdateInput!, $where: TaskWhereUniqueInput!) {
    updateTask(data: $data, where: $where) {
      completed
      createdAt
      id
      text
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private apollo: Apollo) {}

  create(text: string, uid: string) {
    return this.apollo
      .mutate({
        mutation: CREATE_TASK,
        variables: {
          data: {
            completed: false,
            text,
            uid: { id: uid },
          },
        },
      })
      .pipe(
        catchError(() => of()),
        map(({ data }: any) =>
          data ? data.createTask : alert('Could not create task')
        )
      );
  }

  getAll(uid: string) {
    return this.apollo
      .query({
        query: GET_TASKS,
        variables: {
          where: { uid: { id: uid } },
          orderBy: { createdAt: 'Asc' },
        },
      })
      .pipe(
        catchError(() => of()),
        map(({ data }: any) => {
          if (!data) {
            alert('Could not get tasks');
            return [];
          }

          return data.tasks;
        })
      );
  }

  update(task: any) {
    return this.apollo
      .mutate({
        mutation: UPDATE_TASK,
        variables: {
          data: {
            completed: !task.completed,
          },
          where: {
            id: task.id,
          },
        },
      })
      .pipe(
        catchError(() => of()),
        map(({ data }: any) =>
          data ? data.updateTask : alert('Could not update task')
        )
      );
  }
}
```

## Step 4 - Wrap Up

Run the application and play around!

![todos app using GraphQL](./assets/step-006-002.gif)

Users' tasks are now being saved to the Amplication backend with GraphQL queries and mutations rather than traditional HTTP requests.

Congratulations developer. Take with you what you've learned and build something amazing.

If you need help or want to share what you're up to then you should join our [Discord](https://discord.com/invite/KSJCZ24vj2).

To view the changes for this step, [visit here](https://github.com/amplication/angular-todos/compare/step-005...step-006).
