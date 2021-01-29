# Sweet As Beers

In this challenge you'll build part of a fictitious clearing house for beer - specifically the product listing and shopping cart pages.


## Setup

After cloning this repo

```sh
cd sweet-as-beers && npm i
npm run dev
```


## Starting place

* All of the React components are in place.
* You can find the beer data in `data/beers.js`.
* Redux has been installed, but not yet configured.
* The `actions` and `reducers` folders have been created, but no actions or reducers have been created yet.
* The beer listing displays the beers, but the _Add to cart_ link doesn't do anything yet.

Before we jump into the code editor, let's do some thinking about what we need to accomplish.


## Shape of the store

One of the important tasks when working with Redux is to design the shape of the store. If we think about the type of data that will be changing in this app, there are 2 clear pieces of changing data that multiple components will use:

1. The contents of the cart as an array of cart item objects
2. The user's active page (React Router is a more appropriate choice to manage navigation, but let's use Redux instead because we need the practice)

Given that, our Redux store needs to look similar to this:

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
  activePage: 'listing' // or 'cart'
}
```

Now we have a clear understanding about what reducers we'll be creating below. But what about the actions our reducers should respond to?


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


## Navigation

Let's add an `activePage` property to our Redux store. The action creator for navigating between pages could look like this:

```js
export const navigate = target => {
  return {
    type: 'NAVIGATE',
    target // 'listing' or 'cart'
  }
}
```

Of course you'll need to create the associated `navigation` reducer as well. You can use this value in `<App />` to determine whether to show the `<Listing />` or `<Cart />`.


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

