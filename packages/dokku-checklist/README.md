# Deployment Checklist

Follow this guide to get your app deployed. Note that depending your app's tech-stack, you might use the database configuration and environment sections or not.

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
    
    Dokku will use the `start` script (`npm run start`) to run your application.

  > Reminder: If the `start` script in your package.json runs `ts-node`, make sure that `ts-node` appears once in the dependencies list **_and not_** in devDepedencies.

  </details>

### 5. Production snippet

- [ ] Add the below snippet to the server.ts file

```javascript
if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static('/app/dist/assets'))
  server.get('*', (req, res) => {
    res.sendFile('/app/dist/index.html')
  })
}
  ```
### 6. Create dist folder
- [ ] Run this command in the terminal to create the dist folder with your assets:
```javascript
npm run build && npm run start
  ```
---

## Databases

If your app includes a database, read this. We're going to use an sqlite database.

### 7. Using a sqlite database

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

### 8. Procfile to migrate your database

- [ ] Make sure you have a Procfile
  <details style="padding-left: 2em">
    <summary>Procfile details</summary>

  To run your database migrations on Dokku, make sure you have a `Procfile` in the root of your project with these contents.

  #### Procfile

  ```Procfile
  web: npm run start
  release: npm run knex migrate:latest
  ```

  </details>

### 9. Adding a Dockerfile

- [ ] Application has a Dockerfile
  <details style="padding-left: 2em">
    <summary>Creating a dockerfile for your application</summary>

  Dokku can use docker to set up a virtual machine to run your application. To configure this
  create a file in the root of your repo called `Dockerfile` with these contents.

  ```Dockerfile
  FROM node:18-alpine
  WORKDIR /app

  COPY ["package.json", "package-lock.json*", "./"]
  RUN npm ci

  COPY . .

  ENV NODE_ENV=production
  RUN npm run build
  RUN npm prune --omit=dev
  ```

  </details>

---

## .env files

A .env file can be used to store API keys and other secrets.

### 10. Secrets and NODE_ENV

- [ ] If you are using the `dotenv` library and putting secret values in a `.env` file, make sure the .env config is only set up to run in development mode
  <details style="padding-left: 2em">
    <summary>More about environment variables</summary>
    
    Your server `index.js` file should have a block of code that looks like this:

  ```js
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    const envConfig = require('dotenv').config()
    if (envConfig.error) throw envConfig.error
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

## Creating and deploying your Dokku app

We need to create and deploy our apps to see them live.

### 11. Creating your app

- [ ] Creating your app
  <details style="padding-left: 2em">
    <summary>How to create an app</summary>

  > Reminder: If you created an app during the optional Postgres database step, you can skip this step.

  In the git repo for your project run this command. Use your corresponding app name, eg: "alexc-pupparazzi".

  Note that the name cannot include any underscores ('\_').

  ```sh
  dokku apps:create my-name-my-app-name
  ```

  This will create an app on Dokku from your terminal, and automatically add it as a remote in your local repo

  </details>

  <details style="padding-left: 2em">
    <summary>Trouble Shooting</summary>

  If Dokku responds with the error below:

  ```sh
  fatal: remote dokku already exists.
  !     Dokku remote not added! Do you already have a dokku remote?
  ```

  This is likely becuase you already created a dokku app from this repo. Open your `.git/config` file and see if a remoted called "dokku" already exists. Either remove it and try again, or run `dokku apps:report` to find out what the app is currently called. If you need to create a new app name, remove the dokku remote from `.git/config`.

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

  This is because the app name you used was already created by someone. Make sure you use a unique app name, eg: 'alexc-pupparazzi'.

  If you make a mistake or wish to remove one of your Dokku apps for any reason, run the command below:

  ```sh
  # To delete one of your apps
  dokku apps:destroy app-name
  ```

  If your app was stopped for any reason, for example: the Dokku server was over-run with apps and a teacher stopped them all. Then you may restart your app with the following commands:

  ```sh
  # List all apps to find your app name
  dokku apps:list

  # To start an app
  dokku ps:start app-name
  ```

  </details>

### 12. Mounting storage for your app's database

- [ ] Mounting app storage
  <details style="padding-left: 2em">
    <summary>App storage</summary>

  On heroku we had to use postgres in production, but with dokku it's easy to attach persistent storage to an application and we can use that persistent storage to hold our sqlite3 database.

  This means that we could use the same database engine in dev and production if we wanted.

  Run this command to ensure that a storage directory exists for your app (don't forget to to replace `app-name` with the full name of your app).

  ```sh
  dokku storage:ensure-directory app-name-storage
  ```

  ... then run this command to mount it for your app's use

  ```sh
  dokku storage:mount /var/lib/dokku/data/storage/app-name-storage:/app/storage
  ```

  Lastly, check the list of storage folders mounted for your the app. There should be **only one item** in the list returned.

  ```sh
  dokku storage:list
  ```

  </details>

  <details style="padding-left: 2em">
    <summary>Trouble Shooting</summary>

  If you see more than one storage item in that list, remove the redundant ones like this:

  ```sh
  dokku storage:unmount name-of-redundant-app-storage:/app/storage
  ```

  </details>

---

### 13. Deploying your app

- [ ] Deploying your app
  <details style="padding-left: 2em">
    <summary>How to deploy an app</summary>

  **NOTE**: Dokku only has a `main` branch. so if you're deploying a local branch _other than_ `main`, you must specify which branch you're deploying with:

  ```sh
  git push dokku local-branch-name:main
  ```

  (Usually when we use `git push origin main`, it's actually short for `git push origin main:main`)

  </details>

  <details style="padding-left: 2em">
    <summary>Trouble Shooting</summary>

  If Dokku responds with the error below:

  ```sh
  remote:  !     my-app currently has a deploy lock in place. Exiting...
  remote:  !     Run 'apps:unlock' to release the existing deploy lock
  To devacademy.nz:my-app
  ! [remote rejected] my-branch -> main (pre-receive hook declined)
  error: failed to push some refs to 'dokku@devacademy.nz:my-app'
  ```

  This is likely becuase a previous deployment did not complete. Run the command it suggests to
  resolve the issue and try to push again:

  ```sh
  dokku apps:unlock
  ```

  If you see the error below after a while, someone else might have used the same app name and storage as you. Or you might have mounted more than one storage point.

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

### 14. Seeding your Database

- [ ] Running your DB seeds.
  <details style="padding-left: 2em">
    <summary>Run those seeds</summary>

  Your migrations will run as part of the release phase (in your Procfile) however you will need to run your seeds manually.

  You can use `run` to run commands in your app container.

  ```sh
  dokku run npm run knex seed:run
  ```

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

---

[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=dokku-checklist)
