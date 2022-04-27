# DreamFest

You've just landed your first dev role and you're responsible for creating an app that manages DreamFest, a wholesome three day festival that offers attendees daily yoga and meditation, arts and crafts, healthy eateries, well-being workshops and sweet beats.

Your app needs to allow the festival organisers the ability to add _locations_, and to add _events_ at those locations. As plans change, they will also need to be able to add, edit and delete events.

Fortunately, the team has already confirmed the venue and dates so they know how many locations they need. They have also confirmed some partners and bands so they can begin slotting them in when your app is ready. The current planning has been has been prepared as seed data for your database.

The design team has worked up the UI and routes, but they haven't connected them to the database. That's where you come in. You'll implement the database functions to be used from the routes. Let's get stuck in!

## Setup

1. Clone this repo
1. `cd dreamfest`
1. `npm install`
  * note: if the install fails, run `npm uninstall @vscode/sqlite3`, `npm install` then `npm install @vscode/sqlite3 --build-from-source`
1. `npm run knex migrate:latest`
1. `npm run knex seed:run`
1. `npm run dev`
1. Have a little [play with the app](http://localhost:3000) as it is
1. Get familiar with the existing codebase

### What you're starting with

The application is usable ... _ish_. You can try anything and the app shouldn't break or throw any errors, but adding, editing and deleting events and locations doesn't work yet. Also, you're only seeing hard-coded data. You will need to write all the necessary database functions (in `db/index.js`). You will call these database functions from the routes. All of the changes in `routes` are marked with `TODO:`. Be sure you understand the existing code and have a plan before you start coding new functionality.

## MVP

### 1. Show all locations

1. Have a look at the `GET /locations` route in `routes/locations.js`.
1. Complete the `getAllLocations()` function in `db/index.js` and have it return a Promise that resolves an array of locations from the database.
1. Complete the route using your new database function.
  * Don't forget to put the `viewData` and `res.render` call in your callback once you have the locations from the database.

### 2. Show events for a day

1. Have a look at the `GET /schedule/:day` route in `routes/schedule.js`
1. Add a `getEventsByDay(day)` function in `db/index.js`
  * JOIN the `events` and `locations` tables WHERE `events.location_id = locations.id`
  * Filter (`where`) the results for only events where the day matches
  * Note that the `events` and `locations` tables both have `name` and `description` columns. How can you specify which one to use when? What is the shape of the data that the handlebars template is expecting? _Hint: look at the shape of the hard-coded sample data._
  * If some data isn't displaying in the app, try using `console.log` to look at your data, so that you can compare it to the sample data.

### 3. Edit locations

**Show the form**

1. `GET /locations/4/edit` in `routes/locations.js`
1. `getLocationById(id)` in `db/index.js`
1. Be sure the form is being populated correctly

**Submit the form**

1. Happens in `POST /locations/edit` in `routes/locations.js`
1. `updateLocation(updatedLocation)`
1. UPDATE `locations` table with updated location details
1. Be sure `res.redirect('/locations')` is inside your `.then` function

### 4. Add new events

1. Happens in `POST /events/add` in `routes/events.js`
1. `addNewEvent(event)` in `db/index.js`
1. Be sure `res.redirect('/schedule/:day)` is inside your `.then` function

### 5. Delete events

1. Happens in `POST /events/delete` in `routes/events.js`
1. `deleteEvent(id)` in `db/index.js`
1. Be sure `res.redirect('/schedule/:day)` is inside your `.then` function

## Stretch

### 6. Edit events

**Fix form**
1. Happens `GET /events/add/:day` in `routes/events.js`
1. Insert `getAllLocations()` in your route
1. Be sure `res.render('editEvent', viewData)` is inside your `.then` function

**Show form**

1. Happens in `GET /events/:id/edit` in `routes/events.js`
1. Create `getEventById(id)` and `getAllLocations()` in `db/index.js`
1. When calling these functions in your route, call them in this order. Consider returning the event's `locationId` to the next function in the promise chain.

**Submit form**

1. Create `updateEvent(updatedEvent)` in `db/index.js`
1. Update `POST /events/edit` in `routes/events.js`

### 7. Add new locations

You'll have to create new things in this step, but referring to existing features will help.

**Show form**

1. Create link to "Add location" in `views/showLocations.hbs`
    - Styling will be very similar to the "Add event" link in `views/showDay.hbs`
1. Create `views/addLocation.hbs` file (very similar to `views/editLocation.hbs`)
1. Create a `GET /locations/add` route in `routes/locations.js` to render `views/addLocation.hbs`

**Submit form**

1. Create `POST /locations/add` in `routes/locations.js`
1. Create an `addNewLocation(locationInfo)` in `db/index.js`
1. `res.redirect('/locations')`

### 8. Delete locations

You'll also have to create new things in this step, but referring to existing features will help.

**Create link**

1. Add new "Delete" form and button to `views/editLocation.hbs` (see `views/editEvent.hbs`)

**Create route**

1. Create a `POST /locations/delete` in `routes/locations.js`
    - pass the `id` as a hidden form field
1. Create and export a `deleteLocation(id)` in `db/index.js`
1. `res.redirect('/locations')`

### 9. Test helper functions

Some tests have been created in `helpers.test.js` but they haven't been written yet. They are just testing the functions exported from `helpers.js` so they should be pretty easy (as far as testing goes). Some of the functionality hasn't been implemented in the helper functions, so you'll need to do that too. Perhaps this is a good time to revisit test-driven development (write the tests before implementing the functionality in `helpers.js`). Remember red, green, refactor!
