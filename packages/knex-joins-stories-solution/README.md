# knex-joins-stories

This challenge provides user stories to implement, which will enable us to practise joins.

---

## Setup

### 0. Installation and migrations

- [ ] Clone this repo and `cd` into the new directory
- [ ] Install packages, run migrations and seeds, and start the dev server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    Commands might look like this:

    ```
    npm i
    npm run knex migrate:latest
    npm run knex seed:run
    npm run dev
    ```

    This will create and populate the database with the existing migrations and seeds, and start the server with `nodemon`.
  </details>

----

## Requirements

### 1. List of all wombles
- [ ] As a user, I would like to see a list of wombles so that I can know who to ask to clean up Wimbledon Commons

### 2. Single-womble view
- [ ] As a user, I would like to visit a `view` route for an individual womble that shows their name and traits so that I can identify them on sight
  <details style="padding-left: 2em">
    <summary>Tip</summary>
    
    This will need a join between `wombles` and `traits`.
  </details>

### 3. Who's doing what
- [ ] As a user, I would like to visit an `assignments` route. This should show a list of wombles and the rubbish they have been assigned to pick up so that I can ensure they are doing their job
  <details style="padding-left: 2em">
    <summary>Tips</summary>

    - This will need a join between `wombles` and `rubbish`.
    - There is no `rubbish_id` in `wombles`, so we'll need to make a new migration to add a column to that table (and we'll also need to add data for that new column into our seed data).
  </details>

That's MVP! If you're done already, implement the stories below.

---

## Stretch

<details>
  <summary>More about stretch challenges</summary>

  - As a user, I would like to add wombles to the wombles table as they are born (including their traits) so that I may track new wombles

  - As a user, I would like to delete wombles from the wombles table when one of them croaks

  - As a user, I would like to modify a womble's traits so that they can change costumes when they like

  - As a user, I would like to change a womble's rubbish type assignment so I can make the best use of their meagre resources

  - As an administrator, I would like to add new rubbish types because the rubbish collection needs on Wimbledon Commons are always changing

  - As an administrator, I would like to add new traits because wombles must always be stylish
</details>

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=knex-joins-stories)
