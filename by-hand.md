# API Authentication Tutorial

* Issue token
* Apply token
* Secure routes

## Issue token

Issuing a token is akin to registering for a new account. Once issued, the client will apply the token to each API call. The token represents the user's credentials, just like a username and password, but for API calls.

### Summary steps

1. Install dependencies
2. Create a `/api/v1/auth/register` route
3. Create a `users` table in the database and a module to work with it
4. Hash the password and save the hash instead of the clear-text password
5. Create a JSON Web Token (JWT) and issue it to the client

### Detailed steps

1. We're going to be POSTing JSON to our endpoints so we're going to need to tell Express how to process the body of the request messages.

    <details><summary>Show code</summary>

    ```js
    // server/server.js
    ...
    server.use(express.json())
    ```

    </details>

1. Create a new `server/routes/auth.js` file for your auth routes. The route should expose a `POST /api/v1/auth/register` route that accepts a JSON object with `username` and `password` properties. The `/api/v1/auth` part will be defined in `server/server.js` when we apply the router as middleware. Use a named `register` function for the route's callback instead of a typical inline anonymous function. _You'll see why in a later step._ You can leave the route empty at this point. We need the next step to complete it.

    <details><summary>Show code</summary>

    ```js
    // server/routes/auth.js
    const express = require('express')

    const router = express.Router()

    router.post('/register', register)

    function register (req, res) {
      const {username, password} = req.body
      // TODO: make sure username doesn't already exist
      // TODO: if not, hash the password and add the user to the database
    }

    module.exports = router
    ```

    </details>

1. Before we can complete this `/register` route, we need a place to save the new user. Here is an example knex migration you can use for your `users` table. Notice we have set `username` to be `unique()`. This produces a `UNIQUE CONSTRAINT` in the database, helping us avoid duplicate usernames which can cause all sorts of problems!

    ```js
    exports.up = (knex, Promise) => {
      return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('username').unique()
        table.string('hash')
      })
    }

    exports.down = (knex, Promise) => {
      return knex.schema.dropTable('users')
    }
    ```

    Apply a migration so your database has a `users` table like the one above.

    <details><summary>Show terminal commands that use a yarn knex script</summary>

    ```shell
    yarn knex migrate:make users
    # edit the migration file to be like the one above
    yarn knex migrate:latest
    ```

    </details>

1. We should make the connection available to our other database functions. You know this stuff by now, but just in case, create a `server/db/connection.js` file that exports your Knex connection.

    <details><summary>Show code</summary>

    ```js
    // server/db/connection.js
    const environment = process.env.NODE_ENV || 'development'
    const config = require('../../knexfile')[environment]
    const connection = require('knex')(config)

    module.exports = connection
    ```

    </details>
  
1. Now we need a way to save the new user to the database. We don't need to check for an existing (duplicate) username, because of the `unique()` constraint we put on the field in our migration. Create a `server/db/users.js` file that exports this function:

      * `createUser(newUser:{username:string, password:string}):Promise`

    For now, just save the password in the `hash` field. We'll generate the hash in a later step.

    <details><summary>Show code</summary>

    ```js
    // server/db/users.js
    const connection = require('./connection')

    module.exports = {
      createUser
    }

    function createUser ({username, password}, db = connection) {
      return db('users').insert({username, hash: password})
    }
    ```

    </details>

