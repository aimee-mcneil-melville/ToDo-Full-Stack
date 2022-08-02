# Kata: Types, functions and modules

This challenge is designed to practice familiarity with types, functions, and modules.

## Setup

### 0. Clone and install

- [ ] Clone this repo, navigate to it, and install packages
  <details style="padding-left: 2em">
    <summary>More about setup</summary>
  
    ```shell
    cd kata-types-modules
    npm install
    ```
  </details>

----
## Requirements

### 1. The first test

- [ ] Run the first test using `npm test getBoolean`
  <details style="padding-left: 2em">
    <summary>More about the first test</summary>

    Feel free to have a look in `package.json` to see what the `test` script is doing.

    You should get an error saying something about '`getBoolean` is not a function'. This is because `types.js`, the file that the test is importing/requiring, isn't exporting a `getBoolean` function.
  </details>

- [ ] Investigate the contents of the `/tests/` directory
  <details style="padding-left: 2em">
    <summary>More about <code>/tests/</code></summary>

    In the `tests` directory, we have tests for `types` and `functions`. The tests in these folders map to the `types.js` and `functions.js` files in the root folder. To complete this challenge, we will first write functions and export them from `types.js` to pass the tests in the `tests/types` folder. Then we will write and export functions in `functions.js` to pass the tests from `tests/functions`.
  </details>

### 2. Create and export the missing functions

- [ ] Write the `getBoolean`, `getString`, `getNumber`, `getNull`, `getObject`, and `getFunction` functions in `types.js` and export them to get their respective tests passing
  <details style="padding-left: 2em">
    <summary>More about writing and exporting</summary>
    
    In order for the tests to test the functions, we need to **export** each function the tests are expecting. This is often done by exporting an object that contains the functions as properties. This is an example:

    ```js
    // example.js
    module.exports = {
      doWork: doWork
    }

    function doWork () {
      return 'work'
    }
    ```
  </details>

- [ ] Write the `callsFunction` and `callsProperty` functions in `functions.js` and export them

### 3. Common array methods

The final three tests in `functions.js` ask you to implement 3 common functions we use on arrays:

- [ ] Build your own implementation of [`Array.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [ ] Build your own implementation of [`Array.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [ ] Build your own implementation of [`Array.find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

**Do not use the built in array functions, instead write your own using loops and conditionals**

----
## Checking your work

### 4. Run all tests

- [ ] Run all of the tests for all of the functions by running `npm t` in the terminal
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    `npm t` is a shorthand version of `npm test`. It runs all tests that can be detected by the testing tools.

    - `npm t tests` would run all tests in the `/tests/` directory
  </details>

### 5. Refactor

Once you have all the tests passing, read your code through carefully and ensure you understand how it all works.

- [ ] Check for opportunities to clean up your code, removing duplication, comments, `console.log` etc

## Further reading

* [JavaScript data types and data structures](https://developer.mozilla.org/en/docs/Web/JavaScript/Data_structures)
