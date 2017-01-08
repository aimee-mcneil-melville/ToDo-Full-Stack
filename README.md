# Web API Stories

User stories for practice building web APIs.

## Install

Enter the commands below in your terminal to get started:

```sh
cd ~/workspace
git clone https://github.com/dev-academy-challenges/boilerplate-knex web-api
cd web-api
npm install
npm run knex migrate:latest
npm run knex seed:run
```
If you would like to push changes back to your own repository, you'll need to create an empty repository in your GitHub and change the origin remote to point to that repo:

```sh
git remote set-url origin https://github.com/YOUR-USERNAME/knex-relationships
```

Visit http://localhost:8080 in your browser. If all went well, you should see a list of wombles.


## Setup

Before you begin completing the user stories, you'll need to edit the project to return JSON instead of rendering views.

* Rename `routes/index.js` to `routes/users.js` and edit it to `export` an `express.Router` instead of a custom object.
* Change `server.js` to `use` the exported router.


## MVP

_As a developer, I want a list of users so that I can display a list of users on the site._

_As a developer, I want to get the details of a single user so that I can populate their profile page._

_As a developer, I want to add a new user so that their information can be recalled at a later time._


