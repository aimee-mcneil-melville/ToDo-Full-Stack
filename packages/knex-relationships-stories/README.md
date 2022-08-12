# Knex Relationships Stories

This challenge provides user stories to implement, which will enable us to practise relational databases and related tools.

---

## Setup

Some of the setup for a sample application has already been done for us, but we still need to do these steps.

### 0. Installation and initial tests

- [ ] Install packages, run migrations and seeds, and start the dev server using `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    Commands might look like this:

    ```
    npm i
    npx knex migrate:latest
    npx knex seed:run
    npm run dev
    ```

    This will create and populate the database with the existing migrations and seeds, and start the server with `nodemon`.
  </details>

- [ ] Ensure the initial tests pass by running `npm test`

---

## Requirements

### 1. Users

- [ ] As a user I want to click on a user's name and see their user profile page so that I can find out more about them
  <details style="padding-left: 2em">
    <summary>Tips</summary>

    - This is a one to one relationship: a user has **ONE** profile page
    - We'll need a `profiles` table with a `user_id` column and some other useful information about the user, like their URL and maybe a profile picture
  </details>

- [ ] As an administrator I want to add a new user and their profile information so that I can grow my user base
  <details style="padding-left: 2em">
    <summary>Tips</summary>

    - This will involve writing to more than one table in separate queries
    - Create a form to enter the user information, and a route which will be the form's action
  </details>

### 2. Blog posts
- [ ] As a user I want to create a blog post so that I can express myself
  <details style="padding-left: 2em">
    <summary>Tips</summary>
  
    - This is a one to many relationship: a user has **MANY** blog posts
    - We'll need a `posts` table with a `user_id` column, and some named `title` and `content` that contain the post text
  </details>

- [ ] As a user I want to view a list of all blog posts for each user so that I can see what others have been writing

- [ ] As a user I want to view a single blog post so that I can read it

---

## Stretch

<details>
  <summary>More about stretch challenges</summary>

  1. As a user I want to add another user to my favourites list so that I can easily view their profile pages
      - This is a many to many relationship: **MANY** users have **MANY** favourites
      - We'll need a `favourites` join table which has `user_id` and `favourite_id` columns
      - Think about how you're going to add rows to this table as users add favourites to their list
  2. As a user I want to filter the list of blog posts so that it only shows users who are on my favourites list
</details>
