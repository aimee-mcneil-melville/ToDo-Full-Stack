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

> Did you know you could require JSON? Pretty handy when you need a bit of configuration data! You can't leave the extension off like you can with `.js`, though.

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


## MVP

1. _As a user, I want to see a list of artwork names on the home page so I can see what's available._
  - Remember, you can do something for each element in the `art` array using `{{#each}}`.
  - We suggest using an unordered list, where each artwork name could be listed using `<li>{{this.name}}</li>`.

2. _As a user, I want to see who each artwork is by so I can give them credit._
  - Since you already have the name, this should be pretty easy! Do the same thing for the license. (You could even make it a link if you like: the URL property is also included.)

3. _As a user, I want to see what license the artwork is under so I know if I can copy it or not._
  - This `{{#each}}` block is getting a bit complicated. Let's add a partial! The `{{#each}}` will stay the same, but you'll move all the code inside it to the partial file (`artwork-summary.hbs`, for example).

4. _As a user, I want to see a header at the top of the page displaying the page title so I know where I am._
  - We _could_ just "hard-code" this in the template, but to keep our design flexible let's use a partial and we can include a `title` property on every data object we pass to `res.render`.
  - Create a `header.hbs` partial. Make it look however you like, but be sure it has a `{{title}}` in there somewhere.
  
5. _As a user, I want to see a footer at the bottom of the page displaying contact details so that I can contact the people responsible for the site._
  - Repetition can be a wonderful thing. Create a `footer.hbs` partial and include it in your home template.

6. _As a user, I want to see an artwork displayed when I visit `/artworks/:id` so that I can view the image._
  - Create `artworks.hbs`. It doesn't have to be complicated: just a single `img` tag with its `src` attribute set to `{{artwork}}` will do nicely
  - Create a new route in server.js.  In the route, you'll need to find the correct artwork using `req.params.id`. Hint: `art.find()` (see [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/find))
  - Send the artwork to the `res.render()` call

7. _As a user, I want to be able to click on the artwork name on the home page and be taken to the image view._
  - Time to link it up! In your `artwork-summary.hbs` (or whatever you called it) partial, turn the artwork name into a link. You'll need to make use of the `id` property of the artwork object to build your links.



## Further reading

For more information, check out these links:

* http://handlebarsjs.com
* https://github.com/ericf/express-handlebars
