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

After you're comfortable with how the tests work, run the tests, and change the code they are testing until all tests pass. To run the tests, run `npm test` in your terminal. Also, have a look in `package.json` (specifically the `scripts` section) to see what this is doing.

When you have all the tests passing, read your code through carefully and ensure you know everything that is going on before continuing to the next part of the challenge.


---

## Resources

Number | Name
-------|-------------------
1.     | [JavaScript data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
