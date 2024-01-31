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

---

## User Stories

To complete these user stories, complete the empty functions provided to you in the `server/db/index.ts` file.

Run the associated test file (`server/db/index.test.ts`)to see if your function passes. Have a look at the test file in advance so you understand what the test is expecting to receive.

### 1. When I provide my passenger id I should get a list of all of my tickets

1. Complete the `getMyTickets` function.

### 2. When I provide my 'dob' I should get a list of all of my tickets

1. Complete the `getMyTicketsByDob` function.
2. Note: The 'dob' being used is a 4 digit number representing the day and month
  <details style="padding-left: 2em">
  <summary>Hint</summary>
   This time you will need to join two tables to complete the task. You will need to do this more in future tasks.
  </details>

### 3. When I provide my 'dob' I should get a list of all of my tickets

1. Complete the `countMyTicketsByDob` function.
2. Make sure you understand the shape of the data the test is looking for here.
  <details style="padding-left: 2em">
  <summary>Hint</summary>
   Take a look at the `.count` method in the knex docs
  </details>

### 4. When I provide my 'dob' I should get a list of all of my items of lost luggage
1. Complete the `countMyLostLuggage` function.
2. Make sure you understand the shape of the data the test is looking for here.
  <details style="padding-left: 2em">
  <summary>Hint</summary>
   You need to filter your results twice for this task. Take a look at the `.andWhere` method in the knex docs
  </details>

### 5. When I provide my 'dob' I should get the total weight of all of my lost luggage
1. Complete the `sumMyLostLuggageWeight` function.
2. Make sure you understand the shape of the data the test is looking for here.
  <details style="padding-left: 2em">
  <summary>Hint</summary>
   Take a look at the `.sum` method in the knex docs
  </details>

### 6. When I provide my 'dob' I should get the phone number and email address of the airport my lost luggage is located so that I can contact them
1. Complete the `getMyLostLuggageLocation` function.
2. Make sure you understand the shape of the data the test is looking for here.

### 7. When I provide a ticket id,  I should get the total weight of all of my lost luggage
1. Complete the `getTicketById` function.
2. Make sure you understand the shape of the data the test is looking for here.
3.  Print the boarding pass
   - Navigate to `http://localhost:5173/1234` to view the ticket (boarding pass), currently it's hardcoded
   - Write a db function that queries all ticket information in one query
   - Call the db function in `server.ts`
   - Go to `server/server.ts` and replace the hardcoded values with the data passed from `data`
   - Add any missing columns to the `tickets` table and to the `seed` file
  <details style="padding-left: 2em">
  <summary>Hint</summary>
   You will need to join the `airports` table twice to complete this task. To do this you will need to alias one of them to be called something else to avoid errors.
  </details>


### Stretch material

You can work on these user stories for homework, or if you finish early. You'll need to write your functions and tests from scratch for these tasks.

### 1. For a given airport, list the phone numbers for all passengers who have lost their luggage so that the Airport staff can call them

### 2. For a given airport, display the names and phone numbers for all passengers who own suspicious luggage
