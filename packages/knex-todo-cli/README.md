# knex-todo-cli

Command-line todo app using Knex.

We're building a simple command-line tool to manage our list of todos. We're finally at the point of storing our data in a database! Woooo! We're using the Knex module to talk to our SQLite3 database.

> Remember: you can always look at the [knex documentation](https://knexjs.org/) when creating your database functionality, especially when building [queries](https://knexjs.org/guide/query-builder.html) or [schema](https://knexjs.org/guide/schema-builder.html).

---

## Setup

### 0. Installation and settings

- [ ] Install dependencies `knex` and `sqlite3`
  <details style="padding-left: 2em">
    <summary>More about installing</summary>

  You can do them both at once like this.

  ```sh
  npm install knex sqlite3
  ```

  </details>

- [ ] Set file permissions using `chmod +x todo.js`
  <details style="padding-left: 2em">
    <summary>More about file permissions</summary>

  Since this is a CLI (command-line interface) tool, instead of running our app using `node todo.js list`, we'd like to be able to run it like any other utility/script on our computer to make it easier to use. Running `chmod +x todo.js` in your terminal adds the executable flag to the file. Now you can run it in your console using `./todo.js list`. This means our programme will begin with the `todo.js` file.

  Note: if you run `./todo.js list` now, you will get an error because we still need to complete some more steps before we can show the contents of our database.
  </details>

- [ ] Create the Knex configuration file (`knexfile.js`) with `npm run knex init`
- [ ] Convert the knex file to an ecmascript module
  <details style="padding-left: 2em">
    <summary>How to convert knexfile to a module</summary>

    To be an ESM module, we just replace:

    ```js
    module.exports = {
    ```

    with:

    ```js
    export default {
    ```
  </details>



---

## Setting up the database

### 1. The first migration

- [ ] Use `npm run knex migrate:make todos` to create a migration file
- [ ] Convert the migration to an ESM module
  <details style="padding-left: 2em">
    <summary>How to convert your migration to a module</summary>

    To convert our migration functions we just replace this..

    ```js
    exports.up = function (knex) { 
    ```

    ... with

    ```js
    export function up(knex) {
    ```

    and replace ...

    ```js
    exports.down = function (knex) { 
    ```

    ... with

    ```js
    export function down(knex) {
    ```

  </details>
	

- [ ] Edit the new file in the new `migrations` folder so it will add (and drop) a table called `todos`
  <details style="padding-left: 2em">
    <summary>More about the <code>todos</code> table</summary>

  It should have the following fields:
  _ `id` (auto incrementing)
  _ `task`: string

  The documentation for [`dropTable`](http://knexjs.org/#Schema-dropTable) might be helpful.
  </details>

- [ ] Use `npm run knex migrate:latest` to apply the changes to the database

### 2. Seeds

- [ ] Use `npm run knex seed:make test-tasks` to create a seed file
- [ ] Edit the new file in the new `seeds` folder so it will add new tasks to the `todos` table
  <details style="padding-left: 2em">
    <summary>Tip</summary>
  First, we need to convert it to an ESM module by changing from this:

  ```js
  exports.seed = async function (knex) {
  ```

  to this...

  ```js
  export async function seed(knex) {
  ```

  The documentation for [`del`](http://knexjs.org/#Builder-del%20/%20delete) and [`insert`](http://knexjs.org/#Builder-insert) might be helpful.
  </details>

- [ ] Run `npm run knex seed:run` to add the new data to the database

### 3. Viewing data in the database

- [ ] Choose and set up a way to view the contents of the database
<details style="padding-left: 2em">
  <summary>More about viewing data</summary>
  
  There are a number of different options for peeking into your SQLite database. We recommend you use the SQLite Viewer VS Code extension. Alternatively, you can install a desktop application, such as the [DB Browser for SQLite](https://sqlitebrowser.org/) (installed on the campus computers) or [DBeaver](https://dbeaver.io) (great for all of the common relational databases - not just SQLite). Or you can use an online tool such as this [SQLite Viewer](https://inloop.github.io/sqlite-viewer/).
</details>

---

## Creating, reading, updating, and deleting tasks (CRUD)

### 4. Display tasks and IDs

We want to be able to update and delete our tasks. But before we do that we need to be able to identify them. This part has been completed for you as a demonstration.

- [ ] Familiarise yourself with the `commands.js` file
  <details style="padding-left: 2em">
    <summary>More about the <code>commands</code> file</summary>

  If you type `./todo.js list` in your terminal, this should output a list of tasks. The input + output should look like this:

  ```sh
  $ ./todo.js list

  1: vacuum
  2: buy groceries
  ```

  Notice two things about this example:

  - the commands are all separated into a different module, so that `todo` just calls a `require`d function from `commands.js`
  - `commands.js` has a **dependency** on `db.js` to interact with the database, but `todo` does not (it doesn't need it)
  </details>

- [ ] Familiarise yourself with the contents of the `todo` file
<details style="padding-left: 2em">
  <summary>More about the <code>todo</code> file</summary>
  
  In particular, what is `process.argv`? And how is it being used to get the command (`cmd`) that was typed (in our example, `list`)?
  
  Start by using `console.log` to explore this, and try adding more inputs to see how that changes the result (i.e. `./todo.js list hello testing 123`)
</details>

### 5. Delete a task by ID

- [ ] Enable users to complete a task by entering a command such as `./todo.js done 1` which will remove the task with `id` of `1` from the database
  <details style="padding-left: 2em">
    <summary>More about deleting a task</summary>

  You'll want to add a new function in `db.js` that can delete a row given its `id`. Look how the other functions work. You might need to review promises.

  To use the new function, add a function in `commands.js` called `deleteTodo` (or similar). Remember that you will need to pass an argument through from the `todo` module to so you can tell your DB function which task to delete. You likely want to pass the id as the **first** parameter to `deleteTodo`, as below. This is so the optional db parameter can be safely omitted.

  ```
  function deleteTodo(id, db = connection) {}
  ```

  **Additional hint**: accessing that `userInputs` array might come in handy right about now...

  If it helps, look at how the `list` function is structured to give you some ideas. What is happening with those `catch` and `finally` bits of code? What happens when you remove the `finally` block?
  </details>

### 6. Add a new task

It's all very well and good being able to delete tasks, but what happens when we run out of things to do?

- [ ] Enable users to add a new task by entering a command such as `./todo.js add 'pet cat'`
<details style="padding-left: 2em">
  <summary>More about adding a task</summary>
  
  You will need to add a function to `db.js` so we can insert a new task into our database, and also add a function to `commands.js` (that we will then call from our `todo` file) to make use of this.
</details>

### 7. Update a task by ID

Users make mistakes. Let them update a task.

- [ ] Enable users to update a task by id with a command such as `./todo.js update 1 'clean my room thoroughly'`
  <details style="padding-left: 2em">
    <summary>More about updating a task</summary>

  As before, add a function to `db.js` that does the actual updating of the database. Then add a function to `commands.js` that makes use of it.
  </details>

---

## Other task interactions

### 8. Add ability to search

Busy people are complaining about having 200 tasks in their consoles. Add a feature that searches in the task string for a given word.

- [ ] Enable users to search for tasks containing a search term by entering a command such as `./todo.js search 'wire'`

### 9. Preparing to complete tasks (non-destructively)

Users want to be able to mark a task as complete without removing it from the database.

- [ ] Use `npm run knex migrate:make add-completed-column` to create a new empty migration. Then update the new migration to add a column to the table
  <details style="padding-left: 2em">
    <summary>More about the new migration</summary>

  The documentation for [`knex.schema.table`](http://knexjs.org/guide/schema-builder.html#table) might be helpful when modifying an existing table.

  What data type should we use to store our new field(s)?
  </details>

- [ ] Fill in the `down` function in your migration. It should undo the changes made in the `.up` function

- [ ] Run and check the migration, and re-run the seeds
  <details style="padding-left: 2em">
    <summary>More about checking the migration and seeds</summary>

  1. Run `npm run knex migrate:latest` to run the new migration applying the changes to the database. If you don't get any errors, inspect the database in the SQLite Manager (The application called DB Browser for SQLite that you set up in section 3). Is it what you expected? What happened to existing data in the database?
  1. Run `npm run knex migrate:rollback` and look in your database.
  1. Run `npm run knex migrate:latest` and look again.
  1. Run `npm run knex seed:run` and look again.

### 10. Finish the "mark task complete" feature

- [ ] Enable users to mark a task complete, without deleting it from the database
  <details style="padding-left: 2em">
    <summary>More about completing...completion</summary>

  It's up to you to decide how far you want to go with this. Should listing all the tasks show completed and uncompleted tasks? Maybe you should add the task completed status when printing
  out a task. Maybe you can filter by completed when listing?
  </details>

---

## Stretch

<details>
  <summary>More about stretch challenges</summary>
  
  What is the next feature that would make this tool more useful for you? A priority field? Sorting? Tags? Archival? Whatever it is, add it!
</details>
<br />

## A note on using the debugger

<details>
  <summary>More about debugging</summary>

You'll find this challenge already has debugging set up for you, if you would like to use it. However, it won't start working until you complete the initial setup steps below! In addition, because we're debugging a **console** program, you'll need to change the `args` property in you debugger configuration to the actual command you'd like to debug. For example,

```json
  "program": "${workspaceFolder}/todo.js",
  "args": [
      "done",
      "1"
  ]
```

would debug the `./todo.js done 1` command. Ask a teacher for help if you're not sure!

</details>

---

[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=knex-todo-cli)