1. Let's return to our `/register` route and make it add the new user if the username is available. Be sure to `require` the new `server/db/users.js` file and use its functions to complete the `register` function. Don't forget to check if any error messages contain a notice about the username already existing in your catch block. Try creating some duplicate users to see what the database says.

    * If the username is already taken, send back a status `400` and this JSON object: `{ok: false, message}`.
    * If the username is available, add the user and respond with a status `201` and this JSON object: `{ok: true}`.
    * If there is an error, respond with a status `500` and this JSON object: `{ok: false, message: 'Unknown error.'}`.

    <details><summary>Show code</summary>

    ```js
    // server/routes/auth.js
    const {createUser} = require('../db/users')

    // ...

    function register (req, res) {
      const {username, password} = req.body
      createUser({username, password})
        .then(() => res.status(201).json({ok: true}))
        .catch(({message}) => {
          // This is vulnerable to changing databases. SQLite happens to use
          // this message, but Postgres doesn't.  
          if (message.includes('UNIQUE constraint failed: users.username')) {
            return res.status(400).json({
              ok: false,
              message: 'Username already exists.'
            })
          }
          res.status(500).json({
            ok: false,
            message: "Something bad happened. We don't know why."
          })
        })
    }
    ```

    </details>

1. To make sure we can save new users, wire up the `/api/v1/auth/register` route into `server/server.js` and, using Postman, verify that when you can post a new user, it is saved to the database. Also verify you get back the expected HTTP response code when the username is already in use.

    <details><summary>Show code</summary>

    ```js
    // server/server.js
    const express = require('express')

    const authRoutes = require('./routes/auth')

    const server = express()
    server.use(express.json())

    server.use('/api/v1/auth', authRoutes)

    module.exports = server
    ```

    </details>

1. Saving plaintext passwords is _huge_ no-no. So let's fix that using the `libsodium-wrappers` npm package (which contains the `libsodium.js` library). Install `libsodium-wrappers` as a normal dependency. Note: the package `sodium` also exists, but is a very different beast. The `libsodium-wrappers` package has no 'native' code (it's just JavaScript) so can be easier to install and use. Sometimes you'll need a _native code_ version like `sodium` (`node-sodium`) which can handle higher memory limits and performs faster than the all-JavaScript version, but we don't need that today.

    <details><summary>Show terminal command</summary>

    ```shell
    yarn add libsodium-wrappers
    ```

    </details>

