# Dreamfest

You've just landed your first dev role and you're responsible for creating an app that manages Dreamfest, a wholesome 3 day festival that offers attendees daily yoga and meditation, arts and crafts, healthy eateries, well-being workshops and sweet beats.

Your app needs to allow the festival organisers the ability to add _locations_ and add _events_ at those locations. As plans change, they will also need to be able to add, edit and delete events.

Fortunately, the team has already confirmed the location and dates so they know how many locations they need. They have also confirmed some partners and bands so they can begin slotting them in when your app is ready. The current planning has been formatted as JSON in the `data` folder so you can use it as seed data for development and testing.

The design team has worked up the UI and routes, but they haven't added any of the data layer. That's where you come in. You'll create the migrations and seeds and then create some database functions that can be used from the routes. Let's get stuck in!

## Overview

0. [Setup](#Setup)
1. [Create the migrations](#create-the-migrations)
1. [Add the seed data](#add-the-seed-data)

## Setup

1. Clone this repo
1. `cd dreamfest`
1. `npm install`
1. `npm run dev`
1. [http://localhost:3000](http://localhost:3000)
1. Get familiar with the existing codebase

### What you're starting with

The application is usable ... _ish_. You can view/add/edit events and view/edit locations. However, all changes are not being persisted - they only live in the server's memory. When the server is restarted, all changes will disappear. That's because `db/index.js` isn't currently using a database - its functions aren't even asynchronous. You will need to re-write all of the exported functions in `db/index.js` and, because they will be asynchronous once you've implemented them properly, you'll need to fix where they are being called in `routes.js`. But first, you'll need to create the database.

Knex has been installed, the `knexfile.js` has been created and a `knex` script is waiting patiently for you in `package.json`.

## Create the migrations

You'll need to create 2 tables: `locations` and `events`

### `locations`

* `id`: number (primary key)
* `name`: string
* `description`: string

### `events`

  * `id`: number (primary key)
  * `location_id`: number (foreign key to locations.id)
  * `day`: string
  * `time`: string
  * `name`: string
  * `description`: string

### Steps

1. Create the migration files for these 2 tables and apply them using `npm run knex`.
1. Use a database tool, such as the DB Browser for SQLite, to verify they were created correctly.

## Add the seed data

1. Create the seed files based on the JSON files in the `/db/data` folder.
1. Add the seed data to the database using `npm run knex`.
1. Use a database tool to verify the data was added correctly.

## Show the list of locations


