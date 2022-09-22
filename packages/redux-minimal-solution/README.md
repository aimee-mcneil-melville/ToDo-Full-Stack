# Redux with React (but not the clean way)

This challenge will guide you to experiment with Redux using an atypical React setup (we'll improve how we integrate with React in a later exercise).

## Setup

### 0. Cloning and installation
- [ ] Clone this repo, navigate to it, install packages, and start the server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    ```sh
    cd redux-minimal && npm i
    npm run dev
    ```
  </details>

- [ ] Open [http://localhost:3000](http://localhost:3000) in your browser
- [ ] Install Redux DevTools for your browser (if you don't have it already)
  <details style="padding-left: 2em">
    <summary>More about Redux DevTools</summary>

    The computers on campus should already have the Redux DevTools installed. If you'd like them on your own computer you can install the Firefox add-on [here](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/) and the Chrome extension from [here](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).
  </details>

---

## Requirements

### 1. Using Redux DevTools

- [ ] Load up Redux DevTools and dispatch a few `ADD_WOMBAT` and `DEL_WOMBAT` actions to see what's going on
  <details style="padding-left: 2em">
    <summary>More about dispatching</summary>

    This screenshot illustrates how to dispatch actions:

    ![The Redux DevTools numbered to visually indicate the location of steps 1, 2, and 3 listed below](./screenshot1.png)

    1. Select the "Show Dispatcher" button at the very bottom of the dev tools which resembles a command-line prompt (angle bracket followed by an underscore)
    2. In the "Dispatcher" area, supply a Javascript object to be dispatched
    3. Select the "Dispatch" button
  </details>


### 2. Adding to the reducer

- [ ] Add an `UPDATE_WOMBAT` action to the reducer in `reducers/wombats.js`
  <details style="padding-left: 2em">
    <summary>More about new reducer features</summary>

    Take your time to read through what the reducer currently does, and follow the established pattern to create your new action.

    To update a wombat you will need to provide the **new** name of the wombat (so that it can be changed) but also the **old** name (so that the reducer can find the wombat that needs to be updated). To hold these two data items, your `payload` will need to be an object instead of a string.
  </details>

- [ ] Make sure you can dispatch this new action successfully from Redux DevTools. You'll dispatch it from code in a later step

---

### 3. Adding a Wombat

- [ ] Add an input field to the page with a button to add a wombat. (Which component should this input field be added to, `<Wombat>` or `<Wombats>`?)
- [ ] Add an event listener to handle the button's `onClick` event
- [ ] Wire up this input so that it can `dispatch` an `ADD_WOMBAT` action to the store to add the wombat's name from the input box

### 4. Checking your work

- [ ] Ensure that the `ADD_WOMBAT` action works from Redux DevTools before making it work through your code
- [ ] Verify that the correct action is being dispatched from your code on the click event
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    You could use a function to **produce** an action: these are called **action creators**.
  </details>

### 5. Deleting a Wombat

Add a delete button next to each of the wombats so they can be deleted:

- [ ] Modify the `<Wombat>` component to add a button next to each of the wombats
- [ ] Add an event listener to handle an `onClick` event
  <details style="padding-left: 2em">
    <summary>Tip</summary>
    
    Or alternatively you could put your input field in a form, and handle the form's onSubmit event.
  </details>

- [ ] In the event listener, dispatch a `DEL_WOMBAT` action to the store to delete the wombat based on its name
  <details style="padding-left: 2em">
    <summary>Tip</summary>
    
    It may be worth referring to the recommended problem solving steps above.
  </details>

### 6. Updating a Wombat

- [ ] Modify the `<Wombat>` component to add an input box and a button next to each of the wombats
- [ ] Add an event to this new input/button upon submission
  <details style="padding-left: 2em">
    <summary>Tip</summary>
    
    Looking back at your `UPDATE_WOMBAT` action, it expected both the **new** and **old** name of the wombat, so make sure that you can provide both of these values when you dispatch your action.
  </details>
- [ ] `dispatch` the action to the store to change the name of the wombat


### 7. Adding a new reducer

- [ ] Add a new reducer file for another animal. We already have `wombats`; how about `aardvarks`?
- [ ] In `reducers/index.js`, pass your new reducer file to `combineReducers`
- [ ] Add some actions to the new reducer

### 8. Using the new reducer
- [ ] Make a client-side component (or components) for your new animal

--- 
## Further resources

When you're starting to get happier with this process, you could try reinforcing it with the [Getting Started with Redux](https://egghead.io/courses/getting-started-with-redux) video tutorials from Redux creator Dan Abramov.

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=redux-minimal)
