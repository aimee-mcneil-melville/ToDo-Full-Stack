# Bowling kata

In this challenge you're going to score a bowling game. Sound simple? Just wait...


## Rules of bowling

Depending on where you're from (or your interests) you might either be very familiar or not at all certain about the rules of bowling. Here we're _not_ speaking of cricket, or lawn bowls! Ten pins in a lane, rental shoes that smell of disinfectant, coloured balls with holes that never seem to quite fit your fingers... _that's_ the kind of bowling we want you to score.

 * Each player usually gets two balls per **frame**. There are ten frames.
 * If a player knocks down all the pins with _one_ ball, that's a **strike**.
   * A strike scores ten points _plus the score for the next two balls_.
 * If a player knocks down all the pins with _two_ balls, that's a **spare**.
   * A spare scores ten points _plus the score for the next ball_. 
 * If a player doesn't knock down all the pins in a frame, they just get one point for each pin they do manage to knock down.
 * On the tenth frame, if the first two balls contain a strike or make a spare, the player gets a third ball.
 * The maximum possible score (a "perfect game" of all strikes) is 300.

[This WikiHow page](http://www.wikihow.com/Score-Bowling) has some more detail on how to keep score.


## Writing it in JavaScript

Using what you already know about the language, write a program which scores a game assuming you already know how many pins were knocked down in each frame. You can come up with your own way to represent that data, but we suggest you use something like this example:

```js
  const frames = [
    [1, 2], [6, 4], [5, 4], [10, 0], [7, 2], [10, 0], [10, 0], [5, 2], [7, 0], [4, 4]
  ]
```

The score for this game is 119.


## Complex endings

If you manage to complete the previous example, try a game with a more complex ending:

```js
  const frames = [
    [1, 2], [6, 4], [5, 4], [10, 0], [7, 2], [10, 0], [10, 0], [5, 2], [7, 0], [10, 10, 10]
  ]
```

The score for this game is 141.

## Perfect Game

```js
const frames = [
  [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 10, 10]
]
```

The score for this game is 300.

If you would benefit from an interactive illustration, check out this [Bowling Score Calculator](http://www.bowlinggenius.com/).

You can write your code in `game.js`. To run your code you can just run:
```
node game.js
```
Remember, you will only see output from running your game.js file if your code has `console.log` calls.
