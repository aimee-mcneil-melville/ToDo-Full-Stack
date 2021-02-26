# Pupparazzi

![](screenshot.png)

## Learning objectives

1. Learn Express router
1. Practise using callback functions
1. Practise server side rendering


## Getting started

* After cloning this repo, install the dependencies with `npm install`
* To debug the server and have it reload with Nodemon after changes: `npm run dev`


## Gotchas

1. The order of routes is important. The first one that matches will be used. So if you have a `/:id` route before an `/edit` route, a request to `/edit` will choose the `/:id` route and the value of `req.params.id` will be `"edit"`.
2. There can only be one server response (e.g. `res.send()` or `res.render()`) per request. If you have multiple potential responses (like a success and an error response) make sure to write your logic so that the route responds appropriately.
3. Make sure to `JSON.parse` and `JSON.stringify` when reading/writing JSON data.
4. Don't forget the error response format of callback functions (if in doubt check the [node `fs` documentation](https://nodejs.org/api/fs.html))


## Let's see some puppies!

First up, let's get our server running with a default route

1. In the `server.js`, add an HTTP GET root route (`/`). For now, let's just send the word 'Pupparazzi'
1. Start the server and go to http://localhost:3000 to see if we are winning

Now that we have a root route, let's use it to see some puppies.

**User Story 1:** *As a user, I want to see some puppies, so that, you know, I can say awwww*

- In our server file, change the GET `/` route function. We will use this route to:

  1. read the puppies from our `data.json` file using `fs.readFile` (don't forget to parse the data into a JavaScript object)
  1. render the puppies using the `home` view (that has already been created) and your puppies data

*If your page renders, but there are no puppies:*
  - check what data the view is expecting to receive 
  - `console.log` the view data object you are passing to the render and make sure this matches what the view is expecting


## Getting our routes on

You should now have the puppies rendering on the `/` page. If you click on the picture however, the link it takes you to is broken (because we haven't written it yet). Let's fix that now.

**User Story 2:** *As a user, I want to click on a puppy and see their name, breed, and who their owner is*

  1. Take note of the url you are sent to (perhaps `/puppies/1`).
  1. Create a `routes.js` file in the main repo directory - this will store all of our routes
  1. `require` Express in your `routes.js` file and create a router. Also, don't forget to export the router 
  1. `require` and `use` our newly created `routes.js` file in our `server`. We'll use the string `/puppies` to define the prefix path for our router
  1. Create a GET route in your `router.js` to render a particular puppy. The route should contain the `id` as a parameter so you can access it via `req.params.id` (so perhaps `/:id`)
  1. Similarly to the `/` route in `server.js`, it should read the puppies from our JSON file, but this time, we will need to use the id to find only the selected puppy from the `puppies` array.
  1. Render the puppy. As before the `details` view has already been created for you.

**User Story 3:** *As a user, I want to be able to update the puppy's name, breed and owner*

For this, we are going to need GET a form to edit/update the puppy information. This form also needs to POST the updated information from the form to the server. Hence, we are going to need two routes this time (don't panic!)

For the GET `/puppies/:id/edit` route:
  1. Loop through our JSON file and find the puppy that we want to edit (don't forget that id as a parameter)
  1. Render the form using the `edit` view and the puppy data that we want to edit

For the POST `/puppies/:id/edit` route:
  1. Create an object of the updated puppy data from the request body
  1. Read in the JSON file and locate the puppy we are going to update
  1. Update the puppy in the array
  1. Write the entire array back into the JSON file
  1. Redirect to the GET `/puppies/:id` route

If all goes well, you should be able to update the puppy information. If that isn't happening, undoing the changes you've made to the JSON file might come in handy.


## Stretch

If you've reached this point, congratulations! As a stretch, you might like to do the following:

1. Refactor the `fs.readFile` and `fs.writeFile` calls into a separate file (separation of concerns).
  - As these are async calls to begin with, you will need to write functions around them which accept and call callback functions as a parameter (don't forget the error response format when calling those callbacks)
1. Write some tests using `jest` and `supertest` (don't forget to `npm install` these).
1. Add a new view and route that includes a form which lets the user add a new puppy.
