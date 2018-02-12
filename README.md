# Sweet As Beers

In this challenge you'll build part of a fictitious clearing house for beer - specifically the product listing and shopping cart pages.


## Setup

After cloning this repo

```sh
cd sweet-as-beers && yarn
yarn start
```

Make sure you can go to [http://localhost:3000/designs/listing.html](http://localhost:3000/designs/listing.html) and see the page. Any change to the server will cause a restart and any change to client code will rebuild `bundle.js`.


## Listing

The files that create the initial experience are `public/designs/listing.html` and `public/designs/cart.html` along with the associated CSS styles. Start with creating React components for the listing. This will probably translate to the following components:

* `<App />` (stateful: for navigation)
* `<Header />`
* `<Listing />` (stateful: for beers)
* `<BeerList />`
* `<BeerListItem />`

You might consider importing `data/beers.js` into the `Listing` component and passing the array into the `BeerList` component.

At this point, don't worry about making the link to the cart work or even using Redux. Just get the initial view working with components instead of static HTML.


## Cart

Now do the same _React componetisation_ exercise for `public/designs/cart.html`. This will probably mean the following components:

* `<Cart />` (stateful: for cart)
* `<CartList />` (`<table>`, `<thead>` and `<tbody>`)
* `<CartListItem />` (`<tr>`s)

Again, don't implement a Redux store, or any button actions at this point.


## Navigation

Now let's add the ability to navigate between the listing and the cart. Rather than using a client-side router, let's add a Redux store with an `activePage` property. The action creator for navigating between pages could look like this:

```js
export const navigate = target => {
  return {
    type: 'NAVIGATE',
    target // 'listing' or 'cart'
  }
}
```

Of course you'll need to create the associated `navigation` reducer as well. You can use this value in `<App />` to determine whether to show the `<Listing />` or `<Cart />`.


## Add to cart

Create an action creator for an `ADD_TO_CART` action that looks similar to this:

```js
export const addToCart = (id, name) => {
  return {
    type: 'ADD_TO_CART',
    id,
    name
  }
}
```

The items in the cart can be managed by a `cart` reducer, which probably makes sense as an array of beers and their quantities. This is the shape of a reasonable state for `cart`:

```js
[
  {
    id: 1,
    name: 'HBIB Ginger Fusion',
    quantity: 3
  }, {
    id: 2,
    name: 'Mangose & Melons',
    quantity: 1
  }
]
```

When the reducer is processing the `ADD_TO_CART` action, it should default to `1` for the quantity.


## Delete from cart

Create an action creator for a `REMOVE_FROM_CART` action that looks similar to this:

```js
export const removeFromCart = id => {
  return {
    type: 'REMOVE_FROM_CART',
    id
  }
}
```

Since this operates on the cart, our existing reducer will suffice - it just needs to know how to process this new action. Consider using `filter()` to remove the item from the new state.


## Update the cart

Create an action creator for an `UPDATE_QUANTITIES` action that looks similar to this:

```js
export const updateQuantities = cart => {
  return {
    type: 'UPDATE_QUANTITIES',
    cart
  }
}
```

And the `cart` argument we would pass to `updateQuantities` could have this shape:

```js
[{
  id: 1,
  quantity: 4
}, {
  id: 2,
  quantity: 6
}]
```

Again, our existing `cart` reducer can be used once you've taught it how the state changes when this action is dispatched.


## Stretch

Implement the **Checkout** button on the cart page. Have it go to a thank you page and store the items in the cart as a new `Order` (new reducer). On the thank you page, include a "Home" link so they can return to the listing. Verify your orders are being saved using the Redux DevTool.

On the listing page, add an _admin_ link that goes to a kind of Admin Portal used by Sweet As Beers to mark orders as fulfilled or cancelled. On this page, create 3 headers/sections: Pending, Cancelled, and Fulfilled. After a customer has checked out, their order should be in the _pending_ section. Next to each of these orders, provide buttons to `CANCEL_ORDER` and `FULFILL_ORDER`. When an order is cancelled, it should be moved to the cancelled section, and if fulfilled, moved to the Fulfilled section.

Hopefully this exercise has given you an opportunity to become more comfortable and confident with React and managing a store with Redux.

