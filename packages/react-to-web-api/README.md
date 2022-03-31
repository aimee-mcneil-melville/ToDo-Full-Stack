# The Wonderful World of Widgets

This is a starter project to illustrate React components consuming a web API.


## Setup

To experience this repo in all of its glory:

* Clone this repo

```sh
cd react-to-web-api
npm install
npm run knex migrate:latest
npm run knex seed:run
npm run dev
```

* Navigate to [http://localhost:3000](http://localhost:3000)
## Getting Started

This exercise reverses the roles from yesterday. Today the API has been (partially) built for you. Your job will be to build the React front end that consumes the API (using the node module `superagent`), and store the resulting data into component state.

Take a look around the project to make sure you're familiar with the layout. Take particular note of what is in your client folder, and the setup of the server routes in the back end.
## Steps

We're first going to get some widgets displaying on the page. The widget data is being stored in a database (on our server side), so we'll have to make an API call to retrieve the data.

1. Let's start by setting up the components. Add a `useState` hook to the `App.jsx` component, so we can store `widgets` in component state. Make the initial value an empty array.

1. Also add a `useEffect` hook to `App`. `useEffect` accepts a function as its first parameter. Eventually we will call the API function from here, but for now just have this function do a `console.log('using the effect')`.
    - Remember to pass an empty array to `useEffect` as the second parameter (so that the function only runs once - when the component mounts).
    - Refresh the app in your browser the with DevTools console open. Make sure you can see your `useEffect` message.

1. Looking in our `server` folder, we can see that a database function called `getWidgets` has already been built in `db/db.js`. A GET route using that DB function is also in place in `routes/widgets.js`.
   - Test that the route is working (and see what data it returns) by making a GET request to `http://localhost:3000/api/v1/widgets/` from Postman/Insomnisa.

1. Back in the client folder, you'll find a `getWidgets` function in `api.js`. Use `superagent` to make a GET request to `'/api/v1/widgets/'`, just like we were doing with Postman/Insomnisa. It's then returning just the response body (which is the JSON data being sent from our server - we don't need the rest of the HTTP response data).

1. Import this `getWidgets` function from `api.js` into `App.jsx`.

1. In the function you passed to `useEffect`, call the `getWidgets` function.
   - Superagent uses a promise-based interface, so you will need to chain a `.then()` block after this.
   - Inside your `.then()` block, `console.log` the result of `getWidgets`.
    - Refresh the app in your browser again. Make sure you can see the array of widget data in the console.

1. Remove the `console.log` and instead use the `setWidgets` function (from your `useState`) to update state with the widget data from the API.

1. Use the React Dev Tools to check that state updates as you expect.

1. Modify the `jsx` your component returns so that it displays the widgets from the component state. Perhaps you could use a `.map` here to render a new `<Widget />` component for each widget.

## Next Steps

These next steps will be full stack, requiring you to make changes to both the front and back end.

- Add the ability to add a widget. The steps you might take to complete this could be:
   - Create a POST route on the server side in `widgets.js`. Test you can get a response for it in Postman/Insomnisa.
   - Create the database function to add a new widget. Call this function in your route and test it works in Postman/Insomnisa.
   - Create an `addWidget` function in `api.js` that will make a POST request to the API route you just built.
   - Create a new `AddWidget` component containing a form. Import the `addWidget` function from `api.js` and hook it up to your form's submit handler.
   - Once your widget has been added, have your widget list refresh so the new widget is visible. Perhaps this could involve reusing the `getWidgets` API function, or thinking about the data you return from your POST route...
   - Create an `Add Widget` button in `App` to conditionally render your add form.

- Add the ability to delete a widget (HTTP DELETE)

- Add the ability to update a widget (HTTP PATCH)

- Extend the database schema for the details that are stored about widgets - add a `rating` field so we know how good those widgets really are. This will need to be added into what is displayed, and also onto the fields of the add form.

- Refactor your code into separate components (if it isn't already)

- Write tests for your components.
