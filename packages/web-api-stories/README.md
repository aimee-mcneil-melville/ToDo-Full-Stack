# Web API Stories

User stories for practice building web APIs. We'll write some routes for creating, reading, and updating users in a database.

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

- [ ] Visit [http://localhost:3000/users](http://localhost:3000/users) in your browser (or better yet, issue a GET request using Insomnia). If all went well, you should see a list of users

---

## Requirements

### 1. Reading from the DB
- [ ] As a developer, I want a list of users so that I can display a list of users on the site

- [ ] As a developer, I want to get the details of a single user so that I can populate their profile page

### 2. Writing to the DB

- [ ] As a developer, I want to add a new user so that their information can be recalled at a later time
  <details style="padding-left: 2em">
    <summary>More about creating users</summary>
    
    - You'll have to add a new `addUser` function to `db.js` in order for the route to save the new user
    - You can use Insomnia to pass a new JSON user to the API
    - You can leave off the `id` because the database schema has an auto-increment on the `id` field
  </details>

- [ ] As a developer, I want to update an existing user so they can keep their details current
  <details style="padding-left: 2em">
    <summary>More about updating users</summary>

    * You'll have to add a new `updateUser` function to `db.js` in order for the route to save the new user
    * You can use Insomnia to pass an existing JSON user to the API
    * You'll need to use the `id` of an existing user so it will know which user to update

### 3. Testing

- [ ] Create tests for each of the routes in sections 1 and 2

---

## Stretch

<details>
  <summary>More about stretch challenges</summary>

1. As a developer, I want to select, add, update and delete `activities` (like hobbies) that have `name`, `frequency`, `level` attributes
    - You'll need to create a `routes/activities.js` file and the middleware link in `server.js`
    - You'll need to create the appropriate migrations, seeds and functions in `db.js`
  
2. As a developer, I want an example of a script that consumes the API from sections 1 and 2
    - Write a standalone `index.js` file that uses `superagent` to consume the API from sections 1 and 2
</details>
