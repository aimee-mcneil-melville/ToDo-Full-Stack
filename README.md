# Data Structures

## Intro

cd into the directory and run `npm install` (this could take a while).

## Part 1: Kata with tape

Take a look at the [tape](https://www.npmjs.com/package/tape) docs.

Run the kata tests with `npm run test` (have a look in package.json to see what this is doing)

Make them pass.

## Part 2: Mini-app with browserify and tape.

1. Take a look at the [browserify](https://www.npmjs.com/package/browserify) npm docs.

Don't worry if this doesn't make sense.

There is [a much more detailed Browserify Handbook](https://github.com/substack/browserify-handbook)

2. Browserify the `index.js` transforming it into `bundle.js`.

Open up your `bundle.js` and take a look at it. What has browserify done!!??

3. Browserify the app/index.js

Now we're going to write node-style code with module.exports and use browserify to convert it into browser compatible code.

Take a look at the app/ folder and get familiar with the require paths in app/index.js

Browserifying on the fly as we make file changes can be a hassle to setup. This has been done for you with the command: `npm run app`. We'll dig into how this works later.

Run the above command to start serving the app.

---

## Resources

Number | Name
-------|-------------------
1.     | [JavaScript data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
2.     | [Browserify](https://www.npmjs.com/package/browserify)
3.     | [Tape](https://www.npmjs.com/package/tape)
