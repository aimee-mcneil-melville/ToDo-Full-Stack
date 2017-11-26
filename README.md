# JavaScript Kata: Objects and Arrays

## Introduction

In this exercise we'll practise some of the fundamentals of JavaScript and start learning about automated testing. We're going to start getting used to seeing tests coloured RED, and writing code to make them go GREEN.


## Installation

First, jump into a working directory and clone the repository from GitHub. Don't forget, you can use the `TAB` key to complete long directory names (but not GitHub URLs!).

```
cd workspace
git clone https://github.com/[COHORT-YEAR]/kata-objects-and-arrays
cd kata-objects-and-arrays
yarn install
```

The last command installs a bunch of stuff that you'll need to make the exercise work correctly. Wait until it's done and then type:

```
yarn test getGreeting
```

You'll see some red output that looks like this:

```
 FAIL  tests/getGreeting.test.js
  ✕ getGreeting returns "Hello <name>" (4ms)

  ● getGreeting returns "Hello <name>"

    expect(received).toBe(expected)

    Expected value to be (using ===):
      "Hello Aardvark"
    Received:
      undefined

    Difference:

      Comparing two different types of values. Expected string but received undefined.

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.619s, estimated 1s
Ran all test suites matching /getGreeting/i.

Active Filters: filename /getGreeting/
 › Press c to clear filters.

Watch Usage
 › Press a to run all tests.
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

The most important thing is not to panic! Welcome to your first introduction to testing. In this challenge, you're going to make all the tests go GREEN. It's rather addictive once you get started.


## Kata

_Kata_ is a concept from martial arts meaning a sequence of moves composed into a _form_. Martial artists practise katas to build a "muscle-memory" for the basic moves. By practicing katas the artist hopes to make the basics of their art instinctual. When danger strikes the basics will be so familiar that they can respond without thinking.

![](https://49.media.tumblr.com/10c948900ec4276131e45047bb3846a4/tumblr_n3005tWnBf1s6my4qo1_500.gif)

The file you'll be working in is `kata.js`. This file is full of incomplete functions with comments describing what they should do. Every time you run the tests (using `yarn test nameOfTheFunctionYoureWorkingOn`) you're checking to see if you've completed each function correctly. When you finish it successfully, it will show up GREEN and you can move on to the next function.

Let's try it! Open `kata.js` in your editor. The first function looks like this:

```js
// getGreeting should return a string containing 'Hello ' and the contents of `name`
function getGreeting (name) {
}
```

Ok, so it wants us to return a string using the input parameter `name`. Let's solve it so we can make the test go GREEN:

```js
function getGreeting (name) {
  return 'Hello ' + name
}
```

You'll notice that when you save `kata.js` your terminal indicates the test is now passing. 

```
 PASS  tests/getGreeting.test.js
  ✓ getGreeting returns "Hello <name>" (1ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.069s, estimated 1s
Ran all test suites matching /getGreeting/i.

Watch Usage: Press w to show more.
```

One passed! Some coding pairs choose to treat these as high-five moments ... you can decide for yourselves.

Now you should press the `q` key in the terminal to stop the test runner (`w` will show you all the options) and you can move on to the next function.

This way we can practise the basics of JavaScript and build up our muscle memory:

 * read what the next function is supposed to do
 * run the tests using `yarn test nameOfTheFunctionYoureWorkingOn`
 * think and talk about how to solve the problem
 * write the code and save the file
 * read any errors and keep trying
 * rinse and repeat until all the tests pass

In later challenges we're going to become a lot more familiar with this process. A pattern very similar to this is known as Test Driven Development (TDD).

> Remember to ask for help sooner rather than later if you get stuck. Don't stay blocked beyond where your learning is benefiting.


## Making sure you're finished

To run all of the tests for all of the functions you've written, in terminal run:

```
yarn test tests
```

This will run all tests in the `tests` directory.


## Useful Links

The following links may help with the less familiar aspects of this challenge:

- [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)
- [JavaScript objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [JavaScript arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Code kata](https://en.wikipedia.org/wiki/Kata_(programming))

