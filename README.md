# knex-todo-cli

Command-line todo app using Knex.

We're building a simple command-line tool to manage our list of todos. We're finally at the point of storing our data in a database! Woooo! We're using the Knex module to talk to our SQLite3 database.


## Setup

* Install dependencies.

  ```sh
  npm i knex sqlite3
  ```

* Set file permissions.

  ```sh
  chmod +x todo
  ```

Since this is a CLI (command-line interface) tool, instead of running our app using `node todo list`, we'd like to be able to run it like any other utility/script on our computer to make it easier to use. Running `chmod +x todo` in your terminal adds the executable flag to the file. Now you can run it in your console using `./todo list`. This means our programme will begin with the `todo` file. Note: if you run `./todo list` now, you will get an error because we still need to complete some more steps before we can show the contents of our database.

* Create the Knex configuration file (`knexfile.js`).

  ```sh
  npx knex init
  ```


## Set up the database

* Add a migration for the `todos` table.

  ```sh
  npx knex migrate:make todos
  ```

  1. Edit the new file in the new `migrations` folder so it will add (and drop) a table called `todos` with the following fields:

      * `id` (auto incrementing)
      * `task`: string

  The documentation for [`dropTable`](http://knexjs.org/#Schema-dropTable) might be helpful.

  2. Use `npx knex migrate:latest` to apply the changes to the database.

* Add some seed data.

  ```sh
  npx knex seed:make test-tasks
  ```

  1. Edit the new file in the new `seeds` folder so it will add new tasks to the `todos` table.

  The documentation for [`del`](http://knexjs.org/#Builder-del%20/%20delete) and [`insert`](http://knexjs.org/#Builder-insert) might be helpful.

  2. Run `npx knex seed:run` to add the new data to the database.


## Viewing data in the database
There are a number of different options for peeking into your SQLite database. You can install a desktop application, such as the [DB Browser for SQLite](https://sqlitebrowser.org/) (installed on the EDA computers) or [DBeaver](https://dbeaver.io) (great for all of the common relational databases - not just SQLite). Or you can use an online tool such as this [SQLite Viewer](https://inloop.github.io/sqlite-viewer/).

## Display tasks and IDs

We want to be able to update and delete our tasks. But before we do that we need to be able to identify them. This part has been completed for you as a demonstration. Take a look at the `commands.js` file. This provides an output that looks like this:

```sh
$ ./todo list

1: vaccuum
2: buy groceries
```

Notice two things about this example:
 * the commands are all separated into a different module, so that `todo` just calls a `require`d function from `commands.js`
 * `commands.js` has a _dependency_ on `db.js` to interact with the database, but `todo` does not (it doesn't need it)

Before you move on, make sure you understand the contents of the `todo` file. In particular, what is `process.argv`? And how is it being used to get the command (`cmd`) that was typed (in our example, `list`)?

Start by using `console.log` to explore this, and try adding more inputs to see how that changes the result (i.e. `./todo list hello testing 123`)

## Delete a task by ID

Users should be able to complete tasks. We'd like to be able to do something like `./todo done 1` which will remove the task with `id` of `1` from the database.

You'll want to add a new function in `db.js` that can delete a row given its `id`. Look how the other functions work. You might need to review promises.

To use the new function, add a function in `commands.js` called `deleteTodo` (or similar). Remember that you will need to pass an argument through from the `todo` module to so you can tell your DB function which task to delete. _Hint: accessing that `userInputs` array might come in handy right about now..._

If it helps, look at how the `list` function is structured to give you some ideas. What is happening with those `.catch` and `.finally` bits of code? What happens when you remove the `.finally` calls?

## Add a new task

It's all very well and good being able to delete tasks, but what happens when we run out of things to do? Let's enable our users to add some more. 

The command should look something like this:

```sh
./todo add 'pet cat'
```

You will need to add a function to `db.js` so we can insert a new task into our database, and also add a function to `commands.js` (that we will then call from our `todo` file) to make use of this.

## Update a task by ID

Users make mistakes. Let them update a task like so:

```sh
./todo update 1 'clean my room thoroughly'
```

As before, add a function to `db.js` that does the actual updating of the database. Then add a function to `commands.js` that makes use of it.


## Add ability to search

Busy people are complaining about having 200 tasks in their consoles. Add a feature that searches in the task string for a given word. Perhaps something like:

```sh
./todo search 'wire'
```


## Add migration to mark a task complete

Now we have users using our tool, but we have new features to add. We need a way of updating our database without destroying all the existing data.

Users want to be able to mark a task as complete without removing it from the database.

1. Use `npx knex migrate:make add-completed-column` to create a new empty migration.

  The documentation for [`knex.schema.table`](http://knexjs.org/#Schema-table) might be helpful when modifying an existing table.

  What data type should we use to store our new field(s)?

2. Fill in the `.down` function in your migration. It should undo the changes made in the `.up` function.

3. Run `npx knex migrate:latest` to run the new migration applying the changes to the database. If you don't get any errors, inspect the database in the SQLite Manager (The application called DB Browser for SQLite). Is it what you expected? What happened to existing data in the database?

4. Run `npx knex migrate:rollback` and look in your database.

5. Run `npx knex migrate:latest` and look again.

6. Run `npx knex seed:run` and look again.


## Finish the _mark task complete_ feature

It's up to you to decide how far you want to go with this. Should listing all the tasks show completed and uncompleted tasks? Maybe you should add the task completed status when printing out a task. Maybe you can filter by completed when listing?


## Add the feature that's missing

What is the next feature that would make this tool more useful for you? A priority field? Sorting? Tags? Archival? Whatever it is, add it!



## A note on using the debugger

You'll find this challenge already has debugging set up for you, if you would like to use it. However, it won't start working until you complete the initial setup steps below! In addition, because we're debugging a _console_ program, you'll need to change the `args` property in you debugger configuration to the actual command you'd like to debug. For example,

```json
  "program": "${workspaceFolder}/todo",
  "args": [
      "done",
      "1"
  ]
```

would debug the `./todo done 1` command. Ask a teacher for help if you're not sure!

