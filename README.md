# Kata: Modules, first-class functions, strings and numbers

This kata is similar to the others. Some tests have been written in the `tests` folder and the challenge is to get them to pass. The stubs of the functions they test are defined in `utilities.js`, but they are empty. You'll work through all the functions until all of the tests pass.

## Setup

In your terminal:

* Clone this repo and `cd` into the new folder.
* Run `npm install` to install the dependent npm modules defined in `package.json`.

## The first test

* Run `code .` and open `utilities.js`.
* Run `npm test getType`. This will run the first test, the `getType` function in `utilities.js`.

  You should see it is currently failing. Jest, the test framework we're using, is watching the relevant files so it will let us know as soon as we have the test passing.

* Implement the `getType` function:

  ```js
  function getType (thing) {
    return typeof thing
  }
  ```

* Export the function so `tests/getType.test.js` can access the function. Put this at the top of `utilities.js`:

  ```js
  module.exports = {
    getType: getType
  }
  ```

* Save `utilities.js` and you should see the test is now passing.

  Sweet! Now you're ready for the next test. Type `q` in your terminal to stop watching the `getType` test and run `npm test isNumber` to begin the next function. Don't forget to export each of the functions once you've implemented them.


## Making sure you're finished

To run all of the tests for all of the functions you've written, in terminal run:

```
npm test tests
```

This will run all tests in the `tests` directory.


## Tips
* If you get stuck with `NaN`, you should know that `typeof NaN === 'number'`. Given that `NaN` stands for "not a number", that's not very intuitive is it? Well, [here is an explanation](http://stackoverflow.com/questions/2801601/why-does-typeof-nan-return-number). Also, `isNaN()` is a great way to check if a value is `NaN`, but be careful because `isNaN('a non-number string') === true`.,

* Be sure you understand how to use `typeof`.

* You're totally permitted to read the tests - it's not cheating. Also, some of the tests use data defined in `./data/*.js`, So you may need to inspect those files to get a sense of the data being used.
