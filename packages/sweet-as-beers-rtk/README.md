# Sweet As Beers

In this challenge you'll build part of a fictitious clearing house for beer - specifically the product listing and shopping cart pages.

## Setup

After cloning this repo

```sh
cd sweet-as-beers && npm i
npm run dev
```

## Starting place

- All of the React components are in place.
- You can find the beer data in `data/beers.ts`.
- Redux Toolkit has been installed, but not yet configured.
- The 'slices' folder has been created, but no real slices are in place yet.
- The beer listing displays the beers, but the _Add to cart_ link doesn't do anything yet.

Before we jump into the code editor, let's do some thinking about what we need to accomplish.

## Shape of the store 
TODO: tidy up `client/store.ts` and `slices/index.ts` so that all reducers are `combined` into `slices/index.ts`.
And update this readme so that students don`t get confused.

One of the important tasks when working with Redux is to design the shape of the store. If we think about the type of data that will be changing in this app, there are 2 clear pieces of changing data that multiple components will use:

1. The contents of the **cart** as an array of cart item objects
2. The user's **active page** (React Router is a more appropriate choice to manage navigation, but let's use Redux instead because we need the practice)

Given that, our Redux store should look similar to object below once we have implemented a couple of the following steps further on in the readme.

```js
{
  cart: [
    {
      id: 1,
      quantity: 3,
      name: 'HBIB Ginger Fusion'
    }, {
      id: 2,
      quantity: 1,
      name: 'Mangose & Melons'
    }
  ],
  activePage: 'home' // or 'cart'
}
```

Now we should have a sense of what our reducers will be creating. But before we start building our slices, take this time to create the store (in store.ts) and wrap our `<App>` with the `<Provider>` in `client/index.ts`.

**Note:** Redux Toolkit automatically sets up the Redux Dev Tools for us to use in our browser.

## Navigation

In this section, we'll use a value in the Redux store to determine whether we render our `<BeerList />` component or our `<Cart />` component, changing the page we're viewing by updating this value in the store (i.e. changing the string `'home'`to be `'cart'`). We are doing this instead of using something like React Router to manage our pages, but you might choose either of these methods depending on the requirements of your project.

To do this you'll create a slice with a navigate action inside it and dispatch your action from a click event in your components.

1. Create an 'activePage' slice in `client/slices/activePage.ts`. The _skeleton_ will look something like this:

```js
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const activePageSlice = createSlice({
  name: 'activePage',
  initialState: 'home',
  reducers: {
    // this is where our navigate action will go
  },
})

export const selectActivePage = (state: RootState) => state.activePage

// ... we will export our actions here
// export const { actionName } = activePageSlice.actions

export default activePageSlice.reducer
```

- Here's a breakdown of what's going on in the code above
  - The `name` property dictates what the name of our state slice will be when we try and use it with `useSelector` and what action names will be in our Redux Dev Tools
  - The `initialState` property is set to `home`, this means when we enter our application for the first time, we will want to render `<BeerList />`
  - The `reducers` property stores all our actions and how they interact with the state. Each one will be a function which receives the `state` and the `action` as parameters. Data inputs will be stored in `action.payload`
  - `export const selectActivePage` is just a little helper function so that we can use `const activePage = useSelector(selectActivePage)` in our component, rather than `const activePage = useSelector((state) => state.activePage)`, _this comes in handy when we want to make more complex selectors which can all be defined in a single place rather than through our components_

2. Now implement `useSelector` in the `<App />` component to grab the value of `activePage` and determine whether to conditionally render either `<BeerList />` or `<Cart />`. _Tip:_ consider using the ternary operator for this.

3. Define the action in your activePage slice to navigate between pages. We will use `action.payload.page` in our reducer to do this. This will look something like:

```js
import type { PayloadAction } from '@reduxjs/toolkit' // this is a type that we can use to type our action

interface Payload {
  page: string
}

// ... rest of our activePage slice

reducers: {
  navigate: (_, action: PayloadAction<Payload> /** Payload is typed */) => {
    return action.payload.page
  }
}

// ... rest of our activePage slice

