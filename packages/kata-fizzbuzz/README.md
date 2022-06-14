# kata-fizzbuzz

## Rules of FizzBuzz

For any given number:
- A multiple of 3 should be replaced with the string "Fizz"
- A multiple of 5 should be replaced with the string "Buzz"
- If a number is a multiple of both 3 and 5, it should be replaced with the string "FizzBuzz"
- Any other number should remain unchanged

## Extra Special Rules
- The rules above should work for negative numbers too.
- Any non-number should be replaced with the string "Bonk"

## Running your file

There is a file in this project is called `fizzbuzz.js`. To run this file use the command:

```sh
node fizzbuzz
```

To see some output from the file you will need to make sure you use `console.log` to print it out.

## Release 1

You have been provided an array (`arr1`) with the numbers 1 - 10. Create and print out a version of this array that has had the FizzBuzz rules applied to it.

```js
const arr1 = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
// [ 1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz" ]
```

## Release 2

You have been provided an array (`arr2`) with an assortment of numbers. Create and print out a version of this array that has had the FizzBuzz rules applied to it.

```js
const arr2 = [ 12, 22, 45, 47, 15, 63, 7 ]
// [ "Fizz", 22, "FizzBuzz", 47, "Buzz", "Fizz", 7 ]
```

## Release 3

You have been provided an array (`arr3`). Create and print out a version of this array that has had the FizzBuzz rules, including the extra special rules, applied to it.

```js
const arr3 = [ 17, -12, "hello", 5, 23, 60, -7, null, 13 ]
// [ 17, "Fizz", "Bonk", "Buzz", 23, "FizzBuzz", -7, "Bonk", 13 ]
```

## Release 4

Time to refactor! Make sure your code to 'fizzbuzz-ify the array' is contained in a function. We should be able to pass it an array, and it should return us the new array, i.e. if we wrote the following code it should print out the result for arr1.

```js
const result = fizzbuzz(arr1)
console.log(result)
```

Read over the code you have written so far. How could you make it more readable? Are there any different ways you could write the same functionality now that you have made it work?

## Release 5

Rather than using our arrays, create your own! Use a loop to create a new array full of numbers, perhaps from 1 - 10 like `arr1`. The next step will be to make the loop (and therefore the array it creates) adjustable. Create a variable `max` and alter your code so if the variable `max` equals 20, your array will contain the numbers 1 - 20. This generated array should then be passed to your fizzbuzz function and the result printed on the terminal.

## Release 6

We want to let our users generate their own fizzbuzz sequence without having to open our code and change it. We will now call out file and include the max number in the command, e.g.:

```sh
> node fizzbuzz 15
```

As a reminder, `process.argv` will give you access to any strings used in the terminal when you call a js file, so use this to set your `max` and log the result.

```sh
> node fizzbuzz 7
[ 1, 2, "Fizz", 4, "Buzz", "Fizz", 7 ]
```

## Release 7

Printing an array all at once isn't that exciting for our users. Use something like `setTimeout` or `setInterval` to create a delay of a second (or less) and print out the elements of the array one after the other. Some tricky questions might come up during this. How will you wait for one to be printed before calling the next one? How will you know you've reached the end?

The result should be that when we ask our computer to `node fizzbuzz 100`, it appears to count up and play a game of fizzbuzz with us!

```sh
> node fizzbuzz 100
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
.
.
.
.
etc :)
```
