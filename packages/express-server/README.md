# express-server

Creating a web server with Express.js

## Setup

### 0. Cloning and branching

- [ ] Clone this repo and create a new branch for you or your pair
- [ ] Start the server with `node server` or `npm start`

---

After each section:

- Check your work by viewing the new route in [Thunderclient](https://www.thunderclient.com/)
- Stage, commit, and push your work to Github

---

## Server responses

### 1. Respond with a string

- [ ] Create a route called `/compliment` within `server.js` that responds with a nice compliment using `res.send("What a fancy blazer~")`
- [ ] Check the `Content-Type` header in Thunderclient, this mime-type is the default for `res.send` when you pass a string

### 2. Respond with some JSON

- [ ] On that same route, change your `res.send` to pass an object like:

  ```js
  {
    category: 'fashion',
    powerLevel: 10,
    text: 'What a fancy blazer~'
  }
  ```

- [ ] Check the `Content-Type` header in Thunderclient
- [ ] Use `res.json()` instead of `res.send()`, what difference can you observe between these two methods?

### 2. Respond with a predefined file

- [ ] In the server folder, create an `secrets.txt` file
  <details style="padding-left: 2em">
    <summary>Tips</summary>

  - This will include name, username, photo, favourite links, etc.
  - For the photo, your `<img>` tag should refer to a photo elsewhere on the web for now. You'll learn how to include your own images in step 5 below.
  </details>

- [ ] Create a GET route called `/secrets` and respond with the new file
<details style="padding-left: 2em">
<summary>Tips</summary>
- use `res.sendFile` and pass it a the path
- `res.sendFile` wants an absolute path, so we'll use `Path.resolve('./server/secrets.txt')`
</details>

- [ ] Check your route in Thunderclient, make a note of the mime-type
- [ ] Create a new version of the file as a [JSON](https://www.json.org/json-en.html) document called `secrets.json`, send that file instead of your text file
  <details style="padding-left: 2em">
    <summary>Tips</summary>

  - This should be an array of strings
  - I'm going to read these secrets, so don't put anything too good in there
  </details>

- [ ] Check your route in Thunderclient again, make a note of the mime-type

### 3. Respond based on the query

- [ ] Create two more JSON files called `mystical-secrets.json` and `kitchen-secrets.json`
<details style="padding-left: 2em">
  <summary>Tip</summary>
  
  - These can also contain arrays of strings
  - Make sure the contents are different enough that you can easily tell them apart
</details>
- [ ] Change the `/secrets` route to accept query string parameters
  <details style="padding-left: 2em">
    <summary>More about query string params</summary>

  - If you request `/secrets?type=mystical` respond with `mystical-secrets.json`
  - If you request `/secrets?type=kitchen` respond with `kitchen-secrets.json`
  - If you request `/secrets` respond with `secrets.json`
  - You'll likely use `if/else` statements or a `switch/case` that uses `req.query.type`
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
  - Create a `public` folder in the project's server folder
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

- [ ] For Silvia and Sampson's photos, replace the external URLs with references to locally-hosted images
  <details style="padding-left: 2em">
    <summary>More about using images from your own server</summary>

  - Save Silvia and Sampson's photos into your `public` folder
  - Then update your `<img>` tags (in `silvia.html` and `sampson.html`) to point to the images in the `public` folder instead of the external image URLs you used in step 2
  </details>

### 6. Refactor

- [ ] Make sure your code is readable, doesn't contain any duplication, and has consistent indenting and appropriate naming.
- [ ] Make sure all previous steps still work

### 7. Post data to the server

- [ ] <details style="padding-left: 2em">
                                                                                                                                                                                                                                                                                                                                                            <summary>More about the form</summary>

  - Create an HTML page called `get-name.html` in your `public` folder
  - Add a form to `get-name.html` that has a `name` input field
  - The form should `post` to `/named-compliment`
  </details>

- [ ] Configure the server and a route to handle the form submission
  <details style="padding-left: 2em">
    <summary>More about handling submission</summary>

  - Add `express.json` as middleware to `server.ts`. Check out the Express documentation for how to use it and ask for help if you need it
  - Create a route called `/named-compliment` that responds with a nice compliment using the submitted name. You can use `res.send('named compliment wrapped in HTML markup')`

- [ ] POST to the new endpoint from Thunderclient
  - Make a POST request [http://localhost:3000/horoscope], insert a name and submit the form. The compliment should be specific to the name submitted
  </details>

---

[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=express-server)
