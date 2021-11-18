# Authentication with JSON Web Tokens (JWTs)

This repo contains a working app that includes CRUD operations for fruit :wink: It has the beginnings of authentication such as a `Nav` component with hyperlinks for registering and signing in and a component to conditionally hide/show its child components based on if the user is authenticated.

Your task is to complete the authentication implementation of this app.


## Setup

After cloning this repo, install dependencies with `npm install`. The `postinstall` script will create the database and populate the tables with test data.

Start the app with `npm run dev` and it will be running on [http://localhost:3000](http://localhost:3000).


## Overview

In order to complete the implementation of authentication for this app, we need to make changes on both the client-side and the server-side to enable user registration and sign-in. We're also going to protect certain routes (the ones that alter data) so that only authenticated users can call them. Here is a list of things we need to do:

### Client-side

- Determine if the current user is logged in or not
- Allow the user to register
- Allow the user to sign in
- Send the authorization token with each request
- Allow the user to log off
- Hide/show components based on the user's auth status

### Server-side

- Make the following routes accept only authenticated requests
    - PUT `/api/v1/fruits`
    - POST `/api/v1/fruits`
    - DELETE `/api/v1/fruits`

## 0. Have a look around first

No need to rush into this. Get familiar with the code base first. There might be some patterns you haven't seen before.

For example, this codebase uses [`styled-components`](https://www.styled-components.com). There is also a nice use of `props.children` in the `Authenticated` components.

Get familiar with the user interface. Select some fruits, update their values, delete them, and add new ones.

Once you're comfortable enough with the app, proceed with a sense of curiosity :wink: as we enable authentication and lock down parts of the UI and some of the web API to only authenticated users.

## 1. Auth0: Account Setup

### I. Auth0 Application Creation:
1. Open your browser, go to Auth0.com and signup for a new account. 
1. Enter the domain, in this format `cohortName-yourFirstName`, for example `matai-2021-john` 1️⃣. This value will be used later.
1. Select **Australia** as your *Region*.
1. Make sure **Development** is selected as the *Environment tag*.
1. Go to *Applications*, and click on *Create Application* button.
1. Click *Create*.
1. Give your application a name, for example `Fruits App`. 
1. Select **Single Page Web Applications** and click the *Create* button. This application will be used for our front-end app.
1. Select the **Settings** tab.
1. Auth0 generated a random **ClientId** 2️⃣, make a note of it, because we will use this value later.
1. Set the following values, in the *Application URIs* section:

| Setting                   | Value                                                     |
| ------------------------- | --------------------------------------------------------- |
| Allowed Callback Url      | `http://localhost:3000/, http://localhost:3000/register`  |
| Allowed Logout Url        | `http://localhost:3000/`                                  |
| Allowed Web Origins Url   | `http://localhost:3000/`                                  |


Scroll down to the bottom of the page and click the *Save Changes* button.

### II. Auth0 API Creation:
In order to protect our routes in the server-side, we need to verify that tokens passed from the client are valid. Creating an API that is linked to the Auth0 Application, the one that you just created, will check the token's validity.

1. On the side bar, create click *APIs* and click the *Create API* button.
1. Give your API a name, for example, `fruits`.
1. Set the *Identifier* field field to be `https://fruits/api` 3️⃣, this value will be used as our `audience` later.

## 2. Client-side: Configure Auth0Provider
In `client/index.js`, our `<App />` is wrapped by `<Auth0Provider />` and imported from `Auth0` package.

 Set the values in each attribute to the proper values from previous steps. See the [docs](https://auth0.com/docs/quickstart/spa/react/01-login#configure-the-auth0provider-component).

| Attribute  | Value                |
| ---------  | ---------------------| 
| `domain`   | in step 1️⃣          |
| `clientId` | in step 2️⃣          | 
| `audience` | `https://fruits/api` |

Refresh your browser and check the *Network* tab in the *Dev Tools*, if you see errors, then revise the steps above.

Commit your code and swap driver/navigator.

## 3. Client-side: Determine if the current user is signed in

Our existing code contains a couple of clever `IfAuthenticated` and `IfNotAuthenticated` components in `client/components/Authenticated.jsx`. They render their child components based on the status of the user.

Fortunately, `auth0` package exports a `useAuth0` hook. This hook exposes useful functions and values, here will use `isAuthenticated` boolean value that will check to see if there is an auth token, and that it hasn't yet expired. This hook does the checking behind the scenes. 

Right now there is a placeholder `isAuthenticated` function which is hard-coded to return `true`. Import the `useAuth0` hook, destructure the `isAuthenticated` and return this boolean variable.

With that in place, you can now see the "Register" and "Sign in" links in the app.

Now is a good time to commit your changes and swap driver/navigator.


## 4. Client-side: Reading user metadata

At this point our app can register, log in and log out users. We want to only allow users who have been authenticated in order to use server routes. When a user is signed in, we can call `getAccessTokenSilently` to get a token from Auth0 and pass it as a header when calling server-side routes that we want to protect.

In `client/auth0-utils.js`, `cacheUser` takes `useAuth0` as a first parameter. Call it and destructure:

- `getAccessTokenSilently` 
- `isAuthenticated`
- `user`

Call `getAccessTokenSilently` to get the access token and set it in the `userToSave` object. 

`user` is an object that has other properties. We are only interested in two:
- `sub` is the Auth0 subscriber's unique id.
- `email`

Use these values to set `userToSave` object.

_Note: everytime the `App` component renders the `cacheUser` will run. This will guarantee that our global state will always have the user's metadata._

## 5. Client-side: Allow the user to register and log in/out

In `client/components/Nav.jsx`, you will need to:
1. Import the `useAuth0` hook and use it inside the `Nav` component. 
1. Destructure the `logout` and `loginWithRedirect`.
1. Call these functions without passing any parameters.

We will call `loginWithRedirect` in the `handleRegister` and pass an object that will tell Auth0 to redirect to the `/register` route.
```
{
    redirectUri:`${window.location.origin}/register` 
}
```
When the "Register" link is clicked, it will redirect you to Auth0's authorization service and prompt you to enter an email and password. If this is your first time to sign in, click on **Sign up** below the **Continue** button. This form allows you to create a new user (subscription) that is only used for your Auth0 App. Even if you used the same email and password when creating a new tenant, Auth0 will treat it as a new account that is specific for your App.

If you register a new user, Auth0 will redirect you to `https://localhost:3000/register`. This page will show your `auth0Id` and `email`. 

Commit your code and swap driver/navigator.

## 6. Client-side: Passing access tokens

Now the access token is stored in global state and we want to pass it as a header when calling our server-side routes. In this step, we are going to read `auth0Id` and `token` in pass them as parameters to three functions in the `api.js`.

In `client/AddFruit.js` component, access the global state and get the `auth0Id` and `token` properties. Then pass them to the `AddFruit` as second and third parameters.

_hint: try using the useSelector hook from `react-redux` package._

In `client/SelectedFruits`, repeat the same steps. 

Commit your code and swap driver/navigator.

## 7. Server-side: JWT Middleware setup

In this step we are going to configure the `jwt` middleware.

In `server/auth0.js`, set `domain` and `audience` values. The `audience` should be `https://fruits/api`.

Everyime a route recieves an HTTP request, the checkJwt middleware will trigger and issue an HTTP request behind the scenes (machine to machine). The Auth0 service will compare the public signatures. If all goes well, `express` will execute the body of your route.

## 8. Server-side: Pass middleware to routes
Now our middleware is ready to be used.

1. Open `server/routes/fruits.js` 
1. Pass `checkJwt` as a second parameter for the following routes.
    1. `POST`
    1. `PATCH`
    1. `DELETE`

For example:
```
route.post('/', checkJwt, (req, res) => {
    // do stuff here
})
```

🎉 Congratulations 🎉
## 9. BONUS: Show/hide buttons
