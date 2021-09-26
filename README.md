# Fullstack boilerplate

## Getting Started

### From the GitHub UI
See the instructions [here](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) to use GitHub's feature to create a new repo from a template.

### From the command line

```shell
git clone git@github.com:dev-academy-challenges/boilerplate-full-stack-auth0.git [your-project-name]
cd [your-project-name]
cp client/auth_config.json.example client/auth_config.json
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
  * Nav is used for login, logout, registration
  * Authenticated is used for show/hide components if the user is logged in
  * PingRoutes is used for testing the routes
  * Users are used to display the registered users
  * Registration is used to save the users' info after they are registered with Auth0
* an example database module (`server/db/users.js`)
* an API client module (`client/apis/users.js`)


## Auth0
1. Navigate to, Auth0.com and sign-up if you don't already have a tenant.
3. Go to *Applications*, and click on *Create Application* button 
4. Give your application a meaningful name, then select **Single Page Web Applications** and click the *Create* button.
5. In Auth0.com, set the **Allowed Callback Url** with `http://localhost:3000/`
6. In Auth0.com, set the **Allowed Logout Url** with `http://localhost:3000/`
7. In Auth0.com, set the **Allowed Web Origins** with `http://localhost:3000/`


### Server
1. In Auth0.com, create a new API and give it a name and an identifier, for example: `Default` and `https://myapp/api`. This identifier will be used as the `audience`. Click Create.
2. On your new API page, click `Settings` and scroll down and to RBAC Settings and activate `Enable RBAC` and `Add Permission in the Access Token`.
3. Go to `Permissions`, add the custom permissions that reflects your needs. For the purpose of this demo, create a permission called `read:my_private_route`.

Users who are assigned roles with these permissions will be able to access your back-end endpoints.
   - If you have a REST API endpoint that you want it to be accessible only by users with a specific permission(s), you can add `[create|read|update|delete|use]:entityname` permission in Auth0. 

Here are a few examples that may help you with modelling your routes with permissions:

| Permission (Scope)     | Description                            |
| ---------------------- | -------------------------------------- |
| `read:employee`        | Allows a user to view employees        |
| `read:account_balance` | Allows a user to view account balances |
| `create:appointment`   | Allows a user to create appointments   |
| `update:reminder`      | Allows a user to update reminders      |
| `delete:song`          | Allows a user to delete songs          |
| `use:app`              | Allows using an app                    |

Suppose you have an endpoint that returns the salary amount given the employee id. You don't want that to public or protected. Only users with whom have the `read:account_balance` permission are allowed to consume this endpoint.

### Client
1. Copy the **Domain** of your application in Auth0.com and paste it in the `domain` into `client/auth_config.json`
1. Copy the **Client ID** of your application in Auth0.com and paste it in the `client` into `client/auth_config.json`
1. Copy the **API Audience URL** from Auth0.com you created in the server setup and paste it in the `audience` into `client/auth_config.json`


### Creating & assigning Roles
In large companies and enterprises, assigning individual permissions to each user can be tedious. Instead, we use Roles. Roles are just a collection/container of permissions.

1. In Auth0, and under *User Management*, click on Roles and click on *create Role* button.
1. Give it a name and description, say **Admin**.
1. Click on *Permissions* tab and click on *add Permissions* button.
1. Select the *API* and the permissions you want to use for the role.
1. Now the role is ready to be assigned for users.
1. In Auth0 and under *User Management*, click on Users.
1. Find the user you want to assign the **Admin** role to and click on it.
1. Click on the *Role* tab, click on *Assign Roles* button and select the role from the drop-drown list.

### Creating a new Machine to Machine Application
Let's create a new application in Auth0, this application will be linked and connected to an out-of-the-box API that can retrieve metadata about users. This metadata will be the user's role.


1. Go to *Applications*, and click *Create Application* button.
1. Give it a name, for example, `Metadata Application`.
1. Select *Machine to Machine Applications* and click *Create*.
1. Select the *Auth0 Management API* from the drop-down list.
1. Open *APIs* tab and make sure that *Auth0 Management API* is enabled.
1. Expand it and select the following permissions:
    1. `read:roles`
    1. `read:users`
    1. `read:role_members`
1. Open the Settings.
1. Copy the *Client ID* and paste it in `AUTH0_MACHINE_2_MACHINE_CLIENT_ID` in the `.env` file.
1. Copy the *Secret* and paste it in `AUTH0_MACHINE_2_MACHINE_SECRET`.
1. Set the `AUTH0_DOMAIN` to be your domain. It should look like `https://mydomain.au.auth0.com`.
1. Set the `AUTH0_SSO_AUDIENCE` to be the same `audience` in the `client/auth_config.json`.

Now the server will be able to get a new access token and retrieve the user's roles. If the logged-in user has a Role(s), it will be displayed next to the name. (see `Nav.jsx`)

🎉 Congratulations! Your application is now Authenticated with Auth0 🎉
