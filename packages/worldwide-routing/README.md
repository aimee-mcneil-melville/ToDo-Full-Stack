# Worldwide Routing

This exercise asks you to build an experience to navigate continents and their countries. We'll use [React Router](https://reactrouter.com/docs) to create the links and pages and manage browser history.

## Setup

### 0. Cloning and installation

- [ ] Clone this repo, navigate to it, install packages, and start the server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

  ```sh
  cd worldwide-routing
  npm install
  npm run dev
  ```

  </details>

---

## Requirements

### 1. Setting up Routes

In this section we are going to be setting up the root route to display the `<App />`

- [ ] In the `client/` folder, add a new file called `router.tsx`
- [ ] Import `createBrowserRouter, createRoutesFromElements, Route` from `react-router-dom`
- [ ] Now it's time to display the `<App />` component on the client-side root route `'/'` by using `createBrowserRouter, createRoutesFromElements, Route` (refer to the [docs](https://reactrouter.com/en/main/start/tutorial#jsx-routes) to learn more about Nested Routes)

  <details>
    <summary>Tip</summary>

  ```tsx
  import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from 'react-router-dom'

  const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<App />} />)
  )
  ```

  </details>

- [ ] Export the `router` so that we can import it in `client/index.tsx`
- [ ] Import the router from `client/router.tsx` into `client/index.tsx`.
- [ ] In `client/index.tsx` , find the `render()` call and replace `<App />` with `<RouterProvider router={router} />`.

### 2. Building a Home

Check out the `App.tsx` component. It currently contains the main header, a `<Home>` component containing user instructions, and the beginnings of the `<Nav>` component.

<details>
  <summary>Image of worldwide-routing after completing this section</summary>

![Web page showing a large title at top, a left navigation listing "Home" plus all seven continents as list items (but not links), and "Please select a continent from the nav list", in the centre](readme-images/release-1.png)

</details>
<br />

- [ ] Complete the `<Nav>` component so that it contains a list of continent names (like in the image) based on the information from `data/continents.ts`. Add a list item for Home, too
  <details style="padding-left: 2em">
    <summary>Tip</summary>

  We can use `Object.keys()` on what is exported from `data/continents.ts` to get a list of continent names.
  </details>

---

### 3. Adding continents

- [ ] In `App.tsx` replace `<Home />` with `<Outlet />` from `'react-router-dom'` to give nested routes a place to render their elements
- [ ] Add an "index" route that points to `<Home />`, this route and the others will be "nested" inside the `/` route.

  <details>
    <summary>Tip</summary>

  ```tsx
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
  </Route>
  ```

  </details>

- [ ] Create an empty component called `Continent`
- [ ] Add a route for `continents/:name` to our `router.tsx`. We will use it to show the selected continent and its respective image from `data/continents.ts` file
- [ ] Add a `useParams()` to the `Continent` component (imported from `react-router-dom`) to determine which continent to show
- [ ] In the `<Continent>` component, also show a list of countries that the given continent contains

### 4. Linking it up

- [ ] In the `<Nav>` component, use the `<Link>` component from `react-router-dom` to create links for the user to navigate to continents

<details>
  <summary>Image of continent page after completing this section</summary>
    
  Notice how `<Continent>` has replaced the `<Home>` component in the image below.

![Left nav list items are now clickable, and the main content area shows the name of a single continent as the largest heading, plus a photo and a list of countries in that continent](readme-images/release-2.png)

</details>
<br />

---

### 5. Adding countries

Now, we'll create a component for an individual country. This is the first time we'll need to use `data/countries.ts`.

- [ ] Create a route for this page. It should look something like: `continent/:name/:code`
<details style="padding-left: 2em">
  <summary>Tip</summary>
  
  We're using the continent name and country code for this route to help us later. The url path for the above suggestion will be entered into the browser as `/continent/Oceania/NZ`.
</details>

- [ ] This route should render a `<Country>` component that shows all the information from `data/countries` for that specific country
<details style="padding-left: 2em">
  <summary>Tip</summary>
  
  The flag emoji icons don't work in all browsers (e.g. in Windows they seem to work in Firefox but not Chrome). If you see `NZ` instead of the NZ flag, try a different browser.
</details>

- [ ] Go back to the `<Continent>` component and enable each country in the list to link to the page we've just created (remember that `<Link>` component)

<details>
  <summary>Images of worldwide-routing after completing this section</summary>

![View of an individual country page, including a flag icon and a few data points about that country](readme-images/release-3-a.png)
![Continent page is similar to before, except the list of countries are also now clickable links](readme-images/release-3-b.png)

</details>
<br />

### 6. Adding neighbours

Currently each country just shows a string of its neighbours' country codes.

- [ ] Create a list that will show each neighbour's **name** instead and be a link to that country's page so we can visit the pages of neighbours easily
  <details style="padding-left: 2em">
    <summary>Tips</summary>

  - Some countries have no neighbours, for example New Zealand. Consider how you handle that case
  - Some countries have neighbours that are not on the same continent, for example, Panama or Turkey. This may factor into how you build this feature
  </details>

<details>
  <summary>Image of country page after completing this section</summary>

![The country page now has a list of neighbouring country names, rather than just a list of country codes, and each country name is a clickable link](readme-images/release-4.png)

</details>

---

## Stretch

<details>
  <summary>More about stretch challenges</summary>

- If you haven't already, add a "Home" link in the `<Nav>` component

- Bold the selected continent in the `<Nav>` when viewing a continent or country and/or change the bullet point style (as shown in the section 6 screenshot) so users will know where they are (Hint: Look up 'NavLink')

- Countries currently show up in the order decided by the data files. Add a feature to show them alphabetically or perhaps even by population
</details>

---

[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=worldwide-routing)
