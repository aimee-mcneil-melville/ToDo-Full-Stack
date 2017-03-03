# ASCII Art Reader

Build a state of the (ASCII) art terminal client!


## Learning objectives

1. Reading and writing files.
2. Getting used to asynchronous functions and callbacks.
3. A first try at writing tests for async functions.


## Getting started

By now you should be getting used to setting up Node programs. Here's a reminder in case you need it:

1. Clone this repo and create a new branch for you and your pair.
2. Make sure you're logged in as the correct user, and that your `user.name` and `user.email` are you and not someone else!
2. Create an npm `package.json` file using `npm init`.
3. Install Nodemon, tape, and tap-diff.
  - Should these be `--save` or `--save-dev`?
4. Write a couple of scripts in your `package.json`:
  - one that starts the program
  - one that runs all the tests
5. Create a `tests` directory.
6. Write a simple initial test that proves the tests run ok (hint: `t.pass()`).

You'll see we've included a data directory with some text files in it. You're going to be needing those in a bit.


## MVP

> An MVP is a _Minimum Viable Product_. It's the least amount of work you can do and still have a working project!

Here are some user stories to guide your work. We'll be talking a lot more about user stories during the bootcamp! In the meantime, try to make these ones come true (think of them as requests from a fictitious client).

1. _As a user, I'd like to see a welcome message (so that I feel, y'know, welcome)._
  - Start small... you'll be using `console.log` statements a lot in this project, since the terminal _is_ the console!

2. _As a user, I'd like to view a list of ASCII artworks that can be displayed so that I can make my choice._
  - Here's where you show a list of filenames from the `data` directory. You can choose to keep these in your code for now.
  - Hint: start counting from 0, it will make indexing an array that much easier!

3. _As a user, when I enter the number next to an artwork in the list, the artwork will be displayed (so that I can see it!)_
  - There's a section on [Terminal Helpers](#terminal-helpers) below... try using the `readline` function, it's a good way to practice callbacks!
  - Again, start small: try just getting the number from the user and displaying it to the terminal
  - When you've got that down, use the number to get the filename. Maybe the filenames are in an array, and the numbers are the array indices?
  - When you've got the right filename, use `fs.readFile` to load the file
  - Finally, inside the callback for `fs.readFile`, use `console.log` to output the file's contents to the terminal


## Terminal helpers

Writing programs for the terminal will be a new experience for some. Our advice is to keep it really simple at first. Something you may find is that you need a way to wait for input from the terminal, for example when choosing which file to display. `readline`, which comes with the Node standard library, will let you pause your program until the user hits enter, then call whatever function you want:

```js
var readline = require('readline')

function pressEnter () {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question('Which file should I load? ', function (input) {
    rl.close()

    // Call any functions you like here. For example:
    loadFile(input)
  })
}
```

As you can see, `readline` gives you even more practice with callbacks! If you want to get a little more fancy, try using the `prompt` npm package for input. An example of how you might use it:

```js
var prompt = require('prompt')

prompt.message = ''
prompt.delimiter = ': '
prompt.start()

var choice = {
  name: 'choice',
  hidden: true,
  message: 'Make your choice'
} 

prompt.get(choice, function (result) {
  // Do something with result.choice here...
})
```

The callback you pass to `prompt.get` will receive an object that has a property with the name of your input, so for example:

```js
{
  choice: '1'
}
```

