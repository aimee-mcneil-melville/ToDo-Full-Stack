# Deployment Checklist

## Heroku setup
- [ ] You have a heroku account
- [ ] You have heroku toolbelt installed
- [ ] You can log into heroku on your command line

## Setup checklist
  *If you have a database...*
- [ ] You have a 'production' option in the config file (if you are using knex this will be in the knexfile.js)
- [ ] You have defined the structure of your databse with some migrations, that run locally without error.
- [ ] If you are seeding your database, the seed files run without error locally


## Deploying
1. navigate to your repo in your command line and log into heroku
    - `heroku login`

*Create an app from the command line*

2. Create a Heroku app
  - `heroku apps:create NAME_OF_YOUR_APP`
    This will create an app on heroku from your terminal, and automatically add it as a remote to your repo. type `git remote -v` to see this.

*Create an app from heroku*

2. From the dashboard, click the '+' tag in the top right corner. Create a name and press 'create app'. Scroll down to the 'deploy using heroku git' section and copy the line that starts 'heroku git:remote -a YOUR_HEROKU_APP'.
This adds  heroku as a new remote branch to your repo - much like github is. Type 'git remote -v' to see this.

3. Deploy to heroku
  - `git push heroku master`

4. Provision a postgres db using postgress addon
  - `heroku addons:create heroku-postgresql:hobby-dev`
  (This can also be done on heroku.com from the 'addons' section - look for 'heroku postgres')

5. Now it's time to set up your database, so we need Login to the heroku server
  - `heroku run bash`
  This opens the terminal for your app hosted on heroku, you will notice that it will be quite slow!

6. Run the migration and the seed file
  - `knex migrate:latest`
  - `knex seed:run`

7. Share and enjoy!
  (Though if you are seeing the application error page, type `heroku logs` into your command line in order to debug what may have gone wrong.)

## Common gotchas

- Ensure that all packages required are in your package.json. If a package is working globaly on your machine you may have forgotten to add it to your project explicitly, which means it will break on a remote server.

- Heroku sets a dynamic port which you can access with the port environment variable. If you are explicitly stating your port in your app without using the environment, it will break. A quick workabout is set your app.js to listen to:
`var port = procsee.env.PORT || 3000`

- Make sure your package.json has a start script - that is how Heroku runs your app

- Any references to 'localhost' within your app will break unless they are provided with a production environement alternative.

