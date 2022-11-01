# The Wonderful World of Widgets

This exercise reverses the roles from yesterday: today the API has been (partially) built for us. Our job is to build the React front end that consumes the API (using the node module `superagent`), and store the resulting data into component state.

## Setup

### 0. Installation and migrations

- [ ] Clone this repo and `cd` into the new directory
- [ ] Install packages, run migrations and seeds, and start the dev server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

  Commands might look like this:

  ```sh
  npm install
  npm run knex migrate:latest
  npm run knex seed:run
  npm run dev
  ```

  </details>

- [ ] Navigate to [http://localhost:3000](http://localhost:3000)

---

## Laying the foundations

### 1. Getting familiar with the code base

- [ ] Take a look around the project to make sure you're familiar with the layout
  <details style="padding-left: 2em">
    <summary>Tips</summary>

  - Take particular note of what is in your client folder and the setup of the server routes in the back end
  - Investigate the shape of the data in the database
  </details>

## Building up the stack

### 2. Connecting the server API to the client API

- [ ] Using Insomnia, test that the existing GET route for widgets is working, and see what data it returns
  <details style="padding-left: 2em">
    <summary>More about the GET route</summary>

  Looking in our `server` folder, we can see that a database function called `getWidgets` has already been built in `db/db.ts`. A GET route using that DB function is also in place in `routes/widgets.ts`.

  Test that the route is working (and see what data it returns) by making a GET request to `http://localhost:3000/api/v1/widgets/` from Insomnia.
  </details>

- [ ] Using the `getWidgets` function in `apiClient.ts` and the `superagent` library, make a GET request to `'/api/v1/widgets/'`, just like we did with Insomnia
  <details style="padding-left: 2em">
    <summary>More about the <code>getWidgets</code> request</summary>

  This time looking in the client folder, you'll find a `getWidgets` function in `apiClient.ts`. Use `superagent` to make a GET request to `'/api/v1/widgets/'`. If all goes well, it should be returning just the response body (which is the JSON data being sent from our server - we don't need the rest of the HTTP response data).
  </details>

- [ ] Import this `getWidgets` function from `apiClient.ts` into `index.tsx`

### 3. Setting up the `<index.tsx>` component

The widget data is being stored in a database (on our server side), so we'll have to make an API call to retrieve the data.

- [ ] Add a `loader` attribute to the index`<Route>` and call our `getWidgets` API inside the loader, this will retrieve our `widgets` from the database on navigation to the corresponding component(element).

### 4. Setting up the `<App.tsx>` component

- [ ] import `useLoaderData` from `react-router-dom` and call it before the return of your component.
  <details style="padding-left: 2em">
    <summary>More about useLoaderData()</summary>
    - It should look something like this `const x = useLoaderData()`. This is a hook that allows us to access the return value of our API. (which was just called in the loader in our Route). For clarity, you will want to name it after the data you expect to recieve, in our case lets name it `WidgetsData`. Now let's log it on the line underneath! `console.log('widgets', widgetsData)`.
    - Refresh the app in your browser. Make sure you can see the array of widget data in the console.
  </details>

- [ ] Set up state to store your `WidgetData` using `useState()`. Set your new `WidgetsData` variable as the initial state by passing it into the hook.

---

### 5. Updating the UI to consume the data

- [ ] Modify your component so that it return and displays the widgets from the component state.
<details style="padding-left: 2em">
  <summary>Tip</summary>
  
  Perhaps you could use a `.map` here to render a new `<Widget>` component for each widget.
</details>

---

## Full Stack

These next steps will be full stack, requiring you to make changes to both the front and back end.

### 6. Adding, deleting, and updating widgets

- [ ] Add the ability to add a widget
<details style="padding-left: 2em">
  <summary>More about adding a widget</summary>
  
  The steps you might take to complete this could be:
  - Create a POST route on the server side in `widgets.ts`. Test you can get a response for it in Insomnia
  - Create the database function to add a new widget. Call this function in your route and test it works in Insomnia
  - Create an `addWidget` function in `apiClient.ts` that will make a POST request to the API route you just built
  - Create a new `<AddWidget>` component containing a form. Import the `addWidget` function from `apiClient.ts` and hook it up to your form's submit handler
  - Once your widget has been added, have your widget list refresh so the new widget is visible. Perhaps this could involve reusing the `getWidgets` API function, or thinking about the data you return from your POST route...
  - Create an "Add Widget" button in `<App>` to conditionally render your `<AddWidget>` form
</details>

- [ ] Add the ability to delete a widget (HTTP DELETE)

- [ ] Add the ability to update a widget (HTTP PATCH)

### 7. Enhancing widget info

- [ ] Extend the database schema to include a `rating`for each widget
<details style="padding-left: 2em">
  <summary>More about widget ratings</summary>
  
  Add a `rating` field so we know how good those widgets really are. This will also need to be added into what is displayed, and also onto the fields of the add form.
</details>

### 8. Increasing maintainability

- [ ] Refactor your code into separate components (if it isn't already)

- [ ] Write tests for your components

---

[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=react-to-web-api)
