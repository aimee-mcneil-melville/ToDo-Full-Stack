# Meowtown

In this challenge we're going to build a fun project called Meowtown. You can probably guess its inspiration 😸

## Setup

### 0. Cloning and installation
- [ ] After cloning this repo, install dependencies with `npm install`, and start the server
  <details style="padding-left: 2em">
    <summary>More about getting started</summary>

    Clone the repo, run `npm install && npm start` (or start your server with `npm run dev` to have nodemon watch for changes in your files).
  </details>

- [ ] Visit [http://localhost:3000](http://localhost:3000). What happens? Can you view `server.js` and work out what you are seeing and why you are seeing it?
- [ ] Talk it through with your pair and compare ideas

---

## Displaying cat data

### 1. Display a single cat

- [ ] Visit [http://localhost:3000/cats/1](http://localhost:3000/cats/1) and check your console/terminal
  <details style="padding-left: 2em">
    <summary>More about the console</summary>

    You should see the `id` printed in the console. Yay! Now we can find the cat the user is looking for and render just that cat out to the user. 
  </details>

- [ ] Get the correct cat from the cats array in the data object and pass it as the second argument to the render function

- [ ] Fill out the `show.hbs` template so that you can see the name of the cat
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    Hint: if you are stuck with passing the individual cat to the `show` view, notice how `/cats` passes the cats array to the view.
  </details>

### 2. More kitty details

- [ ] Study meowtown and add more properties to each `cat` object
- [ ] Update the `index` and `show` templates to display some of the new properties

---

## Adding and editing cats

### 3. Display the "new" form

- [ ] Add a new route that listens for requests to `/cats/new`, and have it render the `new` form. Check it out!

### 4. Add a new cat to the array

- [ ] Submit the form and see what happens
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    You should see some messages logged to the console.
  </details>

- [ ] Take that data, make a new cat object, and add it to your `cats` array

### 5. Prepare to edit a cat

- [ ] Copy the contents of the new cat form and add some handlebars expressions `{{}}` so we can fill in the form with the cats existing data
- [ ] Add a new route that listens for requests to `cats/edit/:id`. Get the cat by its `id` and pass it to the render function


### 6. Edit a cat

- [ ] Add a route that listens for POST requests to `/cat/id`. Use what you've learned to update the cat in the `cats` array
  <details style="padding-left: 2em">
    <summary>More about POSTing</summary>

    Note that this isn't "proper" REST. This is because browsers can't actually do PUT requests. So instead we're using POST.
  </details>

---

## Stretch

<details>
  <summary>More about stretch challenges</summary>

  * Work out how to store the `data` variable in a JSON file. You might want to make some functions that can load and save the data
  * Add the help page
  * Implement the rule that removes lives from the cat when it's viewed. Delete a cat once it has zero lives
  * Sort cats by when they were last viewed by a user
</details>
