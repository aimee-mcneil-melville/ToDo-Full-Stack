# DreamFest

You've just landed your first dev role and you're responsible for creating an app that manages DreamFest, a wholesome three day festival that offers attendees daily yoga and meditation, arts and crafts, healthy eateries, wellbeing workshops and sweet beats.

Your app needs to give the festival organisers the ability to add _locations_ and to add _events_ at those locations. As plans change, they will also need to be able to add, edit and delete events.

Fortunately, the team has already confirmed the venue and dates so they know how many locations they need. They have also confirmed some partners and bands so they can begin slotting them in when your app is ready. The current planning has been prepared as seed data for your database.

The design team has worked up the UI and routes, but they haven't yet connected them to the database. That's where you come in. You'll implement the database functions to be used from the routes. Let's get stuck in!

## Setup

1. Clone this repo
1. `cd dreamfest`
1. `npm install`
    * note: if the install fails, run `npm uninstall sqlite3`, `npm install` then `npm install sqlite3 --build-from-source`
1. `npm run knex migrate:latest`
1. `npm run knex seed:run`
1. `npm run dev`
1. Have a little play with the app as it is
1. Get familiar with the existing codebase

### What you're starting with

The application is usable ... _ish_. You can try anything and the app shouldn't break or throw any errors, but adding, editing and deleting events and locations doesn't work yet. Also, you're only seeing hard-coded data. Most of the changes you'll need to make are marked with `TODO:`. Be sure you understand the existing code and have a plan before you start coding new functionality.

## MVP

### 1. Show all locations

1. Have a look at the `GET /locations` route in `routes/locations.js`.
1. Complete the `getAllLocations()` function in `db/index.js` and have it return a Promise that resolves to an array of locations from the database.
1. Complete the route using your new database function.
    * Don't forget to put the `viewData` and `res.render` call in your callback once you have the locations from the database

### 2. Show events for a day

1. Have a look at the `GET /schedule/:day` route in `routes/schedule.js`.
1. Make a `getEventsByDay()` function (today we'll put all our database functions in `db/index.js`). It should have a `day` parameter.
    * JOIN the `events` and `locations` tables WHERE `events.location_id = locations.id`
    * Filter (`where`) the results for only events where the day matches. Remember to pass the `day` when you call your function!
    * Note that the `events` and `locations` tables both have `name` and `description` columns, how can you specify which one to use when? What is the shape of the data that the handlebars template is expecting? _Hint: look at the shape of the hard-coded sample data_
    * If some data isn't displaying in the app, try using `console.log` to look at your data, so that you can compare it to the sample data

### 3. Edit locations

**Show the form**

1. Look at the `GET /locations/4/edit` route in `routes/locations.js`. This route supplies the current data to the form, ready for the user to edit it.
2. Make a `getLocationById()` function, with an `id` parameter.
3. Be sure the form is being populated correctly. 
    * If it's not working, you might like to try the same trouble-shooting strategies you used in Step 2
    * Can `.first()` help you here? 

**Submit the form**

4. Submitting the "Edit Location" form will send an HTTP POST request which will hit your `POST /locations/edit` route, in `routes/locations.js`.
5. Make an `updateLocation()` function with an `updatedLocation` parameter. Or if you find yourself struggling with the `updatedLocation` (object) parameter, start by using `id`, `name` and `description` parameters instead. 
    * UPDATE the `locations` table with the updated location details
    * Be sure `res.redirect('/locations')` is inside your `.then` function, this will take the user back to the main locations page instead of leaving them on the page with the edit form 

### 4. Add new events

**Fix form**

1. The "Add New Event" form needs a list of all the locations to put in the drop-down. Currently these are hard-coded, but we want them to come from the database (the days of the week are hard-coded too, but we're not going to change those). The `GET /events/add/:day` route in `routes/events.js` needs to obtain the list of locations from the database, and supply them to the form. 
2. You've already written a `getAllLocations()` function, now use it in your route. 
    * Does your form need the location descriptions? Will it work if you include them anyway (so that you don't need to change your function)? 
    * Be sure `res.render('addEvent', viewData)` is inside your `.then` function

**Submit the form**

3. Submitting the "Add New Event" form will send an HTTP POST request which will hit your `POST /events/add` route, in `routes/events.js`.
4. Make an `addNewEvent()` function, with an `event` parameter.
    * Be sure to redirect to the `/schedule/:day` route from inside your `.then` function

### 5. Delete events

1. Deleting an event will send an HTTP POST request which will hit your `POST /events/delete` route in `routes/events.js`.
    * Note that the "Edit event" page is currently displaying hard-coded details (you'll fix this in the next step), but it is handling the id correctly, so if you (for example) click "Edit event" on the "Slushie Apocalypse V" card, then the "Delete event" button should be able to delete "Slushie Apocalypse V" (id 5) even though the displayed details are for "Slushie Apocalypse I"
2. Make a `deleteEvent()` function, with an `id` parameter.
    * Be sure to redirect to the `/schedule/:day` route from inside your `.then` function

## Stretch

### 6. Edit events

**Show form**

1. Look at the `GET /events/:id/edit` route in `routes/events.js`. This route supplies the current data to the "Edit Event" form, ready for the user to edit it.
2. Make a `getEventById()` function, with an `id` parameter. Use this in your route. 

**Fix form**

3. Like the "Add new event" form above, the "Edit event" form also needs a list of locations from the database. We can use `getAllLocations()` for a third time, but this time we need to modify the data before we send it to the form, so that our data records which location is the current location for this event.
    * Maybe you could use an array function here? 
4. Make sure you call `getEventById()` first, and then `getAllLocations()`. 
    * You're managing three bits of data here: `days`, `event` and `locations`, how will you manage this data so that each function in the promise chain can see everything it needs to see?

**Submit form**

6. Make an `updateEvent()` function, with an `updatedEvent` parameter.
7. Update `POST /events/edit` in `routes/events.js`.

### 7. Add new locations

You'll need to create new things in this step, but referring to existing features will help.

**Show form**

1. In `views/showLocations.hbs`, create an "Add Location" link (similar to the "Add Event" link in `views/showDay.hbs`).
2. Create a new `views/addLocation.hbs` form. 
    * Look at `views/editLocation.hbs` and `views/addEvent.hbs` for guidance
3. Create a `GET /locations/add` route in `routes/locations.js` to render `views/addLocation.hbs`.

**Submit form**

4. Create `POST /locations/add` in `routes/locations.js`.
5. Create an `addNewLocation()` function, with a `locationInfo` parameter.
    * Don't forget `res.redirect('/locations')`

### 8. Delete locations

You'll need to create new things in this step too, but referring to existing features will help.

**Create link**

1. Add a new "Delete" form and button to `views/editLocation.hbs` (see `views/editEvent.hbs`).
    * pass the `id` as a hidden form field

**Create route**

2. Create a `POST /locations/delete` route in `routes/locations.js`.
3. Create a `deleteLocation()` function, with an `id` parameter.
    * Remember your old friend `res.redirect('/locations')`
    * If you delete a location that has an event, what happens to the event? Why? 

### 9. Test helper functions

Some tests have been created in `helpers.test.js` but they haven't been written yet. They are just testing the functions exported from `helpers.js` so they should be pretty easy (as far as testing goes). Some of the functionality hasn't been implemented in the helper functions, so you'll need to do that too. Perhaps this is a good time to revisit test-driven development (write the tests before implementing the functionality in `helpers.js`). Remember red, green, refactor!
    * Note that the `validateDay()` function will use a `days` parameter if one is supplied, or if not then it will use the hard-coded `eventDays` value (similar to `db = connection` that you've been using in your functions) 
