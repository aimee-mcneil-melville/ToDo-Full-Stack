# Data Structures

This challenge is designed to practice interacting with JavaScript objects, pulling values from objects and testing the outcome of these in controlled tests. 

## Install

Clone this repo, then:

  ```shell
  cd kata-data-structures
  npm install
  ```


## Kata with tests

First, take a look at the file in the test folder and examine how the tests are set out. You don't have to read and understand every single test before beginning! Instead, notice the rhythm that the tests exhibit:

 * **Arrange:** set up some data to use in the test, especially state _what we expect to happen_;
 * **Act:** call the function that is being tested, so we can find out _what actually happens_;
 * **Assert:** check to see if what we _expected_ to happen _actually_ happened!

Ordinarily you'll be using a testing library called [Tape](https://github.com/substack/tape). For this challenge we've used [Ava](https://github.com/avajs/ava) because it lets us show only one failing test at a time, so as not to flood the screen with red text! Tape and Ava have very similar syntax, so it shouldn't be hard to move between the two.

Try taking it in turns to explain what each test is doing with your pair.


## Everything is everywhere

After you're comfortable with how the tests work, run the tests using `npm test`. Have a look in `package.json` to see what this is doing.

You should get an error saying something about '_blah_ is not a function'. Did you take a look at the directory yet? It's full of files...

Remember `module.exports`? You're going to need to _export_ each function, or possibly an object containing functions as properties, before the test code will be able to see them. Then, as usual, change the code in the empty functions until all tests pass.

When you have all the tests passing, read your code through carefully and ensure you know everything that is going on. Can you refactor any of it? Does it all make sense to you?


---

## Resources

 * [JavaScript data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
