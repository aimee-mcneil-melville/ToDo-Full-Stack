# Flight Club

![boarding-pass](/reference-imgs/boarding-pass.png)

**Hack the Airlines** is an airline company looking for developers to help them building an app for their customers and users. The main focus for this challenge is to write db functions and see the tests passing.

## Learning Objectives

- Entity Relationship Diagrams (ERDs)
- Joins
- Relationship contraints

## Install

```
npm install
npm run knex migrate:latest
npm run knex seed:run
```

After seeding the data, take a look at the tables and inspect the generated data. This data is generated using [faker](https://fakerjs.dev/) and it allows developers to quickly generated realistic for testing purposes. Take a look at `server/db/seeds/all.js` to learn more about how the data is generated.

Spend some time to familiarise yourself with the database structure and think about how tables relate to each other.

## User Stories

### As a Passenger (MVP)

1. List all my tickets given a `passengers.id`
1. List all my tickets by `passengers.dob`
   - Starting from this user story, we're going to use `join` in order to expand our queries for additional data
1. Count all my tickets by `passengers.dob`
1. How many luggage have you lost?
1. What is the total weight of your luggage where `is_lost` equals `true`?
1. List the airport `phone` and `email` where your lost luggage are found at, so that you can contact them
1. Print the boarding pass
   - Navigate to `http://localhost:3000/1234` to view the ticket (boarding pass), currently it's hardcoded
   - Write a db function that queries all ticket information in one query
   - Call the db function in `server.js`
   - Go to `views/ticket` and replace the hardcoded values with the data passed from `viewData`
   - Add any missing columns to the `tickets` table and to the `seed` file

### As an Airport staff (Stretch)

1. For a given airport, list the phone numbers for all passengers who have lost their luggage so that the Airport staff can call them
1. For a given airport, display the names and phone numbers for all passengers who own suspicious luggage
