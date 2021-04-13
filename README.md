# DreamFest

You've just landed your first dev role and you're responsible for creating an app that manages DreamFest, a wholesome 3 day festival that offers attendees daily yoga and meditation, arts and crafts, healthy eateries, well-being workshops and sweet beats.

Your app needs to allow the festival organisers the ability to add _locations_ and add _events_ at those locations. As plans change, they will also need to be able to add, edit and delete events.

Fortunately, the team has already confirmed the location and dates so they know how many locations they need. They have also confirmed some partners and bands so they can begin slotting them in when your app is ready. The current planning has been formatted as JSON in the `data` folder so you can use it as seed data for development and testing.

The design team has worked up the UI and routes, but they haven't added the data persistence layer. That's where you come in. You'll create the migrations and seeds and then implement some database functions that can be used from the routes. Let's get stuck in!

## Steps

:raised_hands: indicates an assessment opportunity<br>
:muscle: indicates a stretch opportunity

0. :raised_hands: [Setup](#setup)
1. :raised_hands: [Create migrations](#create-migrations)
1. :raised_hands: [Add seed data](#add-seed-data)
1. :raised_hands: [Show all locations](#show-all-locations)
1. :raised_hands: [Show events for a day](#show-events-for-a-day)
1. :raised_hands: [Edit locations](#edit-locations)
1. :raised_hands: [Add new events](#add-new-events)
1. :raised_hands: [Delete events](#delete-events)
1. :muscle: [Edit events](#edit-events)
1. :muscle: [Add new locations](#add-new-locations)
1. :muscle: [Delete locations](#delete-locations)

FYI: [A note about styling](#a-note-about-styling)

## Setup

1. Clone this repo
1. `cd dreamfest`
1. `npm install`
1. `npm run dev`
1. Have a little [play with the app](http://localhost:3000) as it is
1. Get familiar with the existing codebase

### What you're starting with

The application is usable ... _ish_. Events can be viewed, added and edited, and locations can be viewed and edited. However, all changes are not being persisted - they only live in the server's memory. When the server is restarted, all changes will disappear. That's because `db/index.js` isn't currently using a database - its functions aren't even asynchronous. You will need to re-write all of the exported functions in `db/index.js` and, because they will be asynchronous once you've implemented them properly, you'll need to fix where they are being called in the routes. But first, you'll need to create the database.

Knex has been installed, the `knexfile.js` has been created and a `knex` script is waiting patiently for you in `package.json`.

## Create migrations

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

## Add seed data

1. Create the seed files based on the JSON files in the `/db/data` folder.
1. Add the seed data to the database using `npm run knex`.
1. Use a database tool to verify the data was added correctly.

## Show all locations

1. Re-write the `getAllLocations` function in `db/index.js` to make it return a Promise that resolves an array of locations from the database.
1. Have a look at the `GET /locations` route in `routes/locations.js`. You don't need to edit it (it's already working), but it's a good indicator of how many of your other routes will use the database functions.

## Show events for a day

1. `GET /schedule/:day` in `routes/schedule.js`
1. `getEventsByDay()` in `db/index.js`
1. JOIN the `events` and `locations` tables WHERE `events.location_id = locations.id`

## Edit locations

**Show the form**

1. `GET /locations/4/edit` in `routes/locations.js`
1. `getLocationById()` in `db/index.js`
1. SELECT `events` table WHERE `events.location_id = locationId`
1. Be sure the form is being populated correctly

**Submit the form**

1. Happens in `POST /locations/edit` in `routes/locations.js`
1. `updateLocation()`
1. UPDATE `events` table with `event`
1. `res.redirect('/locations')`

## Add new events

1. Happens in `POST /events/add` in `routes/events.js`
1. `addNewEvent()` in `db/index.js`
1. `res.redirect('/schedule/:day)`

## Delete events

1. Happens in `POST /events/delete` in `routes/events.js`
1. `deleteEvent()` in `db/index.js`
1. `res.redirect('/schedule/:day)`

## Edit events

**Show form**

1. Happens in `GET /events/:id/edit` in `routes/events.js`
1. `getEventById(id)` and `getAllLocations()` (recommend `Promise.all`)
1. `res.render('editEvent', { event, days, locations })`

**Submit form**

1. Update `POST /events/edit` in `routes/events.js`
1. `updateEvent(updatedEvent)` in `db/index.js`
1. `res.redirect('/schedule/:day')`

## Add new locations

You'll have to create new things in this step, but referring to existing features will help.

**Show form**

1. Create link to "Add location" in `views/showLocations.hbs`
    - Styling will be very similar to the "Add event" link in `views/showDay.hbs`
1. Create `views/addLocation.hbs` file (very similar to `views/editLocation.hbs`)
1. Create a `GET /locations/add` route in `routes/locations.js` to render `views/addLocation.hbs`

**Submit form**

1. Create `POST /locations/add` in `routes/locations.js`
1. Create an `addNewLocation()` in `db/index.js`
1. `res.redirect('/locations')`

## Delete locations

You'll also have to create new things in this step, but referring to existing features will help.

**Create link**

1. Add new "Delete" form and button to `views/editLocation.hbs` (see `views/editEvent.hbs`)

**Create route**

1. Create a `POST /locations/delete` in `routes/locations.js`
    - pass the `id` as a hidden form field
1. Create and export a `deleteLocation(id)` in `db/index.js`
1. `res.redirect('/locations')`

## A note about styling

The `build` script (in `package.json`) creates a production build, which creates a very small `public/main.css`. If you are not going to use any class names that aren't already in use, you only need to run this once (it is run as a `postinstall` script so it has probably already run). You'll also need to run this if you change `tailwind.config.js` or `public/source.css`.

If you plan to do a lot of styling work, you should run `npm run build:dev`, which gives you all of Tailwind CSS, but also a large `public/main.css`. Just be sure to `npm run build` when you're all finished.

> Note: `main.css` is in the `.gitignore` so it isn't checked into the repo.

Also, all of the low-level utility classes have been left on the HTML elements, rather than cleaning everything up with Tailwind's `@apply` feature. The `@apply` feature should probably be used on a proper production app, but this hasn't been done here to make debugging easier.
