# Memory

For this challenge, you'll be making a basic Memory Game!

There is a grid of randomly arranged pairs. The end goal is to have each "tile" start hidden, and be visible temporarily when you select it. When you have revealed a pair of cells with the same value, you have found a match, and that pair should stay visible for the rest of the game. If you reveal 2 tiles that are NOT a match, they should flip back to being hidden. The Game is won when ALL pairs have been matched.

## Setup

After cloning this repo

```sh
yarn
yarn dev
```

and then go to [`http://localhost:3000`](http://localhost:3000).


### The requirements

* All cells should **start** hidden, and be **visible** upon a click event

* When a user has selected 2 tiles to reveal, your App must find whether the pair are a **match** or not. A Match will stay visible, a non-match will be hidden again.

* When all pairs are matched, the user is informed that they have won, and may restart the game.


### Some things to consider

When the 2nd Card is revealed and found to not be a match, you will want to inform the user that they didn't find a match. It would also be sensible to try and give the user several seconds to see their mismatched picks (on a timeOut), or allow the user to confirm (with a button) when they are ready to try again.

How do you know which Cards are **temporarily** visible? How do you know which Cards are **permanently** visible?

Do you store or information in the **Tile** objects, or separately within the `App.jsx` Components **state**?


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
