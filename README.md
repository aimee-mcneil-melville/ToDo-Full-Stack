# Deployment Checklist

### Contents
- [Heroku setup](#heroku-setup)
- [General app setup](#general-app-setup)
- [Creating your Heroku app](#creating-your-heroku-app)
- [Deploy the app](#deploy-the-app)
- [Databases](#databases)
- [React](#react)
- [.env files](#env-files) (Auth & API keys)
- [Gotchas](#gotchas)

## Heroku setup
- [ ] You have a [Heroku account](https://signup.heroku.com/).
- [ ] You have [`heroku-cli`](https://devcenter.heroku.com/articles/heroku-cli) installed.
- [ ] You can login to Heroku on your command line with `heroku login`.

## General app setup

- Across all apps there are some things we need to make sure are done when we try and deploy it.

Is the port hardcoded to port 3000?

- Heroku will set a dynamic port when you deploy. If you are explicitly naming your port, Heroku can't expose your app on their chosen port. To make this work locally and also when deployed, we listen on a dynamic port if available or else default to a local one:

```js
const port = process.env.PORT || 3000
```

Are there any references to localhost?

- Any references to 'localhost' within your app will break it, unless an alternative is provided. Best to avoid this unless absolutely necessary.

No key modules are in your devDependencies

- Ensure that all required packages are in the `dependencies` part of your `package.json`. Heroku does **not** install anything in `devDependencies`. 

- If a package is working globally on your machine you may have forgotten to add it to your project explicitly with `npm install <package name>`, which means it will not be installed for the deployed version. 

The `start` script in your `package.json` file calls `node` and not `nodemon`.

- Heroku will use the start script (`npm run start`) to run your application and, unlike us, doesn't need the server restarting with changes.


## Creating your Heroku app

*From the command line*

- Create a Heroku app with `heroku apps:create NAME_OF_YOUR_APP`.
  - This will create an app on Heroku from your terminal, and automatically add it as a remote in your local repo. Run `git remote -v` in your terminal to see this.

*Or, from heroku.com*

1. From the Heroku site's dashboard, click the 'New' button in the top right corner. Create a name and a region and press 'create app'. 

2. Scroll down to the 'deploy using heroku git' section and copy the line that starts 'heroku git:remote -a YOUR_HEROKU_APP'. When you run this line in your terminal, it will add `heroku` as a new remote to your repo, similar to `origin`. Type `git remote -v` to see it.


## Deploy the app

**NOTE**: Heroku only has a `master` branch. so if you're deploying a local branch _other than_ `master`, you must specify which branch you're deploying with `git push heroku local-branch-name:master` (Usually when we use `git push origin main`, it's actually short for `git push origin main:main`)

1. Deploy to Heroku with `git push heroku YOUR_BRANCH_NAME:master`. 

2. If you see the application error page, or if you have type `heroku logs --tail` into your command line in order to debug what may have gone wrong.

3. Share and enjoy!

## Databases

- [ ] You have a `production` option in the config file (if you are using knex this will be in the `knexfile.js`).
- [ ] You have installed the Postgres module using `npm install pg`.
- [ ] You are using `process.env.NODE_ENV` to dynamically choose the Knex environment. For example, in the module where you're using Knex.js (e.g. `db.js`):

  ```js
  const environment = process.env.NODE_ENV || 'development'
  const config = require('./knexfile')[environment]
  const db = require('knex')(config)
  ```

- [ ] You have defined the structure of your database with some migrations and they run locally without error.
- [ ] If you are seeding your database, the seed files run locally without error.
- [ ] You have configured the production database connection. We need to make sure Knex has the correct configuration for connecting to the Postgres database in the production environment. We do this in the `knexfile.js` in the `production.connection` property. The `DATABASE_URL` environment variable will be provided by Heroku and contain all the information Knex needs to make the connection.

  ```js
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
  ```

- [ ] You are applying the migrations as the last step of deployment. We need our migrations to run after Heroku runs `npm install`. To do this, we add an npm script called `build` to run the migrations.

  ```js
  "build": "knex migrate:latest"
  ```


1. Provision a Postgres DB using the postgresql addon
    - `heroku addons:create heroku-postgresql:hobby-dev`
    - This can also be done on heroku.com from the 'addons' section. Look for 'heroku postgres'.

1. Now it's time to seed your database with any data you'd like it to have, so we need to login to the Heroku server. `heroku run bash` will open the terminal for your app hosted on Heroku. You will notice that it will be quite slow!
- Apply the seed file by running `knex seed:run`.

- If you are running seeds, keep in mind they run in alphabetical order, so if one of your seeds is dependent on another seed running first, make sure they're running in the right order.

- SQLite and PostgreSQL have numerous small differences.  If you are using SQLite only for development, it is recommended that you also test your app using a PostgreSQL database on your local machine before deployment. Refer to the Knex documentation for solutions. Some known differences are:
    - PostgreSQL enforces relationships whereas SQLite does not.
    - The Knex `table.string('column_name')` has a 255 character limit.  PostgreSQL enforces this whereas SQLite does not.
    - PostgreSQL returns a different result from a `.insert` command. To have the insert return the generated id, add the string `id` as the second parameter of your insert.
    
 ```js
 return db('users')
    .insert(newUser, 'id')
 ```

## React

- [ ] If you're using Webpack, this needs to run after every deploy.  You can do this by adding the command to the `build` script.

  ```js
  "build": "webpack"
  ```

- [ ] If you're using Webpack AND have a database, you will need to be able to run both Webpack and your migrations at each deploy.You can do this by adding the commands to the `build` script separated by `&&`.  Note: If you use this project on a Windows platform, you will need to use a module like `npm-run-all` as the `&&` operator does not work on Windows.

  ```js
  "build": "webpack && knex db:migrate"

  // OR

  "build": "run-p build:client build:server",
  "build:client": "webpack",
  "build:server": "knex migrate:latest",
  ```

- [ ] If you're also using Authenticare or another library that has build environment switching in the front-end (`process.env.NODE_ENV` etc). You're calling `webpack` in your `build` in production mode.

  ```js
  "build": "webpack --mode=production"
  ```


## .env files

- [ ] If you are using the `dotenv` library and putting secret values in a `.env` file, make sure the .env config is only set up to run in development mode. e.g. your server index.js file should have a block of code that looks like this:

  ```js
  if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    const envConfig = require('dotenv').config()
    if(envConfig.error) throw envConfig.error
  }
  ```

- [ ] Also make sure you set each of the secret values in the Heroku config area using the following command:

```sh
heroku config:set JWT_SECRET="shhhhhhhhh s3cr3t"
```

## Gotchas

- [ ] After inserting seeds into tables, if you have issues on the first subsequent insert, you have likely hit a Heroku/Postgres sequence issue.  You can prevent this in future by reseting all sequences after seeding.  To do this, add [this seed file](./resources/z_resetSequences.js) as the LAST seed in your seeds folder.  

