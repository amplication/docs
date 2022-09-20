---
id: react-todos-step-003
title: Adding Custom Endpoints
sidebar_label: Adding Custom Endpoints
slug: /tutorials/react-todos/step-003
---

# Adding Custom Endpoints

## Table of Contents

- [Step 1 - Creating Users](#step-1---creating-users)
- [Step 2 - Getting the Signed In User](#step-2---getting-the-signed-in-user)
- [Step 3 - Run It Again](#step-3---run-it-again)
- [Step 4 - Wrap Up](#step-4---wrap-up)

## Step 1 - Creating Users

In the previous step, we applied permissions to the `User` entity so that only users with the `User` role can create entries. This is generally secure, but we want to enable new users to also create an account. Instead of modifying the endpoint for creating a user, we will build a new endpoint specifically allowing a new user to be created.

1. Open `server/src/auth/auth.service.ts` in your IDE. In the `AuthService` class you'll see that there already exists a method, `login`, that validates a user and, if it is a valid user, returns an access token.

2. Here we will add a method to enable the users to sign up. Copy the below method after the `login` method, and take the time to read through the comments to get a better understanding of what this code does.

   ```ts
    async signup(credentials: Credentials): Promise<UserInfo> {
      // Extract the username and password from the body of the request
      const { username, password } = credentials;
      // Here we attempt to create a new user
      const user = await this.userService.create({
        data: {
          username,
          password,
          roles: ["todoUser"], // Here we assign every new user the `Todo User` role
        },
      });
      // If creating a new user fails throw an error
      if (!user) {
        throw new UnauthorizedException("Could not create user");
      }
      // Create an access token for the newly created user
      const accessToken = await this.tokenService.createToken({
        id: user.id,
        username,
        password,
      });
      // Return the access token as well as the some details about the user
      return {
        accessToken,
        username: user.username,
        id: user.id,
        roles: (user.roles as UserRoles).roles,
      };
    }
   ```

3. With the logic in place to create a new user, a new endpoint needs to be created in the `AuthController`. Open `server/src/auth/auth.controller.ts` and copy the following method into the `AuthController`.

   ```ts
   @Post("signup")
   async signup(@Body() body: Credentials): Promise<UserInfo> {
     return this.authService.signup(body);
   }
   ```

   Something that may look different if you haven't had exposure to TypeScript is this: `@Post("signup")`. The `@` is the annotation for a [decorator](https://www.typescriptlang.org/docs/handbook/decorators.html). Decorators are a feature that allows certain properties or logic to be easily assigned to a class, method, property, and more. This decorator sets up the `signup` method as a `POST` endpoint, with the path of `/signup`.

4. Finally, open `server/src/auth/auth.resolver.ts` and copy the following method into the `AuthResolver` class.

   ```ts
   @Mutation(() => UserInfo)
   async signup(@Args() args: LoginArgs): Promise<UserInfo> {
     return this.authService.signup(args.credentials);
   }
   ```

   Like above, this method also is using a decorator, specifically a `Mutation` decorator. This is used to set up the `signup` method as a mutation in our GraphQL server.

## Step 2 - Getting the Signed In User

Besides allowing for new users to be created, we also want to be able to get information about the user currently signed in.

1. Open `server/src/auth/token.service.ts`. Here the `TokenService` class is exported and is responsible for creating JWT tokens when a user signs in. The JWT token is the access token that authorizes our application to make requests to our backend and stores the username of the current user. We will want to be able to extract the username to find them in the `User` entity. So add the following method to this class:

   ```ts
   /**
    * @param bearer
    * @returns the username from a jwt token
    */
   decodeToken(bearer: string): string {
     return this.jwtService.verify(bearer).username;
   }
   ```

2. Return to `server/src/auth/auth.service.ts` and replace the imports at the top of the file with this:

   ```ts
   import {
      Injectable,
      UnauthorizedException,
      NotFoundException,
   } from "@nestjs/common";
   import { UserService } from "../user/user.service";
   import { Credentials } from "./Credentials";
   import { PasswordService } from "./password.service";
   import { TokenService } from "./token.service";
   import { UserRoles } from "./UserRoles";
   import { UserInfo } from "./UserInfo";
   import { User } from "../user/base/User";
   ```

3. Add the new `me` method to the `AuthService` class. This method will take the authorization header of an HTTP request, decode the JWT token to get the `username` of the current user, and then fetch and return the user object belonging to the user.

   ```ts
   async me(authorization: string = ""): Promise<User> {
      const bearer = authorization.replace(/^Bearer\s/, "");
      const username = this.tokenService.decodeToken(bearer);
      const result = await this.userService.findOne({
         where: { username },
         select: {
         createdAt: true,
         firstName: true,
         id: true,
         lastName: true,
         roles: true,
         updatedAt: true,
         username: true,
         },
      });
      if (!result) {
         throw new NotFoundException(`No resource was found for ${username}`);
      }

      return result;
   }
   ```

   To make this request via an HTTP call or a GraphQL query, we'll need to expose it in the `AuthController` and `AuthResolver` as we did with the `signup` method above.

4. Open `server/src/auth/auth.controller.ts` and replace the imports at the top of the file with this:

   ```ts
   import { Body, Controller, Post, Get, Req } from "@nestjs/common";
   import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
   import { Request } from "express";
   import { AuthService } from "./auth.service";
   import { Credentials } from "./Credentials";
   import { UserInfo } from "./UserInfo";
   import { User } from "../user/base/User";
   ```

5. Add the new `me` method to the `AuthController` class.

   ```ts
   @ApiBearerAuth()
   @ApiOkResponse({ type: User })
   @Get("me")
   async me(@Req() request: Request): Promise<User> {
    return this.authService.me(request.headers.authorization);
   }
   ```

   This method uses the `Get` decorator, meaning it's for `GET` requests as it's only used to fetch data. There are two other new decorators attached to this method as well: `ApiBearerAuth` and `ApiOkResponse`. While neither of them is necessary, they allow for the UI used to read our documented endpoints to show meaningful data for this endpoint. It says that a request to this endpoint must be authorized, that way we can get the JWT access token. Also, we are defining what type of object is being returned by this request; a `User` object.

6. Open `server/src/auth/auth.resolver.ts` and replace the imports at the top of the file with this:

   ```ts
   import * as common from "@nestjs/common";
   import { Args, Mutation, Query, Resolver, Context } from "@nestjs/graphql";
   import { Request } from "express";
   import * as gqlACGuard from "../auth/gqlAC.guard";
   import { AuthService } from "./auth.service";
   import { GqlDefaultAuthGuard } from "./gqlDefaultAuth.guard";
   import { UserData } from "./userData.decorator";
   import { LoginArgs } from "./LoginArgs";
   import { UserInfo } from "./UserInfo";
   import { User } from "../user/base/User";
   ```

7. Add the new `me` method to the `AuthResolver` class.

   ```ts
   @Query(() => User)
   async me(@Context('req') request: Request): Promise<User> {
     return this.authService.me(request.headers.authorization);
   }
   ```

## Step 3 - Run It Again

1. With the necessary updates to our backend in place let's spin up the backend and explore our self-documented REST endpoints. Run the following command:

   ```bash
   npm run start:backend
   ```

2. Once the backend is running, visit [http://localhost:3000/api/](http://localhost:3000/api/) and scroll down to the `auth` section. A new `POST` endpoint, `/api/signup`, will appear. The endpoint can be tested right there in the browser.

3. Click the endpoint to show more details, then click `Try it out`.

4. Change the value of `username` and `password` to any string value and click `Execute`.

   ![creating a user](./assets/step-003-001.png)

5. After clicking `Execute`, scroll down to see the result of the request.

   ![the result](./assets/step-003-002.png)

## Step 4 - Wrap Up

We will eventually need to make a few more changes to our backend, but now users can create an account as well as sign in with their existing account.

To view the changes for this step, [visit here](https://github.com/amplication/react-todos/compare/step-002...step-003).
