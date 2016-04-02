# Data Structures

## Install

1. Clone this repo, then:
  ```shell
  cd kata-data-structures
  npm i
  ```

2. To run the tests:
  ```shell
  npm test
  ```
  Have a look in `package.json` to see what this is doing.


## Part 1: Kata with Tape

Take a look at the [Tape](https://www.npmjs.com/package/tape) docs.

Run the tests. Work through them until they're all passing.

## Part 2: Mini-app with Browserify and tape.

1. Take a look at the [Browserify](https://www.npmjs.com/package/browserify) npm docs.
  - Don't worry if this doesn't make sense.
  - There is a [much more detailed Browserify Handbook](https://github.com/substack/browserify-handbook).

2. Browserify `index.js` transforming it into `bundle.js`.
  - Open up your `bundle.js` and take a look at it. What has Browserify done!!??

3. Browserify `app/index.js`.
  - Now we're going to write Node-style code with `module.export`s and use Browserify to convert it into browser compatible code.
  - Take a look at the `app/` folder and get familiar with the require paths in `app/index.js`

4. Use the `app` script which is defined in `package.json` to serve your app.
  - Go have a look for the `app` script under scripts. (We'll dig into how this works later.) 
  - This script Browserifies for us on the fly as we make file changes, which saves lots of time.
  - Run the script: `npm run app`.
  - Make some changes and watch the magic happen!

5. Check out the script called `app:test` in your `package.json`
  - Run the script (you need to have Firefox installed on the computer).
  - See if you can figure out why the test is failing, then get it to pass.

---

## Resources

Number | Name
-------|-------------------
1.     | [JavaScript data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
2.     | [Browserify](https://www.npmjs.com/package/browserify)
3.     | [Tape](https://www.npmjs.com/package/tape)
