# JavaScript Kata: Objects and Arrays

## Introduction

In these exercises we'll practise some of the fundamentals of JavaScript and start learning about testing.

For convenience this exercise come with its own server that restarts automatically when changes are made. First install nodemon globally in your system, run the following in the console:

`npm install -g nodemon`

Then install the server locally:

`npm install`

Note: this command looks for the node modules listed in a project's `package.json` and installs them if they aren't already present.

## Part 1:  Kata

"Kata" is concept from martial arts meaning a sequence of moves composed into a "form". Martial artists practise kata to build a "muscle-memory" for the basic moves. By practicing kata the artist hopes to make the basics of their art instinctual. When danger strikes the basics will be so familiar that they can respond  without thinking.

![](https://49.media.tumblr.com/10c948900ec4276131e45047bb3846a4/tumblr_n3005tWnBf1s6my4qo1_500.gif)

The `kata` folder has 2 files `kata-1.s` and `kata-2.js`. These files have a series of incomplete functions followed by tests written in "driver code" style.
The driver code uses these functions and logs the output to the console. You'll see a series of console.logs written something like this:

```js

function ageOneYear (obj) {
// replace the code inside this function with your own
 return obj
}

...// later ...

var mickey = { name: 'Mickey Mouse', age: 64, email: 'mickey@disney.com' }
console.log(ageOneYear(mickey).age === 65)

```
To practise kata you must make the code inside the `console.log` evaluate to `true`. You will need to read the driver code and figure out what it "wants" from the tested functions.
This way we can practise the basics of JavaScript and build up our muscle memory -through reading the driver code, by writing code, and by becoming familiar with Test Driven Development (TDD).

To evaluate your code run the following in the root folder of this exercise:

`node kata-1.js`

Once you have gotten all the console.logs of `kata-1.js` to output `true` move on to Part 2

## Part 2: Mini apps

Most martial artists get sick of practising of kata all day and want to apply their skills in an (almost) real situtation like a tournament or sparring.
We can do the same by applying the concepts we've just practised in an almost real situation of creating and manipulating a simple web page.

The `app/` folder contains HTML and JavaScript files and the `test/` folder contains test files with the driver code.

This exercise is very similar to the kata.
For app-1 you will transform an array of data into `li` elements.

To start the mini apps run the following in the root folder of the exercise:

`npm run serve`

This will load the folders contents at `localhost:3000` visit this location with you browser and click through to index.html.
The pages are deliberately very basic with no styling. The point of these exercises is to apply basic JavaScript in 'real' applications, not build beautiful web pages.

The HTML page will import the app and test JavaScript. Much of the app code is already scafolded. Red through this code and the test code and try to under stand what its doing. Once you think you know what's going on uncomment the `test()` function to run the tests. Once you've completed your code run the tests my executing `test()` in the console (it will be loaded globally from the test file). When the test code outputs all `true` you're done.

When you've completed the first mini app go back to repeat Parts 1 and 2 for `kata-2.js` and `app-2.js` respectively. You will need to edit the index.html files to get the app-2 and app-2-test to load properly.

# Useful Links

Most of the content will be familiar. The following links may help with the less familiar aspects:


[Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

[arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments?redirectlocale=en-US&redirectslug=JavaScript%2FReference%2FFunctions_and_function_scope%2Farguments)

[JavaScript objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
[JavaScript arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
[Nodemon](http://nodemon.io/)
[Code kate](https://en.wikipedia.org/wiki/Kata_(programming)


