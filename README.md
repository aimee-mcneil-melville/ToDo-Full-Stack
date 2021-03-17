# Dreamfest

You've just landed your first dev role and you're responsible for creating an app that manages Dreamfest, a wholesome 3 day festival that offers attendees daily yoga and meditation, arts and crafts, healthy eateries, well-being workshops and sweet beats.

Your app needs to allow the festival organisers the ability to add _locations_ and add _events_ at those locations. As plans change, they will also need to be able to add, edit and delete events.

Fortunately, the team has already confirmed the location and dates so they know how many locations they need. They have also confirmed some partners and bands so they can begin slotting them in when your app is ready. The current planning has been formatted as JSON in the `data` folder so you can use it as seed data for development and testing.

The design team has worked up the UI and routes, but they haven't added any of the data layer. That's where you come in. You'll create the migrations and seeds and then create some database functions that can be used from the routes. Let's get stuck in!

## Setup

1. Clone this repo
1. `cd dreamfest`
1. `npm install`
1. `npm run dev`
1. [http://localhost:3000](http://localhost:3000)
1. Get familiar with the existing codebase

## Create the migrations

You'll need to create 2 tables: `locations` and `events`

### `locations`

* `id`: number (primary key)
* `name`: string
* `image`: string
* `description`: string
* `max_attendee_count`: number

### `events`

* `id`: number (primary key)
* `name`: string
* `description`: string
* `location_id`: number (foreign key to locations.id)
* `day`: string
* `time`: string

Apply these migrations (using `npm run knex ...`) and use a database tool to verify they were created correctly.

## Add some seed data

Create and apply the seed data (using `npm run knex ...`) based on the JSON files in the `/db/data` folder. Use a database tool to verify the data was added correctly.

## Show the list of locations


