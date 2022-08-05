# Knex Forms and Redirects

User stories for Relational Database Management Systems (RDBMS) practice. These will lead you through redirecting after an operation which modifies the database.

## Setup

### 0. Cloning and installation

- [ ] Clone the `boilerplate-knex` repo and rename it locally to `knex-forms`
  <details style="padding-left: 2em">
    <summary>More about cloning and renaming</summary>

    Enter the commands below in your terminal to get started:

    ```shell
    git clone https://github.com/[YOUR-COHORT-ORG]/boilerplate-knex
    mv boilerplate-knex knex-forms
    ```
  </details>

- [ ] Navigate to the directory, install packages, run migrations and seeds, and start the dev server
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    ```
    cd knex-forms
    npm install
    npx knex migrate:latest
    npx knex seed:run
    npm run dev
    ```
  </details>

- [ ] If you plan to push changes to a branch in this repository, [change](https://help.github.com/articles/changing-a-remote-s-url/) the `origin` remote to point to this repo
  <details style="padding-left: 2em">
    <summary>More about changing the remote</summary>

    ```shell
    git remote set-url origin https://github.com/[YOUR-COHORT-ORG]/knex-forms-stories
    ```
  </details>

---

## Requirements

### 1. Add users
- [ ] As an administrator I want to add a new user so that I can be bigger than Facebook
  <details style="padding-left: 2em">
    <summary>More about adding users</summary>
    
    Decide how we want the routes to work. For example, we could:
    - display our users from `/users` (GET)
    - display a form to add a new user from `/users/new` (GET)
    - process the form data from `/users/submit` (POST)
    - redirect back to `/users` (GET)
  </details>


### 2. Edit users
- [ ] As an administrator I want to edit an existing user's details so that I can keep their information up to date
  <details style="padding-left: 2em">
    <summary>More about editing users</summary>
 
    More decisions to be made! We could:
    - display our edit form from `/users/:id` (GET)
    - process the form data from `/users/submit/:id` (POST)
    - redirect back to `/users` (GET)
    
    We'll need to load the user record from the database and populate our edit form with the existing values.
  </details>

---

## Stretch

<details style="padding-left: 2em">
  <summary>More about stretch challenges</summary>

1. As an administrator I want to see an "Are you sure?" page when I try to delete a user so that I can avoid boneheaded mistakes
    - This has a few parts. First, we'll need to provide a "delete" button next to each user on our users list. This should lead to a `/users/confirm/:id` route

1. As an administrator I want to see the record I'm about to delete on my "Are you sure?" page so that I can confirm I'm deleting the correct user

1. As an administrator I want to confirm that I really want to delete a user, and be redirected back to the main users page
    - Our form on the `/users/confirm/:id` route should submit to another route (maybe `/users/delete/:id`?) which actually performs the delete from the database
    - It should redirect back to the main `/users` list
    - With your pair, think about and discuss these questions:
      - Why is this not very secure? What's the problem with the `/users/delete/:id` route in particular?
      - Can you think of some ways to ensure that a user could only visit the `/users/delete/:id` route after **first** visiting the confirm route?
</details>
