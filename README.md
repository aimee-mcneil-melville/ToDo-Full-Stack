# Authentication with JSON Web Tokens (JWTs)

This repo contains a working app that includes CRUD operations for fruit :wink: It has the beginnings of authentication such as a `Nav` component with hyperlinks for registering and signing in and a component to conditionally hide/show its child components based on if the user is authenticated.

Your task is to complete the authentication implementation of this app.


## Setup

After cloning this repo, install dependencies with `npm install`. The `postinstall` script will create the database and populate the tables with test data.

Create a `.env` file by running `cp server/.env.example server/.env`. It contains `JWT_SECRET`, which you can use in your implementation. The `.env` file is listed in our `.gitignore`, so our secrets aren't available on GitHub.

Start the app with `npm run dev` and it will be running on [http://localhost:3000](http://localhost:3000).


## Overview

In order to complete the implementation of authentication for this app, we need to make changes on both the client-side and the server-side to enable user registration and sign-in. We're also going to protect certain routes (the ones that alter data) so that only authenticated users can call them. Here is a list of things we need to do:

### Client-side

- Determine if the current user is logged in or not
- Allow the user to register
- Allow the user to sign in
- Send the authorisation token with each request
- Allow the user to log off
- Hide/show components based on the user's auth status

### Server-side

- Create POST routes for `/auth/register` and `/auth/signin`
- Save a hash of the user's password instead of the clear text password
- Make the following routes accept only authenticated requests
    - PUT `/api/v1/fruits`
    - POST `/api/v1/fruits`
    - DELETE `/api/v1/fruits`

To make completing these steps a little easier, we'll be using the [authenticare](https://npmjs.com/package/authenticare) npm package. Authenticare does a lot of the work for us, so we'll just need to integrate the functions it exports into our app.

_Note: The `authenticare` library was built as a learning tool, __not__ for production. It's designed to help facilitate your understanding of adding authentication and authorisation to an application, but it's not a library you'll use in the real world._


## 0. Have a look around first

No need to rush into this. Get familiar with the code base first. There might be some patterns you haven't seen before.

For example, this codebase uses [`styled-components`](https://www.styled-components.com). There is also a nice use of `props.children` in the `Authenticated` components.

Get familiar with the user interface. Select some fruits, update their values, delete them, and add new ones.

Once you're comfortable enough with the app, proceed with a sense of curiosity :wink: as we enable authentication and lock down parts of the UI and some of the web API to only authenticated users.


## 1. Client-side: Determine if the current user is signed in

Our existing code contains a couple of clever `IfAuthenticated` and `IfNotAuthenticated` components in `client/components/Authenticated.jsx`. They render their child components based on the status of the user. Right now it is hard-coded to `true`. We need to make it reflect reality.

Fortunately, `authenticare/client` package exports an `isAuthenticated` function. Here are [the docs](https://github.com/enspiral-dev-academy/authenticare/blob/main/docs/client/isAuthenticated.md).

With that in place, you can now see the "Register" and "Sign in" links in the app now.

Now is a good time to commit your changes and swap driver/navigator.


## 2. Client-side: Allow the user to register

Our existing code already has a component where the user can supply their username and password to register. You can see this if you select the "Register" link on the top right of the home page. Note: If you see "Log off", ensure you've completed the previous step and refresh your browser.

In `client/components/Register.jsx`, you'll need to implement the `handleClick` function for the Register button.

To send a registration request to the server from our `Register` component, you'll call the `register` function available from `authenticare/client`. You can [read the docs here](https://github.com/enspiral-dev-academy/authenticare/blob/main/docs/client/register.md).

_Note: the `baseUrl` has already been imported for you at the top of the file._

After the call to `register`, we should redirect the user back to our home page (`'/'`). However, it would only make sense for that to happen if the user has actually been authenticated. _Hint: try the `isAuthenticated()` function from step 1._

We should now have enough implemented on the client-side to let the user register, but before we can test it, we need some server-side routes for the client to talk to.

Now is a good time to commit your changes and swap driver/navigator.


## 3. Server-side: Create auth routes

You'll need to create a file to hold these routes: `server/routes/auth.js`. Wire up your server (`server/server.js`) to use these auth routes with prefix of `/api/v1/auth` (because we told `authenticare/client` to make requests with this prefix in `client/config.js`).

`authenticare` is going to do all of the heavy lifting around responding to requests for new user registrations or user signins. There are 3 actions `authenticare` needs to do, but we need to provide the functions that perform these actions:

- determine if a username is already in use (whether a user exists)
- retrieve a user object based on its username
- create a new user

Fortunately, our `server/db/users.js` file already exports these functions:

- `userExists`
- `getUserByName`
- `createUser`

The `authenticare/server` package exports a function called `applyAuthRoutes`. [Check out the docs](https://github.com/enspiral-dev-academy/authenticare/blob/main/docs/server/applyAuthRoutes.md). Use `applyAuthRoutes` in `server/routes/auth.js`.

Now is a good time to commit your changes and swap driver/navigator.


## 4. Server-side: Adding users: hashing the user's password

While the `userExists` and `getUserByName` database functions in `server/db/users` are in place, you'll need to implement `createUser`. As per the `applyAuthRoutes` [documentation](https://github.com/enspiral-dev-academy/authenticare/blob/main/docs/server/applyAuthRoutes.md), `createUser` accepts a `user` object, which is going to have `username` and `password` properties (at least).

Think about what you're going to need this `createUser` function to do. It should:

* Determine whether the username is already taken (_hint: the `userExists` db function might come in handy!_) and throw an error if it's already in use.
* Create a _hash_ of the user's password. We __never__ save passwords as plain text. Authenticare exports a `generateHash` function - [the docs are here](https://github.com/enspiral-dev-academy/authenticare/blob/main/docs/server/generateHash.md).
* Save the new user, with their username and hashed password, to the `users` database table.

While we're here, you should also import and use the authenticare `generateHash` function in `server/db/seeds/users.js`.

You may decide at this point to reset the database by running `npm run db-reset`. This script will delete and recreate your `server/db/dev.sqlite3` database file and run the migrations and seeds.

Users should now be able to register! Navigate back to [localhost:3000](http://localhost:3000) and try it - verify that new user registrations are saving a hash of the password to the database.

Now is a good time to commit your changes and swap driver/navigator.


## 5. Client-side: Allow the user to sign in

Our existing code already has a component where the user can supply their username and password to sign in. You can see this if you select the "Sign in" link on the top right of the home page (you'll need to be logged out first).

In `client/components/SignIn.jsx`, you'll need to implement the `handleClick` function for the Sign In button.

To send a signin request to the server from our `SignIn` component, you'll call the `signIn` function available from `authenticare/client`. You can [read the docs here](https://github.com/enspiral-dev-academy/authenticare/blob/main/docs/client/signIn.md).

_Note: the `baseUrl` has already been imported for you at the top of the file._

After the call to `register`, we should redirect the user back to our home page (`'/'`). However, it would only make sense for that to happen if the user has actually been authenticated. _Hint: try the `isAuthenticated()` function from step 1._

We should now have enough implemented on the client-side to let the user sign in. We configured the server-side auth routes in step #3 so we should be able to sign in with a registered user.

Now is a good time to commit your changes and swap driver/navigator.


## 6. Server-side: Protect routes from unauthenticated requests

At the moment, we are able to add, update and delete fruit whether we are signed in or logged out. For our requirements, unauthenticated users can read data, but only authenticated users may add, update and delete fruit. We'll facilitate this on the client-side as well, but this step is about securing the Web API.

The `server/routes/fruits.js` file contains the fruit-related routes. To determine if a request is authenticated or not, we attempt to decode the token sent in the `Authorization` request header. This is often done as a piece of Express middleware.

The `authenticare/server` package exports a `getTokenDecoder` function that returns an Express middleware function, which we can use in our routes. For each of the `POST`, `PUT` and `DELETE` the fruit routes, apply this middleware function. [Check out the docs](https://github.com/enspiral-dev-academy/authenticare/blob/main/docs/server/getTokenDecoder.md) to see an example of how to do this.

Try to add, update or delete some fruit from the UI now. You should see errors in the developer tools console.

> Note: At this point you will not be able to add, update or delete fruits because the routes are protected and you're not yet sending the token in the requests. That's what you'll do in the next step. If you try, you will get an HTTP `401` (bad request - JWT malformed) response, which is exactly what you want.

Now is a good time to commit your changes and swap driver/navigator.


## 7. Client-side: Send the authorisation token with each request

In order to make authenticated requests, we must attach the token to each request we send to our API. Of course we will only have access to the token when the user is signed in. All requests from the client to the server are made from `client/api.js`.

`authenticare/client` exports a `getAuthorizationHeader` function. This will return the token that `authenticare` saves in localStorage, in a format you can use as a request header in your `superagent` requests. Set the result of `getAuthorizationHeader` to each of the `POST`, `PUT` and `PATCH` requests. [Check out the docs](https://github.com/enspiral-dev-academy/authenticare/blob/main/docs/client/getAuthorizationHeader.md) for more details, and an example of how to do this.

Now that we're sending the token to authenticate our requests, our attempts to add, update or delete fruit should succeed now.

Now is a good time to commit your changes and swap driver/navigator.


## 8. Client-side: Allow the user to log off

Logging off in this application is as simple as removing the `token` field from the localStorage. That's how `authenticare` determines if the current user has been authenticated. We can use the `logOff` function from `authenticare/client` to do this for us.

The link a user clicks in order to log off is currently in the `client/components/Nav.jsx` component. Add an `onClick` event handler to it that uses the `logOff` function from `authenticare/client`. [Check out the docs](https://github.com/enspiral-dev-academy/authenticare/blob/main/docs/client/logOff.md) if you need to. Once you're done, you should be able to log off, sign in, and register using the UI.

Now is a good time to commit your changes and swap driver/navigator.


## 9. Client-side: Hide/show components based on auth status

You won't need `authenticare` for this step. The components you need are already in place.

Use `IfAuthenticated` and `IfNotAuthenticated` from `client/components/Authenticated.jsx` to hide and show the update and delete buttons as well as the whole Add new section based on if the user is signed in. You'll need to import the components into `client/components/Fruits.jsx` before using the components. See `client/components/Nav.jsx` for inspiration.

Once you're finished you can see how the components will show and hide when you sign in and log out of the application.

Now is a good time to commit your changes and high five your pairing partner (or yourself)!

Nice work!
