# Conways game of life!

## Installation

1. Clone the repository, then:
  ```shell
  cd conways
  npm i
  ```

2. Run the tests with:
  ```shell
  npm test
  ```

  You can run any single test file with the `node` command. For example:
  ```shell
  node test/overPopulated.js
  ```

## See it in action
Watch an example of it running [here](http://pmav.eu/stuff/javascript-game-of-life-v3.1.1/).

## Learn the rules
See the rules section of [the Wikipedia article](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules). The rules are amazingly simple but with those simple rules some pretty cool complexity emerges.

Note that a rule for our system is that array indices should not _wrap around_. That means when counting a cell's neighbours that a corner cell will have only three neighbours and an edge cell will have five neighbours. The rest will have eight.

## Build it!

Your're going to make your very own version of Conway's Game of Life. You'll render the game out to the console. There is a complete set of tests to code against that will really help.

## Hints

Printing to the console and getting the formatting right will be a challenge. Your instructor can help if needed, but try it for yourself first. Check out the Node package [clear](https://www.npmjs.com/package/clear).

Look at the tests! What are they expecting back from each function?

Start with easy functions that don't depend on any other functions. `overPopulated`, `underPopulated` and `ressurectable` are good ones to start with.

## Resources

Number | Name
-------|-------------------
1.     | [Tape](https://github.com/substack/tape)
2.     | [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
