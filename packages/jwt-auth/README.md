# Authentication with JSON Web Tokens (JWTs)

This repo contains a working app that includes CRUD operations for fruit. It has the beginnings of authentication such as a `Nav` component with hyperlinks for registering and signing in and a component to conditionally hide/show its child components based on if the user is authenticated.

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

Get familiar with the user interface. Select some fruits, update their values, delete them, and add new ones. See which work and which get errors.

Once you're comfortable enough with the app, proceed with a sense of curiosity as we enable authentication and lock down parts of the UI and some of the web API to only authenticated users.

## 1. Auth0: Account Setup

### I. Auth0 Application Creation:
1. Open your browser, go to Auth0.com and signup for a new account. 
1. For the User Type, select *Personal*, and tick *I need advanced settings*. 
1. The default domain will be something like `dev-fsdf1y29`, but you should overwrite it with a domain of your own, in the format `cohortName-yourFirstName`, for example `matai-2021-john` 1️⃣. This value will be used later.
1. Select **Australia** as your *Region*.
1. Click *Create Account*.
1. Make sure **Development** is selected as the *Environment tag*. This should be the default but you can check it by looking at what is displayed at the top left (in the black bar, immediately under your domain) or by going to *Settings*.
1. Go to *Applications*, and click theq *Create Application* button.
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
1. Set the *Identifier* field to be `https://fruits/api` 3️⃣, this value will be used as our `audience` later.

