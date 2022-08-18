# express-server

Creating a web server with Express.js


## Setup

### 0. Cloning and branching
- [ ] Clone this repo and create a new branch for you or your pair
- [ ] Start the server with `node .` or `npm start`

---

After each section:
- Check your work by visiting the relevant route on [http://localhost:3000/](http://localhost:3000/) (you will likely need to restart the server, first)
- Stage, commit, and push your work to Github

---

## Server responses

### 1. Respond with a string

- [ ] Create a route called `/compliment` within `server.js` that responds with a nice compliment
- [ ] Add some HTML markup to that string to dress it up

### 2. Respond with a predefined file

- [ ] Create an HTML file called `silvia.html` that represents a user's profile
  <details style="padding-left: 2em">
    <summary>Tip</summary>
  
    This will include name, username, photo, favourite links, etc.
  </details>

- [ ] Create a route called `/profile` that returns `silvia.html`


### 3. Respond based on the query

- [ ] Create an HTML file called `sampson.html` that represents another user profile
  <details style="padding-left: 2em">
    <summary>Tip</summary>
    
    You might consider starting by copying `silvia.html`
  </details>
- [ ] Change the `/profile` route to accept query string parameters
  <details style="padding-left: 2em">
    <summary>More about query string params</summary>

    - If you navigate to `/profile?name=silvia` return `silvia.html`
    - If you navigate to `/profile?name=sampson` return `sampson.html`
    - You'll likely use an `if` statement that uses `req.query.name`
  </details>

### 4. Respond based on a URL parameter

- [ ] Create a `/profiles` route (notice the `s`) that accepts an `:id` parameter
  <details style="padding-left: 2em">
    <summary>Tips</summary>
  
    - If you navigate to `/profiles/1` return `silvia.html`
    - If you navigate to `/profiles/2` return `sampson.html`
  </details>

---

## More server features

### 5. Enable a folder of static files

- [ ] Set up a folder to serve static files
  <details style="padding-left: 2em">
    <summary>More about static files</summary>

    - Read ExpressJS docs recommendations regarding static files: http://expressjs.com/en/starter/static-files.html
    - Create a `public` folder in the project's main folder
    - Configure Express so it will serve static files from the `public` folder

    We won't see any changes in our application, yet!
  </details>

- [ ] Style `silvia.html` and `sampson.html` with a new `styles.css` file
  <details style="padding-left: 2em">
    <summary>More about connecting the CSS</summary>

    - Create a CSS file called `styles.css` that makes `silvia.html` and `sampson.html` look nicer (or at least different) and save it to the `public` folder
    - Add a link to `/styles.css` (note the `/`) to `silvia.html` and `sampson.html` so the styles will be applied
    - Make sure you can still view the individual profile pages (sections 3 and 4 above) and that the styles are now visible
    - You might need to adjust the HTML files a bit, once you start writing CSS
  </details>

### 6. Refactor

- [ ] Make sure your code is readable, doesn't contain any duplication, and has consistent indenting and appropriate naming.
- [ ] Make sure all previous steps still work


### 7. Post data to the server

- [ ] Set up a form to collect the user's name
  <details style="padding-left: 2em">
    <summary>More about the form</summary>

    - Create an HTML page called `get-name.html` in your `public` folder
    - Add a form to `get-name.html` that has a `name` input field
    - The form should `post` to `/named-compliment`
  </details>

- [ ] Configure the server and a route to handle the form submission
  <details style="padding-left: 2em">
    <summary>More about handling submission</summary>

    - Add `express.urlencoded` as middleware to `server.js`. Check out the Express documentation for how to use it and ask for help if you need it
    - Create a route called `/named-compliment` that responds with a nice compliment using the submitted name. You can use `res.send('named compliment wrapped in HTML markup')`
    - Make sure it works by going to [http://localhost:3000/get-name.html](http://localhost:3000/get-name.html), insert a name and submit the form. The compliment should be specific to the name submitted
  </details>
