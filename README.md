# Deployment Checklist

## Heroku setup

- [ ] You have a Heroku account.
- [ ] You have Heroku Toolbelt installed.
- [ ] You can login to Heroku on your command line with `heroku login`.


## Setup checklist

- [ ] Heroku sets a dynamic port which you can access with the port environment variable using `process.env.PORT`. If you are explicitly stating your port in your app without using the environment, Heroku can't expose your app. A good practice is to listen on a dynamic port or default to a local one:

```js
var port = process.env.PORT || 3000
```

*If you have a database:*

- [ ] You have a `production` option in the config file (if you are using knex this will be in the `knexfile.js`).
- [ ] You have installed the Postgres module using `yarn add pg`.
- [ ] You are using `process.env.NODE_ENV` to dynamically choose the Knex environment. For example, in the module where you're using Knex.js (e.g. `db.js`):

  ```js
  var environment = process.env.NODE_ENV || 'development'
  var config = require('./knexfile')[environment]
  var db = require('knex')(config)
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

- [ ] You are applying the migrations as the last step of deployment. We need our migrations to run after Heroku runs `yarn`. To do this, we add an npm script called `postinstall` to run the migrations.

  ```js
  "postinstall": "knex migrate:latest"
  ```

- [ ] If you're using Webpack, you've moved all necessary `devDependencies` to `dependencies` in your `package.json` and you're calling `webpack` in your `postinstall` script.

  ```js
  "postinstall": "webpack && knex migrate:latest"
  ```


## Create app

*From the command line*

* Create a Heroku app with `heroku apps:create NAME_OF_YOUR_APP`.
  - This will create an app on Heroku from your terminal, and automatically add it as a remote in your local repo. Run `git remote -v` in your terminal to see this.

*Or, from heroku.com*

* From the dashboard, click the 'New' button in the top right corner. Create a name and a region and press 'create app'. Scroll down to the 'deploy using heroku git' section and copy the line that starts 'heroku git:remote -a YOUR_HEROKU_APP'. When you run this line in your terminal, it will add `heroku` as a new remote to your repo, similar to `origin`. Type `git remote -v` to see it.


## Provision and deploy

1. Provision a Postgres DB using the postgresql addon
  - `heroku addons:create heroku-postgresql:hobby-dev`
  - This can also be done on heroku.com from the 'addons' section. Look for 'heroku postgres'.

2. Deploy to Heroku with `git push heroku master`. **NOTE**: If you're deploying a branch _other than_ `master`, you must specify which branch you're deploying with `git push heroku local-branch-name:master`. Basically, `git push heroku master` is short for `git push heroku local-master-branch:remote-master-branch`.

3. Now it's time to seed your database with any data you'd like it to have, so we need to login to the Heroku server. `heroku run bash` will open the terminal for your app hosted on Heroku. You will notice that it will be quite slow!
 - Apply the seed file by running `knex seed:run`.

4. Share and enjoy! If you see the application error page, type `heroku logs` into your command line in order to debug what may have gone wrong.


## Common gotchas

- Ensure that all required packages are in the `dependencies` part of your `package.json`. Heroku does **not** install anything in `devDependencies`. Also, if a package is working globally on your machine you may have forgotten to add it to your project explicitly with `--save`, which means it will break on a remote server. A best practice is to always install locally and use npm scripts.

- Any references to 'localhost' within your app will break unless they are provided with a production environment alternative.

- Make sure the `start` script in your `package.json` file is calling `node` and not `nodemon`.

- If you are running seeds, keep in mind they run in alphabetical order, so if one of your seeds is dependent on another seed running first, make sure they're running in the right order.

- SQLite and PostgreSQL have numerous small differences.  If you are using SQLite only for development, it is recommended that you also test your app using a PostgreSQL database on your local machine before deployment.  Some known differences are:
    - PostgreSQL enforces relationships whereas SQLite does not.
    - PostgreSQL returns a different result from a `.insert` command
    - The Knex `table.string('column_name')` has a 255 character limit.  PostgreSQL enforces this whereas SQLite does not.
    - Refer to the Knex documentation for solutions

