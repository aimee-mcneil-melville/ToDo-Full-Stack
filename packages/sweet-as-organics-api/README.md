# Sweet As Organics

The Sweet As team have diversified! They are now selling a variety of organic foods, but have this time chosen to store their stock data in a database. This is the first time we've seen the full stack in play, Redux included. With some features already complete, the code base is bigger than it has been in previous challenges.

## Setup

### 0. Installation and migrations

- [ ] Clone this repo and `cd` into the new directory
- [ ] Install packages, run migrations and seeds, and start the dev server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    Commands might look like this:

    ```
    npm i
    npm run knex migrate:latest
    npm run knex seed:run
    npm run dev
    ```
  </details>

- [ ] Check that everything is running on [localhost:3000](http://localhost:3000)
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    The app should look quite familiar, but let's check out how it differs from Sweet As Beers.
  </details>

---

## Requirements

Our job will be to implement the functionality for the My Orders page. The React components and the database functions are already in place, so we'll be working with the stuff in the middle - Redux, API calls with Superagent and server side routes.

### 1. Understanding the code base
- [ ] Explore the existing code base, either independently or using the guidance below
  <details style="padding-left: 2em">
    <summary>More about the existing code base</summary>

    <strong>Explore products and the `<ProductList>` component:</strong>
    
    * How are the `products` getting on to `<ProductList>`'s props?
    * How does the `products` array get into the Redux store in the first place? What's happening in `<ProductList>`'s `useEffect` method?
    * Check out the `fetchProducts` action creator. It returns a function rather than an object, which means it is an **async action creator**. It calls a `getProducts` function. What does that function do?
    
    <br />
    <strong>Explore data moving up and down the full stack:</strong>

    * On our server side, we have `/api/v1/products` GET route that uses a DB function - you could fire up a tool like Insomnia to see if this route works like you expect.
    * Follow the path back to the client side. How does the `products` data get back to that async `fetchProducts` action creator? What happens to the data then?
  
    <br />
    <strong>Explore the existing reducers:</strong>

    * Open your Redux devtools, and as you refresh the Shop (<ProductList>) page, see how those dispatched actions update the store state. Can you confirm that understanding by taking a look at the reducers?
    * What does setting the `waiting` state do in terms of UI? Using the timeline slider at the bottom of your Redux devtools is a good way to see how the UI is changing based on different actions.
    * Notice how both the `products` and `waiting` reducers are watching for an action type of `FETCH_PRODUCTS_SUCCESS`, so those two different parts of the Redux store state get updated from the one action!

    <br />
    Both the Shop and Cart pages are completed, with their data managed in the Redux store.
  </details>

## Placing an order

Let's get the "Place Order" button working in `<Cart>`. A potential approach could be:

### 2. Creating order routes

- [ ] Create a new routes file (`server/routes/orders.ts`) and configure our server to use those routes with an `/api/v1/orders` prefix
- [ ] Create a new POST route that uses the `addOrder` function from `server/db/orders.ts`
  <details style="padding-left: 2em">
    <summary>More about the <code>addOrder</code> POST route</summary>
  
    * `addOrder` accepts an order. It should have the same shape as the `cart` array we have in Redux on our client side (i.e. we shouldn't need to reformat the cart data)
    * This route doesn't need to return anything, so it would make sense for our route to simply respond with a `201 (Created)`, and then return `null`
  </details>

- [ ] Test that our route works as expected with a tool like Insomnia before continuing to the client side
  <details style="padding-left: 2em">
    <summary>Tip</summary>
    
    Also browse our `dev.sqlite3` file to ensure the new order is being inserted. We should see rows added to both the `orders` and `orders_products` tables.
  </details>

### 3. Creating the order API on the client side

- [ ]  Add a `client/api/orders.ts` file, and create a `postOrder` function that uses `superagent` to make a POST request to the route we just made
  <details style="padding-left: 2em">
    <summary>Tip</summary>
    
    Remember it's going to need to send some order data.
  </details>

### 4. Working with actions and reducers to place an order

- [ ] Create a `client/actions/orders.ts` file to hold our new action creators
  <details style="padding-left: 2em">
    <summary>Tips</summary>
    
    Think about what we're going to need the new async action creator (perhaps call it `placeOrder`) to do.
  
    * First, it should dispatch a pending action, so the user gets feedback that something is happening.
    * Then use the `postOrder` function from `client/api/orders.ts` to make the POST request.
    * We know our route only sends back a `201` status, so we won't have any data to deal with when the `postOrder` promise resolves.
    * We should still dispatch a success action though, so our wait indicator stops spinning.
    * A catch block is often a good idea ;)
  </details>

- [ ] Update the `waiting` reducer so it sets the state to `true` and `false` appropriately
  <details style="padding-left: 2em">
    <summary>Tip</summary>
    
    It's looking like the only part of the Redux store that cares about these `placeOrder` actions is the `waiting` state.
  </details>

- [ ] Dispatch this `placeOrder` action from within a submit handler function on the `<Cart>`. Be sure to pass in the `cart`

### 5. Checking your work

- [ ] Try it! Add something to the cart, place an order, and see what happens
  <details style="padding-left: 2em">
    <summary>More about placing an order</summary>

    Can you see the pending and success actions in your Redux devtools? Has the order been added to the database?
    
    Notice that even when placing the order occurs successfully, the cart doesn't empty. When a user starts shopping again, they would have to manually remove the previous order items from their cart, or end up with double ups! Perhaps the `cart` reducer could also be watching for a `PLACE_ORDER_SUCCESS` action?

### 6. Enhancing the order experience
It would also be great to redirect the user to the My Orders page once their order had been placed. However, we'd only want to redirect if the API call succeeds.

- [ ] Redirect users when their order is successfully placed
  <details style="padding-left: 2em">
    <summary>More about redirecting on order completion</summary>
  
    * The `dispatch` function itself doesn't have a `.then`, because it doesn't expect actions to be async. If we want to redirect after the order is placed, we'll need to do so inside the `.then` in the `placeOrder` action creator.
    * After we dispatch the success action, we might perform the redirect with the `useNavigate` method of `react-router-dom`, which is already used in our application to send users to the cart upon adding a product.
  </details>

---

## Viewing orders

We've placed an order (WOO!)... but we need a way to see all the orders we've placed! This flow should be very similar to the `fetchProducts` for the Shop (<ProductList>) page. 

### 7. Setting up the orders APIs
- [ ] Create a new GET route in `server/routes/orders.ts` that uses `db.getAllOrders`
  <details style="padding-left: 2em">
    <summary>Tips</summary>
    
    * This db function returns an array of orders
    * Test that our route works as we expect before moving on
  </details>

- [ ] Create a `getOrders` function in `client/api/orders.ts` to make the API call to our new route

### 8. Working with actions and reducers to get all orders
- [ ] Create a `fetchOrders` async action creator, which dispatches pending and success actions, and calls the `getOrders` function
- [ ] Create a new `orders` reducer, which can watch for the `FETCH_ORDERS_SUCCESS` action and set the store state to the new `orders` array
  <details style="padding-left: 2em">
    <summary>Tip</summary>
  
    * Be sure to import this new reducer into `client/reducers/index.ts` and use it inside the `combineReducers` so we get some orders showing up in our Redux store!
  </details>
- [ ] Also make sure to update the `waiting` reducer

### 9. Dispatching `fetchOrders`
- [ ] Dispatch the `fetchOrders` action from a `useEffect` hook in the `<OrderList>` component
  <details style="padding-left: 2em">
    <summary>Tip</summary>
    
    We'll need to import the `dispatch` hook and use it in the `<OrderList>` component.
  </details>

- [ ] Check your Redux devtools - can you see the orders?

### 10. Displaying the list of orders
- [ ] Update `<OrderList>` to display the `order` from the store
  <details style="padding-left: 2em">
    <summary>More about displaying orders from the store</summary>

    `<OrderList>` is expecting to have an `orders` array, but currently this is hardcoded to an empty array. We'll need to make use of `useSelector` to get the `orders` from the Redux store into the component, and then we should have a snazzy list of orders displaying on the page!
  </details>

---

## Updating order status
Amazing! There are all of our orders - but currently they're all pending. Let's give our users a way to let Sweet As Organics know when they've received their order, or to cancel their order if they make a mistake.

<details>
  <summary>Can we delete orders?</summary>
  
  Sweet As Organics wants to keep track of all orders, even cancelled ones, so rather than deleting the order, we'll just change its status to `cancelled`. Likewise, we can change the status to `completed` once an order has been received.
</details>
<br />

### 11. Creating routes for updating orders
- [ ] Create a PATCH route on our server side that uses `db.updateOrderStatus(id: number, newStatus: string)`
  <details style="padding-left: 2em">
    <summary>Tips</summary>

    * `updateOrderStatus` returns the updated order, which we can respond with
    * Test that our route works as we expect before hitting it from the client side
  </details>

- [ ] Create a client side `patchOrderStatus` function which makes the API call to that route, sending the new status and the id

### 12. Working with actions and reducers for updating orders

- [ ] Create an `updateOrderStatus` async action creator, which dispatches pending and success actions
  <details style="padding-left: 2em">
    <summary>Tips</summary>
  
    * The success action should have an `order` property, so we can update the `orders` array in `client/reducers/orders.ts`
    * Also make sure to update the `waiting` reducer
  </details>

- [ ] Dispatch the `updateOrderStatus` action from the `cancelOrder` and `completeOrder` click handlers on the `<Order>` component
  <details style="padding-left: 2em">
    <summary>Tip</summary>
    
    Use the strings `'cancelled'` and `'completed'` for the new statuses to change the status symbol colour for the order - the CSS is already in place!
  </details>

---

## Stretch

<details>
  <summary>More about stretch challenges</summary>

  Give the Sweet As team some admin rights - add the ability to add, remove or update a product.

  Write some tests! We've got the full stack available to us to test - write some that you feel you've had the least practice in.
</details>

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrtskvT4Q/viewform?usp=pp_url&entry.1958421517=sweet-as-organics-api)
