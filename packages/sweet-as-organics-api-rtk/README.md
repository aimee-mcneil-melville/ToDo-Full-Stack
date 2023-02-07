# Sweet As Organics

The Sweet As team have diversified! They are now selling a variety of organic foods, but have this time chosen to store their stock data in a database.

## Setup

After cloning this repo

```sh
cd sweet-as-organics-api-rtk
npm install
npm run knex migrate:latest
npm run knex seed:run
npm run dev
```

Check that everything is running on [localhost:3000](http://localhost:3000). The app should look quite familiar, but let's check out how it differs from Sweet As Beers.

## Understanding the codebase
This is the first time we've seen the full stack in play, redux toolkit included. With some features already complete, the code base is bigger than it has been in previous challenges.

Take some time to familiarise yourself with how it's all working together by exploring the `ProductList` component, specifically how the array of products is being retrieved from our API and stored in Redux. Feel free to step through it yourself if you're feeling confident/up for a challenge, or:

<details><summary>Try exploring these things:</summary>

* How the `products` getting on to `ProductList` component.
* How that `products` array gets into the Redux store in the first place. What's happening in `ProductList`'s `useEffect` method?
* Check out that `fetchProducts` async action creator. It calls a `getProducts()` function asynchronously. What does that function do?
* On our server side, we have `/api/v1/products` GET route that uses a DB function - you could fire up a tool like Postman or Insomnia to see if this route works like you expect. What is the shape of the data returned?
* Follow the path back to the client side. How does the `products` data get back to that `fetchProducts` async action creator? What happens to the data then?
* Check out the `extraReducers` in `productsSlice`. What does `fetchProducts.fulfilled` return?
* Open your Redux devtools, and as you refresh the Shop (ProductList) page, see how those dispatched actions update the store state. Can you confirm that understanding by taking a look at the slices?
* What does setting the `waiting` state do in terms of UI? Using the timeline slider at the bottom of your Redux devtools is a good way to see how the UI is changing based on different actions.
* Notice `waiting` slice is watching for an action type that ends with `pending`, `fulfilled` or `rejected`.

</details>

<br>

Both the Shop and Cart pages are completed, with their data managed in the Redux store.

Your job will be to implement the functionality for the `My Orders` page. The React components and the database functions are already in place, so you'll be working with the stuff in the middle - Redux, API calls with Superagent and server side routes.

## Add an order
Once a user has their cart ready, they should be able to place their order with Sweet As Organics. Let's get the Place Order button working in `Cart`.

A potential approach could be:

### 1. Creating order routes

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

### 2. Creating the order API on the client side

- [ ] Add a `client/api/orders.ts` file, and create a `postOrder` function that uses `superagent` to make a POST request to the route you just made. (Remember it's going to need to send some order data)

### 3. Working with redux toolkit to place an order

- [ ] Create a `client/slices/orders.ts` file and use `createAsyncThunk` to hold your new async action creator. Call it `placeOrder`. 
  <details style="padding-left: 2em">
    <summary>Tips</summary>

    Think about what what we're going to need the async action creator to do. Take a look at some of the other slice files for inspiration if you need.
    * What do you need to import into your file?
    * For your async action creator the first parameter will be the name of the action creator, perhapse `orders/placeOrder`.
    * The second parameter will be an `async` function that takes in `cart` as a parameter.
   * Then use the `postOrder` function from `client/api/orders.ts` to make the POST request.
    * We know our route only sends back a `201` status, so we won't have any data to deal with when the `postOrder` promise resolves.
  </details>

- [ ] Create a slice for orders which uses your placeOrder async action creator.
  <details style="padding-left: 2em">
    <summary>Tips</summary>
    
    Think about what you need to put in your slice.
    * What is the intial state?
    * Add the fulfilled state of placeOrder to the extraReducers.
    * Don't forget to export the reducer and the async action.
    * Add the reducer to the `store`
  </details>
  
- [ ] For the final piece of the puzzle, let's dispatch this `placeOrder` action from the `Cart.tsx` Dispatch it within a submit handler function – and don't forget to pass in the `cart`!).
- [ ] Try it! Add something to your cart and place your order. Can you see the pending and success actions in your Redux devtools? Has your order been added to the database?

### 4.Emptying the Cart

- [ ] Notice that even when placing the order occurs successfully, the cart doesn't empty. When a user starts shopping again, they would have to manually remove the previous order items from their cart, or end up with double ups! Perhaps the `cart` reducer could also be watching for a `placeOrder.fulfilled` action?
- [ ] It would also be great to navigate the user to the My Orders page once their order had been placed. However, we'd only want to redirect if the API call succeeds.
  <details style="padding-left: 2em">
    <summary>Tips</summary>
  * Use `unwrap()` on the `dispatch` function and then chain it with a `.then()` and a `catch()` as below:
   ```js
    dispatch(myAsyncActionCreator())
      .unwrap() // 👈
      .then((value) => ...)
      .catch(error => ...)
  ```
  
  * Here is a link to [Redux-toolkit](https://redux-toolkit.js.org/api/createAsyncThunk#unwrapping-result-actions) explaining error handling when dispatching async actions from the UI.
  </details>

## View your orders
We've placed an order (WOO!)... but we need a way to see all the orders we've placed! This flow should be very similar to the `fetchProducts` for the Shop (ProductList) page.

### 5. Setting up the orders API

- [ ] Create a new GET route in `server/routes/orders.ts` that uses `db.listOrders()`
  <details style="padding-left: 2em">
    <summary>Tips</summary>

      * This db function returns an array of orders.
      * Test your route works as you expect before moving on.
    </details>

- [ ] Create a `getOrders` function in `client/api/orders.ts` to make the API call to your new route.

### 6. Working with Redux Toolkit to get all orders
- [ ] Create a `fetchOrders` async action creator that calls the `getOrders` function.
- [ ] Create a new `orders` slice, which can watch for the `fulfilled` promise state and set the store state to the new `orders` array. 
    <details style="padding-left: 2em">
    <summary>Tip</summary>

      * Be sure to import this new reducer into `client/store.ts` and use it inside the `configureStore reducer` object.
    </details>

### 7. Dispatching fetchOrders    
- [ ] Dispatch the `fetchOrders` action from a `useEffect` hook in `OrderList.jsx`. You'll need to import the `dispatch` hook and use it in the OrderList component.
- [ ] Check your Redux devtools - can you see the orders?

### 8. Displaying the list of orders
- [ ] Update <OrderList> to display the order from the store
    <details style="padding-left: 2em">
    <summary>Tip</summary>

      * `OrderList.tsx` is expecting to have an `orders` array, but currently this is hardcoded to an empty array. You'll need to make use of `useAppSelector` to get the `orders` from your Redux store into the component, and then we should have a snazzy list of orders displaying on the page!
    </details>

## Update order status
Amazing! There are all of our orders - but currently they're all pending. Let's give our users a way to let Sweet As Organics know when they've received their order, or cancel their order if they make a mistake.

Sweet As Organics wants to keep track of all orders, even cancelled ones, so rather than deleting the order, we'll just change its status to `cancelled`. Likewise, we can change the status to `completed` once an order has been received.

### 9. Creating routes for updating orders
- [ ] Create a PATCH route on your server side that uses `db.editOrderStatus(id: number, newStatus: string)`.
    <details style="padding-left: 2em">
    <summary>Tip</summary>

      * `editOrderStatus` returns the updated order, which you can respond with.
      * Test your route works as you expect before hitting it from the client side.
    
    </details>
- [ ] Create a client side `patchOrderStatus` function which makes the API call to that route, sending the new status and the id.

### 10. Working with Redux Toolkit to update orders
- [ ] Create and use an `updateOrderStatus` async action creator in `client/slices/orders.ts` which updates the `orders` array.
- [ ] Dispatch your `updateOrderStatus` action from the `cancelOrder` and `completeOrder` click handlers in `Order.tsx`.
    <details style="padding-left: 2em">
    <summary>Tip</summary>

      * use the strings `'cancelled'` and `'completed'` for the new statuses to change the status symbol colour for the order - the CSS is already in place!
    
    </details>

## Stretch: Use this challenge to complete your Trello assessment  (WD03 - Frontend: Create a rich client application using a modern frontend JavaScript framework)

Now it's time to put all of what we've learned and implement a new feature that covers the web full-stack. To pass the Trello you need to add:
* A new Database table or column
* Database functions which read and write to your new table or column
* That Data needs to be accessed and altered via a JSON API
* Redux is used to manage storing data on the front end
* Either a new React component or modify an existing component so you can display the data and allow users to alter data via API

What you'll need:
* Create a new table in the database, this could be anthing you would like i.e add the country of origin for the products, profile page or anything that will help you create a new DB table that you can read and write to!
* You'll need to think back to week 5 and other weeks to implement the server-side. Remember `routes` and `db` functions? And our good friend insomnia to test our route functions? Will you need to use any `joins` in your `db` functions?
* What about the client-side? Remember now we consume `apis`? Do you need a new api or slice file?
* You can start implementing what you've learned about Redux and Thunk. Follow what you have already implemented to inform how you will complete this.
* Do you need to make a new `React` component? Will you use `useEffect` and `useState`?

Write some tests! You've got the full stack available to you to test - write some that you feel you've had the least practice in.
