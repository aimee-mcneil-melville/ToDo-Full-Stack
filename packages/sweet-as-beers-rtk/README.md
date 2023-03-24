# Sweet As Beers

In this challenge you'll build part of a fictitious clearing house for beer - specifically the product listing and shopping cart pages.
___
## Setup

### 0. Installation

- [ ] Clone this repo and cd into the new directory

- [ ] Install packages and start the dev server with npm run dev

<details style="padding-left: 2em">
  <summary>Tip</summary>

```sh
cd sweet-as-beers && npm i
npm run dev
```

</details>

___
## Starting place

- [ ] Have a look around the repository to get an idea of what is going on
<details style="padding-left: 2em">
<summary>What's Included</summary>

- All of the React components are in place.
- You can find the beer data in `data/beers.ts`.
- Redux Toolkit has been installed and the store has been created but the store has not yet been connected to the app - we will do this soon.
- The 'slices' folder has been created, but no real slices are in place yet only an `example slice`.
- The beer listing displays the beers, but the _Add to cart_ link doesn't do anything yet.
</details>

___
## Redux Store
### 1. Shape of the Store

One of the important tasks when working with Redux is to design the shape of the store.

<details style="padding-left: 2em">
<summary>Tips</summary>

To decide what we will store in Redux we should think about the type of data that will be changing in the app which multiple components will use:

1. The contents of the **cart** as an array of cart item objects
1. The user's **active page** (React Router is a more appropriate choice to manage navigation, but we'll use Redux instead for this challenge because we need the practice)

Given that, our Redux store will look similar to the object below once we have implemented a couple of the following steps further on in the readme.

```ts
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

</details>
</br>

### 2. Connect the Store

Now we should have a sense of what our reducers will be creating. But before we start building our slices, you will need to connect our store to the app.

- [ ] In `client/index.tsx wrap` the  `<App>` with the `<Provider>`

<details style="padding-left: 2em">
  <summary>Tip</summary>

```ts
<Provider store={store}>
  <App />
</Provider>
```

**Note:** Redux Toolkit automatically sets up the Redux Dev Tools for us to use in our browser.

</details>

- [ ] Remember to import the `Provider` from `react-redux` and the `store` from the `./store`

___
## Navigation

### 3. Create a slice to navigate between pages

In this section, we'll use a value in the Redux store to determine whether we render our `<BeerList />` component or our `<Cart />` component. Changing the page we're viewing by updating this value in the store (i.e. changing the string `'home'`to be `'cart'`). We are doing this instead of using something like React Router to manage our pages to practice using Redux.

- [ ] Create an 'activePage' slice in `client/slices/activePage.ts` with a navigate action inside it.

<details style="padding-left: 2em">
  <summary>Tips</summary>

  The _skeleton_ will look something like this:

  ```ts
  import { createSlice } from '@reduxjs/toolkit'
  import type { PayloadAction } from '@reduxjs/toolkit'
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

<details>
  <summary>Summary of the code above</summary>

  - The `name` property dictates what the name of our state slice will be when we use it with `useAppSelector` and what action names will be in our Redux Dev Tools.
  - The `initialState` property is set to `home`, this means when we enter our application for the first time, we will want to render our home page, which in this case is the `<BeerList />` component.
  - The `reducers` property stores all our actions and how they interact with the state. Each reducer will be a function which receives the `state` and the `action` as parameters. Data inputs will be stored in `action.payload`.
  - `export const selectActivePage` is just a little helper function so that we can use `const activePage = useAppSelector(selectActivePage)` in our component, rather than `const activePage = useAppSelector((state) => state.activePage)`, _this comes in handy when we want to make more complex selectors which can all be defined in a single place rather than through our components_
</details>
<br/>

</details>

- [ ] Dispatch your action from a click event in your components.

1. Define an action in your activePage slice to navigate between pages. We will use `action.payload.page` in our reducer to do this. This will look something like:

```ts
interface Payload {
  page: string;
}

// ... rest of our activePage slice
reducers: {
  navigate: (state, action: PayloadAction<Payload> /** Payload is typed */) => {
    return action.payload.page
  }
}
// ... rest of our activePage slice

export const { navigate } = activePageSlice.actions
```

- Let's break this down:

  - navigate is the name given to the action, and thus is what we destructure at the bottom when we want to export it
  - navigate is a function which receives the current `state` and the `action` which is an object that looks like:

  ```ts
  action: {
    type: 'activePage/navigate', // we want to talk to the 'navigate' function in the 'activePage' slice
    payload: { // variables to give to the function
      page: 'cart'
    }
  }
  ```

  - whatever is returned from this function is now the new state
  - Tip: if you are not using the `state` parameter in your reducer you can replace this with an underscrore, `_`, instead

1. Now we need to import our `activePage` reducer to the `store.ts`

