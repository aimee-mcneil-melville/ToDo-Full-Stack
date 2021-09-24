# Fullstack boilerplate

## Getting Started

### From the Github UI
See the instructions [here](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) to use Github's feature to create a new repo from a template.

### From the command line

```
git clone git@github.com:dev-academy-challenges/boilerplate-full-stack-auth0.git [your-project-name]
cd [your-project-name]
cp server/.env.example server/.env
npm install # to install dependencies
npm run knex migrate:latest
npm run knex seed:run
npm run dev # to start the dev server
```

You can find the server running on [http://localhost:3000](http://localhost:3000).

## Details

This repo includes:

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
1. Go to *Applications*, and click on *Create Application* button 
1. Give your application a meaningful name, then select **Single Page Web Applications** and click the *Create* button.
1. In Auth0.com, set the **Allowed Callback Url** with `http://localhost:3000/`.
1. In Auth0.com, set the **Allowed Logout Url** with `http://localhost:3000/`.
1. In Auth0.com, set the **Allowed Web Origins** with `http://localhost:3000/`.

### Client
1. Copy the **Domain** of your application in Auth0.com and paste it in the `domain` in `index.js`.
1. Copy the **Client ID** of your application in Auth0.com and paste it in the `client` in `index.js`.

### Server
1. In Auth0.com, create a new API and give a it name and an identifier, for example `https://myapp/api`. This identifier will used as the `audience`. Click Create.
1. On your new API page, click `Settings` and scroll down and to RBAC Settings and activate `Enable RBAC` and `Add Permission in the Access Token`.
1. Go to `Permissions`, add the custom permissions that reflects your needs. Users who are assigned roles with these permissions will be able to access your back-end endpoints.
If have a REST API endpoint that you want it to be accessible only by users with a specific permission(s), you can add `[create|read|update|delete|use]:entityname` permission in Auth0. 

Here are a few examples that may help you modelling your routes with permissions
```
read:employee
read:account_balance
create:appointment
update:reminder
delete:song
use:app
```

Suppose you have an endpoint that returns the salaray amount given the employee id. You don't want that to public or protected. Only users with who have `read:account_balance` permission are allowed to consume this endpoint.

### Creating & assigning Roles
In large companies and enterprises, assigning individual permissions to each users can be tedious. Intead we use Roles. Roles are just a collection/container of permissions.

1. In Auth0, and under *User Management*, click on Roles and click on *create Role* button.
1. Give it a name and description, say **Admin**.
1. Click on *Permissions* tab and click on *add Permissions* button.
1. Select the *API* and the permissions you want to use for the role.
1. Now the role is ready to be assigned for users.
1. In Auth0 and under *User Management*, click on Users.
1. Find the user you want to assign the **Admin** role to and click on it.
1. Click on the *Role* tab, click on *Assign Roles* button and select the role from the drop-drown list.

### Creating a new Machine to Machine Application
Let's create a new application in Auth0, this application will linked and connected to an out-of-the-box API that can retrieve metadata about users. This metadata will be the user's role.


1. Go to *Applications*, and click *Create Application* button.
1. Give it a name, for example, `Metadata Application`.
1. Select *Machine to Machine Applications* and click *Create*.
1. Select the *Auth0 Management API* from the drop-down list.
1. Open *APIs* tab and make sure that *Auth0 Management API* is enabled.
1. Expand it and select the following permissions:
    1. `read:roles`
    1. `read:users`
    1. `read:member_roles`
1. Open the Settings.
1. Copy the *Client ID* and paste it in `AUTH0_MACHINE_2_MACHINE_CLIENT_ID` in the `.env` file.
1. Copy the *Secret* and paste it in `AUTH0_MACHINE_2_MACHINE_SECRET`.
1. Set the `AUTH0_DOMAIN` to be your domain, it's the same one from previous steps.

Now the server will be able to get a new access token and retrieve the user's roles. If the logged in user has a Role(s), it will be displayed next to the name. (see `Nav.jsx`)

Congratulations!!! Now our application is ready.
