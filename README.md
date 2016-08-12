# Paws for Effect

This tutorial walks you through the basics of React development. By the end of it, you should have been exposed to:

 1. Creating simple components
 2. Using components inside other components
 3. Passing props to components
 4. Setting initial state on a component
 5. Using JavaScript expressions inside JSX.
 6. Using `Array.map` to display a series of components.


## Install

Fork the repo from https://github.com/dev-academy-challenges/react-paws-for-effect . There are a series of tutorials and challenges that use this code base, so it makes sense to have your own copy of it. The 'fork' button is at the top right of the page. Be sure to fork it to your own GitHub account, not the cohort's one!

Once you've done that, clone it down from your GitHub and:

```shell
npm install
npm start
```

This will start `webpack-dev-server`. If you navigate to http://localhost:8080 in your browser you should see a spinning paw.

![Spinning paw](screenshots/paw.png)


## The App component

If you take a look at `index.html`, you'll see there's a single div with the id `App`. It's just there for React to bind with. In `src/index.js`, we find this:

```js
import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App/>,
    document.getElementById('app')
  )
})
```

Plain ol' `DOMContentLoaded`, like in Phase 0. So to start our React app off, we listen to make sure that the DOM has been loaded by the browser before _rendering_ our components (making them show up on the page).

Take a look at `src/components/App.jsx`:

```jsx
export default React.createClass({
  render () {
    return (
      <div className="container">
        <img className="spinner" src="images/paw.png" />
      </div>
    )
  }
})
```

The only thing we have here is a `render` function. All it does is return some [markup](https://en.wikipedia.org/wiki/Markup_language), expressed as [JSX](https://jsx.github.io/). Instead of rendering a template, such as we do when using [Handlebars](https://handlebarsjs.com), we're dealing here with small chunks of the page at a time which are inserted into `index.html`.

