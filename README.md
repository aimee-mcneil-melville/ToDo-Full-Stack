# Modules, First-class functions, Strings and Numbers


## Part 1: Kata : strings and numbers

In this kata we'll going to write our own `filter` and `map` functions again. Then use them to filter and map an array of strings. Now, you have probably noticed that JavaScript already has these methods attached to the Array object:

 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
 * [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 


So why are we going to rewrite them? There's a couple of reasons. The first is that by rewriting them we deepen our understanding of what's going on when we call these functions. Second, we're going to write them in a way that has advantages which we'll get to later. Third, we're going to package up our functions into our own npm package and learn about how the **n**ode **p**ackage **m**anager works.


Our map and filter functions will themselves accept **functions as parameters**. This is one of the interesting features of Javascript - we can pass functions into other functions, where the enclosing function will call them. If this is unfamiliar try out the following code in the browser and talk through it with someone: 

```js 
function boss (subord) {
  console.log('I am the boss function')
  subord()
}

function subordinate () {
  console.log('I am the subordinate function')
}

boss(subordinate)
```

The other difference is that instead of just using `console.log()' to test our code, we'll use our own "assert" function to make this prettier and easier, and "require" it into the main file. Take a look in `utils/assert.js`:

```js
var colors = require('colors')
var emoji = require('node-emoji')

module.exports = function (actual, expected, message) {
  if (actual === expected) {
    console.log(emoji.get('white_check_mark').green, message.green)
  } else {
    console.log(emoji.get('negative_squared_cross_mark').red, message.red)
  }
}
```

Then the top of the `app/main.js` file:

```js
var assert = require('../utils/assert')
var data = require('./data')

// more code
```

In your root directory of this exercise in the terminal run:

`node app/main.js`

look at the output and describe to your pair how the main.js file uses 'assert()` 



## Module

We're now going 

Create a new file under `utils/` and call it what ever you want. You may want to think about adopting a [naming convention](http://stackoverflow.com/questions/7273316/what-is-the-javascript-filename-naming-convention) and sticking to it.  

