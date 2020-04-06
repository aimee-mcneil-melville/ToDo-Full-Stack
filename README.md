# (Broken) Kaleidoscope

This challenge is designed to help you get more comfortable with managing component state in React.

In case you've never played with one, here's what you might see if you looked into a kaleidoscope:

![Kaleidoscope](./kaleidoscope.jpg)

Ours is broken: it ain't gonna look that pretty! It will be *colourful*, however.


## Setup

Clone this repo, and:

```sh
cd broken-kaleidoscope
npm install
npm start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser. You'll see 'React development has begun!', just to confirm everything is working.


## Little steps: get something working

Create a component that only has one job: return a `<div>` using JSX.

Leave the `<div>` empty. You won't be able to see it, but you'll be able to check if it has been rendered using the inspect feature of your browser's development tools. You can call the component whatever you like. We like `<Pixel />` because it evokes the idea of a small colourful square, and that's what we're going to be working with: lots of colourful squares!

Place your `<Pixel />` component in the render method of `<App /` so that it'll make it into the DOM. Check that it exists in the devtools before moving on. It'll look like this:

![Stage 0](./stage0.jpg)


## Let there be colour

We need to see our component. For today, we'll make it visible by using the `style` JSX attribute. This directly corresponds to the `style` attribute on HTML elements, but instead of pure CSS syntax we use a JavaScript object. Here's an example:

```jsx
  <div style={{
    fontFamily: 'Times New Roman'
  }}
```

Notice three things about this sample:

 * the *first* set of curly braces indicates that we are using a JavaScript value in JSX
 * the *second* set of curly braces indicates an ordinary JavaScript object literal
 * instead of `font-family`, we use camelcase (`fontFamily`)

Using those same rules, add a `style` attribute on the `<div>` in your component that gives it:

 * a height
 * a width
 * a background colour

The height and width are necessary so that we can *see* the element when it's rendered to the DOM. The colour could be anything you like... use the HTML built-in colours like 'cornflowerblue', for example.

If you happened to choose that colour, here's what you'd see:

![Stage 1](./stage1.jpg)

Pretty exciting! Or not. But it gets better...


## Go forth and multiply

We're going to need more than one `<Pixel />` here. Go into your `<App />` component and add a bunch more of them. Go crazy. Add screeds and screeds. You'll end up with something like this:

![Stage 2](./stage2.jpg)

Oooooo... k? There sure are a lot of components, but it's kind of hard to distinguish between them. Let's fix that.


## State your business

To easily work with the values we use in the `style` JSX attribute, we should put them into component state. Define a constructor (don't forget to call `super`!) and set the initial value of `this.state`. It should have a `style` property on it which is an object suitable for use in the `style` JSX attribute.

Next, change your component JSX to refer to `this.state.style` instead of including an object literal. When you're done, there should be no change in the rendered output in your browser: it should work the same whether or not you have the style in state or in the JSX.

What you've just done is make your component more *flexbile*. We can now manipulate the values any way we'd like using `this.setState()`.


## Rainbow pixels

It's high time we stopped being so monochromatic. Let's give each of our components a randomised hex colour. There a number of examples on how to do this out there (try a search on 'random hex color') but the one we like is this (adapted from [this Stack Overflow comment](https://stackoverflow.com/questions/1484506/random-color-generator#comment81414569_5365036)):

> **Do not get bogged down in exactly how `randomHexColor` works!** It's no different to including a Node library in your program, like `fs` or `Knex`: you don't need to understand all the code it contains in order to use it. It's a good instinct to understand the code you put in your program, but we're giving you express permission to copy/paste this one. You can also try it out in the Node REPL to see it in action.

```js
const randomHexColor = () =>
  `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, 0)}`
```

You can place the above in your `<Pixel />` component. When you've done that, edit the constructor to change the definition of `style` so that it uses the new function to generate a random hex colour (rather than a string like 'cornflowerblue' or 'red').

When you refresh the page, what you're aiming for is something like this:

![Stage 3](./stage3.jpg)

That's more like it!


## In a state of flux

Usually we define state on our components because *we expect that state to change*. State makes it easier to update our components in response to what the user is doing. 

We can illustrate this by responding to some *events*. Here's how it'll go:

 * user triggers an event (say by clicking the mouse on one of our components)
 * our *event handler* function is called
 * we update the component's state to change its appearance in some way

 In your component, define an *event handler*. Use the event handler to change the component's colour to another random colour. It will look like this:

 ```js
 clickHandler = evt => {
   this.setState({
     // ... update style here ...
   })
 }
 ```

Finally, add an `onClick` attribute to your JSX that calls `this.clickHandler` whenever the component is clicked. Check your work in the browser: you should see the `<Pixel />`s change colour when you click on them.

> Don't forget to look in the JavaScript console in your devtools to see any errors that might be occurring, especially if the result you see is not what you expected.


## Eventful experiments

Play! Define a bunch of different event handlers and in each one do something different to the component when it triggers. Want a list? Try:

 * **onMouseEnter**: turn the components green as you pass the mouse over them
 * **onContextMenu**: turn the components black as you right-click on them (hint: checkout `evt.preventDefault()` and `onContextMenu`)
 * **onDoubleClick**: turn the components white
 * **onDragEnter**: turn the components yellow as you click and drag through them


## Hi-res

Time to crank up the resolution. React is capable of handling plenty of components on the screen at once, so let's test it out a bit. Back in your `<App />` component, instead of manually pasting in `<Pixel />`s like this:

```js
  return (
    <div>
      <Pixel />
      <Pixel />
      <Pixel />
    </div>
  )
```

try returning an *array* of components, like so:

```js
  return [
    <Pixel />,
    <Pixel />,
    <Pixel />
  ]
```
> The ability to return an array of JSX components was introduced with React 16.

Ok, so if we can return an array of components, presumably we can automatically generate an array full of `<Pixel />`s and return that. Create an array containing 100,000 copies of `<Pixel />`. Turn the width and height of the component down to, say, 3 so you'll be able to fit them on the screen!

> Hint: look up the MDN documentation for [the `Array.from()` syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Using_arrow_functions_and_Array.from), especially the syntax with `{ length: ... }` specified. You can also use an ordinary `for` loop.

You should see something that looks a bit like this:

![Stage 4](./stage4.jpg)

Depending on your computer, you may find that takes several seconds (sometimes 10 or 15) to render. We're pushing React to the limit by rendering so many components at once! If 100,000 components doesn't fill your browser screen, try 200,000! You can also turn the pixel size down to 1 just to see what'll happen, but be warned you'll need a *lot* of components to come close to filling the browser. Don't blame us if your browser stops responding...


## Stretch ideas

 * reduce the number of components rendered to something reasonable (500-1000) and try changing their colour on a timer every two seconds or so (hint: `setInterval`)
