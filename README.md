# Modules, First-class functions, Strings and Numbers

## Concepts 

Number | Name 
--------|-------------------
0. | [Node]
1. | [Data-types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
2. | [Test Driven Development](https://github.com/dev-academy-programme/curriculum/tree/master/concepts/test-driven-development) 
3. | [Functions as 'first class' objects](http://helephant.com/2008/08/19/functions-are-first-class-objects-in-javascript/)
4. | [Common JS require and module.exports]


## Part 1: Kata : strings and numbers

In this kata we'll going to write our own `filter` and `map` functions again. Then use them to filter and map an array of strings. Now, you have probably noticed that JavaScript already has these methods attached to the Array object:

 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
 * [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 


So why are we going to rewrite them? There's a couple of reasons. The first is that by rewriting them we deepen our understanding of what's going on when we call these functions. Second, we're going to write them in a way that has certain advantages which we'll cover later. Third, we're going to package up our functions into our own npm package and learn about how the **n**ode **p**ackage **m**anager works.


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

The other difference is that instead of just using `console.log()' to test our code, we'll use our own "assert" function to make this prettier and easier, and "require" it into the main file. 

We'll cover how this works in Part 2. For now, in your root directory of this exercise in the terminal run:

`node app/main.js`

You should a series of failing tests, but our `assert` function is coloring the console output red and printin a red x. Your goal, once aagain, is to make the tests pass. 



## Part 2: Common JS Modules

You may have noticed that your `main.js` file grew reasonably large in Part 1.
At 100-150 lines a file mmay be manageable. But much larger than this it gets much harder to navigate around the file and understand 
how it works. Particularly if you didn't write the file orginally.
In part 2 we'll use a "common" strategy to manage the size of our main file.

First, take a look in `utils/assert.js`.

Then the top of the `main.js` file:

```js
var assert = require('utils/assert')
var data = require('data/data')

// more code
```

One of the useful things about Node is it allows us to write code "modules" in [common JS](https://nodejs.org/docs/latest/api/modules.html) format. 

Modules allow us to break code up into separate files. This allows code be more:

 * Testable - we can test pieces of the code separately.
 * Readable - the code in one small file may perform a very specific task making easier to hold in heads.

0. Read [understanding module.exports and exports in Node.js](http://www.sitepoint.com/understanding-module-exports-exports-node-js/)
1. Discuss with your pair how you think the `main.js` 'finds' and uses `assert()`
2. Create a new file `utils/index.js`
3. Move your `filter`, `map`, and `countIf` functions over to `utils/index.js` (deleting them in `main.js`!).
4. Your goal is to "export" the functions from `utils/index.js` and require them into `main.js`
5. Make your tests pass once again - this time using the "required" functions in `utils/index.js`. 
6. Refactor your code using all three "flavours" of requiring and exporting described below -your tests should pass each time!.
7. Discuss with you pair the advantages and disadvantages of using modules and the different exporting and importing flavours.

### Common JS: Three flavours

1. Exporting using the `exports.myFunctionName = ` syntax:
```js
// utils/index.js

exports.map = function () {
  // your code
}

```

2. Exporting an object with functions as properties:

```js
// utils/index.js

module.exports = {
  filter: function () {
    // your code
  },
  map: function () {
    // your code
  }
  ...
}

```

3(a). Exporting functions in separate files: 
```js
// utils/filter.js 
module.exports = function () {
  // your code
}


//main.js
var filter = require('./utils/filter.js')

```
3(b) Exporting functions in separate files then combining them into a an object in `index.js`:
```js
// utils/index.js

module.exports = {
  filter: require('./filter.js'),
  map: require('./map.js'),
  ...
}


// main.js
// note: require will automatically look for the index.js file
// if it requires a folder path
var utils = require('./utils')

var numbers = utils.map(toNumber, data)

```


## Part 3: npm modules

We're going to pull out the the utils library into its own repo to get it ready for publishing

1. go to your personal github account and create a new repo: "[your name]-utils" - select "Node" for .gitignore and AGPL v3 for license.
2. git clone you new repo and change directory into it (git clone; cd).
3. create two new directories `test/` and `lib/` in your new repo (mkdir).
4. copy your index.js and the other files file from 3(b) into the root folder of your local repo (cp).
5. copy your function files into `lib/` and the `main.js into `test/test.js` (renaming it test.js) (cp).
6. copy `'utils/assert.js` into `test/assert.js` (cp).
7. delete all the code in `test/test.js that doesn't test filter, map, forEach, or countIf.
8. adjust the file paths in index.js and test.js so that they reflect the new file and folder setup.
9. from the root directory run `npm init -y`.
10. this creates a `package.json` file in your root directory. open it in a text editor, it should look something like this:

```js
{
  "name": "[your name]-utils",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "directories": {
    "test": "tests"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/[your name]/[your name]-utils.git"
  },
  "keywords": [],
  "author": "",
  "license": "AGPLv3",
  "bugs": {
    "url": "git+https://github.com/[your name]/[your name]-utils.git"
  },
  "homepage": "git+https://github.com/[your name]/[your name]-utils#readme"
  "dependencies": {
  }
}
```
11. Edit the description of the package.json to "a utility library".

12. run `npm install colors js-object-pretty-print node-emoji --save-dev` in the terminal.
 
This installs the packages that the assert function depends on, its "dependencies". Check your package.json. Has anything changed?

13. run the tests by running `node test/test.js` in the terminal. Do they still pass? Fix them if they don't.

14. Now perform your commit workflow and push to your new repo: `git status`, `git add .`, `git commit -m "initial"`

Now we're going to host your library on npm - node package manager (its traditional to have it all lowercase).
Becoming familiar with npm is very useful skill for a JavaScript developer. The best way to that is to publish our code there
This will let anyone in the world install and use your library by simply running `npm install [your-library-name] --save` in the terminal.

15. [Sign up to npm](https://www.npmjs.com/signup)
16. Follow the docs on [publishing a package to npm](https://docs.npmjs.com/getting-started/publishing-npm-packages)

You may wish to update the README.md to provide examples of how to use use your library.
If you don't you can never complain about poorly documented libraries ever again!

## Part 4: Using an npm module.

To complete this section we'll use *another pair's module* in our code by installing it from npm. 
If you're the first to finish the previous section you may wish to split up and help other pair's finish.

1. Change directory back to your local version of this repo.
2. Delete the `var utils = require('utils') from youre `main.js` (or whatever used to require your module previously).
3. run `npm install [another-pairs-module-name] --save` in the terminal. npm will create a directory `node_modules` and print out a progress bar and info about the install (sometimes it errors).
4. now add `var utils = require('[another-pairs-module-name]')` to the top of your main js
and attempt to get the code and tests working using the functions from the freshly installed npm package.

This may require some fineagaling. You can cd into the package's directory in `node_modules`, run the tests, poke around etc. 
You might also ask the original developers of the package about it. Fortunately, they should be sitting close by.

Congratulations! You have published and downloaded a package on npm.







