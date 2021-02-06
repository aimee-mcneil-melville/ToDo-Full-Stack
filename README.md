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

## Release 1: Add an order 
implement the place order button from Cart

## Release 2: View your orders
orderList componentDidMount should get the orders and add them to the redux store

## Release 3: Update order
implement update order button

## Release 4: Delete orders
create and implement a cancel order button


## Stretch
Refactor some of the logic out of your components and into helper files. By pulling this logic out of components, we're making our code much easier to test, and keeping to the _single responsibility principle_.

Give the Sweet As team some admin rights - add the ability to add, remove or update a product.
