# DreamFest

Dreamfest is a music festival, and the planning team has already built the UI and the routes, as well as having designed and seeded the initial database tables. We'll implement the database functions to be used from the routes, allowing the planning team to manage locations and events.

<details>
  <summary>Full overview</summary>

  You've just landed your first dev role and you're responsible for creating an app that manages DreamFest, a wholesome three day festival that offers attendees daily yoga and meditation, arts and crafts, healthy eateries, wellbeing workshops and sweet beats.

  Your app needs to give the festival organisers the ability to add **locations** and to add **events** at those locations. As plans change, they will also need to be able to add, edit and delete events.

  Fortunately, the team has already confirmed the venue and dates so they know how many locations they need. They have also confirmed some partners and bands so they can begin slotting them in when your app is ready. The current planning has been prepared as seed data for your database.

  The design team has worked up the UI and routes, but they haven't yet connected them to the database. That's where you come in. You'll implement the database functions to be used from the routes.
</details>
<br />

Let's get stuck in!

----

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

- [ ] Get familiar with the current state of the app and the existing codebase

### What's included

The application is usable... _ish_. You can try anything and the app shouldn't break or throw any errors, but adding, editing and deleting events and locations doesn't work yet. Also, you're only seeing hard-coded data. Most of the changes you'll need to make are marked with `TODO:`. Be sure you understand the existing code and have a plan before you start coding new functionality.

----

## Displaying locations and events

### 1. Show all locations

- [ ] Have a look at the `GET /locations` route in `routes/locations.js`
- [ ] Complete the `getAllLocations` function in `db/index.js` and have it return a Promise that resolves to an array of locations from the database
- [ ] Complete the route using your new database function
  <details style="padding-left: 2em">
    <summary>Tip</summary>
    
    Don't forget to put the `viewData` and `res.render` call in your callback once you have the locations from the database
  </details>

### 2. Show events for a day

- [ ] Have a look at the `GET /schedule/:day` route in `routes/schedule.js`
- [ ] Build a `getEventsByDay` function with a `day` parameter. Today we'll put all our database functions in `db/index.js`
  <details style="padding-left: 2em">
    <summary>More about the <code>getEventsByDay</code> function</summary>

  1. JOIN the `events` and `locations` tables WHERE `events.location_id = locations.id`
  2. Filter (`where`) the results for only events where the day matches. Remember to pass the `day` when you call your function!
  3. Note that the `events` and `locations` tables both have `name`, `description`, and `id` columns. How can you specify which one to use when? What is the shape of the data that the handlebars template is expecting? **Hint: look at the shape of the hard-coded sample data**

    If some data isn't displaying in the app, try using `console.log` to look at your data, so that you can compare it to the sample data
      
    * In particular, if you're sending the `day` property correctly, then the heading in the app should say "Events: Friday", "Events: Saturday" or "Events: Sunday". If it just says "Events:", take another look at your data!
  </details>

## Editing locations

### 3. Show the form

- [ ] Look at the `GET /locations/4/edit` route in `routes/locations.js`
  <details style="padding-left: 2em">
    <summary>Tip</summary>
    
    This route supplies the current data to the form, ready for the user to edit it.
  </details>

- [ ] Build a `getLocationById` function with an `id` parameter
- [ ] Be sure the form is being populated correctly
  <details style="padding-left: 2em">
    <summary>Tips</summary>

    * If it's not working, try the trouble-shooting strategies from section 2
    * Can `.first()` help you here? 
  </details>

### 4. Submit the form

- [ ] Submitting the "Edit Location" form should send an HTTP POST request which will hit your `POST /locations/edit` route, in `routes/locations.js`
- [ ] Build an `updateLocation` function with an `updatedLocation` parameter (note the "d" in "updateD")
  <details style="padding-left: 2em">
    <summary>More about the <code>updateLocation</code> function</summary>

    If you find yourself struggling with the `updatedLocation` (object) parameter, you might start by using `id`, `name` and `description` parameters instead.

    * UPDATE the `locations` table with the updated location details
    * Be sure `res.redirect('/locations')` is inside your `.then` function. This will take the user back to the main locations page instead of leaving them on the page with the edit form
  </details>

## Adding and deleting events

### 5. Populate the drop-down in the form

