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
This is the first time we've seen the full stack in play, and the code base is bigger than it has been in previous challenges. Take some time to familiarise yourself with how it's all working together by exploring the `ProductList` component, and how the array of products is being retrieved and stored by the `getProducts` function from `client/coordinators/products.js`. Feel free to step through it yourself if you're feeling confident/up for a challenge, or:

<details><summary>Give me the play by play</summary>

* `ProductList` is using `mapStateToProps` to take the `products` array from the global Redux store and add those products to its props. (We could confirm this by opening up the Redux devtools in our browser and viewing the products array in the state). In the `render` method, `ProductList` is mapping over the `products` array and rendering a `ProductListItem` for each one. Cool! But how are the products getting into the Redux store?
* Because the products are stored in a database, we need to make an API call to retrieve them. This gets kicked off in `ProductList`'s `componentDidMount` function. Here, we're pulling some dispatchers from props and passing them into a `getProducts` function... where are those dispatchers coming from?
* `ProductList` is using `mapDispatchToProps` to create the dispatchers. There are two ways you can define `mapDispatchToProps` - we're doing it here is as an object of action creators (which we imported at the top of the file). When we pass this object into `connect`, it creates a function for each action creator that, when called, will call the action creator (with any arguments passed in if needed) and then dispatch the resulting action. These functions get added to `ProductList`'s props, and will have the same name as the action creator. Phew!
* Let's check out that `getOrders` function - we're importing it into our component from `client/coordinators/products.js`. It first calls the fetchProductsPending dispatcher, which will dispatch the action `{ type: 'FETCH_PRODUCTS_PENDING' }` created in `client/actions/products.js`. In our Redux devtools, we can see that this action is setting the `waiting` state to true, which we can confirm by taking a look at `client/reducers/waiting.js`. That causes our loading indicator to render, so our users get some feedback that the products are on their way. 
* Then the `consume` function is called, with `'/products'` passed in. `consume` is a superagent request builder, you can take a look at it in `client/consume.js`. Because we only passed in one parameter (the endpoint: `'/products'`), consume will default to making a GET request, and we also haven't passed any data to send in the request. 
* This hits our products GET route in `server/routes/products.js`, which is calling the `listProducts` function from `server/db/products.js`. That returns an array of all of the items in the `products` database table, which we `res.json` back to the client side.
* `consume` returns the HTTP response directly back to the `getProducts` coordinator, where we are pulling the products array from `res.body` and calling the `fetchProductsSuccess` dispatcher with those products. From the Redux devtools, we can see that this dispatched the success action from `client/actions/products.js`, which updated both the `waiting` state to false (so the wait indicator becomes hidden again) and inserts the products array in to the `products` state. Both the `products` and `waiting` reducers are watching for an action type of `FETCH_PRODUCTS_SUCCESS`, so those two different parts of the Redux store state get updated from the one action!

</details>

<br>

Take a look at the cart coordinators as well - `addCartItem` is being called from the Add To Cart button onClick function in `ProductList` and `updateCartItem` is called in `CartItem` in the quantity onChange function. 

You may have noticed that a lot of the _event handling_ is now being managed by a coordinator, whether it's making async calls to the server side or just updating the Redux store (like the coordinators in `client/coordinators/cart.js` are doing). By pulling this logic out of our components, we're making our code much easier to test, and keeping to the _single responsibility principle_.

Note: The `deleteFromCart` onclick function in `Cart.jsx` isn't using a coordinator - this is because the only thing it does is call the dispatcher, it's not implementing any other logic that we might want to test.


## Release 1: Add an order 
implement the place order button from Cart

## Release 2: View your orders
orderList componentDidMount should get the orders and add them to the redux store

## Release 3: Update order
implement update order button

## Release 4: Delete orders
create and implement a cancel order button
