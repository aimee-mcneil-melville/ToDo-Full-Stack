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
What just happened? There is a new file in your folder. What is it?
Install SQLite Manager as a firefox addon. Open your new sqlite db file and have a look around. Try and understand how the migration file corresponds to how the db looks in SQLite Manager.

### Seed the db
```knex seed:run```
Now go check out your db in SQLite Manager. You should see some rows in your table!
While you are there, write a query that adds a new task to the database.

### Set file permissions
Instead of running our file like ```node todo.js``` we'd like to be able to run it like any other script on our computer, just to make it easier to use.

Run ```chmod +x todo``` in your console to add the excutable flag to the file.

Now you can just run in in your console like ```./todo list```

You should see some tasks that were seeded in your db.

## Release 0: Add task id to program output.

We want to be able to update and delete our tasks. But before we do that we need to be able to identify them.

Add some code so that when we log out a task it gives the id number too. eg
```./todo list``` => ```1: 'clean my room'```

