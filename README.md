# knex-joins-stories

User stories to implement when practising joins.


## Installation

Clone this repo, `cd` into the new directory and then:

```
npm i
npx knex migrate:latest
npx knex seed:run
npm run dev
```

This will create and populate the database with the existing migrations and seeds, and start the server with `nodemon`.


## Start with:

- _As a user, I would like to see a list of wombles so that I can know who to ask to clean up Wimbledon Commons._

- _As a user, I would like to visit a `view` route for an individual womble that shows their name and characteristics so that I can identify them on sight._
   - This will need a join between `wombles` and `characteristics`.


- _As a user, I would like to visit an `assignments` route. This should show a list of wombles and the rubbish they have been assigned to pick up so that I can ensure they are doing their job._
   - This will need a join between `wombles` and `rubbish`.
   - There is no `rubbish_id` in `wombles`, so you'll need to make a new migration to add a column to that table.


That's MVP! If you're done already, implement the stories below.


## Stretch stories:

- _As a user, I would like to add wombles to the wombles table as they are born (including their characteristics) so that I may track new wombles._

- _As a user, I would like to delete wombles from the wombles table when one of them croaks._

- _As a user, I would like to modify a womble's characteristics so that they can change costumes when they like._

- _As a user, I would like to change a womble's rubbish type assignment so I can make the best use of their meagre resources._

- _As an administrator, I would like to add new rubbish types because the rubbish collection needs on Wimbledon Commons are always changing._

- _As an administrator, I would like to add new characteristics because wombles must always be stylish._
