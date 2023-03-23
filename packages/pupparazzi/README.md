# Pupparazzi

Learning objectives:

1. Learn Express router
1. Practise using promises
1. Practise server side rendering

When complete, your application might look like this:

![Screenshot of a very simple page with the stylized title "Pupparazzi" and a link reading "Home" above a circular image of a puppy. All on a pink background](screenshot.png)

## Setup

### 0. Cloning and installation
- [ ] After cloning this repo, install dependencies with `npm install`, and start the dev server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>More about getting started</summary>

    - To start the server: `npm start`
    - To debug the server (and have it reload with Nodemon after changes): `npm run dev`
    - To run the tests: `npm test`
  </details>

---

## Things to consider

<details>
  <summary>Important tips for completing the challenge</summary>

  1. The order of routes is important. The first one that matches will be used. So if you have a `/:id` route before an `/edit` route, a request to `/edit` will choose the `/:id` route and the value of `req.params.id` will be `"edit"`.
  1. There can only be one server response (e.g. `res.send()` or `res.render()`) per request. If you have multiple potential responses (like a success and an error response) make sure to write your logic so that the route responds appropriately.
  1. Make sure to `JSON.parse` and `JSON.stringify` when reading/writing JSON data.
  1. Don't forget to handle errors when your promises fail using `.catch(...)`
  1. When in doubt check the [node `fs/promises` documentation](https://nodejs.org/api/fs.html#promises-api)
</details>
<br />

## Requirements

### 1. Server setup
- [ ] Let's get our server running with a default route
  <details style="padding-left: 2em">
    <summary>More about the server</summary>

    1. In the `server/server.js`, add an HTTP GET root route (`/`). For now, let's just send the word 'Pupparazzi'
    1. Start the server and go to http://localhost:3000 to see if we are winning
    
    Now that we have a root route, let's use it to see some puppies.
  </details>

### 2. Displaying puppies on the root route

- [ ] As a user, I want to see some puppies, so that I can say "awwww"
  <details style="padding-left: 2em">
    <summary>More about displaying puppies</summary>

    In our server file, change the GET `/` route function. We will use this route to:

    1. read the puppies from our `data.json` file (which lives in the sibling `./data` directory) using `readFile` from `'node:fs/promises'`. Don't forget to parse the data into a JavaScript object
    1. render the puppies using the `home` view (that has already been created) and your puppies data
  
    <br />

    **If your page renders, but there are no puppies:**
    - check what data the view is expecting to receive 
    - `console.log` the view data object you are passing to the render and make sure this matches what the view is expecting

     <br />

    You should now have the puppies rendering on the `/` page. If you click on the picture however, the link it takes you to is broken (because we haven't written it yet). Let's fix that now.
  </details>

### 3. Displaying the detailed puppy page

- [ ] As a user, I want to click on a puppy and see their name, breed, and who their owner is
  <details style="padding-left: 2em">
    <summary>More about puppy pages</summary>
  
    1. Take note of the url you are sent to (perhaps `/puppies/1`)
    1. Create a `routes.js` file in the main repo directory - this will store all of our routes
    1. `require` Express in your `routes.js` file and create a router. Also, don't forget to export the router
    1. `require` and `use` our newly created `routes.js` file in our `server`. We'll use the string `/puppies` to define the prefix path for our router. Note that the `use` line of code should come **after** your server configuration and handlebars configuration
    1. Create a GET route in your `routes.js` to render a particular puppy. The route should contain the `id` as a parameter so you can access it via `req.params.id` (so perhaps `/:id`)
    1. Similarly to the `/` route in `server.js`, it should read the puppies from our JSON file, but this time, we will need to use the id to find only the selected puppy from the `puppies` array
    1. Render the puppy. As before, the `details` view has already been created for you
  </details>

### 4. Updating a puppy

- [ ] As a user, I want to be able to update the puppy's name, breed, and owner
  <details style="padding-left: 2em">
    <summary>More about pupdates</summary>

    For this, we are going to need GET a form to edit/update the puppy information. This form also needs to POST the updated information from the form to the server. Hence, we are going to need two routes this time (don't panic!)

    For the GET `/puppies/:id/edit` route:

    1. Loop through our JSON file and find the puppy that we want to edit (don't forget that id as a parameter)
    1. Render the form using the `edit` view and the puppy data that we want to edit

    For the POST `/puppies/:id/edit` route:
    
    1. Create an object of the updated puppy data from the request body
    1. Read in the JSON file and locate the puppy we are going to update
    1. Update the puppy in the array
    1. Write the entire array back into the JSON file (with `fsPromises.writeFile`)
    1. Redirect to the GET `/puppies/:id` route

    If all goes well, you should be able to update the puppy information. If that isn't happening, undoing the changes you've made to the JSON file might come in handy.
  </details>


## Stretch

<details>
  <summary>More about stretch challenges</summary>

  If you've reached this point, congratulations! As a stretch, you might like to do the following:

  1. Refactor the `readFile` and `writeFile` calls into a separate file (separation of concerns)
      - As these return promises to begin with, you will need to write functions around them which also return promises
      - Write some tests using `jest` and `supertest`
  1. Add a new view and route that includes a form which lets the user add a new puppy
</details>

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=pupparazzi)