## 2. Client-side: Configure Auth0Provider
In `client/index.js`:  
1. Import `Auth0Provider` from the Auth0 package (this has been done for you).
1. Wrap your root component (in this case `App`) with `Auth0Provider` component (this has also been done for you, but make sure you understand what's happening). 
1. Set the values in each attribute to the proper values from previous steps. See the [docs](https://auth0.com/docs/quickstart/spa/react/01-login#configure-the-auth0provider-component).

| Attribute  | Value                                                              |
| ---------  | --------------------------------------------------------------------| 
| `domain`   | See 1️⃣ above, format is `cohortName-yourFirstName.au.auth0.com`    |
| `clientId` | See 2️⃣ above, this is the random string you made a note of earlier | 
| `audience` | See 3️⃣ above, `https://fruits/api`                                 |

Refresh your browser and check the *Network* tab in the *DevTools*, if you see errors, then revise the steps above.

At this stage it's normal that "Log off" displays (as if you were logged in), even though you're not logged in.

Commit your code and swap driver/navigator.

## 3. Client-side: Determine if the current user is signed in

Our existing code contains a couple of clever `IfAuthenticated` and `IfNotAuthenticated` components in `client/components/Authenticated.jsx`. They render their child components based on the status of the user.

Fortunately, `@auth0/auth0-react` package exports a `useAuth0` hook. This hook exposes useful functions and values. Here we will use the `isAuthenticated` boolean value to see if there is an auth token, and that it hasn't yet expired. This hook does the checking behind the scenes. 

Right now there is a placeholder `isAuthenticated` function which is hard-coded to return `true`. Import the `useAuth0` hook from `@auth0/auth0-react`, call it, destructure the `isAuthenticated` property off it, and return this boolean variable.

Note that the boolean and the function are both named `isAuthenticated`, take care to understand which one you're working with. 

With that in place, you can now see the "Register" and "Sign in" links in the app.

Now is a good time to commit your changes and swap driver/navigator.

## 4. Client-side: Allow the user to register and log in/out

In `client/components/Nav.jsx`, you will need to:
1. Import the `useAuth0` hook from `@auth0/auth0-react` and use it inside the `Nav` component. 
1. Destructure the `logout` and `loginWithRedirect` functions off the `useAuth0` hook.
1. Call these functions in the three handlers (instead of the `console.log` placeholders):

* In `handleLogoff` we'll call `logout`.
* In `handleRegister`, we'll call `loginWithRedirect` and pass an object that will tell Auth0 to redirect to the `/register` route.
```js
{
  redirectUri:`${window.location.origin}/register` 
}
```
* In `handleSignIn`, we'll call `loginWithRedirect` without a parameter.

The "Register" link will redirect you to Auth0's authorization service and prompt you to enter an email and password. If this is your first time signing in, click on **Sign up** below the **Continue** button. This form allows you to create a new user (subscription) that is only used for your Auth0 app. Even if you used the same email and password when creating a new tenant, Auth0 will treat it as a new account that is specific for your Fruits app.

After you've registered your new user, Auth0 will redirect you to `https://localhost:3000/register`. This page will show your `auth0Id` and `email`, which will be blank until you complete step 5.

Commit your code and swap driver/navigator.

## 5. Client-side: Reading user metadata

At this point our app allows users to register, log in and log out. We only want to allow a user to use our server routes if the user has been authenticated. When a user is signed in, we can call `getAccessTokenSilently` to get a token from Auth0 and pass it as a header when calling server-side routes that we want to protect.

In `client/auth0-utils.js`, `cacheUser` takes `useAuth0` as a first parameter. Call it and destructure:
- `getAccessTokenSilently` 
- `isAuthenticated`
- `user`
<br/>

Call `getAccessTokenSilently` to get the access token. The `getAccessTokenSilently` function is async so you'll need to use `await` or `.then`. Then use this token to set the token property on the `userToSave` object. 

The `user` object has other properties, we are interested in two of them:
- `sub` is the Auth0 subscriber's unique id.
- `email`
<br/>

Use these values to set the corresponding properties on the `userToSave` object.

_Note: The `cacheUser` function (from `auth0-utils.js`) does `store.dispatch(setUser(userToSave))`. Every time the `App` component renders, the `cacheUser` function runs, which guarantees that our global state will always have the user's metadata._

## 6. Client-side: Passing access tokens

So now the access token is stored in global state (see note above). Next we want to pass it as a header when calling our server-side routes. In this step, we are going to read `token` and pass it as a parameter to three functions in `api.js` (e.g. when we call the `addFruit` function of `api.js` from the `handleAdd` function of `AddFruit.jsx`).

In `client/components/AddFruit.jsx` access the global state and get the `token` property. 

_Hint: try using the useSelector hook from the `react-redux` package._<br/>
_Another hint: if you're not sure about the shape of the state, look at it in your Redux DevTools_

Then pass `token` to the `addFruit` function as the second parameter.

In `client/components/SelectedFruit.jsx`, repeat the same steps for `handleUpdate` and `handleDelete`.

Commit your code and swap driver/navigator.


## 7. Server-side: JWT Middleware setup

In this step we are going to configure the `jwt` middleware.

In `server/auth0.js`, set the `domain`(1️⃣) and `audience`(3️⃣) values. The format of `domain` should be `https://cohortName-yourFirstName.au.auth0.com` and `audience` should be `https://fruits/api`.

Every time a route receives an HTTP request, the checkJwt middleware will trigger and issue an HTTP request behind the scenes (machine to machine). The Auth0 service will compare the public signatures. If all goes well, `express` will execute the body of your route.

## 8. Server-side: Pass middleware to routes
There are three routes in `server/routes/fruits.js` that we want to be accessible only for authenticated users: `POST`, `PUT` and `DELETE`.

In each of these routes pass `checkJwt` as a second parameter, e.g.:
```javascript
route.post('/', checkJwt, async (req, res) => {
    // do stuff here
})
```
You'll need to import the `checkJwt` function from `server/auth0.js`.

Now our middleware is ready to be used.

🎉 Congratulations 🎉

## 9. BONUS: Show/hide buttons
Some of the buttons and/or links are only valid in certain circumstances (if you're logged in, if you're the person who created that fruit, etc.). What improvements can you make to the app so that users only see buttons/links that they're actually allowed to use? 
