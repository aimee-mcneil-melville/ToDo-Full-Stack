# Modules, first-class functions, strings and numbers

## Part 1: Strings and numbers kata

In this kata we're going to write our own `filter` and `map` functions again. Then use them to filter and map an array of strings. You have probably noticed that JavaScript already has these methods attached to the Array object:

 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
 * [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

So why are we going to rewrite them? There are a couple of reasons. The first is that by rewriting them we deepen our understanding of what's going on when we call these functions. Second, we're going to write them in a way that has certain advantages which we'll cover later. Third, we're going to package up our functions into our own npm package and learn about how the **n**ode **p**ackage **m**anager works.

Our map and filter functions will accept **functions as parameters**. This is one of the interesting features of JavaScript - we can pass functions into other functions, where the enclosing function will call them. If this is unfamiliar try out the following code in the browser and talk through it with someone:

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

The other difference is that instead of just using `console.log()` to test our code, we'll use our own "assert" function to make this prettier and easier, and "require" it into the main file. We'll cover how this works in Part 2. 

To begin Part 1, in your terminal:

* Clone this repo
* `npm install`, which will install the dependent npm modules defined in `package.json`.
* `node main.js`, which will run the tests.

You should see a series of failing tests, but our `assert` function is coloring the console output red and printing a red `x`. Your goal is to make the tests pass.

Before implementing each function, uncomment the function that will run the assertions. 

```js
// Uncomment when ready to test
assertIsNumber()
```

**Tip 1**: Be sure you understand how to use `typeof`.

**Tip 2**: If you get stuck with `NaN`, you should know that `typeof NaN === 'number'`. Given that `NaN` stands for "not a number", that's not very intuitive is it? Well, [here is an explanation](http://stackoverflow.com/questions/2801601/why-does-typeof-nan-return-number). Also, `isNaN()` is a great way to check if a value is `NaN`, but be careful because `isNaN("a string") === true`.

**Tip 3**: Some of the tests use data defined in `./data/*.js`. You may need to inspect those files to get a sense of the data being used.


## Part 2: CommonJS Modules

You may have noticed that your `main.js` file grew reasonably large in Part 1. At 150+ lines a file becomes harder to navigate and understand how it works, particularly if you didn't write the file orginally. In part 2 we'll use a common strategy to manage the size of our JavaScript files.

At the top of the `main.js` file you will see a reference to the `assert` module:

```js
var assert = require('./utils/assert')

// more code
```

You can find that module in the `./utils/assert.js` file. This approach allows us to place `assert()` in a different file so it can be used by other files.

One of the useful things about Node is it allows us to write code "modules" in [CommonJS](https://nodejs.org/docs/latest/api/modules.html) format. Modules allow us to break code up into separate files. This allows code be more:

 * Testable - we can test pieces of the code separately.
 * Readable - the code in one small file may perform a very specific task making easier to hold in heads.

0. Read [Understanding module.exports and exports in Node.js](http://www.sitepoint.com/understanding-module-exports-exports-node-js/)

1. Discuss with your pair how you think `main.js` 'finds' and uses `assert()`.

2. Create a new file `utils/index.js`.

3. Move your `filter`, `map`, and `countIf` functions over to `utils/index.js` (deleting them in `main.js`).

4. Your goal is to "export" the functions from `utils/index.js` and require them into `main.js`.

5. Make your tests pass once again, this time using the "required" functions in `utils/index.js`.

6. Refactor your code using all three "flavours" of requiring and exporting described below. Your tests should pass each time.

7. Discuss with you pair the advantages and disadvantages of using modules and the different flavours of exporting and importing.


### CommonJS: Three flavours

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

3. Exporting functions in separate files:

  ```js
  // utils/filter.js
  module.exports = function () {
    // your code
  }

  //main.js
  var filter = require('./utils/filter.js')
  ```

  This approach can be used to combine functions from separate files into an "aggregate" module in `index.js`:

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

We're going to pull out the the utils library into its own repo to get it ready for publishing.

1. Go to your personal GitHub account and create a new repo: "[your name]-utils". Select "Node" for .gitignore and AGPL v3 for license.

2. Clone your new repo and change directory into it (`git clone` and `cd`).

3. Create two new directories `test/` and `lib/` in your new repo (`mkdir`).

4. Copy your `index.js` and other files from this `kata-strings-numbers-modules` repo into the root folder of your new local repo (`cp`).

5. Copy your function files into `lib/` (`cp`) and move `main.js` into `test/test.js`, renaming it `test.js` (`mv`).

6. Copy `utils/assert.js` into `test/assert.js` (`cp`).

7. Delete all the code in `test/test.js` that doesn't test `filter`, `map`, `forEach`, or `countIf`.

8. Adjust the file paths in `index.js` and `test.js` so that they reflect the new file and folder setup.

9. From the root directory run `npm init -y`.

10. This creates a `package.json` file in your root directory. open it in a text editor, it should look something like this:

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

11. Edit the `description` field to "a utility library".

12. Run `npm install tape tap-spec --save-dev` in the terminal.

  This installs the packages that the assert function depends on, its "dependencies". Check your package.json. Has anything changed?

13. Run the tests by running `node test/test.js` in the terminal. Do they still pass? Fix them if they don't.

14. Now stage and commit your changes and push to your new repo: `git status`, `git add .`, `git commit -m "initial commit"`

  Now we're going to host your library on _npm_, node package manager (it's traditional to have it all lowercase). Becoming familiar with npm is a very useful skill for a JavaScript developer. This will let anyone in the world install and use your library by simply running `npm install [your-library-name] --save` in the terminal.

15. [Sign up to npm](https://www.npmjs.com/signup)

16. Follow the docs on [publishing a package to npm](https://docs.npmjs.com/getting-started/publishing-npm-packages)

  You may wish to update the `README.md` to provide examples of how to use use your library. If you don't, you can never complain about poorly documented libraries ever again!


## Part 4: Using an npm module

To complete this section we'll use *another pair's module* in our code by installing it from npm. If you're the first to finish the previous section you may wish to split up and help other pair finish.

1. Change directory back to your local version of this repo.

2. Delete the `var utils = require('utils')` from your `main.js` (or whatever you used to require your module previously).

3. Run `npm install [another-pairs-module-name] --save` in the terminal. npm will create a directory `node_modules` and print out a progress bar and info about the install (sometimes it errors).

4. Now add `var utils = require('[another-pairs-module-name]')` to the top of your `main.js` and attempt to get the code and tests working using the functions from the freshly installed npm package.

  This may require some fineagaling. You can `cd` into the package's directory in `node_modules`, run the tests, poke around etc. You might also ask the original developers of the package about it. Fortunately, they should be sitting close by.

Congratulations! You have published and downloaded a package on npm.

---

## Resources 

Number | Name
--------|-------------------
0. | [Node](https://nodejs.org/en/)
1. | [Data-types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
2. | [Test Driven Development](https://github.com/dev-academy-programme/curriculum/tree/master/concepts/test-driven-development)
3. | [Functions as 'first class' objects](http://helephant.com/2008/08/19/functions-are-first-class-objects-in-javascript/)
4. | [CommonJS require and module.exports](http://www.sitepoint.com/understanding-module-exports-exports-node-js/)
