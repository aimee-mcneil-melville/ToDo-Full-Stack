# knex-todo-cli

Command-line todo app using Knex.

We're building a simple command-line tool to manage our list of todos. We're finally at the point of storing our data in a database! Woooo! We're using the Knex module to talk to our SQLite3 database.


## Setup

* Install dependencies.

  ```sh
  yarn init -y
  yarn add knex sqlite3
  yarn add jest --dev
  ```

* Create `knex` and `test` scripts in `package.json`.

  ```js
  "scripts": {
    "knex": "knex",
    "test": "jest"
  }
  ```

  This allows us to use the `knex` CLI tool, without having to install `knex` globally.

* Set file permissions.

  Since this is a CLI (command-line interface) tool, instead of running our app using `node todo list`, we'd like to be able to run it like any other utility/script on our computer to make it easier to use. Run `chmod +x todo` in your terminal to add the executable flag to the file. Now you can run it in your console using `./todo list`

* Create the knex config file (`knexfile.js`).

  ```sh
  yarn knex init
  ```

  Edit your `knexfile` so it has a `test` property:

  ```js
    test: {
      client: 'sqlite3',
      connection: {
        filename: ':memory:'
      },
      seeds: {
        directory: './tests/seeds'
      }
    }
  ```

  This introduces a new idea: that we can run an _in-memory database_! This database will only last as long as our tests, and vanishes in a puff of smoke afterwards. Because it is in memory and not on the filesystem, it works extremely quickly and is not vulnerable to any problems that might occur with the filesystem (hard disk full or busy, permissions problems with directories, etc).


## Set up the database

* Add a migration for the `todos` table.

  ```sh
  yarn knex migrate:make todos
  ```

  1. Edit the new file in the new `migrations` folder so it will add (and drop) a table called `todos` with the following fields:

      * `id` (auto incrementing)
      * `task`: string

  The documentation for [`createTableIfNotExists`](http://knexjs.org/#Schema-createTableIfNotExists) and [`dropTableIfExists`](http://knexjs.org/#Schema-dropTableIfExists) might be helpful.

  2. Use `yarn knex migrate:latest` to apply the changes to the database.

* Add some seed data.

  ```sh
  yarn knex seed:make test-tasks
  ```

  1. Edit the new file in the new `seeds` folder so it will add new tasks to the `todos` table.

  The documentation for [`del`](http://knexjs.org/#Builder-del%20/%20delete) and [`insert`](http://knexjs.org/#Builder-insert) might be helpful.

  2. Run `yarn knex seed:run` to add the new data to the database.


## Display task ID

We want to be able to update and delete our tasks. But before we do that we need to be able to identify them.

Add some code so that when we log out a task it gives the id number too. For example:

```sh
$ ./todo list

1: vaccuum
2: buy groceries
```


## Delete a task by ID

Users should be able to complete tasks. We'd like to be able to do something like `./todo done 1` which will remove the task with `id` of `1` from the database.

You'll want to add a new function that returns a promise that can delete a row given its `id`. Look how the other functions work. You might need to review promises.

What is happening with those `.catch` and `.finally` bits of code? What happens when you remove the `.finally` calls?


## Update a task by ID

Users make mistakes. Let them update a task like so:

```sh
./todo update 1 'clean my room thoroughly'
```


## Add ability to search

Busy people are complaining about having 200 tasks in their consoles. Add a feature that searches in the task string for a given word. Perhaps something like:

```sh
./todo search 'wire'
```


## Add migration to mark a task complete

Now we have users using our tool, but we have new features to add. We need a way of updating our database without destroying all the existing data.

Users want to be able to mark a task as complete without removing it from the database.

1. Use `yarn knex migrate:make add-completed-column` to create a new empty migration.

  The documentation for [`knex.schema.table`](http://knexjs.org/#Schema-table) might be helpful when modifying an existing table.

  What data type should we use to store our new field(s)?

2. Fill in the `.down` function in your migration. It should undo the changes made in the `.up` function.

3. Run `yarn knex migrate:latest` to run the new migration applying the changes to the database. If you don't get any errors, inspect the database in the SQLite Manager. Is it what you expected? What happened to existing data in the database?

4. Run `yarn knex migrate:rollback` and look in your database.

5. Run `yarn knex migrate:latest` and look again.


## Finish the _mark task complete_ feature

It's up to you to decide how far you want to go with this. Should listing all the tasks show completed and uncompleted tasks? Maybe you should add the task completed status when printing out a task. Maybe you can filter by completed when listing?


## Add the feature that's missing

What is the next feature that would make this tool more useful for you? A priority field? Sorting? Tags? Archival? Whatever it is, add it!


## Testing your functions

To make any function you write testable, you need to do a couple of things:

 - _export_ the function, so it is available outside of its module
 - _pass the database connection_ into it, so that we can give it either the real database or a temporary test database

The code for the second part in particular might be a new concept for you. Take a look at this:

```js
// This code is already in `todo`. Here, `db` is our database connection
var config = require('./knexfile').development
var db = require('knex')(config)

// ...

// If `testDb` is undefined, use `db`
function getAll (testDb) {
  var connection = testDb || db
  return connection('todos').select()
}
```

See what we did there?  We could pseudocode this as:

```
USING testDb OR db,
  GET all the todos
```

Another way of managing this is to always pass the database connection to the function. It doesn't care where it comes from!

```js
  case 'add':
    addTodo(note, db)
      .then(function () { return getAll(db) })
      .then(listTodos)
      // ...

// ...

function getAll (connection) {
  return connection('todos').select()
}
```

Take a look in `tests/todos.test.js` for an example of how to test such functions.
