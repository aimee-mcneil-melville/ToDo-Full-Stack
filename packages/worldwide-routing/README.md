# Worldwide Routing

This exercise has you building an experience to navigate continents and their countries. We'll use [React Router](https://reactrouter.com/docs) to create the links and pages and manage browser history.


## Setup

After cloning this repo:

```sh
cd worldwide-routing
npm install
npm run dev
```

Add the configuration for `BrowserRouter` in your `server.js` (this must go AFTER the line that sets up your `public` folder).

```js
server.get('*', (req, res) => {
  res.sendFile(path.resolve('server/public/index.html'))
})
```

Set up `BrowserRouter` in your `client/index.js`. 

* Import the router from `react-router-dom` at the top of the file. _i.e. `import { BrowserRouter as Router } from 'react-router-dom'`_

* Inside your `ReactDOM.render()` function, you can then wrap the `<App />` component in `<Router></Router>` tags. 

Note: _You could place the router within the App instead, around specific components, but by wrapping it around App we will give everything access to the Router's functionality._


## Release 1

Let's start with the couple of components that make up the home page. Check out the `App.jsx` component. It currently contains the main header as shown in the following image, the instructions are in a `Home` component, and the beginnings of the `Nav` component are also in place.

 * Start by completing the `Nav` component so that it contains a list of continent names (like in the image below) based on the information from `data/continents`.  Add a list item for Home too.

 Tip: _You can use `Object.keys()` on what is exported from `data/continents.js` to get a list of continent names._

 * Import and use the `Nav` component so that it shows on all pages.

 * Import and then use the `Routes` and `Route` components from `react-router-dom`, so that the `Home` component will only show on `'/'`.

![after release 1](readme-images/release-1.png)


## Release 2

Next, add a route for `continents/:name` to your `App.jsx`. We will use it to show the selected continent and its respective image from `data/continents.js` file. 

* Create a `Continent` component for this route. Import `useParams` from `react-router-dom` and then use this to determine which continent to show. 

* Use the `Link` component from `react-router-dom` in your `Nav` to create links for the user to the correct continent.

* In the `Continent` component, also show a list of countries that the given continent contains.

Notice how `Continent` has replaced the `Home` component in the image below.

![after release 2](readme-images/release-2.png)


## Release 3

In this release, we'll create a component for an individual country. This is the first time you'll need to use `data/countries.js`.

* Create a route for this page. It should look something like: `continent/:name/:code`. 

Note: _We're using the continent name and country code for this route to help us later. The url path for the above suggestion will be entered into the browser as `/continent/Oceania/NZ`._

* This route should render a `Country` component that shows all the information (in `data/countries`) about that specific country. 

Note: _The flag emoji icons don't work in all browsers (e.g. in Windows they seem to work in Firefox but not Chrome). If you see `NZ` instead of the NZ flag, try a different browser._ 

![country after release 3](readme-images/release-3-a.png)

* Make sure the country list in `Continent` can link to the page you've just created (remember that `Link` component).

![continent after release 3](readme-images/release-3-b.png)


## Release 4

Currently each country just shows a string of it's neighbours' country codes. Create a list that will show each neighbour's name instead and be a link to that country's page so you can visit the pages of neighbours easily.

![after release 4](readme-images/release-4.png)


## Future Releases

Here are some ideas for future releases:

* If you haven't already, add a _Home_ link in the `Nav` component.

* Bold the selected continent in the `Nav` when viewing a continent or country and/or change the bullet point style (as shown in the release 4 screenshot) so users will know where they are.

* Countries currently show up in the order decided by the data files. Add a feature to show them alphabetically or perhaps even by population.

* Read about React Router's [Nested Routes](https://reactrouter.com/docs/en/v6/getting-started/tutorial#nested-routes) and [Index Routes](https://reactrouter.com/docs/en/v6/getting-started/tutorial#index-routes). Now try nesting the routes for `Home`, `Continent` and `Country` within `Nav`. The `Home` component should render on the index route, i.e. when the URL is just `http://localhost:3000/`. 

Note: _It's probably not good application design to have everything nested inside the `Nav` component (if it's called `Nav` it should just be for navigation!) but Nested Routes are a new and useful feature of React Router, and this stretch task will give you practice with them._
