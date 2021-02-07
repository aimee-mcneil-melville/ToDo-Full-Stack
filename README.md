# Sweet As Organics

The Sweet As team have diversified! They are now selling a variety of organic foods, but have this time chosen to store their stock data in a database.

## Setup

After cloning this repo

```sh
cd sweet-as-organics-api
npm install
npm run knex migrate:latest
npm run knex seed:run
npm run dev
```

Check that everything is running on [localhost:3000](http://localhost:3000). The app should look quite familiar, but let's check out how it differs from Sweet As Beers.

## Release 0: Understanding the codebase
This is the first time we've seen the full stack in play, redux included, and the code base is bigger than it has been in previous challenges. Take some time to familiarise yourself with how it's all working together by exploring the `ProductList` component, and how the array of products is being retrieved from our API and stored in Redux. Feel free to step through it yourself if you're feeling confident/up for a challenge, or:

<details><summary>Give me the play by play</summary>

* `ProductList` is using `mapStateToProps` to take the `products` array from our global Redux store and add those products to its props. It is then mapping over the `products` array and rendering a `ProductListItem` for each one. Cool... how are the products getting into the Redux store?
* Because the products are stored in a database, we need to make an API call to retrieve them. This gets kicked off in `ProductList`'s `useEffect()` method, where we dispatch `fetchProducts()`.
* Let's check out that action creator - we're importing it into our component from `client/actions/products.js`. `fetchProducts()` is an _async action creator_. It returns a function rather than an object, which means we're making use of the `redux-thunk` middleware. It first dispatches the action from `fetchProductsPending()`. In our Redux devtools, we can see that this action is setting the `waiting` state to `true`, which we can confirm by taking a look at `client/reducers/waiting.js`. That causes our loading indicator to render, so our users get some feedback that the products are on their way. 
* Then the `getProducts()` function is called, which is from `client/api/products.js`. In there, we can see we're using `superagent` to make a GET request to `/api/v1/products`.
* This hits our products GET route in `server/routes/products.js`. We're then calling the `listProducts` function from `server/db/products.js`, which returns an array of all of the items in the `products` database table. In the route, we `res.json` back to the client side.
* `getProducts()` (in `client/api/products.js`) returns the body of the HTTP response back to our `fetchProducts()` action creator. With the resulting `products` array, we then dispatch the action from `fetchProductsSuccess`. 
* From the Redux devtools, we can see that this updated both the `waiting` state to false (so the wait indicator becomes hidden again) and puts the products array we just retrieved into the `products` state. Both the `products` and `waiting` reducers are watching for an action type of `FETCH_PRODUCTS_SUCCESS`, so those two different parts of the Redux store state get updated from the one action!
* Note: There is also a `.catch()` block which would dispatch an error action if something went wrong with our API call. The `ErrorMessage` component will render to let the user know that something is amiss.

</details>

<br>

Both the Shop and Cart pages are completed, with their data managed in the Redux store. _It may be worth noting that unlike in Sweet As Beers, an `UPDATE_CART` action is being dispatched from the onChange handler (every time the user types) in `CartItem`, rather than storing the updated values in component state and dispatching on a button click. Also, we're using React Router again, rather than managing the page state in Redux._

Your job will be to implement the functionality for the My Orders page. The React components and the database functions are already in place, so you'll be working with the stuff in the middle - Redux, API calls with Superagent and server side routes.

## Release 1: Add an order
Once a user has updated their cart to how they would like it to look, they should be able to place their order with Sweet As Organics. Let's get the Place Order button working in `Cart`.

A potential approach could be:
* Start on the server side. Create a new routes file (`server/routes/orders.js`) and configure `server/server.js` to use it with an `/api/v1/orders` prefix.
* Create a new POST route that uses the `addOrder` function from `server/db/orders.js`.
  * `addOrder` accepts an order in the same shape as the `cart` in Redux on our client side (meaning you shouldn't need to reformat the cart data).
  * It returns null, so it would make sense for your route to simply respond with a status of `201` (`Created`).
* Test your route works as expected with a tool like Postman or Insomnia before continuing to the client side. You may need to also browse your `dev.sqlite3` file to ensure your order is being inserted. You should see rows added to both the `orders` and `orders_products` tables.
* Moving on to the client side, add a `client/api/orders.js` file. Create a `postOrder` function that uses `superagent` to make a POST request to the route you just made. (Remember it's going to need to send some order data.)
* Using `client/actions/products.js` for inspiration, create a `client/actions/orders.js` file to hold your new action creators. Think about what you're going to need the `placeOrder` async action creator to do.
  * First, it should dispatch a pending action, so the user gets feedback that something is happening.
  * Then we'll need to call the `postOrder` function from `client/api/orders.js`. Seeing as that function accepts an order (which it sends to the server), we're going to need to pass one in. To be able to do that, our `placeOrder` action creator is also going to need to accept an order as an argument (we'll pass it in when we dispatch the action from `Cart.jsx`).
  * We know our route only sends back a `201` status, so we won't have any data to deal with when the `postOrder` promise resolves.
  * We should still dispatch a success action though, so our wait indicator stops spinning.
  * A catch block is always a good idea ;)
* It looks like the only part of the Redux store that cares about these `placeOrder` actions is the `waiting` state - update the `waiting` reducer so it sets the ` state to `true` and `false` appropriately.
* For the final piece of the puzzle, let's dispatch this `placeOrder` action from the `Cart.jsx` Place Order submit handler (remember to pass in the `cart`).
* Try it! Add something to your cart and place your order. Can you see the pending and success actions in your Redux devtools? Has your order been added to the database?

<br> 

* Notice that even when placing the order occurs successfully, the cart doesn't empty. When a user starts shopping again, they would have to manually remove the previous order items from their cart, or end up with double ups! Perhaps the `cart` reducer could also be watching for a `PLACE_ORDER_SUCCESS` action?
* It would also be great to redirect the user to the My Orders page once their order had been placed. However, we'd only want to redirect if the API call succeeds.
  * The `dispatch` function doesn't have a `.then()`, because it doesn't expect actions to be async. If we want to redirect after the order is placed, we'll need to do so inside the `.then()` in the `placeOrder` action creator.
  * You could pass `props.history` into the action creator, along with the `cart`, and push onto it after you dispatch the success action.

## Release 2: View your orders
We've placed an order (WOO!)... but we need a way to see all the orders we've placed! This flow should be very similar to the `fetchProducts` for the Shop (ProductList) page. 

You'll need:
* A new GET route in `server/routes/orders.js` that uses `db.listOrders()`.
  * This db function returns an array of orders, which you can `res.json` back to your client side.
  * Test your route works as you expect before moving on.
* A `getOrders` function in `client/api/orders.js` which makes an API call to that route with Superagent.
* A `fetchOrders` async action creator, which dispatches pending and success actions, and calls the `getOrders` function.
* A new `orders` reducer, which can watch for the `FETCH_ORDERS_SUCCESS` action and set the store state to the new `orders` array. 
  * Be sure to import this new reducer into `client/reducers/index.js` and use it inside the `combineReducers` so we get some orders showing up in our Redux store!
* Also make sure to update the `waiting` reducer.
* Dispatch your `fetchOrders` action from a `useEffect` hook in `OrderList.jsx`. You'll need to connect the OrderList component to access the `dispatch` function. Check your Redux devtools - can you see the orders?
* `OrderList` is expecting to find an `orders` array on its props. You'll need to do a `mapStateToProps` to get the `orders` from your Redux store into the component, and then we should have a snazzy list of orders displaying on the page!

## Release 3: Update order status
Amazing! There are all of our orders - but currently they're all pending. Let's give our users a way to let Sweet As Organics know when they've received their order, or cancel their order if they make a mistake.

Sweet As Organics wants to keep track of all orders, even cancelled ones, so rather than deleting the order, we'll just change its status to `cancelled`. Likewise, we can change the status to `completed` once an order has been received.

You'll need:
* A PATCH route on your server side that uses `db.editOrderStatus(id: Number, newStatus: String)`.
  * You can decide whether you'd prefer to get the `id` from `params` or as part of the `req.body`.
  * `editOrderStatus` returns the updated order, which you can respond with.
  * Test your route works as you expect before hitting it from the client side.
* A client side `patchOrderStatus` function which makes the API call to that route, sending the new status (and the id in whichever way you chose).
* An `updateOrderStatus` async action creator, which dispatches pending and success actions.
  * The success action should have an `order` property, so you can update the `orders` array in `client/reducers/orders.js`.
  * Also make sure to update the `waiting` reducer.
* Dispatch your `updateOrderStatus` action from the `cancelOrder` and `completeOrder` click handlers in `Order.jsx`. You'll need to connect `Order` to the redux store.
* _Tip: use the strings `'cancelled'` and `'completed'` for the new statuses to change the status symbol colour for the order - the CSS is already in place!_


## Stretch
Give the Sweet As team some admin rights - add the ability to add, remove or update a product.

Write some tests! You've got the full stack available to you to test - write some that you feel you've had the least practice in.