- [ ] Supply the "Add New Event" form with a list of all the locations to populate the drop-down
  <details style="padding-left: 2em">
    <summary>More about the locations drop-down</summary>
    
    Currently the options are hard-coded, but we want them to come from the database (the days of the week are hard-coded too, but we're not going to change those). The `GET /events/add/:day` route in `routes/events.js` needs to obtain the list of locations from the database, and supply them to the form. 
    
    You've already written a `getAllLocations` function, now use it in your route. 
    * Does your form need the location descriptions? Will it work if you include them anyway (so that you don't need to change your function)? 
    * Be sure `res.render('addEvent', viewData)` is inside your `.then` function
  </details>

### 6. Submit the form

- [ ] Submitting the "Add New Event" form should send an HTTP POST request which will hit the `POST /events/add` route, in `routes/events.js`
<details style="padding-left: 2em">
  <summary>Tips</summary>

  - You likely need to rename the `locationId` property of the body object to be `location_id` before passing it to the database
  - You may also want to ensure that `location_id` has a type of `Number` rather than `String`
</details>

- [ ] Build an `addNewEvent` function with an `event` parameter
  <details style="padding-left: 2em">
    <summary>Tip</summary>
  
    Be sure to redirect to the `/schedule/:day` route from inside your `.then` function.
  </details>

### 7. Delete events

- [ ] Deleting an event will send an HTTP POST request which will hit your `POST /events/delete` route in `routes/events.js`
  <details style="padding-left: 2em">
    <summary>More about deleting an event</summary>
    
    Within the site, you will find the delete button on the same page you edit an event

    * Note that the "Edit event" page is currently displaying hard-coded details in the form (you'll fix this in the next step), but to check if this page is correct at this stage, click "Edit event" on (for example) the "Cutest Puppy Awards" card, you should then find yourself at `/events/4/edit`, 4 being the id of the event (as seen in your seeds). 
    * The "Delete event" button should be able to delete "Cutest Puppy Awards" (id 4) even though the displayed details are for "Slushie Apocalypse I" as you will find it uses the id provided by the url, not the hardcoded data.
  </details>

- [ ] Build a `deleteEvent` function with an `id` parameter
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    Be sure to redirect to the `/schedule/:day` route from inside your `.then` function.
  </details>

----

## Stretch

### 8. Edit events

<details>
  <summary>More about editing events</summary>

  **Show the form**

  1. Look at the `GET /events/:id/edit` route in `routes/events.js`. This route supplies the current data to the "Edit Event" form, ready for the user to edit it.
  2. Build a `getEventById` function with an `id` parameter. Use this in your route. 

  **Update the form**

  3. Like the "Add new event" form above, the "Edit event" form also needs a list of locations from the database. We can use `getAllLocations` for a third time, but this time we need to modify the data before we send it to the form, so that our data records which location is the current location for this event
      * Maybe you could use an array function here? 
  4. Make sure you call `getEventById` first, and then `getAllLocations`
      * You're managing three bits of data here: `days`, `event` and `locations`, how will you manage this data so that each function in the promise chain can see everything it needs to see?
      
  **Submit the form**

  5. Build an `updateEvent` function with an `updatedEvent` parameter
  6. Update `POST /events/edit` in `routes/events.js`
</details>
<br />

### 9. Add new locations

<details>
  <summary>More about adding locations</summary>

  You'll need to create new things in this step, but referring to existing features will help.

  **Show the form**

  1. In `views/showLocations.hbs`, create an "Add Location" link (similar to the "Add Event" link in `views/showDay.hbs`)
  2. Create a new `views/addLocation.hbs` form
      * Look at `views/editLocation.hbs` and `views/addEvent.hbs` for guidance
  3. Create a `GET /locations/add` route in `routes/locations.js` to render `views/addLocation.hbs`

  **Submit the form**

  4. Create `POST /locations/add` in `routes/locations.js`
  5. Build an `addNewLocation` function with a `locationInfo` parameter
    * Don't forget `res.redirect('/locations')`
</details>
<br />

### 10. Delete locations

<details>
  <summary>More about deleting locations</summary>

  You'll need to create new things in this step too, but referring to existing features will help.

  **Create link**

  1. Add a new "Delete" form and button to `views/editLocation.hbs` (see `views/editEvent.hbs`)
      * Pass the `id` as a hidden form field

  **Create route**

  2. Create a `POST /locations/delete` route in `routes/locations.js`
  3. Build a `deleteLocation` function with an `id` parameter
      * Remember your old friend `res.redirect('/locations')`
      * If you delete a location that has an event, what happens to the event? Why?
</details>
<br />

### 11. Optimise database queries

<details>
  <summary>More about optimised database queries</summary>

  With database queries, it's often most efficient to ask for only the data you need. Take a look at `getAllLocations`, and you might notice that selecting all fields will include the `description` data. But the description data for the full set of locations is only used by the `showLocations.hbs` view. Every other time we call `getAllLocations` the `description` is not used.
  
  Consider writing a separate db function (perhaps `getAllLocationsWithDesc`?) to request the complete data when needed, and updating `getAllLocations` to request only the necessary fields in all other cases.
</details>
<br />

### 12. Test helper functions

<details>
  <summary>More about testing helpers</summary>

  Some tests have been created in `helpers.test.js` but they haven't been written yet. They are just testing the functions exported from `helpers.js` so they should be pretty easy (as far as testing goes). Some of the functionality hasn't been implemented in the helper functions, so you'll need to do that too. Perhaps this is a good time to revisit test-driven development (write the tests before implementing the functionality in `helpers.js`). Remember red, green, refactor!
    * Note that the `validateDay` function will use a `days` parameter if one is supplied, or if not then it will use the hard-coded `eventDays` value (similar to `db = connection` that you've been using in your functions)
</details>

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=dreamfest)
