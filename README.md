# todo-knex
Command line todo app using knex raw

## Intro

We're building a simple command line app to manage our list of todos. We're finally at the point of storing our data in a database! Woooo!

We're using the knex module to talk to our sqlite3 database.

## Setup
### Install knex globally
```npm i -g knex```

### Run the migrations
```knex migrate:latest```

### Seed the db
```knex seed:run```

### Set file permissions
Instead of running our file like ```node todo.js``` we'd like to be able to run it like any other script on our computer, just to make it easier to use.

Run ```chmod +x todo``` in your console to add the excutable flag to the file.

Now you can just run in in your console like ```./todo list```

You should see some tasks that were seeded in your db.

## Release 0