1. Add a click event handler to the `<a>` tag in `client/components/BeerListItem.tsx`. Import the `useAppDispatch` hook and have it dispatch the `navigate` action, with the value of `'cart'`. (Actions are called with an object (which is its payload), an example action might be `navigate({ page: 'cart' })`)

1. Now implement `useAppSelector` in the `<App />` component to grab the value of `activePage` and determine whether to conditionally render either `<BeerList />` or `<Cart />`. _Tip:_ consider using the ternary operator for this.

1. If you try to click the "Add to cart" link for a beer now, you should be shown the `<Cart />` component (though there will be nothing in it).

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

4. Now that we've organized our thoughts in step 3. Let's put them into action. Create a new slice called `cartSlice` in `slices/cart.ts`

```ts
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '../components/Cart'

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    itemAdded: (
      state,
      action: PayloadAction<Payload /** Remember to type your Payload */>
    ) => {
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

```ts
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

Currently, the `<Cart />` component has a hardcoded, empty `cart` array. Implement `useAppSelector` in the `<Cart />` component so it can render the `cart` from your Redux store.

You can define your selector function in the component:

`const cart = useAppSelector((state) => state.cart)`

Or you can define and export it in `cart.ts`:

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

```ts
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '../components/Cart'

const initialState: CartItem[] = []

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    itemAdded: (
      state,
      action: PayloadAction<Payload /** Remember to type your Payload */>
    ) => {
      // ... add a new item
    },
    itemRemoved: (
      state,
      action: PayloadAction<Payload /** Remember to type your Payload */>
    ) => {
      // ... remove an existing item
      // ... consider using `filter()` to remove the item from the new state.
    },
  },
})

// ...

export const { itemAdded, itemRemoved } = cartSlice.actions
```

Write a click handler for the delete button that dispatches the `itemRemoved` with an `id` in the payload.

## Update the cart

Now let's give the user an easier way of changing the quantities of items in the cart. In this section, you'll create a new action creator, update the existing reducer function and dispatch the new action from an event handler in `<Cart>`. You will also have to manage some component state to keep track of which items have had their quantities updated.

As the user is updating the quantities of the items in their cart, you'll maintain those changes in the `<Cart />` component's local state. When they click the _Update_ button, that's when you'll dispatch the `updateQuantities` action to update the Redux store. Do not dispatch any actions in the `onChange` event of the inputs.

Before you continue to the next paragraph, consider what the component state needs to look like in order to keep track of the quantities of each cart item. Think through how you're going to update the state for each individual item quantities in the `onChange` handler. You won't be able to use the `name` attribute from the input field, because that will be the same for each item. Remember that you are already accessing the `cart` data from your Redux store.

If you want more of a challenge, you can try to implement this feature from here. If you'd like a little more guidance, keep reading.

**This is a really good opportunity for problem solving, so consider what would serve your learning better and don't cheat yourself out of a chance for stretch.**

Currently, the cart item quantity being rendered is the value from `cart` in our Redux store, but because this value can change, it should be rendered from component state. A reasonable approach is to use `cart` as the initial value for the component state.

Add a `handleUpdate` event handler in `<Cart />` and call it from the input boxes. Be sure to pass the `id` of the cart item so the function will know which cart item to update. Use the React DevTools to ensure the updates are working as expected.

Create a helper function in your `slices/cart.ts` which is called inside your `updateQuantities` action.

Don't forget to export:

```ts
export const { itemAdded, itemRemoved, updateQuantities } = cartSlice.actions
```

In the `<Cart />` dispatch the `updateQuantities` action from the `onClick` handler of the Update button. The payload for this action will be the new `cart` array that you've been updating in local state.

Our existing `cart` reducer can be used once you've added to it how the state should change when this `updateQuantities` action is dispatched. Make these edits and verify the reducer is working correctly using the Redux DevTools if you need to troubleshoot anything. Your action should appear as `cart/updateQuantities`

Verify everything is working as expected and troubleshoot any issues that you notice. Well done!

## Stretch

1. Implement the **Checkout** button on the cart page. Have it go to a thank you page and store the items in the cart as a new `Order` (new reducer). On the thank you page, include a "Home" link so they can return to the listing. Verify your orders are being saved using the Redux DevTool.

1. On the listing page, add an _admin_ link that goes to a kind of Admin Portal used by Sweet As Beers to mark orders as fulfilled or cancelled. On this page, create 3 headers/sections: Pending, Cancelled, and Fulfilled. After a customer has checked out, their order should be in the _pending_ section. Next to each of these orders, provide buttons to `orderCancelled` and `orderFulfilled`. When an order is cancelled, it should be moved to the cancelled section, and if fulfilled, moved to the Fulfilled section.

Hopefully this exercise has given you an opportunity to become more comfortable and confident with React and managing a store with Redux.