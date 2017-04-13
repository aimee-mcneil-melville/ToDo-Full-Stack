# Pupparazzi

![](screenshot.png)

## Learning objectives

1. Learn express router
2. Practice using callbacks functions
3. Practice server side rendering

## Getting started

* After cloning this repo, install dependencies with `npm install`
* To debug the server: `npm run debug`
* To start the server (and have it reload with Nodemon after changes): `npm start`

## Let's get our routes on

Let's get our server running with a default route

1. Create a `routes.js` file in the main repo directory - this will store all of our routes for now
2. Add express and the router to your `routes.js` file. Also, don't forget to export the router (which we will require in later in step 4)
3. Add a get index `/` route - this route will eventually redirect to a `/dogs` route, but for now, let's just send the word 'Pupparazzi'
4. `require` and `use` our newly created `routes.js` file in our `server`
5. Start the server and go to http://localhost:3000 to see if we are winning

## Let's see some puppies!

User Story 1: *As a user, I want to see some puppies, so that you know, I can say awwww.*

Now that we have an index route, we probably want to have another route to see some puppies

- In our routes, create a get `/puppies` route. We will use this route to:
  1. read the puppies from our `data.json` file (don't forget to parse the data into a js object)
  2. render the puppies; a view has been created for you `puppies/index` so all have to do is connect your data and your view together

Once you can see puppies rendering on http://localhost:3000/puppies, update the index `/` route to redirect to `/puppies` (ask yourself why a render of puppies in the index `/` may/may not be a better approach than a redirect)
  
User Story 2: *As a user, I want to click on a puppy and see their name, breed, and who their owner is*

By now you should have the puppies rendering on the `/puppies` page, if you click on picture however, the link it takes you to is broken (probably because we haven't written it yet). Let's fix that now.

  1. Create another get route to render a particular puppy (perhaps `/puppies/:id`).
  - The route should probably contain the id as a parameter (so you can access it via req.params.id).
  - Similarly to the `/puppies` route, it should read the puppies from our json file, but this time, we will need to loop through the array of puppies and match the id passed as a parameter, to the id of the puppy in the array.
  - Render the puppy; As before the `puppies/view` view has been created for you.

User Story 3: *As a user, I want to be able to update the puppies name, breed and owner*

For this, we are going to need to get a form to edit/update the puppy information. This form also needs to post the updated information from the form to the server. Hence, we are going to need two routes this time (don't panic!)

For the get `/puppies/edit/:id` route:
  1. Loop through our json file and find the puppy that we want to edit (don't forget that id as a parameter)
  2. Render the form using the `puppies/edit` view and the puppy that we want to edit
  
For the post `/puppies/edit/:id` route:
  1. Create an object that represents all the data of the puppy we are going to update
  2. Read in the json file and locate the puppy we are going to update
  3. Update the puppy in the array
  4. Write the entire array back into the json file

If all goes well, you should be able to update the puppy information. Otherwise, if that's not happening, undoing the changes you've made to the json file might come in handy.

## Stretch

If you've reached this point, congratulations! As a stretch, you might like to do the following:

1. Refactor the fs.readFile and fs.writeFile calls into a separate file (separation of concerns). 
  - As these are async calls to begin with, you may need to write functions which accept and call callback functions as a parameter (don't forget the error response format when calling those callbacks)
2. Separate the index and puppy routes into different files and stick these into a routes folder.
  - You will need to update both the routes and server files
3. Write some tests using tape and supertest (don't forget to npm install these).
