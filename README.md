# JavaScript Kata: Objects and Arrays

## Introduction

In these exercises we'll practise some of the fundamentals of JavaScript and start learning about testing. We're going to start getting used to seeing tests coloured RED, and writing code to make them go GREEN.


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
yarn test
```

You'll see some red output that looks like this:

```
   1 failed


   makeObject makes objects

   10:   var actual = kata1.makeObject('name', 'mix')
   11:   t.deepEqual(actual, expected)
   12:

  Difference:

  - undefined
  + {
  +   name: 'mix',
  + }
```

The most important thing is not to panic! Welcome to your first introduction to testing. In this challenge, you're going to make all the tests go GREEN. It's rather addictive once you get started.


## Kata

_Kata_ is a concept from martial arts meaning a sequence of moves composed into a _form_. Martial artists practise katas to build a "muscle-memory" for the basic moves. By practicing katas the artist hopes to make the basics of their art instinctual. When danger strikes the basics will be so familiar that they can respond without thinking.

![](https://49.media.tumblr.com/10c948900ec4276131e45047bb3846a4/tumblr_n3005tWnBf1s6my4qo1_500.gif)

The `kata` folder has 2 files `kata-1.js` and `kata-2.js`. These files have a series of incomplete functions with comments describing what they ought to do. Every time you run the tests (using `yarn test`) you're checking to see if you've completed each function correctly. When you finish the first one, it will show up GREEN and you'll see the next RED test.

Let's try it! Open `kata-1.js` in your editor. The first function looks like this:

```js
// makeObject should return an object like this:
// {
//   key: value
// }
function makeObject (key, value) {
}
```

Ok, so it wants us to create an object with a certain key and value, based on what is passed to the function. Let's solve it so we can make the test go GREEN:

```js
function makeObject (key, value) {
  var result = {}
  result[key] = value
  return result
}
```

Next, go back to your terminal window and type `yarn test`:

```
  1 passed
  1 failed

  getValue gets values from objects

   20:   var actual = kata1.getValue({ age: 21 }, 'age')
   21:   t.is(actual, expected)
   22: })

  Difference:

  - undefined
  + 21
```

One passed! Some coding pairs choose to treat these as high-five moments ... you can decide for yourselves.

Notice that the red part of the message has now changed. It's giving us a different message about another function that's not (yet) doing what it's supposed to do. Notice also that it's _expecting_ `21`, and it's actually getting `undefined`. The test is trying to give us as much information as possible about what we need to do to fix it.

This way we can practise the basics of JavaScript and build up our muscle memory:

 * read the requirements
 * think and talk about how to solve the problem
 * write the code
 * run the tests using `yarn test`
 * read the red errors
 * rinse and repeat until all the tests pass

In later challenges we're going to become a lot more familiar with this process. A pattern very similar to this is known as Test Driven Development (TDD).

Once you have completed all the functions in `kata/kata-1.js` and all those tests are passing, move on to `kata/kata-2.js` and keep repeating the same process.

> Remember to ask for help sooner rather than later if you get stuck. Don't stay blocked beyond where your learning is benefiting.


# Useful Links

The following links may help with the less familiar aspects of this challenge:

- [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FFunctions_and_function_scope%2Farguments)
- [JavaScript objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [JavaScript arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Code kata](https://en.wikipedia.org/wiki/Kata_(programming))

