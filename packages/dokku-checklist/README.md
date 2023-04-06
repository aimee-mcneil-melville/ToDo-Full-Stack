# Deployment Checklist

Follow this guide to get your app deployed.  Note that depending your app's tech-stack, you might use the database configuration and environment sections or not.

- [Dokku user setup](#dokku-user-setup)
- [General app setup](#general-app-setup)
- [Database Configuration](#databases)
- [Environment / .env Files](#env-files)
- [Creating your Dokku app](#creating-and-deploying-your-dokku-app)

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

- [ ] The `start` script calls either `node` or `ts-node` (not `nodemon`)
  <details style="padding-left: 2em">
    <summary>More about setting the <code>start</code> script</summary>
    
    Dokku will use the `start` script (`npm run start`) to run your application and, unlike us, doesn't need the server restarting with changes. This is one reason we use a separate `npm run dev` script for working locally.
  </details>

---

## Databases

If your app includes a database, read this.  Choose either Postgres or SQLite sections.

### 5: Option A: Using a postgres database
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

  </details>

### 5. Option B: Using a sqlite database
- [ ] Setting up sqlite in production
  <details style="padding-left: 2em">
    <summary>How to set the database engine</summary>

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

### 6. Procfile to migrate database

To run your database migrations on Dokku, make sure you have a `Procfile` in the root of your project with these contents.

#### Procfile
```Procfile
web: npm run start
release: npm run knex migrate:latest
```

---
## .env files

A .env file can be used to store API keys and other secrets.
### 7. Secrets and NODE_ENV

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

---
## Creating and deploying your Dokku app

We need to create and deploy our apps to see them live.

### 8. Creating your app
- [ ] Creating your app
  <details style="padding-left: 2em">
    <summary>How to create an app</summary>

    In the git repo for your project run this command.  Use your corresponding app name, eg: "alexc-pupparazzi".

    Note that the name cannot include any underscores ('_').

    ```sh
    dokku apps:create my-name-my-app-name
    ```
    This will create an app on Dokku from your terminal, and automatically add it as a remote in your local repo. Run `git remote -v` in your terminal to see this.


    **Trouble Shooting**

    If Dokku responds with the error below:

    ```sh
    fatal: remote dokku already exists.
    !     Dokku remote not added! Do you already have a dokku remote?
    ```

    This is likely becuase you already created a dokku app from this repo.  Open your `.git/config` file and see if a remoted called "dokku" already exists.  Either remove it and try again, or run `dokku apps:report` to find out what the app is currently called.  If you need to create a new app name, remove the dokku remote from `.git/config`.

    ```sh
    # Open the git config file too find or delete the dokku remote
    code .git/config

    # 
    dokku apps:report
    ```

    If Dokku responds with the error below:

    ```sh
    dokku apps:create todo-full-stack                                                                             255 ↵
    -----> Dokku remote added at devacademy.nz called dokku
    -----> Application name is todo-full-stack
    Enter passphrase for key '/home/alexc/.ssh/id_ed25519':
    !     Name is already taken
    !     Failed to execute dokku command over ssh: exit code 0
    !     If there was no output from Dokku, ensure your configured SSH Key can connect to the remote server
    ```

    This is because the app name you used was already created by someone.  Make sure you use a unique app name, eg: 'alexc-pupparazzi'.



  </details>

### 9. Mounting storage for your app's database
- [ ] Mounting app storage
  <details style="padding-left: 2em">
    <summary>App storage</summary>

    On heroku we had to use postgres in production, but with dokku it's easy to attach persistent storage to an application and we can use that persistent storage to hold our sqlite3 database.

    This means that we could use the same database engine in dev and production if we wanted.

    ```sh
    # Copy these lines separetly to run them one at a time
    dokku storage:ensure-directory my-name-my-app-name-storage

    dokku storage:mount /var/lib/dokku/data/storage/my-name-my-app-name-storage:/app/storage
    ```

    Lastly, check the list of storage folders mounted for your the app.  There should be **only one item** in the list returned.

    ```sh
    dokku storage:list
    ```

    **Trouble Shooting**

    If you see more than one storage item in that list, remove the redundant ones like this:

    ```sh
    dokku storage:unmount name-of-redundant-app-storage:/app/storage
    ```

### Optional: SSL certificate

- [ ] Adding an SSL certificate with the Let's Encrypt plugin
  <details style="padding-left: 2em">
    <summary>How to enable encryption</summary>

    In the repo for your app, you can run dokku commands and dokku will automatically operate on that application.

    ```sh
    dokku letsencrypt:enable
    ```
  </details>

### 10. Deploying your app
- [ ] Deploying your app
  <details style="padding-left: 2em">
    <summary>How to deploy an app</summary>

    **NOTE**: Dokku only has a `main` branch. so if you're deploying a local branch _other than_ `main`, you must specify which branch you're deploying with:

    ```sh
    git push dokku local-branch-name:main
    ```
    
    (Usually when we use `git push origin main`, it's actually short for `git push origin main:main`)

    **Trouble Shooting**

    If Dokku responds with the error below:

    ```sh
    remote:  !     my-app currently has a deploy lock in place. Exiting...
    remote:  !     Run 'apps:unlock' to release the existing deploy lock
    To devacademy.nz:my-app
    ! [remote rejected] my-branch -> main (pre-receive hook declined)
    error: failed to push some refs to 'dokku@devacademy.nz:my-app'
    ```

    This is likely becuase a previous deployment did not complete.  Run the command it suggests to
    resolve the issue and try to push again:

    ```sh
    dokku apps:unlock
    ```

    If you see the error below after a while, someone else might have used the same app name and storage as you.  Or you might have mounted more than one storage point.
    
    Refer to the Mounting storage Trouble Shooting section to fix this.

    ```sh
    -----> Executing release task from Procfile: npm run knex migrate:latest
    remote:  !     Failed to create release execution container: Error response from daemon: Duplicate mount point: /app/storage
    remote:
    remote:  !     exit status 1
    To devacademy.nz:todo-full-stack
    ! [remote rejected] tian -> main (pre-receive hook declined)
    error: failed to push some refs to 'dokku@devacademy.nz:todo-full-stack'
    ```

  </details>

- [ ] Open the deployed site with `dokku open` or by copying the url provided at the end of the deploy output logs
  <details style="padding-left: 2em">
    <summary>Tips</summary>
    
    Make sure you copy the website url, not the git url, and paste it into your browser

    **If you see the application error page, or if your site has issues starting, type `dokku logs --tail` into your command line in order to debug what may have gone wrong.**
  </details>

### 11. Seeding your Database (for all DB tech)
- [ ] Running your DB seeds.

  Your migrations will run as part of the release phase (in your Procfile) however you will need to run your seeds manually.

  You can use `run` to run commands in your app container.

  ```sh
  dokku run npm run knex seed:run
  ```

---

