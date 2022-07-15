# Kata: Data Structures

This challenge is designed to practice interacting with JavaScript objects, pulling values from objects and testing the outcome of these in controlled tests.


## Setup

### 0. Installation & what's included
- [ ] Clone the repo, navigate into it, and install the related packages with `npm i`
- [ ] Take a look at the files in the `tests` folder and examine how the tests are structured
  <details style="padding-left: 2em">
    <summary>More about the tests</summary>

    You don't have to read and understand every single test before beginning! Instead, notice the rhythm that the tests exhibit:

    - **Arrange:** set up some data to use in the test, especially state **what we expect to happen**
    - **Act:** call the function that is being tested, so we can find out **what actually happens**
    - **Assert:** check to see if what we **expected** to happen **actually** happened!
  </details>
----
## The first function

Before working on a function, take turns explaining what each test is doing with your pair.

### 1. The first test

- [ ] Run the first test using `npm test getType`
  <details style="padding-left: 2em">
    <summary>More about the <code>getType</code> test</summary>
    
    You'll notice the test is failing with a `TypeError: getType is not a function`. The test file is calling `require` on the correct file, but `getType.js` isn't exporting the function.
  </details>

### 2. Implementing `getType`

- [ ] Open the folder in VS Code using `code .` and open `getType.js`
- [ ] Export the function by adding `module.exports = getType` and save the file
  <details style="padding-left: 2em">
    <summary>Tips</summary>

    - Now you'll notice the tests are failing for different reasons
    - Make sure you do `module.exports = getType` exactly as written here - this exports just the one function, which is what `getType.test.js` is expecting. Another style you'll commonly see is `module.exports = { myFunction, anotherFunction }`, which exports an object with two properties which are functions. Either way is fine so long as what one file is exporting matches what the other file is expecting in its `require` line
  </details>

- [ ] Implement the `getType` function
  <details style="padding-left: 2em">
    <summary>More about <code>getType</code></summary>

    Our function will likely look like:
    ```js
    function getType (thing) {
      return typeof thing
    }
    ```
  </details>

Now the tests should be passing. Type `q` to stop the test.

-----
## Additional functions

When working through these, it is important to **look at the tests** that have been written and understand what is being asked of each function. 

### 3. The remaining functions

- [ ] Complete the remaining functions
  <details style="padding-left: 2em">
    <summary>Functions in order of difficulty</summary>

    If you'd like to work on the tests in an order of increasing difficulty, try this order:

    - getType
    - getValue
    - getAddress
    - positions
    - getPropTypes
    - matrix
    - find
    - where
  </details>

----
## Checking your work

### 4. Run all tests

- [ ] Run all of the tests for all of the functions by running `npm t` in the terminal

### 5. Refactor

Once you have all the tests passing, read your code through carefully and ensure you understand how it all works.

- [ ] Check for opportunities to clean up your code, removing duplication, comments, `console.log` etc


## Further reading

* [JavaScript data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
