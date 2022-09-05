# Bowling kata

In this challenge we're going to score a bowling game, given a set of frames. Easier said than done.

## Rules of bowling

Depending on where you're from (or your interests) you might either be very familiar or not at all certain about the rules of bowling. 

<details>
  <summary>The rules of ten-pin bowling</summary>
  
  Here we're **not** speaking of cricket, or lawn bowls! Ten pins in a lane, rental shoes that smell of disinfectant, coloured balls with holes that never seem to quite fit your fingers... **that's** the kind of bowling we want to score.

  * Each player usually gets two balls per **frame**. There are ten frames.
  * If a player knocks down all the pins with **one** ball, that's a **strike**.
    * A strike scores ten points **plus the score for the next two balls**.
  * If a player knocks down all the pins with **two** balls, that's a **spare**.
    * A spare scores ten points **plus the score for the next ball**.
  * If a player doesn't knock down all the pins in a frame, they just get one point for each pin they do manage to knock down.
  * On the tenth frame, if the first two balls contain a strike or make a spare, the player gets a third ball.
  * The maximum possible score (a "perfect game" of all strikes) is 300.

  [This WikiHow page](http://www.wikihow.com/Score-Bowling) has some more detail on how to keep score.
</details>
<br />

----

## Requirements

### 1. Score a game

We can write our code in `game.js`

- [ ] Using what we know about JavaScript, write a program which scores a full game, given all frames
  <details style="padding-left: 2em">
    <summary>More about scoring a game</summary>

    Assume we already know how many pins were knocked down in each frame. You can come up with your own way to represent that data, but we suggest you use something like this example:

    ```js
      const frames = [
        [1, 2], [6, 4], [5, 4], [10, 0], [7, 2], [10, 0], [10, 0], [5, 2], [7, 0], [4, 4]
      ]
    ```

    The score for this game is 119.
  </details>

### 2. Complex endings

- [ ] Try scoring a game with a more complex ending
  <details style="padding-left: 2em">
    <summary>A game with a complex ending</summary>

    The frames of a game with a more complex ending might look like:
    ```js
      const frames = [
        [1, 2], [6, 4], [5, 4], [10, 0], [7, 2], [10, 0], [10, 0], [5, 2], [7, 0], [10, 10, 10]
      ]
    ```
    
    The score for this game is 141.
  </details>

### 3. A perfect game

- [ ] Try scoring a perfect game
  <details style="padding-left: 2em">
    <summary>A perfect game</summary>

    The frames of a perfect game would look like:
    ```js
    const frames = [
      [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 0], [10, 10, 10]
    ]
    ```

    The score for this game is 300.
  </details>

If you would benefit from an interactive illustration, check out this [Bowling Score Calculator](http://www.bowlinggenius.com/).

---
## Checking your work

If we've written our code in `game.js`, we can execute it by running:
```
node game.js
```
Remember, we will only see output from running our `game.js` file if our code has `console.log` calls.

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=bowling-kata)
