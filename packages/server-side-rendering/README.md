# Server-Side Gallery

Build a photo gallery using Handlebars views.

Learning objectives:

1. Understanding server-side rendering with Handlebars.
2. Practice dividing up a page into views, layouts, and partials.
3. Practice testing routes.

When complete, your application might look like this:

![Screenshot of an app with gallery features including a title, image, artist name, license info, and comments](screenshot.png)

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

## First use of Handlebars

When you're learning a new technology, make sure you start simple and get that working before layering on more complexity.

### 1. Rendering the home page

- [ ] Start by creating a new home route, `/` in the server
  <details style="padding-left: 2em">
    <summary>Tip</summary> 
    
    Make sure it's working by having it send something like `res.send('Hello, world!')`
  </details>

- [ ] Create a layout file in `server/views/layouts`. It should be called `main.hbs`
  <details style="padding-left: 2em">
    <summary>More about the layout file</summary>

    - Express Handlebars requires a default layout in order to render templates, and unless we've customised the configuration, the name should be `main.hbs`
    - See [the docs](https://github.com/ericf/express-handlebars) for more on layouts
    - It should look just like a standard HTML page, but with `{{{body}}}` between the `<body></body>` tags (notice there are **three** sets of curly braces there, not two)!
    - You can include whatever CSS you like: perhaps [Skeleton](https://cdnjs.com/libraries/skeleton) from a CDN if you just want a quick start?
  </details>

- [ ] Set the home route to `render` the provided `home.hbs` view
  <details style="padding-left: 2em">
    <summary>More about the home view</summary>

    - We've provided a single `home.hbs` template in the views folder. Instead of `res.send`, now use `res.render` to render `home.hbs` template when anyone visits the `/` route
    - When we reload the page, we should see the text change to, 'Hello, templates!'
  </details>

### 2. Using `viewData`

- [ ] Create an object in your route definition with the property `title`
  <details style="padding-left: 2em">
    <summary>More about the <code>viewData</code> object</summary>

    ```js
    const viewData = {
      title: 'Gallery',
    }
    ```
  </details>

- [ ] Pass the object as the second argument to render
  <details style="padding-left: 2em">
    <summary>More about rendering with <code>viewData</code></summary>

    ```js
    const template = 'home'
    res.render(template, viewData)
    ```
  </details>

- [ ] Alter `home.hbs` to refer to the property by using `{{title}}`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    Maybe put it inside `<h1></h1>` tags?

    Reload the page. Does it work?
  </details>

---

We'll find this pattern repeating throughout our exploration of server-side rendering:

  1. Get some data and put it in an object
  1. Pass that object to `res.render`
  1. Modify the `.hbs` template to make use of the data
  
The rest of this exercise should follow the same arc - gradually layering up detail and complexity.

---

## Consuming more complex objects

> Did you know you could require JSON? Pretty handy when you need a bit of configuration data! You can't leave the extension off like you can with `.js`, though.

<details>
  <summary>About <code>art.json</code></summary>

  We want you to explore and understand template rendering today, so we've provided you with data to work with. It's an array of objects brought into the program using `require`. Each object represents a piece of art.

  The each object in the array is structured like this:

  ```js
  {
    "id": 1,
    "title": "Kea in Flight",
    "comments": [
      "Very arty."
    ],
    "artwork": "images/kea.jpg",
    "artist": {
      "name": "Ben",
      "url": "https://www.flickr.com/photos/seabirdnz/"
    },
    "license": {
      "name": "CC BY-ND 2.0",
      "url": "https://creativecommons.org/licenses/by-nd/2.0/"
    }
  },
  ```
</details>

<details>
  <summary>Using <code>art.json</code></summary>

  Any time you want to use this data, you can include `const art = require('./data/art.json')` at the top of the file you want to use it in. Remember, `art` is an **array** and Handlebars expects you to pass it an **object**, so you might need to do something like this:

  ```js
  const viewData = {
    title: 'Gallery',
    art: art,
  }
  ```
</details>
<br />

---

## Requirements

### 3. Home page gallery
- [ ] As a user, I want to see a list of artwork titles on the home page so I can see what's available
  <details style="padding-left: 2em">
    <summary>Tips</summary>

    - Remember, we can do something for each element in the `art` array using `{{#each}}`
    - We suggest using an unordered list, where each artwork titles could be listed using `<li>{{title}}</li>`
  </details>

- [ ] As a user, I want to see who each artwork is by so I can give them credit
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    Since we already have the title, this should be pretty easy! Do the same thing for the license. (You could even make it a link if you like: the URL property is also included.)
  </details>

- [ ] As a user, I want to see what license the artwork is under so I know if I can copy it or not
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    This `{{#each}}` block is getting a bit complicated. Let's add a partial! The `{{#each}}` will stay the same, but you'll move all the code inside it to the partial file (`artwork-summary.hbs`, for example).
  </details>

### 4. Header and footer
- [ ] As a user, I want to see a header at the top of the page displaying the page title so I know where I am
  <details style="padding-left: 2em">
    <summary>Tips</summary>

    - We **could** "hard-code" this in the template, but to keep our design flexible let's use a partial and we can include a `title` property on every data object we pass to `res.render`
    - Create a `header.hbs` partial. Make it look however you like, but be sure it has a `{{title}}` in there somewhere
  </details>

- [ ] As a user, I want to see a footer at the bottom of the page displaying contact details so that I can contact the people responsible for the site
  <details style="padding-left: 2em">
    <summary>Tips</summary>

    - Repetition can be a wonderful thing. Create a `footer.hbs` partial and include it in your home template
    - Hint: Use the `header` and `footer` partials from the `main.hbs` layout file, and they'll be used for every template view you create from now on
  </details>

---

### 5. Create a single-artwork view

- [ ] As a user, I want to see an artwork displayed when I visit `/artworks/:id` so that I can view the image
  <details style="padding-left: 2em">
    <summary>Tips</summary>

    - Create `artworks.hbs`. It doesn't have to be complicated: just a single `img` tag with its `src` attribute set to `{{artwork}}` will do nicely
    - Create a new route in server.js. In the route, you'll need to find the correct artwork using `req.params.id`. Hint: `art.find()` (see [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/find))
    - Send the artwork to the `res.render()` call
  </details>

- [ ] As a user, I want to be able to click on the artwork title on the home page and be taken to the image view
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    Time to link it up! In our `artwork-summary.hbs` (or whatever we called it) partial, turn the artwork title into a link. We'll need to make use of the `id` property of the artwork object to build our links.
  </details>

### 6. Enhance the single-artwork view

- [ ] As a user, I want a link to the home page home from the image view so that I don't need to use the browser back button
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    Here's another good partial opportunity! What we need is a simple partial that can be inserted anytime we need a link to the home page.
  </details>

- [ ] As a user, I want to see all the details on the image view so that I can easily see information about the artist and licence
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    Although we don't strictly need to create another partial here, it might be a good opportunity to practice. We can even do partials **within** partials! For example, we could use a `comment.hbs` partial for each element in the `comments` array, and use that from an `artwork-details.hbs` partial.
  </details>

### 7. Testing

- [ ] Write some tests for our routes with Supertest and `@testing-library`
  <details style="padding-left: 2em">
    <summary>More about testing</summary>

    - These testing libraries have already been installed
    - Create a `server.test.js` and test away!
    - In particular, testing both sides of any `{{#if}}`s we have, and that our `{{#each}}`s loop correctly, would be a great start!
  </details>

Take the chance to explore, play, experiment. Ask lots of questions!

## Stretch

<details>
  <summary>More about stretch challenges</summary>

  - Including the title in the data object passed to `res.render` each time works ok, but what if some developer in the future forgets to pass it? It'd be great if there was some way in the template of providing a default title... maybe there's a way using the `{{#if}}` helper?
  - We could shift the data access of our `art` object to a `data.js` file, and only export utility functions with names like `getAll` and `getById(1)`
  - Did you know you can define your own Handlebars helpers, like `{{#if}}` and `{{#each}}`? Try writing a simple helper that (for example) truncates numbers to display only two decimal places
</details>

## Further reading

- http://handlebarsjs.com
- https://github.com/ericf/express-handlebars

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=server-side-rendering)
