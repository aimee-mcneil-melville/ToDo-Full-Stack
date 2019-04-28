# Authentication with JSON Web Tokens (JWTs)

This repo contains a working app that includes CRUD operations for fruit :wink: It has the beginnings of authentication such as a `Nav` component with hyperlinks for registering and signing in and a component to conditionally hide/show its child components based on if the user is authenticated.

Your task is to complete the authentication implementation of this app.


## Setup

After cloning this repo, install dependencies with `npm install`. The `postinstall` script will create the database and populate the tables with test data.

Create a `.env` file by running `cp .env.example .env`. It contains `JWT_SECRET`, which you can use in your implementation and `BASE_API_URL`, which the frontend already uses (see `webpack.config.js`).

Start the app with `npm run dev` and it will be running on [http://localhost:3000](http://localhost:3000).


## Todo

Find each of the `TODO:` strings in the app. They will specify the functions you need to write or routes you need to create.

_A future version of this README will list each of the tasks with descriptions and tips. You'll have to work a little harder until then_ :wink:


## Choices

You can either use [`authenticare`](https://www.npmjs.com/package/authenticare) to implement the client-side and server-side or you can code it more _by hand_ using the [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken), [`express-jwt`](https://www.npmjs.com/package/express-jwt), [`jwt-decode`](https://www.npmjs.com/package/jwt-decode) and [`libsodium-wrappers-sumo`](https://www.npmjs.com/package/libsodium-wrappers-sumo) packages.

If you're choosing to use `authenticare`, which we recommend you do first, use the [`authenticare` instructions](with-authenticare.md). If you would rather code it by hand, use [these instructions](by-hand.md).
