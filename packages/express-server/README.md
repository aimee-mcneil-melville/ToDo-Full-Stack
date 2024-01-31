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
- [ ] Check the `Content-Type` header in Thunderclient, this is the default type for `res.send` when you pass a string

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

- [ ] Check your route in Thunderclient, make a note of the value of the `Content-Type` header
- [ ] Create a new version of the file as a [JSON](https://www.json.org/json-en.html) document called `secrets.json`, send that file instead of your text file
  <details style="padding-left: 2em">
    <summary>Tips</summary>

  - This should be an array of strings
  - I'm going to read these secrets, so don't put anything too good in there
  </details>

- [ ] Check your route in Thunderclient again, make a note of the `Content-Type`

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

- [ ] Create a GET route for `/secrets/:type`, `:type` is a path parameter
  <details style="padding-left: 2em">
    <summary>Tips</summary>

  - look at `req.params.type`
  - You'll likely use `if/else` statements or a `switch/case` statement
  - If you request `/secrets/mystical` respond with `mystical-secrets.json`
  - If you request `/secrets/kitchen` respond with `kitchen-secrets.json`
  - If you request `/secrets/lizards` send a 404 status (Not Found)

  </details>

### 4. Post data to the server

- [ ] Add a POST route at `/compliment-me`
  <details style="padding-left: 2em">
    <summary>More about handling submission</summary>

  - Add `express.json` as middleware to `server.ts`
    ```js
    server.use(express.json())
    ```
  - Read `req.body` as an object with `name`, `age`, `heightM`, e.g.

    ```json
    {
      "name": "Gerard",
      "age": 49, // future proofed
      "heightM": 1.75
    }
    ```

  - Respond with a compliment customised for the request, e.g.
    ```js
    const { name, age, heightM } = req.body
    const isTall = heightM >  1.8288
    res.json({
      text: `Go off ${name} ${isTall ? 'big fella' : 'short king'}, you don't look ${age} at all (not implying that looking older is worse)`
      sincerity: 0.6
    })
    ```
    </details>

- [ ] POST to the new endpoint from Thunderclient
      Make a POST request to `http://localhost:3000/compliment` with a JSON object and see the compliment come back at you!

---

[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=express-server)
