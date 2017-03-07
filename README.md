# Gallery

Build a photo gallery using Handlebars views.


## Learning objectives

1. Understanding server-side rendering with Handlebars.
2. Practice dividing up a page into views, layouts, and partials.
3. Practice testing routes.


## Getting started

* After cloning this repo, install dependencies with `npm install`
* To debug the server: `npm run debug`
* To start the server (and have it reload with Nodemon after changes): `npm start`
* To run the tests: `npm test`


## Hello world

When you're learning a new technology, make sure you start simple and get that working before layering on too much complexity.

1. Start by creating a new home route, `/` in the server
  - Make sure it's working by having it send something like `res.send('Hello, world!')`

2. We've provided a single `home.hbs` template in the views folder for you. Instead of `res.send`, use `res.render` to render that template when anyone visits the `/` route.
  - When you reload the page, you should see the text change to, 'Hello, templates!'

3. Create an object in your route definition with the property `title`, like so:

  ```js
    var viewData = {
      title: 'Gallery'
    }
  ```

4. Pass the object as the second argument to render:

  ```js
    res.render('home', viewData)
  ```

5. Alter `home.hbs` to refer to the property using `{{title}}`. Maybe put it inside `<h1></h1>` tags?
  - Reload the page: does it work?

You'll find this pattern repeating throughout your exploration of server-side rendering:

 - get some data and put it in an object
 - pass that object to `res.render`
 - modify the `.hbs` template to make use of the data
 
The rest of this exercise should follow the same arc - gradually layering up detail and complexity.


## Batteries included

We want you to be exploring and understanding template rendering today, so we've provided you with some data to use that shouldn't take much effort to work with. It's an array of objects brought into the program using `require`. Each object represents a piece of art.

The objects look like this:

```js
  {
    "id": 1,
    "name": "Kea in Flight",
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

Any time you want to use this data, you can just `var art = require('./art.json')` at the top of the file you want to use it in. Remember, `art` is an array and Handlebars expects you to pass it an object, so you might need to do something like this:

```js
  var viewData = {
    title: 'Gallery',
    art: art
  }

```


## User stories

1. As a user, I want to see a list of artwork names on the home page.
  - Grab the data using `var art = require('art.json')`
    - Did you know you could require JSON? Pretty handy! (You can't leave the extension off like you can with `.js`, though.)
  - `art` is an array. Handlebars expects an object. Put the array inside an object, then pass it to `res.render`.
  - Remeber, you can do something for each element in the array using `{{#each}}`. We suggest using an unordered list, where each artwork name could be listed using `<li>{{this.name}}</li>`.

* As a user, I want to see more details about a specific repository.
  - Create a `detail.hbs` in the `views` folder which includes HTML markup for the details.
  - Create a route that accepts a repo ID (`/details/:id`) that renders the details page.
  - Add a function to `db.js` that returns the data for a specific repo based on its ID.
  - Wrap the name repository names with an `a` element that links to the details page.

* As a user, I want to see more information about the author of the repository.
  - Create an `author.hbs` in the `views` folder which includes HTML markup for the details.
  - Create a route that accepts a repo ID (`/details/:id/author`) that renders the author page.
  - Add a function to `db.js` that returns the data for the author of a specific repo based on its ID.
  - Create a link in `details.hbs` to the authors page.


## Helpful notes

These are the noteworthy parts of the code you should be sure you feel comfortable with.

### Handlebars configuration

The `express-handlebars` module is configured in `server.js`.

```js
// Middleware
var hbs = require('express-handlebars')
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main'
  }))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
```

This lets Express know about an engine called `hbs` with a file extension of `hbs` (`extname: 'hbs'`) and the name of our `defaultLayout` (`main.hbs`). We then define the engine as a _view engine_ and specify the name of the folder where the views are kept.


### Layouts

Layouts represent top-level templates (include the `<html>` element). To include the page-specific view into the layout, use `{{{body}}}` (3 curly brackets).


## Further reading

For more information, check out these links:

* http://handlebarsjs.com
* https://github.com/ericf/express-handlebars