export const { navigate } = activePageSlice.actions
```

- Let's break this down:

  - navigate is the name given to the action, and thus is what we destructure at the bottom when we want to export it
  - navigate is a function which receives the current `state` and the `action` which is an object that looks like:

  ```js
  action: {
    type: 'activePage/navigate', // we want to talk to the 'navigate' function in the 'activePage' slice
    payload: { // variables to give to the function
      page: 'cart'
    }
  }
  ```

  - whatever is returned from this function is now the new state

4. Now we need to import our `activePage` reducer to the `store.ts`

5. Add a click event handler to the `<a>` tag in `client/components/BeerListItem.tsx`. Import the `useDispatch` hook and have it dispatch the `navigate` action, with the value of `'cart'`. (Actions are called with an object (which is its payload), an example action might be `navigate({ page: 'cart' })`)

6. If you try to click the "Add to cart" link for a beer now, you should be shown the `<Cart />` component (though there will be nothing in it).

_Extra:_ Try and test your reducer manually by 'dispatching' actions using Redux Dev Tools in your browser. Make sure to dispatch the correct type and payload. Try and navigate between 'home' and 'cart'

## Continue shopping

Now that we can get to the `<Cart />` it's important we can also get back to `<BeerList />`. Rather than dispatching actions from the DevTool, add a click event handler to the "Continue shopping" link in the `<Cart />` component. This handler should dispatch the `navigate` action with a `page` of `'home'`.

Ensure that clicking "Continue shopping" takes you back to the listing so you can access both pages.

## Add to cart

In this section, you'll create a reducer function, export it as an action, and dispatch that action from your component to make a state update.

A nice way to _start_ new redux features is to start from the component: "What happened in the UI?". Think of this as some kind of event that happened and you _want_ your state to update in some way, but it's okay not to worry about the logic of how that happens just _yet_.

So, as a user, when I click the 'Add to Cart' button which is located in the `BeerListItem` component, I expect some sort of 'added to cart' event to take place. Let's use that idea to start our redux feature!

1. We have an on-click handler for the 'Add to Cart' button already, let's dispatch a second action to our store. And let's give our action a name that describes the event: `dispatch(addToCart())` or `dispatch(itemAdded())`

2. Actions receive as an argument the payload (this is information about the event). If I added an item to the cart, what item did I add? If I need to keep track of them uniquely, what's the item's id? Here we can add that information in an object to our dispatched action: `dispatch(itemAdded({ id, name }))`

3. Now let's look at what needs to happen in our state to accomodate this:

   - We need to create a slice of state that stores the information of our cart
   - This will have an initialState of an empty array `[]`
   - Our state will store an array of objects, each object will contain an `id`, `name`, and `quantity`
   - Our state will have a function to add an item to the cart with the same name as our dispatched action above

4. Now that we've organized our thoughts in step 3. Let's put them into action. Create a new slice called `cart` in `cartSlice.ts`

```js
import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    itemAdded: (state, action) => {
      // ... add a new item to state
      // consider using the spread operator for this
    },
  },
})

// ...

export const { itemAdded } = cartSlice.actions
```

5. Fill in the logic to add a _new_ item to the cart. Do not worry yet about adding the same item twice.

_When you have this in place, ensure that when you click the beer links, you can see the action dispatched and the store changing in the Redux Dev Tools._ Your store should look something like this:

```js
[
  {
    id: 1,
    name: 'HBIB Ginger Fusion',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Mangose & Melons',
    quantity: 1,
  },
]
```

**Note:** When the reducer is processing the `itemAdded` action, it should default to `1` for the `quantity` of the cart item it's adding.

## Display the Cart

Currently, the `<Cart />` component has a hardcoded, empty `cart` array. Implement `useSelector` in the `<Cart />` component so it can render the `cart` from your Redux store.

You can define your selector function in the component:

`const cart = useSelector((state) => state.cart)`

Or you can define and export it in `cartSlice.ts`:

`const selectCart = (state) => state.cart`

And import it into and use in your component:

`const cart = useSelector(selectCart)`

Now when you add a beer, you should be taken to the cart page and the added item is displayed.

**Note:** if you refresh the page, you'll empty the Redux store. So if you want to add and see multiple items in the cart, you'll need to use the "Continue shopping" button to return to the listings.

## Avoid duplicate entries

You'll notice that if you add a beer that is already in the cart, it will be added twice and both will have a quantity of `1`. Update your `cart` reducer so it detects if the beer being added is already in the cart. If it is, increase its `quantity` instead of adding a new one. Tip: try to have a plan for how you intend to do this before jumping directly to the code.

Ensure you can now add a beer that's already in the cart and its quantity will be increased each time you add it.

## Remove from cart

Let's make it possible to remove an item from the cart. To do so, follow the same pattern as above, except you don't need to create the cart slice this time. Instead, add a new reducer function. For example:

```js
import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    itemAdded: (state, action) => {
      // ... add a new item
    },
    itemRemoved: (state, action) => {
      // ... remove an existing item
      // ... consider using `filter()` to remove the item from the new state.
    }
  },
})