1. Write a new `hash.js` module in a new `server/auth` folder. We'll use this folder to hold some auth-related helper function. The `hash` module should export a `generate` function that takes the clear-text password as its only parameter, and use `libsodium` to return a hash of that password.

    <details><summary>Show code (don't worry, nobody memorises this stuff!)</summary>

    ```js
    const sodium = require('libsodium-wrappers')

    module.exports = {
      generateHash
    }

    function generateHash (password) {
      // We have to wait for sodium to initialise. sodium.ready is a promise.
      return sodium.ready.then(() =>
        sodium.crypto_pwhash_str(
          password,
          sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
          sodium.crypto_pwhash_MEMLIMIT_MIN
        )
      )
    }
    ```

    </details>

1. We want to make it impossible to ever store a plaintext password. So call `generateHash` from the `createUser` function in `server/db/users.js`. Don't forget to import the `generateHash` function.

    <details><summary>Show code</summary>

    ```js
    // server/db/users.js
    const {generateHash} = require('../auth/hash')

    // ...

    function createUser ({username, password}, db = connection) {
      return generateHash(password)
        .then(hash => db('users').insert({username, hash}))
    }
    ```

    </details>

    Start the server and use Postman to register new users. Look in your database and ensure the `hash` field for new users is a hash and not their clear-text password.

1. The last step in registering a new user is to create and issue a JSON Web Token (JWT) the client can use when making future requests to protected endpoints. For this we're going to use the `jsonwebtoken` npm package.

    To ensure a JWT is valid, it is signed with a secret string. We normally keep that string in an environment variable on the server. Let's use the `dotenv` npm package to help us manage our environment variables.

    Install `jsonwebtoken` and `dotenv` as a normal dependencies.

    <details><summary>Show terminal command</summary>

    ```shell
    yarn add jsonwebtoken dotenv
    ```

    </details>

1. The `dotenv` package reads our environment variables from a `.env` file. Each line in the file is a new environment variable and follows this format:

    `NAME_OF_ENV_VAR=value_of_environment_variable`

    Create this file in the root of your project with a `JWT_SECRET` variable and a value of at least 20 characters.

    <details><summary>Show a sample `.env`</summary>

    ```
    JWT_SECRET=a31sl86dfk862jsd54lfk123lksjhd92
    ```

    </details>

1. **This is important**. Add the `.env` file to your `.gitignore`. You don't ever want this file to be committed to your source repository.

    <details><summary>Show code</summary>

    ```
    # .gitignore
    node_modules
    bundle*
    *.sqlite
    .env
    ```

    </details>

1. To enable the `dotenv` package so the environment variables are available, call its `config` function as early as possible in the server startup code (e.g. at the top of `server/index.js`).

    <details><summary>Show code</summary>

    ```js
    // server/index.js
    require('dotenv').config()
    const server = require('./server')

    const port = process.env.PORT || 3000

    server.listen(port, () => console.log('Listening on port', port))
    ```

    </details>

1. The JWT we issue should contain the user's ID, so we need to add the ID the database returns after the insert to a location where our token generating function can get at it. With a more advanced database we could also obtain other user data on return (username, perhaps authorization claims) but we don't really need them since the user's ID is enough to uniquely identify them.

    Modify `register` so that the ID from the database is added to [res.locals](https://expressjs.com/en/4x/api.html#res.locals) as `res.locals.userId.

    <details><summary>Show code</summary>

    ```js
    // server/routes/auth.js

    // ...

      createUser({username, password})
        .then(([id]) => {
          // Be sure to grab the id out of the array Knex returns it in!
          // You can use array destructuring (as above) if you like.
          res.locals.userId = id
          // ...
    ```

    </details>

1. Let's put the code for signing and issuing the token in a new `server/auth/token.js` module. This module should export an `issue` function. Because we're going to use it as Express middleware, it should have this signature:

    `issue(req:Request, res:Response)`

    This function should use a `res.locals.id` property (which we'll set in the next step) to create a JWT. The JWT secret is available from `process.env.JWT_SECRET`. The `sign` function from the `jsonwebtoken` package has this signature:

    `sign(user:Object, secret:string, options:Object)`

    The `options` parameter has an `expiresIn` property that is in [zeit/ms](https://github.com/zeit/ms) format.

    <details><summary>Show code for `server/auth/token.js`</summary>

    ```js
    // server/auth/token.js
    const jwt = require('jsonwebtoken')

    module.exports = {
      issue
    }

    function issue (req, res) {
      res.json({
        ok: true,
        message: 'Authentication successful.',
        token: createToken(res.locals.userId)
      })
    }

    function createToken (id) {
      return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'})
    }
    ```

    </details>

1. The last step to implement user registration is to add the `token.issue` middleware function to the `register` route in `server/routes/auth.js`. For this part, it's helpful to know that all the Express routes you've ever defined had a third parameter we never used: `next`! It just means, go to the next middleware function in the [middleware stack](https://expressjs.com/en/guide/using-middleware.html#middleware.application). Here's what we're going to do:

    * Import `server/auth/token`
    * Add `token.issue` as the 3rd parameter to `router.post('/register')`
    * Add `next` as the 3rd parameter to the `register` function
    * After the user is created, call `.then(() => next())` instead of the `res.json` call

    <details><summary>Show code</summary>

    ```js
    // server/routes/auth.js
    const express = require('express')

    const {createUser} = require('../db/users')
    const token = require(../auth/token)

    const router = express.Router()

    router.post('/register', register, token.issue)

    function register (req, res, next) {
      const {username, password} = req.body
      createUser({username, password})
        .then(([id]) => {
          // Be sure to grab the id out of the array Knex returns it in!
          // You can use array destructuring (as above) if you like.
          res.locals.userId = id
          next()
        })
        .catch(({message}) => {
          // Fairly blunt error checking.
          if (message.includes('UNIQUE constraint failed: users.username')) {
            return res.status(400).json({
              ok: false,
              message: 'Username already exists.'
            })
          }
          res.status(500).json({
            ok: false,
            message: "Something bad happened. We don't know why."
          })
        })
    }

    module.exports = router
    ```

    </details>

1. Now use Postman to register new users. You should see the JWT in the response body.

## Apply token

Now that the user has been issued a JWT token, it can use it for authentication when requesting a secured endpoint. Because JWTs are intended to be stateless, we effectively _sign in_ during each API call. We do this by adding it as an `Authorization` HTTP header to each request. This screenshot illustrates how to add the header using Postman:

![Adding a JWT token in Postman](add-jwt-token.png)

Notice how the token returned during registration is after `Bearer ` in the value of the header (there is a space between `Bearer` and the token value). Now let's verify that token.

### Summary steps

1. Install dependencies
2. Create a middleware function to verify and decode the JWT
3. Use the contents of the token

### Detailed steps

We must be able to verify the authenticity of the token provided before we trust it. We can do this because it was signed with a secret (`JWT_SECRET`). Once we know we can trust it, we can decode it to extract the user's ID , which we can use to get any other user information we require to fulfil the request.

1. As we saw above, the token will come in on the `Authorization` header. The `express-jwt` package is capable of getting the token out of the header, verifying its authenticity and populating `req.user` with the contents of the decoded token. We just need to give it the secret we used to sign it. Install `express-jwt` as a normal dependency.

    <details><summary>Show terminal command</summary>

    ```shell
    yarn add express-jwt
    ```

    </details>

1. The `express-jwt` package exports a function. Let's name it `verifyJwt`. It _creates_ a middleware function for us which will check JWTs before allowing access to a route. Like so:

    ```js
    // server/routes/auth.js
    const verifyJwt = require('express-jwt')

    // ...

    router.post('/register', register, token.issue)

    router.get(
      '/route-we-want-to-protect',
      verifyJwt({secret: process.env.JWT_SECRET}),
      routeWeWantToProtect
    )

    function routeWeWantToProtect (req, res) {
      // ...
    }
    ```

    </details>

1. To test this is working correctly, let's create an `/api/v1/auth/user` route that returns the user data of the requester. The user ID is encoded into the token so it will be on the `req.user` object once we arrive at the route handling function.

    Start with creating a `GET /user` route in `server/routes/auth.js` that looks similar to the example at the beginning of step 2. In the route, go to the database for user details based on the user's ID and respond with a JSON object that has a `username` property.

    **Important**: do _not_ ever respond with the user's password hash! It's an easy enough mistake to make. Triple check what actually ends up in your response, just to be sure.

    <details><summary>Show code</summary>

    ```js
    // server/routes/auth.js
    router.get(
      '/user',
      verifyJwt({secret: process.env.JWT_SECRET}),
      user
    )

    function user (req, res) {
      getUser(req.user.id)
        .then(({username}) =>
          res.json({
            ok: true,
            username
          }))
        .catch(() =>
          res.status(500).json({
            ok: false,
            message: 'An error ocurred while retrieving your user profile.'
          }))
    }
    ```

    </details>

    Make sure you've registered a new user and captured the JWT token in the response body. Configure postman with the `Authorization` header and issue a `GET` request to `/api/v1/auth/user`. If all is well, the response will be:

    ```js
    {
      "ok": true,
      "username": "your username"
    }
    ```

    Congratulations! You're verifying JWT tokens!

1. You might notice the default error output from a bad token is pretty ugly (try removing a character from the token and sending it)!  We can add a custom error handler to our route that takes care of this:


    ```js
    // server/routes/auth.js
    router.use(userError)

    // ...

    function userError (err, req, res, next) {
      if (err.name === 'UnauthorizedError') {
        res.status(401).json({ok: false, message: 'Access denied.'})
      }
    }
    ```
