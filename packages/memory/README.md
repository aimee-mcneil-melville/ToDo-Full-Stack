# Memory

For this challenge, you'll be applying your understanding of React state and the useState hook to make a basic Memory Game!

## Setup

### 0. Cloning and installation

- [ ] Clone this repo, navigate to it, install packages, and start the server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

  ```sh
  cd memory
  npm i
  npm run dev
  ```

  </details>

- [ ] Visit [http://localhost:3000](http://localhost:3000) in your browser
- [ ] Install React DevTools for your browser (if you haven't already)
<details style="padding-left: 2em">
  <summary>More about React DevTools</summary>
  
  If you don't already have it installed, you should install the React DevTools browser extension ([Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) and [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)). This will add a tab in Developer Tools that will allow you to explore the [virtual DOM](http://tonyfreed.com/blog/what_is_virtual_dom) used by React.
</details>

---

## Requirements

There are a LOT of ways to finish this game. If you would like to have a go on your own, with very little guidance, go for it! Work through only section 1.

Or, you can use the more detailed guidance starting at section 2. Just be aware that the detailed approach is only one of many, and it does have a specific opinion about how and where certain state properties live.

### 1. Minimum viable product (MVP)

- [ ] All tiles should start out hidden, and become visible when clicked

- [ ] The user will select 2 tiles to reveal. If they match, they will stay visible. If they don't match, they will be hidden again after about 1 second

- [ ] When all pairs are matched, the user is informed that they have won, and may restart the game

---

## Step-by-step guidance

**If you've already completed section 1, no need to continue!**

But if you're looking for a bit more direction, read on.

### 2. Getting familiar with the existing code

- [ ] Examine the `<App>`, `<Board>` and `<Tile>` components
  <details style="padding-left: 2em">
    <summary>More about the components</summary>

  There are currently 3 components: `<App>`, `<Board>` and `<Tile>`. We'll manage some state in `<App>` and some in `<Board>`. We can get away with not using state in `Tile`. Yes, there are many options for how to manage state in this game. We'll choose one that will hopefully be easiest for everyone to understand.

  Spend some time to understand exactly how the current code works.
  </details>

### 3. Hiding tiles by default

- [ ] Using the `isVisible` property of the `<Tile>` component, hide the tiles by default
  <details style="padding-left: 2em">
    <summary>More about hiding the tiles</summary>

  Right now all the tiles are visible by default. But you'll notice the `isVisible` properties in `startingTiles.ts` are all set to `false`. Use the `&&` operator to conditionally show the value of the tile when `isVisible` is `true`.
  </details>

### 4. Displaying a tile when clicked

- [ ] When a `<Tile>` is clicked, display it, using state and an event handler on the `<Board>` component
  <details style="padding-left: 2em">
    <summary>More about showing the <code>&lt;Tile&gt;</code></summary>

  We'll use the `<Board>` component to keep track of the 2 tiles the user has flipped and if they match. But first, let's focus on changing the `isVisible` prop on the `<Tile>` component when it is clicked. Because we're maintaining the state for the selected tiles in `<Board>`, our `onClick` event handler needs to be in the `<Board>` component. Pass it to `<Tile>` as a prop.

  For now, the event handler should do 3 things:

  1. Find the tile object in the tiles array. You'll need to pass something (the `id` or the whole object) into the event handler from the `<Tile>` component
  2. Change the `isVisible` property of the tile object to `true`
  3. Set a `tile1` state property to the tile object. Of course you'll also need to define this state property in the `<Board>` component
  </details>

### 5. Hiding unmatched tiles after 1 second

- [ ] Handle an unmatched pair of flipped tiles
  <details style="padding-left: 2em">
    <summary>More about unmatched pairs</summary>

  After the user has clicked on the second tile, we want to hide them after 1 second. Now our event handler needs to know if the user has clicked their first or second tile. If the event handler is responding to the second tile, it should:

  1. Set the object as the value for a `tile2` property on state
  2. Compare the `value` property of each of the selected tiles
  3. If they match, send the 2 tiles to a `evalMatch` function passed from `App` as a prop
  4. If they don't match, use `setTimeout` to wait 1 second before doing the previous step
  5. Set the `tile1` and `tile2` state properties back to `null`

  Tip: Updating state is asynchronous.
  </details>

### 6. Evaluating the selected pair

- [ ] Track matched pairs and whether the game is complete
  <details style="padding-left: 2em">
    <summary>More about evaluating pairs</summary>

  The `<Board>` component only keeps track of which tiles have been clicked. It's the `App` component that tracks how many matches have been made.
  </details>

---

## Further reading

<details>
  <summary>More reading</summary>

- [React Component](https://17.reactjs.org/docs/components-and-props.html#function-and-class-components)
- [`ReactDOM.render`](https://17.reactjs.org/docs/components-and-props.html#rendering-a-component)
- [React State and Lifecycle](https://17.reactjs.org/docs/state-and-lifecycle.html)
- [React's `useState`](https://reactjs.org/docs/hooks-reference.html#usestate)
- [React's `setState`](https://17.reactjs.org/docs/react-component.html#setstate)
- [Handling Events in React](https://17.reactjs.org/docs/handling-events.html)
- [React TestUtils](https://17.reactjs.org/docs/test-utils.html)
</details>

---

[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=memory)
