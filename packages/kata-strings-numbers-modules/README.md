# Kata: Modules, first-class functions, strings and numbers

This kata is similar to the others. Some tests have been written in the `tests` folder and the challenge is to get them to pass. The stubs of the functions they test are defined in `utilities.js`, but they are empty. You'll work through all the functions until all of the tests pass.

## Setup

### 0. Clone and install

- [ ] Clone this repo and `cd` into the new folder
- [ ] Run `npm install` to install the dependent npm modules defined in `package.json`

---
## Requirements

### 1. The first test

- [ ] Run `code .` and open `utilities.js`
- [ ] Run `npm test getType`
  <details style="padding-left: 2em">
    <summary>More about the first test</summary>
    
    This will run the first test, the `getType` function in `utilities.js`.

    You should see it is currently failing. Jest, the test framework we're using, is watching the relevant files so it will let us know as soon as we have the test passing.
  </details>

### 2. Building `getType`

- [ ] The `getType` function
  <details style="padding-left: 2em">
    <summary>More about <code>getType</code></summary>

    ```js
    export function getType (thing) {
      return typeof thing
    }
    ```
  </details>


- [ ] Save `utilities.js` and verify that the test is now passing

  Sweet! Now you're ready for the next test. Type `q` in your terminal to stop watching the `getType` test and run `npm test isNumber` to begin the next function.
  
### 3. Complete additional functions

- [ ] Complete the remaining functions so all tests pass
  <details style="padding-left: 2em">
    <summary>Tips</summary>
    
    - Be sure you understand how to use `typeof`
    - You are permitted &mdash; encouraged, even &mdash; to read the tests. Be aware that some of the tests use data defined in `./data/*.js`, so you may need to inspect those files to get a sense of the data being used
    - If you get stuck with `NaN`, you should know that 
      ```
      typeof NaN === 'number'
      ```
      Given that `NaN` stands for "not a number", that's not very intuitive is it? Well, [here is an explanation](http://stackoverflow.com/questions/2801601/why-does-typeof-nan-return-number). Also, the `isNaN` functions is a great way to check if a value is `NaN`, but be careful because 
      ```
      isNaN('a non-number string') === true
      ```
  </details>

---
## Checking your work

### 4. Run all tests

- [ ] Run all of the tests for all of the functions by running `npm t` in the terminal
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    `npm t` is a shorthand version of `npm test`. It runs all tests that can be detected by the testing tools.

    - `npm t tests` would run all tests in the `/tests/` directory
  </details>

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=kata-strings-numbers-modules)
