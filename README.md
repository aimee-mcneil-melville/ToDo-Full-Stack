# Knex Forms and Redirects

User stories for RDBMS practice. These will lead you through redirecting after an operation which modifies the database.


## Install

Enter the commands below in your terminal to get started:

```shell
git clone https://github.com/dev-academy-challenges/boilerplate-knex
mv boilerplate-knex knex-forms
cd knex-forms
npm install
npx knex migrate:latest
npx knex seed:run
npm start
```

If you would like to push changes to a branch in this repository, [change](https://help.github.com/articles/changing-a-remote-s-url/) the `origin` remote to point to this repo:

```shell
git remote set-url origin https://github.com/[YOUR-COHORT-ORG]/knex-forms-stories
```


## MVP

_As an administrator I want to add a new user so that I can be bigger than Facebook._
 - Decide how you want the routes to work. For example, you could:
   - display your users from `/users` (GET)
   - display a form to add a new user from `/users/new` (GET)
   - process the form data from `/users/submit` (POST)
   - redirect back to `/users` (GET)

_As an administrator I want to edit an existing user's details so that I can keep their information up to date._
 - More decisions to be made! You could:
   - display your edit form from `/users/:id` (GET)
   - process the form data from `/users/submit/:id` (POST)
   - redirect back to `/users` (GET)
 - You'll need to load the user record from the database and populate your edit form with the existing values


## Stretch

_As an administrator I want to see an "Are you sure?" page when I try to delete a user so that I can avoid boneheaded mistakes._
 - This has a few parts. First, you'll need to provide a delete button next to each user on your users list. This should lead to a `/users/confirm/:id` route. 

_As an administrator I want to see the record I'm about to delete on my "Are you sure?" page so that I can confirm I'm deleting the correct user._

_As an administrator I want to confirm that I really want to delete a user, and be redirected back to the main users page._
 - Your form on the `/users/confirm/:id` route should submit to another route (maybe `/users/delete/:id`?) which actually performs the delete from the database.
 - It should redirect back to the main `/users` list.
 - With your pair, think about and discuss these questions:
   - Why is this not very secure? What's the problem with the `/users/delete/:id` route in particular?
   - Can you think of some ways to ensure that a user could only visit the `/users/delete/:id` route after _first_ visiting the confirm route?
