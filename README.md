# Fullstack boilerplate

## Getting Started

### From the Github UI
See the instructions [here](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) to use Github's feature to create a new repo from a template.

### From the command line

```
git clone git@github.com:dev-academy-challenges/boilerplate-full-stack-auth0.git [your-project-name]
cd [your-project-name]
cp /server/.env.example /server/.env
npm install # to install dependencies
npm run dev # to start the dev server
```

You can find the server running on [http://localhost:3000](http://localhost:3000).

## Details

This repo includes:

* Three API endpoints:
  * 2 public endpoints:
    * `/api/v1/users` 
    * `/api/v1/public` 
  * a protected API endpoint `/api/v1/protected`
  * a private API endpoint `/api/v1/private`
* React Components:
  * App
  * Nav is used for login, logout, registeration
  * Authenticated is used for show/hide components if the user is logged in
  * PingRoutes is used for testing the routes
  * Users is used to display the registered users
  * Registeration is used to save the users info after they are registered with Auth0
* an example database module (`server/db/users.js`)
* an API client module (`client/apis/users.js`)


## Auth0
1. Navigate to, Auth0.com and sign-up if you don't already have a tenant.
1. Go to *Applications*, and create a new Application.
1. In Auth0.com, set the **Allowed Callback Url** with `http://localhost:3000/`.
1. In Auth0.com, set the **Allowed Logout Url** with `http://localhost:3000/`.
1. In Auth0.com, set the **Allowed Web Origins** with `http://localhost:3000/`.

### Client
1. Copy the **Domain** of your application in Auth0.com and paste it in the `domain` in `index.js`.
1. Copy the **Client ID** of your application in Auth0.com and paste it in the `client` in `index.js`.

### Server
1. In Auth0.com, create a new API and give a it name, for example `https://myapp/api`. This identifier will used as the `audience`.
1. Scroll down and to RBAC Settings and activate `Enable RBAC` and `Add Permission in the Access Token`.
1. Go to `Permissions`, add the custom permissions that reflects your needs. Users who are assigned roles with these permissions will be able to access your back-end endpoints.
If have a REST API endpoint that you want it to be accessible only by users with a specific permission(s), you can add `[create|read|update|delete|use]:entityname` permission in Auth0. 

Here are a few examples:
```
read:employee
read:employee
create:appointment
update:reminder
delete:song
use:app
...
```
