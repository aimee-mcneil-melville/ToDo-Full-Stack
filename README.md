# Server-side Rendering

* [Getting started](#getting-started)
* [User stories](#user-stories)
* [Helpful notes](#helpful-notes)
* [Further reading](#further-reading)


## Getting started

* After cloning this repo, install dependencies with `npm install`
* To debug the server: `npm run debug`
* To start the server: `npm start`
* To run the tests: `npm test`

## Hello world

When you're learning a new technology, make sure you start simple and get that working before layering on too much complexity.

1. Start by creating a new home route, `/` in the server
  - make sure it's working by having it send something like `res.send('hello!')`
2. Make a template called `home.hbs` in the `views` folder
  - start by putting some static text in there, like "This is the template"
3. Plug the template in to your server
  - replace the `res.send` with `res.render('home')`
  - make sure you can see "This is the template" rendered
4. Add a variable to your home template and get that working
  - e.g. `{{name}}'s repos!`
  - modify your route to provide that variable e.g. `res.render('home', { name: 'mixmix' })`
  - does it work?
5. Refactor!
  - extract your home (req, res) function into `routes.js`
  - move any data fetching that the route is doing out into `db.js`

The rest of this exercise should follow the same arc - gradually layering up detail and complexity.


## User stories

* As a user, I want to see a list of GitHub repositories for a user.
  - Create `github.json` with:

    ```sh
    curl https://api.github.com/users/[username]/repos > github.json
    ```

  - Create a route for the home page (`/`) that shows a list of repos.
  - Create a `db.js` that returns a list of repositories as a JavaScript object.

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
