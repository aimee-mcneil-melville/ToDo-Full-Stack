# Conways game of life!

## Concepts

Number | Name
-------|-------------------
1.     | [Tape](https://github.com/substack/tape)
2.     | [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
3.     | [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

## Setting up
```bash
  npm i
```
## See it in action
Watch an example of it running [here](http://pmav.eu/stuff/javascript-game-of-life-v3.1.1/)

## Learn the rules
See the rules section of [wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
The rules are amazingly simple but with those simple rules some pretty cool complexity emerges.

Note that a rule for our system is that array indices should not 'wrap around.' That means when counting a cell's neighbours that a corner cell will have only three neighbours and an edge cell will have five neighbours. The rest will have eight.

## Build it!

Your're going to make your very own version of conways game of life. You'll render the game out to the console. There is a complete set of tests to code against that will really help.

## Hints

Printing to the console and getting the formatting right will be a challenge. Your instructor can help if needed, but try it for yourself first. Check out the node module 'clear.'

Look at the tests! What are they expecting back from each function?

Start with easy functions that don't depend on any other functions. overPopulated, underPopulated and ressurectable are good ones to start with.

You can run all the test with ```npm test``` or you can run any single test file with the node command eg ```node test/overPopulated.js```
