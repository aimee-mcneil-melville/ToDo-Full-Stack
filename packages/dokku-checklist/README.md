# Deployment Checklist

When we first use dokku, our apps have very few moving parts. To deploy these apps, you will at minimum need:
- [Dokku user setup](#dokku-user-setup)
- [General app setup](#general-app-setup)
- [Creating your Dokku app](#creating-and-deploying-your-dokku-app)

Then when our apps become more complex, you will also need to consider:
- [Databases](#databases)
- [.env files](#env-files) (Auth & API keys)

---

# Deploying to Dokku

Dokku is an open-source self-hosted PAAS tool which we will use to deploy our projects.

## Dokku user setup
### 1. SSH key

- [ ] Generate an SSH key pair
  <details style="padding-left: 2em">
    <summary>How to generate an SSH key pair</summary>

    There's a good chance you have one of these, you can see a list of your public keys like this:

    ```sh
    ls ~/.ssh/*.pub
    ```

    If you don't see any, then you can create one. Don't forget to replace the email address with your real one.

    ```sh
    ssh-keygen -t ed25519 -C "your_email@example.com"
    ```

    Hit enter 3 times to accept all the defaults.

    Now you need to start your ssh-agent:

    ```sh
    eval "$(ssh-agent -s)"
    ```

    and add the key to your agent:

    ```sh
    ssh-add ~/.ssh/id_ed25519
    ```

    Now you'll want to go to https://github.com/settings/keys and add your public key.
  </details>

- [ ] Give your public key to a facilitator
  <details style="padding-left: 2em">
    <summary>How to copy your public key</summary>

    Run `code ~/.ssh/id_ed25519.pub` to open it and copy + paste it to your facilitator in a DM.

    Public keys are safe to share, but you should never need to send anyone your private key.

    We'll then add your key as a dokku user and you'll be able to start.

  </details>

### 2. Dokku CLI

- [ ] Installing the dokku command line client
  <details style="padding-left: 2em">
    <summary>How to install the Dokku CLI</summary>

    There's a dokku client that is part of the regular distribution so you can install it by cloning the dokku repo:

    ```sh
    git clone git@github.com:dokku/dokku.git ~/.dokku

    # we want to match the same version of dokku that we have
    # on the server
    cd ~/.dokku
    git checkout v0.29.4
    ```

    Add these lines to your `~/.zshrc` file:

    ```sh
    export DOKKU_HOST='devacademy.nz'
    alias dokku='bash $HOME/.dokku/contrib/dokku_client.sh'
    ```

    And then reload your `~/.zshrc` file:

    ```sh
    source ~/.zshrc
    ```
  </details>

---
## General app setup

Across all apps there are some things we need to make sure are done when we try and deploy it.

### 3. Removing hard-coded values

- [ ] Port uses `process.env.PORT` (not hard-coded to 3000)
  <details style="padding-left: 2em">
    <summary>More about dynamic ports</summary>
    
    Dokku will set a dynamic port when you deploy. If you are explicitly naming your port, dokku can't expose your app on their chosen port. To make this work locally and also when deployed, we listen on a dynamic port if available or else default to a local one:

  ```js
  const port = process.env.PORT || 3000
  ```

- [ ] App contains no references to localhost
  <details style="padding-left: 2em">
    <summary>More about localhost references</summary>

    Any references to 'localhost' within your app will break it, unless an alternative is provided. Best to avoid this unless absolutely necessary.
  </details>

### 4. Package.json

- [ ] Key dependencies are included in `dependencies` (vs `devDependencies` or globally)
  <details style="padding-left: 2em">
    <summary>More about production dependencies</summary>

    Ensure that all required packages are in the `dependencies` part of your `package.json`. Dokku will remove everything in `devDependencies` before it runs your app.

    If a package is working globally on your machine you may have forgotten to add it to your project explicitly with `npm install <package name>`, which means it will not be installed for the deployed version.

    </details>

- [ ] The `start` script calls `node` (not `nodemon`)
  <details style="padding-left: 2em">
    <summary>More about setting the <code>start</code> script</summary>
    
    Dokku will use the `start` script (`npm run start`) to run your application and, unlike us, doesn't need the server restarting with changes. This is one reason we use a separate `npm run dev` script for working locally.
  </details>

---

## Creating and deploying your Dokku app

We need to create and deploy our apps to see them live.

### 5. Creating your app
- [ ] Creating your app
  <details style="padding-left: 2em">
    <summary>How to create an app</summary>

    In the git repo for your project run these commands (replace "my-pupparazzi") with the name of your app. eg "ysabel-pupparazzi-ahoaho-22"

    ```sh
    dokku apps:create my-pupparazzi
    ```
    
    - If you would like to use this deployment for your WD04 assessment, please include your first name (or another identifier, e.g. nickname) in the app name.
    - This will create an app on Heroku from your terminal, and automatically add it as a remote in your local repo. Run `git remote -v` in your terminal to see this.
  </details>

### Optional: SSL certificate

- [ ] Adding an SSL certificate with the Let's Encrypt plugin
  <details style="padding-left: 2em">
    <summary>How to enable encryption</summary>

    In the repo for your app, you can run dokku commands and dokku will automatically operate on that application.

    ```sh
    dokku letsencrypt:enable
    ```
  </details>

### 6. Deploying your app
- [ ] Deploying your app
  <details style="padding-left: 2em">
    <summary>How to deploy an app</summary>

    **NOTE**: Dokku only has a `main` branch. so if you're deploying a local branch _other than_ `main`, you must specify which branch you're deploying with:

    ```
    git push heroku local-branch-name:main
    ```

    (Usually when we use `git push origin main`, it's actually short for `git push origin main:main`)
  </details>

- [ ] Open the deployed site with `heroku open` or by copying the url provided at the end of the deploy output logs
  <details style="padding-left: 2em">
    <summary>Tips</summary>
    
    Make sure you copy the website url, not the git url, and paste it into your browser

    **If you see the application error page, or if your site has issues starting, type `dokku logs --tail` into your command line in order to debug what may have gone wrong.**
  </details>

---

## Databases
### 7. Using a postgres database
- [ ] Setting up a postgres instance
  <details style="padding-left: 2em">
    <summary>How to set up the database</summary>

    Many of our websites use a postgres database. So let's see how we can set that up.

    Because our site won't really function until the database is available, we're going to use the `apps:create` command to initialise an app, and we'll attach a new database instance to it before we deploy a version of the app from git.

    > Reminder: run these commands in the project's git repository

    ```sh
    # Create an empty application called "dreamfest"
    dokku apps:create dreamfest
    # Initialise a new postgres instance called "dreamfest-db"
    dokku postgres:create dreamfest-db
    # Attach the new database to the dreamfest app
    dokku postgres:link dreamfest-db dreamfest
    ```

    When we ran `dokku apps:create` it should have added a remote called `dokku` so
    to deploy we just:

    ```sh
    git push dokku
    ```

    If that remote wasn't created for whatever reason, we can do it manually:

    ```sh
    git remote add dokku dokku@devacademy.nz:dreamfest
    ```

    Your migrations should run during the build or on startup, but
    you probably need to run your seeds manually.

    You can use `run` to run commands in your app container

    ```sh
    dokku run npm run knex seed:run
    ```
  </details>

### Optional: Using a sqlite database only
- [ ] Setting up sqlite in production
  <details style="padding-left: 2em">
    <summary>How to set the database engine</summary>

    On heroku we had to use postgres in production, but with dokku it's easy to attach persistent storage to an application and we can use that persistent storage to hold our sqlite3 database.

    This means that we could use the same database engine in dev and production if we wanted.

    ```sh
    dokku storage:ensure-directory dreamfest-storage
    dokku storage:mount dreamfest dreamfest-storage:/app/storage
    ```

    In your knexfile, you can configure the production to use a location in `/app/storage`.

    ```javascript
      production: {
        client: 'sqlite3',
        connection: {
          filename: '/app/storage/dev.sqlite3',
        },
        useNullAsDefault: true,
      },
    ```
  </details>

---
## .env files

### 8. Secrets and NODE_ENV

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

- [ ] Make sure you set each of the secret values in the dokku config
  <details style="padding-left: 2em">
    <summary>More about configuring secrets</summary>
 
    ```sh
    dokku config:set JWT_SECRET="shhhhhhhhh s3cr3t"
    ```
  </details>
