# Deployment Checklist

## Heroku setup

- [ ] You have a Heroku account.
- [ ] You have Heroku Toolbelt installed.
- [ ] You can login to Heroku on your command line with `heroku login`.


## Setup checklist

  *If you have a database:*
- [ ] You have a `production` option in the config file (if you are using knex this will be in the `knexfile.js`).
- [ ] You have defined the structure of your database with some migrations, that run locally without error.
- [ ] If you are seeding your database, the seed files run without error locally.


## Create app
 
*From the command line*

1. Create a Heroku app
  - `heroku apps:create NAME_OF_YOUR_APP`
  - This will create an app on Heroku from your terminal, and automatically add it as a remote in your local repo. Run `git remote -v` in your terminal to see this.

*From heroku.com*

1. From the dashboard, click the '+' tag in the top right corner. Create a name and press 'create app'. Scroll down to the 'deploy using heroku git' section and copy the line that starts 'heroku git:remote -a YOUR_HEROKU_APP'. This adds `heroku` as a new remote to your repo, similar to `origin`. Type `git remote -v` to see it.

2. Deploy to Heroku
  - `git push heroku master`

3. Provision a Postgres DB using the postgresql addon
  - `heroku addons:create heroku-postgresql:hobby-dev`
  - This can also be done on heroku.com from the 'addons' section. Look for 'heroku postgres'.

4. Now it's time to set up your database, so we need to login to the Heroku server
  - `heroku run bash`
  - This opens the terminal for your app hosted on Heroku. You will notice that it will be quite slow!

5. Run the migration and the seed file
  - `knex migrate:latest`
  - `knex seed:run`

6. Share and enjoy! If you see the application error page, type `heroku logs` into your command line in order to debug what may have gone wrong.


## Common gotchas

- Ensure that all required packages are in your `package.json`. If a package is working globaly on your machine you may have forgotten to add it to your project explicitly, which means it will break on a remote server.

- Heroku sets a dynamic port which you can access with the port environment variable. If you are explicitly stating your port in your app without using the environment, it will break. A good practice is to set your `app.js` to listen to:

```js
var port = process.env.PORT || 3000
```

- Make sure your `package.json` has a start script. Heroku uses this to start your app.
- Any references to 'localhost' within your app will break unless they are provided with a production environement alternative.
