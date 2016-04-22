# Data Structures

This challenge is designed to practice interacting with JavaScript objects, pulling values from objects and testing the outcome of these in controlled tests. 

## Install

1. Clone this repo, then:

  ```shell
  cd kata-data-structures
  npm install
  ```


## Part 1: Kata with Tape

Take a look at the [Tape](https://www.npmjs.com/package/tape) docs. Look at the first file in the test folder and examine how the tests are set out. Reference this with the tape docs to understand exactly how each test function works, jot this down, and take it in turns to explain it to your pair.

After this, run the tests, and change the code they are testing until they all pass. 

To run the tests, run `npm test` on the terminal. Also, have a look in `package.json` to see what this is doing.

When you have all the tests passing, read your code through carefully and ensure you know evertyhing that is going on before continuing to the next part of the challenge.


## Part 2: Mini-app with Browserify and Tape.

1. Take a look at the [Browserify](https://www.npmjs.com/package/browserify) npm docs.
  - Don't worry if this doesn't make sense.
  - There is a [much more detailed Browserify Handbook](https://github.com/substack/browserify-handbook).

2. Browserify `index.js` transforming it into `bundle.js`.
  - Open up your `bundle.js` and take a look at it. What has Browserify done!!??

3. Try this:

  ```shell
  browserify app/index.js > bundle.js
  ```

  - Take another look at `bundle.js`. Notice that it still has everything that it had before, with some additional code. That's because `app/index.js` _requires_ `index.js` with this statement:

  ```js
  var kata = require('../')
  ```

4. Now we're going to write Node-style code with `module.export` and use Browserify to convert it into browser compatible code.
  - Take a look at the `app/` folder and get familiar with the require paths in `app/index.js`

5. Use the `app` script which is defined in `package.json` to serve your app.
  - Go have a look for the `app` script under scripts. (We'll dig into how this works later.) 
  - This script Browserifies for us on the fly as we make file changes, which saves lots of time.
  - Run the script: `npm run app`.
  - Make some changes and watch the magic happen!

6. Check out the script called `app:test` in your `package.json`
  - Run the script (you need to have Firefox installed on the computer).
  - See if you can figure out why the test is failing and then get it to pass.

7. **STRETCH**: In `app/index.js` there's an empty event handler. See if you can use it to make a matrix cell _increment_ by one each time you click on it.

---

## Resources

Number | Name
-------|-------------------
1.     | [JavaScript data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
2.     | [Browserify](https://www.npmjs.com/package/browserify)
3.     | [Tape](https://www.npmjs.com/package/tape)
