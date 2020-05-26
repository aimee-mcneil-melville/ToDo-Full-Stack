# Kata: Data Structures

This challenge is designed to practice interacting with JavaScript objects, pulling values from objects and testing the outcome of these in controlled tests.


## Setup

Clone this repo, then:

  ```
  cd kata-data-structures
  npm install
  ```


## Kata with tests

First, take a look at the files in the `tests` folder and examine how the tests are structured. You don't have to read and understand every single test before beginning! Instead, notice the rhythm that the tests exhibit:

 * **Arrange:** set up some data to use in the test, especially state _what we expect to happen_
 * **Act:** call the function that is being tested, so we can find out _what actually happens_
 * **Assert:** check to see if what we _expected_ to happen _actually_ happened!

Before working on a function, take turns explaining what each test is doing with your pair.


## The first test

* Run the first test using `npm test getType`. You'll notice the test is failing with a `TypeError: getType is not a function`. The test file is calling `require` on the correct file, but `getType.js` isn't exporting the function.

* Open the folder in VS Code using `code .` and open `getType.js`.

* Export the function by adding `module.exports = getType` and save the file. Now you'll notice the tests are failing for different reasons.

* Implement the `getType` function:

  ```js
  function getType (thing) {
    return typeof thing
  }
  ```

* Now the tests should be passing. Type `q` to stop the test.

If you'd like to work on the tests in an order of increasing difficulty, try this order:

* getType
* getValue
* getAddress
* positions
* getPropTypes
* matrix
* find
* where


## Making sure you're finished

To run all of the tests for all of the functions you've written, in terminal run:

```
npm test tests
```

This will run all tests in the `tests` directory. When you have all the tests passing, read your code through carefully and ensure you know everything that is going on. Can you refactor any of it? Does it all make sense to you?


## Resources

* [JavaScript data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
