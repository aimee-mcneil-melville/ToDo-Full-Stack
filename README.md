# Pupparazzi

![](screenshot.png)

## Learning objectives

1. Learn express router
2. Practice using callback functions
3. Practice server side rendering


## Getting started

* After cloning this repo, install the dependencies with `npm install`
* To debug the server and have it reload with Nodemon after changes: `npm run dev`


## Gotchas

1. The order of routes is important. The first one that matches will be used. So if you have a `/:id` route before an `/edit` route, a request to `/edit` will choose the `/:id` route and the value of `req.params.id` will be `"edit"`.
2. Server responses (e.g. `res.send()` or `res.render()`) should only be sent once per request. If your route has the potential to make more than one response, make sure to `return` after you've sent it.
3. Make sure to `JSON.parse` and `JSON.stringify` when reading/writing JSON data
4. Don't forget the error response format of callback functions (if in doubt check the node fs documentation)


## Let's see some puppies!

First up, let's get our server running with a default route

1. In the `server.js`, add an HTTP GET root route (`/`). For now, let's just send the word 'Pupparazzi'
1. Start the server and go to http://localhost:3000 to see if we are winning

Now that we have a root route, let's use it to see some puppies

**User Story 1:** *As a user, I want to see some puppies, so that you know, I can say awwww.*

- In our server file, change the GET `/` route function. We will use this route to:

  1. read the puppies from our `data.json` file using `fs.readFile` (don't forget to parse the data into a JavaScript object)
  2. render the puppies; a `home` view has been created for you so all have to do is connect your data and your view together


## Getting our routes on

You should now have the puppies rendering on the `/` page, if you click on picture however, the link it takes you to is broken (because we haven't written it yet). Let's fix that now.

**User Story 2:** *As a user, I want to click on a puppy and see their name, breed, and who their owner is*

  1. Take note of the url you are sent to (perhaps `/puppies/1`).
  1. Create a `routes.js` file in the main repo directory - this will store all of our routes
  1. `require` express and the Router in your `routes.js` file. Also, don't forget to export the router 
  1. `require` and `use` our newly created `routes.js` file in our `server`. We'll use the string `/puppies` to define the path out router will use
  1. Create a get route in your `router.js` to render a particular puppy. The route should contain the id as a parameter so you can access it via `req.params.id` (so perhaps `/:id`).
  1. Similarly to the `/` route, it should read the puppies from our JSON file, but this time, we will need to loop through the array of puppies and match the id passed as a parameter, to the id of the puppy in the array.
  1. Render the puppy; As before the `details` view has been created for you.

**User Story 3:** *As a user, I want to be able to update the puppies name, breed and owner*

For this, we are going to need to get a form to edit/update the puppy information. This form also needs to post the updated information from the form to the server. Hence, we are going to need two routes this time (don't panic!)

For the get `/puppies/:id/edit` route:
  1. Loop through our JSON file and find the puppy that we want to edit (don't forget that id as a parameter)
  1. Render the form using the `edit` view and the puppy that we want to edit

For the post `/puppies/:id/edit` route:
  1. Create an object that represents all the data of the puppy we are going to update
  2. Read in the JSON file and locate the puppy we are going to update
  3. Update the puppy in the array
  4. Write the entire array back into the JSON file
  5. Redirect to the GET `/puppies/:id` route

If all goes well, you should be able to update the puppy information. If that isn't happening, undoing the changes you've made to the JSON file might come in handy.


## Stretch

If you've reached this point, congratulations! As a stretch, you might like to do the following:

1. Refactor the fs.readFile and fs.writeFile calls into a separate file (separation of concerns).
  - As these are async calls to begin with, you will need to write functions around them which accept and call callback functions as a parameter (don't forget the error response format when calling those callbacks)
2. Separate the index and puppy routes into different files and stick these into a routes folder.
  - You will need to update both the routes and server files
3. Write some tests using jest and supertest (don't forget to `npm install` these).
4. Add a new view and route that includes a form which lets the user add a new puppy.
