# ASCII Art Reader

Build a state of the (ASCII) art terminal client. Don't forget to maximise your terminal window on one screen. You'll need the space!

Learning objectives:
1. Reading and writing files.
1. Getting used to async functions that return promises.
1. A first try at writing tests for async functions.

When complete, your application might look like this:

![Screenshot of terminal program showing two selection prompts followed by an illustration of a bird in flight. The illustration is made of ASCII characters composed into patterns of light and dark](reader.png)

## Setup

### 0. Cloning and preparing to code
- [ ] Clone this repo and create a new branch for you or your pair
- [ ] Open `index.js` (once you start adding functionality, you can run your app with `npm start`)
---

## Requirements

### 1. MVP

<details>
  <summary>What is MVP?</summary>

  An MVP is a **Minimum Viable Product**. It's the least amount of work you can do and still have a working project!
</details>

<br />
Here are some user stories to guide your work. We'll talk more about user stories during the bootcamp. In the meantime, try to implement these. Think of them as requests from a fictitious client.

Before you begin work, you may want to read the section about [terminal helpers](#terminal-helpers)

- [ ] As a user, I'd like to see a welcome message (so that I feel, y'know, welcome) 
  <details style="padding-left: 2em">
    <summary>Tip</summary>
    
    Start small. You'll use `console.log` statements a lot in this project, since the terminal **is** the console!
  </details>

- [ ] As a user, I'd like to view a list of ASCII artworks that can be displayed so that I can make my choice
  <details style="padding-left: 2em">
    <summary>Tips</summary>

    - Here's where you show a list of filenames from the `data` directory. You may choose to hard-code an array initially or you may go straight to reading file names from the `data` directory.
    - Hint: read the docs for [fsPromises.readdir().](https://nodejs.org/api/fs.html#fspromisesreaddirpath-options) You may need to search "fsPromises.readdir" on that page.
    - Hint: start counting from 0, it will make indexing an array that much easier
    
  </details>

- [ ] As a user, when I enter the number next to an artwork in the list, the artwork will be displayed (so that I can see it!)
  <details style="padding-left: 2em">
    <summary>Tips</summary>

    - There's a section on [terminal helpers](#terminal-helpers) below. Try using the `prompt` package, it's a good way to practice promises
    - Again, start small. Try to get the number from the user and display it in the terminal
    - Once you have that, use the number to get the filename. Maybe the filenames are in an array, and the numbers are the array indices?
    - When you have the right filename, use `fsPromises.readFile` to load the file
    - Finally, inside the callback for `fsPromises.readFile`, use `console.log` to output the file's contents to the terminal
  </details>

---

## Stretch

> A **stretch goal** is one you're not sure if you'll have time for, but would be great to have in the project.

Ready for more? Here's some ideas for what to work on next!

### 2. Menu & prompts
- [ ] As a user, I want the menu to display again after I view an artwork so that I can choose another one
  <details style="padding-left: 2em">
    <summary>Tips</summary>

    - Maybe turn the main menu into a function you can call any time you want to?
    - In order to not scroll the 'image' off the screen, you might want to ask the user to press enter before continuing.
  </details>

- [ ] As a user, I want to be able to quit when I press `q` so that I can return to the terminal prompt
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    Hint: `process.exit()`
  </details>

### 3. Comments

- [ ] As a user, I want to be able to write a comment to a file when I press `c` so that I can voice my opinion
  <details style="padding-left: 2em">
    <summary>Tips</summary>

    - Here's your chance to practice with `fsPromises.writeFile`!
    - Don't get too fancy at first. Just accept a line of input into a variable, and write that variable out again to a file called `data/comments.txt`.
  </details>

- [ ] As a user, I want to view the comments file when I press `v` so that I can see all the latest comments
  <details style="padding-left: 2em">
    <summary>Tip</summary>
    
    - Once you have comment display working, try adding another comment. What happens to the first one?
  </details>

- [ ] As a user, I want my comments to be preserved so that I don't overwrite my last one with the latest one
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    - Here's a good use case for `fs.appendFile`.
  </details>

---

### 4. Even more stretch

Still not enough for you? Check these out:

- [ ] As a user, I want to be able to erase all the comments so that I can start afresh
  <details style="padding-left: 2em">
    <summary>Tips</summary>

    - Think about how to remove the contents of the file without actually deleting it. Or perhaps it should be deleted?
    - You'll need to add another key to the menu, perhaps 'd'.
    - You may want to think about an "Are you sure?" prompt to prevent accidents.
  </details>

- [ ] As a user, I want any new artworks I add to the data directory to be listed, so that I don't need to modify the program every time
  <details style="padding-left: 2em">
    <summary>Tips</summary>

    Hint: `fsPromises.readdir` This is another chance to practice promises.
  
  </details>

---

## Testing

We don't always write tests that hit the filesystem, because they can be quite slow and they test more than one thing at a time. However, it will be good practice using tests and testing functions that accept callbacks!

### 5. Prepare for testing

- [ ] Put everything in place to begin writing tests
  <details style="padding-left: 2em">
    <summary>More about preparing to test</summary>

    By now you should be getting used to setting up Node programs. Here's a reminder in case you need it, but most of it is already done for you:

    1. Create an npm `package.json` file using `npm init`.
    1. Install `jest` as dev dependencies (use `-D`).
    1. Write a couple of scripts in your `package.json`:
        - one that starts the program
        - one that runs all the tests (you may wish to refer to the tdd-bowling-kata, for this)
    1. Create a `tests` directory.
    1. Write a simple initial test that proves the tests run ok.

    You'll see we've included a data directory with some text files in it. You'll need those in a bit.
  </details>

- [ ] Write tests for the functions that read and write files
  <details style="padding-left: 2em">
    <summary>More about writing tests</summary>

    It can be quite fiddly to write tests that check what gets sent to the console, so we're not going to do that now. Instead, we should focus on testing your functions that read and write files.

    One approach might be to create a very simple test file. Call it `test.txt` (or similar). Put a simple string inside, and keep it inside your `tests` directory so it doesn't have anything to do with the main program.

    This should let you test some of your functions. For example, you could check that the:
    - string returned from your read function is the same as the one you put in `test.txt`
    - number of lines in a file has changed after you write to it (hint: count the newline `\n` characters)
    - file has no lines in it after your delete comments function runs (might need to use a different test file for that one)

    If you're writing a test that changes something on the filesystem, be sure to return the state of whatever you change to normal at the end of the test.  If you're having trouble writing your tests, remember to reach out for help sooner rather than later. Be kind to yourself, and don't expect to understand everything right away.
  </details>

---

## Terminal helpers

Writing programs for the terminal will be a new experience for some. Our advice is to keep it really simple at first.

<details>
  <summary>About <code>prompt</code></summary>

  ```js
  const prompt = require('prompt')

  prompt.message = ''
  prompt.delimiter = ': '
  prompt.start()

  const choice = {
    name: 'choice',
    hidden: true,
    message: 'Make your choice'
  }

  prompt.get(choice)
    .then(result => {
      // Do something with result.choice here...
    })
  ```

  The promise returned by `prompt.get` will resolve to an object like this:

  ```js
  {
    choice: '1'
  }
  ```

  [Read the docs for more](https://www.npmjs.com/package/prompt)
</details>

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=ascii-art-reader)
