# Memory

For this challenge, you'll be applying your understanding of React state and the useState hook to make a basic Memory Game!

There are a LOT of ways to finish this game. If you would like to have a go on your own, with very little guidance, go for it! If you'd like to follow the approach defined below, that's cool too. Just be aware that the approach below is just one of many, but it does have a specific opinion about how and where certain state properties live.


## Setup

After cloning this repo

```sh
npm install
npm run dev
```

and then go to [`http://localhost:3000`](http://localhost:3000).


### The requirements

* All tiles should start out hidden, and become visible when clicked.

* The user will select 2 tiles to reveal. If they match, they will stay visible. If they don't match, they will be hidden again after about 1 second.

* When all pairs are matched, the user is informed that they have won, and may restart the game.


### Release 0: Get familiar with the existing code

There are currently 3 components: `App`, `Board` and `Tile`. We'll manage some state in `App` and some in `Board`. We can get away with not using state in `Tile`. Yes, there are many options for how to manage state in this game. We'll choose one that will hopefully be easiest for everyone to understand.

Spend some time to understand exactly how the current code works.


### Release 1: Hide tiles by default

Right now all the tiles are visible by default. But you'll notice the `isVisible` properties in `startingTiles.js` are all set to `false`. Use the `&&` operator to conditionally show the value of the tile when `isVisible` is `true`.


### Release 2: Display a tile when clicked

We'll use the `Board` component to keep track of the 2 tiles the user has flipped and if they match. But first, let's focus on changing the `isVisible` prop on the `Tile` component when it is clicked. Because we're maintaining the state for the selected tiles in `Board`, our `onClick` event handler needs to be in the `Board` component. Pass it to `Tile` as a prop.

For now, the event handler should do 3 things:

1. Find the tile object in the tiles array. You'll need to pass something (the `id` or the whole object) into the event handler from the `Tile` component.
2. Change the `isVisible` property of the tile object to `true`.
3. Set a `tile1` state property to the tile object. Of course you'll also need to define this state property in the `Board` component.


### Release 3: Hide unmatched tiles after 1 second

After the user has clicked on the second tile, we want to hide them after 1 second. Now our event handler needs to know if the user has clicked their first or second tile. If the event handler is responding to the second tile, it should:

1. Set the object as the value for a `tile2` property on state.
2. Compare the `value` property of each of the selected tiles.
3. If they match, send the 2 tiles to a `evalMatch` function passed from `App` as a prop.
4. If they don't match, use `setTimeout` to wait 1 second before doing the previous step.
5. Set the `tile1` and `tile2` state properties back to `null`.

Tip: Updating state is asynchronous.


### Release 4: Let `App` evaluate the selected pair

The `Board` component only keeps track of which tiles have been clicked. It's the `App` component that tracks how many matches have been made.







### Resources

If you don't already have it installed, you should install the React DevTools browser extension ([Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) and [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)). This will add a tab in Developer Tools that will allow you to explore the [virtual DOM](http://tonyfreed.com/blog/what_is_virtual_dom) used by React.

And some more:

* [React Component](https://facebook.github.io/react/docs/reusable-components.html#es6-classes)
* [React Component API](https://facebook.github.io/react/docs/component-api.html)
* [How State Works](https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#how-state-works)
* [React's `setState`](https://facebook.github.io/react/docs/component-api.html#setstate)
* [React Event Handling](https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#a-simple-example)
* [`ReactDOM.render`](https://facebook.github.io/react/docs/top-level-api.html#reactdom.render)
* [React TestUtils](https://facebook.github.io/react/docs/test-utils.html)
