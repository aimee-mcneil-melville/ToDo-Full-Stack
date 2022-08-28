# Authentication with JSON Web Tokens (JWTs)

This repo contains a working app that includes CRUD operations for fruit. It has the beginnings of authentication such as a `<Nav>` component with hyperlinks for registering and signing in and a component to conditionally hide/show its child components based on if the user is authenticated.

Our task is to complete the authentication implementation of this app.

## Setup

### 0. Installation and migrations

- [ ] Clone this repo and `cd` into the new directory
- [ ] Install packages, run migrations and seeds, and start the dev server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    Commands might look like this:

    ```sh
    npm install
    npm run knex migrate:latest
    npm run knex seed:run
    npm run dev
    ```
  </details>

- [ ] Visit [http://localhost:3000](http://localhost:3000) in your browser

---

## Overview

In order to complete the implementation of authentication for this app, we need to make changes on both the client-side and the server-side to enable user registration and sign-in. We're also going to protect certain routes (the ones that alter data) so that only authenticated users can call them. 

<details>
  <summary>Requirements summary</summary>

  #### **Client-side**

  - Determine if the current user is logged in or not
  - Allow the user to register
  - Allow the user to sign in
  - Send the authorization token with each request
  - Allow the user to log off
  - Hide/show components based on the user's auth status

  #### **Server-side**

  The following routes should accept only authenticated requests

  - PUT `/api/v1/fruits`
  - POST `/api/v1/fruits`
  - DELETE `/api/v1/fruits`
  - GET `/api/v1/users`
  - POST `/api/v1/users`
</details>
<br />

### 1. Getting familiar with the app

- [ ] Explore the existing codebase
  <details style="padding-left: 2em">
    <summary>More about exploring the codebase</summary>
    
    No need to rush into this. There might be some patterns you haven't seen before.

    For example, this codebase uses [`styled-components`](https://www.styled-components.com). There is also a nice use of `props.children` in the `<Authenticated>` components.
  </details>

- [ ] Get familiar with the user interface
  <details style="padding-left: 2em">
    <summary>Tips</summary>
    At this stage it's normal that "Log off" displays (as if you were logged in), even though you're not logged in.

    Select some fruits and try to update their values, delete them, and add new ones. See which work and which give errors.

    Once you're comfortable enough with the app, proceed with a sense of curiosity as we enable authentication and lock down parts of the UI and some of the web API to only authenticated users.
  </details>

---

## Auth0 setup

### 2. Creating your user account
- [ ] Open your browser, go to Auth0.com and sign up for a new account
- [ ] Use the following settings to configure your user
  <details style="padding-left: 2em">
    <summary>User configuration settings (including value 1️⃣)</summary>

    1. For the "Role," select **Yes, coding**, and tick **I need advanced settings** (you don't need a chat with an expert)
    1. The default domain will be something like `dev-fsdf1y29`, but you should overwrite it with a domain of your own, in the format `cohortName-yourFirstName`, for example `matai-2021-john` 1️⃣. This value will be used later
    1. Select **Australia** as your **Region**
    1. Click **Create Account**
    1. Make sure **Development** is selected as the **Environment tag**. This should be the default but you can check it by looking at what is displayed at the top left (in the black bar, immediately under your domain) or by going to **Settings**
  </details>

### 3. Creating the "application"
- [ ] Go to **Applications**, and click the **Create Application** button
- [ ] Use the following settings to configure your application
  <details style="padding-left: 2em">
    <summary>App configuration settings (including value 2️⃣)</summary>

  1. Give your application a name, for example "Fruits App"
  1. Select **Single Page Web Applications** and click the **Create** button. This application will be used for our front-end app. On creating, you will be taken to the "Quick Start" tab of your new app
  1. Select the **Settings** tab
  1. Auth0 generated a random **ClientId** 2️⃣, make a note of it, because we will use this value later.
  1. Set the following values, in the **Application URIs** section:
  
    | Setting                   | Value                                                     |
    | ------------------------- | --------------------------------------------------------- |
    | Allowed Callback Url      | `http://localhost:3000/, http://localhost:3000/register`  |
    | Allowed Logout Url        | `http://localhost:3000/`                                  |
    | Allowed Web Origins Url   | `http://localhost:3000/`                                  |
  7. Scroll down to the bottom of the page and click the **Save Changes** button

### 4. Creating the application API

- [ ] On the side bar, expand **Applications**, click on **APIs**, then click the **Create API** button
  <details style="padding-left: 2em">
    <summary>More about the API</summary>

    In order to protect our routes in the server-side, we need to verify that tokens passed from the client are valid. Creating an API that is linked to the Auth0 Application, the one that you just created, will check the token's validity.
  </details>
- [ ] Give your API a name, for example, "fruits"
- [ ] Set the **Identifier** field to be `https://fruits/api` 3️⃣, this value will be used as our `audience` later

---

## Client-side
### 5. Configuring Auth0Provider

- [ ] Open `client/index.js` and see how `<Auth0Provider>` has been used 
  <details style="padding-left: 2em">
    <summary>More about <code>&lt;Auth0Provider&gt;</code></summary>

    - `<Auth0Provider>` has been imported from the Auth0 package. 
    - `<Auth0Provider>` wraps the `<App>` component
    - `<Auth0Provider>` has some attributes with no value, yet
  </details>

- [ ] Set the values in each attribute of `<Auth0Provider>` to the proper values from previous steps, marked 1️⃣, 2️⃣, and 3️⃣
  <details style="padding-left: 2em">
    <summary>More about these attributes</summary>

    See the [docs for the provider component](https://auth0.com/docs/quickstart/spa/react/01-login#configure-the-auth0provider-component).

    | Attribute  | Value                                                              |
    | ---------  | -------------------------------------------------------------------| 
    | `domain`   | See 1️⃣ above, format is `cohortName-yourFirstName.au.auth0.com`    |
    | `clientId` | See 2️⃣ above, this is the random string you made a note of earlier | 
    | `audience` | See 3️⃣ above, `https://fruits/api`                                 |
  </details>

- [ ] Refresh your browser and check the **Network** tab in the **DevTools**, if you see errors, then double check the steps above

Commit your code and swap driver/navigator.

### 6. Determining if the current user is signed in

- [ ] Explore `client/components/Authenticated.jsx` and the use of `isAuthenticated`
  <details style="padding-left: 2em">
    <summary>More about <code>isAuthenticated</code></summary>

    Our existing code contains a couple of clever `<IfAuthenticated>` and `<IfNotAuthenticated>` components in `client/components/Authenticated.jsx`. They render their child components based on the authentication status of the user.

    Fortunately, `@auth0/auth0-react` package exports a `useAuth0` hook. This hook exposes useful functions and values. Here we will use the `isAuthenticated` boolean value to see if there is an auth token, and that it hasn't yet expired. This hook does the checking behind the scenes. 

    Right now there is a placeholder `isAuthenticated` function which is hard-coded to return `true`.    
  </details>
  
- [ ] Import the `useAuth0` hook from within `@auth0/auth0-react`
- [ ] Call `useAuth0` within the isAuthenticated **function**, destructure the `isAuthenticated` **property** out of it and return this boolean variable
  <details style="padding-left: 2em">
    <summary>Tips</summary>

    Note that the boolean and the function are both named `isAuthenticated`, take care to understand which one you're working with. 

    With that in place, you can now see the "Sign in" link in the app.
  </details>

Now is a good time to commit your changes and swap driver/navigator.

### 7. Allowing the user to log in/out using Auth0

In `client/components/Nav.jsx`:

- [ ] Import the `useAuth0` hook from `@auth0/auth0-react` and use it inside the `<Nav>` component
- [ ] Destructure the `logout` and `loginWithRedirect` functions out of the `useAuth0` hook
- [ ] Call these functions in the two handlers (instead of the `console.log` placeholders)
  <details style="padding-left: 2em">
    <summary>More about login and logout handlers</summary>

    * In `handleLogoff` we'll call `logout`
    * In `handleSignIn`, we'll call `loginWithRedirect`

    The "Sign In" link will redirect you to Auth0's authorization service and prompt you to enter an email and password. If this is your first time signing in, click on **Sign up** below the **Continue** button. This form allows you to create a new user (subscription) that is only used for the one Auth0 app. Even if you used the same email and password when creating an account on a different app, Auth0 will treat it as a new account that is specific to your Fruits app.

    After you've registered your new user, you will be redirected back to `https://localhost:3000` and "Log off" will again be visible in the app. <ins>This behaviour will change a couple times, before we're done</ins>.
  </details>

Commit your code and swap driver/navigator.

### 8. Reading user metadata in `App.jsx`

In `client/components/App.jsx`:

- [ ]  Delete the hard-coded values for `isAuthenticated`and `getAccessTokenSilently` and replace those lines with values destructured out of `useAuth0`
  <details style="padding-left: 2em">
    <summary>More about <code>useAuth0</code> in `App.jsx`</summary>

    At this point our app allows users to register/log in and log out using the Auth0 service, but there are two places our app needs access to the user data generated by Auth0. One of them is in `client/components/App.jsx`.
    
    Notice `isAuthenticated`, and `getAccessTokenSilently`, two variables that are currently hard-coded and need to be replaced. They are used inside the `useEffect` hook, a few lines later.

    To replace the hard-coded consts, call useAuth0 and destructure:
    - `getAccessTokenSilently` 
    - `isAuthenticated`

    Make sure you delete the original `isAuthenticated`, and `getAccessTokenSilently`.

    When a user is signed in, we can call `getAccessTokenSilently` to get a token from Auth0. 
  </details>

<details>
  <summary><ins>What's happening with <code>useEffect</code>?</ins></summary>
  
  The `useEffect` hook (in `App.jsx`) will run anytime the user's Auth0 authentication status updates (i.e. when `isAuthenticated` changes) indicating the user has logged in or logged out. If the user is authenticated (logged in) it will use their token to request user information from the database. If user information is received, `updateLoggedInUser(userInDb)` will be dispatched and their user information added to the Redux global state. If they do not have information present in the database they will be taken to the `/register` url. Our site will now direct us to the `/register` url (but this behaviour will change one more time).
</details>
<br />

### 9. Reading user metadata in `client/auth0-utils.js`
- [ ] In `cacheUser`, call `useAuth0` and destructure `getAccessTokenSilently`, `isAuthenticated`, `user` out of it

- [ ] Call `getAccessTokenSilently` to get the access token, then use this token to set the token property on the `userToSave` object
  <details style="padding-left: 2em">
    <summary>Tip</summary>
    
    The `getAccessTokenSilently` function is async so you'll need to use `await` or `.then`.
  </details>

- [ ] Destructure the `sub` and `email` properties from the `user` object, and use them to set the corresponding properties on the `userToSave` object

<details>
  <summary><ins>What's happening with <code>cacheUser</code>?</ins></summary>
  
  The `cacheUser` function dispatches `updateLoggedInUser(userToSave)`. Every time the `<App>` component renders, the `cacheUser` function runs, which guarantees that our global state will always have the user's metadata, including their token. We will later pass this token as a header when calling server-side routes that we want to protect.
</details>
<br />

### 10. Passing access tokens

We only want to allow a user to use our server routes if the user has been authenticated. Now that the access token is stored in global state, we want to pass it as a header when calling our server-side routes.

- [ ] In `client/components/AddFruit.jsx` access the global state and get the `token` property
  <details style="padding-left: 2em">
    <summary>Tips</summary>

    - Try using the `useSelector` hook from the `react-redux` package
    - If you're not sure about the shape of the state, look at it in your Redux DevTools
  </details>

- [ ] Pass `token` to the `addFruit` function as the second parameter
- [ ] In `client/components/SelectedFruit.jsx`, repeat the same steps for `handleUpdate` and `handleDelete`

Commit your code and swap driver/navigator.

---

## Server-side

### 11. Setting up the JWT Middleware

- [ ] In `server/auth0.js`, set the `domain`(1️⃣) and `audience`(3️⃣) values
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    The format of `domain` should be `https://cohortName-yourFirstName.au.auth0.com` and `audience` should be `https://fruits/api`.
  </details>

### 12. Passing middleware to routes
There are three routes in `server/routes/fruits.js` and two routes in `server/routes/users.js` that we want to be accessible only for authenticated users.

- [ ] In each of the routes we want to protect, pass `checkJwt` as a second parameter
  <details style="padding-left: 2em">
    <summary>More about protecting routes</summary>
    
    The following routes should accept only authenticated requests

    - PUT `/api/v1/fruits`
    - POST `/api/v1/fruits`
    - DELETE `/api/v1/fruits`
    - GET `/api/v1/users`
    - POST `/api/v1/users`

    Passing `checkJwt` to the route might look like...
    
    ```javascript
    route.post('/', checkJwt, (req, res) => {
        // do stuff here
    })
    ```

    You'll need to import the `checkJwt` function from `server/auth0.js`.
  </details>

<details>
  <summary><ins>What's happening with the middleware?</ins></summary>

  Every time a route receives an HTTP request, the `checkJwt` middleware will be activated and issue an HTTP request behind the scenes (machine to machine). The Auth0 service will compare the public signatures. If all goes well, `express` will execute the body of your route.
</details>
<br />

Now our middleware is ready to be used.

🎉 Congratulations, you made it! 🎉

## Stretch

<details>
  <summary>More about stretch challenges</summary>

  Some of the buttons and/or links are only valid in certain circumstances (if you're logged in, if you're the person who created that fruit, etc.). What improvements can you make to the app so that users only see buttons/links that they're actually allowed to use?
</details>
