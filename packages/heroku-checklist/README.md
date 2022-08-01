# Deployment Checklist

When we first use Heroku, our apps have very few moving parts. To deploy these apps, you will at minimum need:
- [Heroku user setup](#heroku-user-setup)
- [General app setup](#general-app-setup)
- [Creating your Heroku app](#creating-your-heroku-app)
- [Deploying your app](#deploying-your-app)

Then when our apps become more complex, you will also need to consider:
- [Databases](#databases)
- [Scripts for each deployment](#scripts-for-each-deployment)
- [.env files](#env-files) (Auth & API keys)
- [Troubleshooting](#troubleshooting) (tips for databases)

---

## Heroku user setup

### 1. Setup
- [ ] You have a [Heroku account](https://signup.heroku.com/)
- [ ] You have `heroku-cli` installed
  <details style="padding-left: 2em">
    <summary>More about <code>heroku-cli</code></summary>
    
    - **Mac:** follow the install instructions on the [heroku-cli page](https://devcenter.heroku.com/articles/heroku-cli). You'll need to have homebrew to install this, so if you get an error about `brew: command not found`, install homebrew first. 
    - **Windows:** *DON'T* download the Windows Heroku CLI installer, instead run this command from your Ubuntu terminal to install the Heroku CLI into your Linux environment: 
      ```
      curl https://cli-assets.heroku.com/install.sh | sh
      ```
  </details>
    
- [ ] You can login to Heroku on your command line with `heroku login`.

---

## General app setup

Across all apps there are some things we need to make sure are done when we try and deploy it.

### 2. Removing hard-coded values

- [ ] Port uses `process.env.PORT` (not hard-coded to 3000)
  <details style="padding-left: 2em">
    <summary>More about dynamic ports</summary>
    
    Heroku will set a dynamic port when you deploy. If you are explicitly naming your port, Heroku can't expose your app on their chosen port. To make this work locally and also when deployed, we listen on a dynamic port if available or else default to a local one:

    ```js
    const port = process.env.PORT || 3000
    ```

- [ ] App contains no references to localhost
  <details style="padding-left: 2em">
    <summary>More about localhost references</summary>

    Any references to 'localhost' within your app will break it, unless an alternative is provided. Best to avoid this unless absolutely necessary.
  </details>

### 3. Package.json

- [ ] Specify the node version you are using in the "engines" property of package.json
  <details style="padding-left: 2em">
    <summary>More about setting the node version</summary>

    Check the `package.json` for `engines`. Inside the object, there should be a `node` property where you can specify the node version you are using. It should look like the code below

    ```js
    "engines": {
        "node": "16.x"
    }
    ```

    - If this isn't in your `package.json` already. Go ahead and add it.

    - In order to check the node version you are currently using, run `node --version`

    - You can give the specific version of node eg `"14.15.4"` or give a broader version number `"14.x"`. Giving a broader version number is recommended so that your app can get the latest patch updates from Node.
  </details>

- [ ] Key dependencies are included in `dependencies` (vs `devDependencies` or globally)
  <details style="padding-left: 2em">
    <summary>More about production dependencies</summary>

    Ensure that all required packages are in the `dependencies` part of your `package.json`. Heroku does **not** install anything in `devDependencies`. 

    If a package is working globally on your machine you may have forgotten to add it to your project explicitly with `npm install <package name>`, which means it will not be installed for the deployed version. 
  </details>

- [ ] The `start` script calls `node` (not `nodemon`)
  <details style="padding-left: 2em">
    <summary>More about setting the <code>start</code> script</summary>
    
    Heroku will use the `start` script (`npm run start`) to run your application and, unlike us, doesn't need the server restarting with changes. This is one reason we use a separate `npm run dev` script for working locally.
  </details>

---

## Creating your Heroku app

### 4a. From the command line

- [ ] Create a Heroku app with `heroku apps:create NAME_OF_YOUR_APP`
  <details style="padding-left: 2em">
    <summary>More about creating from the command line</summary>
  
    - If you would like to use this deployment for your WD07 assessment, please include your first name (or another identifier, e.g. nickname) in the app name.
    - This will create an app on Heroku from your terminal, and automatically add it as a remote in your local repo. Run `git remote -v` in your terminal to see this.

### 4b. Or, from heroku.com

- [ ] From the Heroku site's dashboard, click the "New" button in the top right corner. Create a name and a region and press "Create App"

- [ ] Scroll down to the "deploy using heroku git" section and copy the line that starts `heroku git:remote -a YOUR_HEROKU_APP`. Run this in your terminal
  <details style="padding-left: 2em">
    <summary>More about this command</summary>
    
    When you run this line in your terminal, it will add `heroku` as a new remote to your repo, similar to `origin`. Type `git remote -v` to see it.
  </details>

### 5. If you have a database

- [ ] Provision a Postgres DB using the postgresql addon
  <details style="padding-left: 2em">
    <summary>More about provisioning postgres</summary>

    - `heroku addons:create heroku-postgresql:hobby-dev`
    - This can also be done on heroku.com from the "Resources" section. Find "heroku postgres" in the addons and select the "Hobby Dev" (aka. free) option.

    See more about [databases](#databases), below.
  </details>

---

## Deploying your app

**NOTE**: Heroku only has a `main` branch. so if you're deploying a local branch _other than_ `main`, you must specify which branch you're deploying with

```git push heroku local-branch-name:main```

(Usually when we use `git push origin main`, it's actually short for `git push origin main:main`)

### 6. Deploying

- [ ] Deploy to Heroku with `git push heroku YOUR_BRANCH_NAME:main`

- [ ] Open the deployed site with `heroku open` or by copying the url provided at the end of the deploy output logs
  <details style="padding-left: 2em">
    <summary>Tips</summary>
    
    Make sure you copy the website url, not the git url, and paste it into your browser

    **If you see the application error page, or if your site has issues starting, type `heroku logs --tail` into your command line in order to debug what may have gone wrong.**
  </details>

Share and enjoy!

-----
-----
## Databases

The version of the database that we run during development varies slightly from the one we run once we have deployed to Heroku. Make sure your database is ready for Heroku by checking the setup below:

### 7. Packages and add-ons

- [ ] Verify that you've installed the postgresql add-on for your Heroku account (in section 5 above)
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    If you don't have this then Heroku won't be able to build your app and run the migrations.
  </details>
- [ ] Install the Postgres module in your app using `npm install pg`

### 8. Preparing your app to use Postgres

- [ ] Verify that you have a `production` option in the config file (when using knex this means in the `knexfile.js`)
- [ ] In files where you use knex (e.g. `db.js`), you are using `process.env.NODE_ENV` to dynamically choose the Knex environment
  <details style="padding-left: 2em">
    <summary>Example</summary>

    ```js
    const environment = process.env.NODE_ENV || 'development'
    const config = require('./knexfile')[environment]
    const db = require('knex')(config)
    ```
  </details>

- [ ] Verify that you have configured the production database connection
  <details style="padding-left: 2em">
    <summary>More about configuring the production db connection</summary>
  
    We need to make sure Knex has the correct configuration for connecting to the Postgres database in the production environment. We do this in the `knexfile.js` in the `production.connection` property. The `DATABASE_URL` environment variable will be provided by Heroku and contain all the information Knex needs to make the connection.

    ```js
    production: {
      client: 'postgresql',
      connection: { 
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    }
    ```
  </details>

### 9. Preparing migrations

- [ ] Verify that any migration and/or seed files run locally without error

- [ ] Ensure you are applying the migrations as the last step of deployment (after Heroku runs `npm install`)
  <details style="padding-left: 2em">
    <summary>More about the timing of migrations</summary>
    
    To do this, we add an npm script called `build` to the `package.json` which will run the migrations.

    ```js
    "build": "knex migrate:latest"
    ```
  </details>

SQLite and PostgreSQL have numerous small differences
<details>
  <summary>More about the differences between SQLite and PostgresSQL</summary>

  - PostgreSQL enforces relationships (such as `.references`) whereas SQLite does not.
  - PostgreSQL enforces the Knex string (i.e. `table.string('column_name')`) character limit of 255 characters. We can use the `text` column type for this instead.
  - PostgreSQL returns a different result from a `.insert` command. To have the insert return the generated id, add the string `id` as the second parameter of your insert.

    ```js
    return db('users')
        .insert(newUser, 'id')
    ```
  
  - In PostgreSQL if you have seeds for a table (`users`, say) that has an auto-incrementing id and then you later try to insert more records into that table via your app, you will likely see an error `duplicate key value violates unique constraint`. This is because when you run the seeds it doesn't update the counter for which id value should the next one, and so when you try to create the first new record via the app, PostgreSQL tries to give it id 1 again. If your app will work without running the seeds that's an easy solution, otherwise you'll need to include the seed file linked in [gotchas](#gotchas) below, which will automatically reset this counter. 
</details>
<br />

### 10. Seeding the database
Once you have successfully deployed your app...

- [ ] `heroku run bash` will open the terminal for your app hosted on Heroku. You will notice that it will be quite slow!

- [ ] Apply the seed file by running `knex seed:run`, or if that doesn't work then `npm run knex seed:run`

---

## Scripts for each deployment

### 11. Adding to the `build` script

- [ ]  If you're using Webpack (for React, for example), add the `webpack` command to the `build` script
  <details style="padding-left: 2em">
    <summary>Example</summary>

    ```js
    "build": "webpack"
    ```
  </details>

- [ ] If you're using Webpack AND have a database, ensure both Webpack and your migrations run at each deploy
  <details style="padding-left: 2em">
    <summary>More about multiple operations at build-time</summary>

    You can do this by adding the commands to the `build` script separated by `&&`. Note: If you use this project on a Windows platform, you will need to use a module like `npm-run-all` as the `&&` operator does not work on Windows.

    ```js
    "build": "webpack && knex migrate:latest"

    // OR

    "build": "run-p build:client build:server",
    "build:client": "webpack",
    "build:server": "knex migrate:latest",
    
    // OR (if you are using our full stack project layout)

    "build": "run-p build:client build:server",
    "build:client": "npm run webpack -- --mode production",
    "build:server": "npm run knex -- migrate:latest",
    "webpack": "webpack --config ./client/webpack.config.js",
    "knex": "knex --knexfile ./server/db/knexfile.js"
    ```
  </details>

- [ ] If you're also using Authenticare or another library that has build environment switching in the front-end (`process.env.NODE_ENV` etc), ensure you're calling `webpack` in your `build` in production mode
  <details style="padding-left: 2em">
    <summary>Example</summary>
  
    ```js
    "build": "webpack --mode=production"
    ```
  </details>

---

## .env files

### 12. Secrets and NODE_ENV

- [ ] If you are using the `dotenv` library and putting secret values in a `.env` file, make sure the .env config is only set up to run in development mode
  <details style="padding-left: 2em">
    <summary>More about environment variables</summary>
    
    Your server `index.js` file should have a block of code that looks like this:

    ```js
    if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      const envConfig = require('dotenv').config()
      if(envConfig.error) throw envConfig.error
    }
    ```
  </details>

- [ ] Make sure you set each of the secret values in the Heroku config area
  <details style="padding-left: 2em">
    <summary>More about configuring secrets</summary>
 
    ```sh
    heroku config:set JWT_SECRET="shhhhhhhhh s3cr3t"
    ```

    Or set your "Config Vars" in the "Settings" section of your app in Heroku website.
  </details>

---

## Troubleshooting

<details>
  <summary>Tips (for databases)</summary>

  - After inserting seeds into tables, if you have issues on the next subsequent insert, you have likely hit a Heroku/Postgres sequence issue.  In future, you can prevent this by reseting all sequences after seeding. To do this, add [this seed file](./resources/z_resetSequences.js) as the LAST seed file (you can see ours starts with a `z`) in your seeds folder.

  - If you hit an error that starts `FATAL: no pg_hba.conf entry for host`, while it can be hard to decypher, it's related to a setting inside Heroku where Heroku requires a secure connection from the web dyno to the database dyno. To fix this, run the following command to turn off host certificate checking: `heroku config:set PGSSLMODE=no-verify`. Another option for this is to update the production config:

    ```js
    production: {
        client: 'postgresql',
        connection: { 
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        }
    }
  ```
</details>