// ...

export const { itemAdded, itemRemoved } = cartSlice.actions
```

Write a click handler for the delete button that dispatches the `itemRemoved` with an `id` in the payload.

## Update the cart

Now let's give the user an easier way of changing the quantities of items in the cart. In this section, you'll create a new action creator, update the existing reducer function and dispatch the new action from an event handler in `<Cart>`. You will also have to manage some component state to keep track of which items have had their quantities updated.

As the user is updating the quantities of the items in their cart, you'll maintain those changes in the `<Cart />` component's local state. When they click the _Update_ button, that's when you'll dispatch the `quantitiesUpdated` action to update the Redux store. Do not dispatch any actions in the `onChange` event of the inputs.

Before you continue to the next paragraph, consider what the component state needs to look like in order to keep track of the quantities of each cart item. Think through how you're going to update the state for each individual item quantities in the `onChange` handler. You won't be able to use the `name` attribute from the input field, because that will be the same for each item. Remember that you are already accessing the `cart` data from your Redux store.

If you want more of a challenge, you can try to implement this feature from here. If you'd like a little more guidance, keep reading.

**This is a really good opportunity for problem solving, so consider what would serve your learning better and don't cheat yourself out of a chance for stretch.**

Currently, the cart item quantity being rendered is the value from `cart` in our Redux store, but because this value can change, it should be rendered from component state. A reasonable approach is to use `cart` as the initial value for the component state.

Add a `handleUpdate` event handler in `<Cart />` and call it from the input boxes. Be sure to pass the `id` of the cart item so the function will know which cart item to update. Use the React DevTools to ensure the updates are working as expected.

Create a helper function in your cartSlice that helps dispatch the `quantitiesUpdated` action that looks similar to this:

```js
   export const { itemAdded, itemRemoved, quantitiesUpdated } = cartSlice.actions
```

Dispatch the `quantitiesUpdated` action from the `onClick` handler of the Update button. The payload for this action will be the new `cart` array that you've been updating in local state.

Our existing `cart` reducer can be used once you've added to it how the state should change when this `quantitiesUpdated` action is dispatched. Make these edits and verify the reducer is working correctly using the Redux DevTools if you need to troubleshoot anything. Your action should appear as `cart/quantitiesUpdated`

Verify everything is working as expected and troubleshoot any issues that you notice. Well done!

## Stretch

1. Implement the **Checkout** button on the cart page. Have it go to a thank you page and store the items in the cart as a new `Order` (new reducer). On the thank you page, include a "Home" link so they can return to the listing. Verify your orders are being saved using the Redux DevTool.

1. On the listing page, add an _admin_ link that goes to a kind of Admin Portal used by Sweet As Beers to mark orders as fulfilled or cancelled. On this page, create 3 headers/sections: Pending, Cancelled, and Fulfilled. After a customer has checked out, their order should be in the _pending_ section. Next to each of these orders, provide buttons to `orderCancelled` and `orderFulfilled`. When an order is cancelled, it should be moved to the cancelled section, and if fulfilled, moved to the Fulfilled section.

Hopefully this exercise has given you an opportunity to become more comfortable and confident with React and managing a store with Redux.
