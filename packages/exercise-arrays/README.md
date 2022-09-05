# Array Exercise

This is a kata that explores testing and the array commands: `forEach`, `map`, `filter`, `find`, and `reduce`

## Setup

### 0. Clone and install
- [ ] After cloning this repo, run `npm install`

---
## Requirements

Instructions can also be found in `index.js` and `lib.test.js`

### 1. Looping
- [ ] Use a for loop over the provided array and console log each item
- [ ] Use the array method `forEach` to do the same thing

### 2. Map, Filter, Find
- [ ] Use the array method `map` to return an array where each item has had 1 added to it
- [ ] Use the array method `filter` to return an array with only even numbers
- [ ] Use the array method `find` to return the first number that is greater than 4

### 3. Reduce
- [ ] Use the array method `reduce` to return the sum of all array elements added together
- [ ] Use the array method `reduce` to replicate the map, filter and find functionality you built in section 2

----
### 4. Refactor for practice

Refactor your code so that...
- [ ] at least one function is defined as an anonymous function
  <details style="padding-left: 2em">
    <summary>Example</summary>

    ```
    arr.map(function fnName(item) {???})
    ```
  </details>
- [ ] at least one function is using an ES6 arrow function with an **implicit** return, and at least one uses an arrow function with an **explicit** return
  <details style="padding-left: 2em">
    <summary>Examples</summary>

    ```
    // Implicit return
    arr.map(item => ???)
    
    // Explicit return
    arr.map(item => {return ???})
    ```
  </details>
- [ ] at least one is using a named function as an argument
  <details style="padding-left: 2em">
    <summary>Example</summary>

    ```
    arr.map(doSomething)
    ```
  </details>

### 5. Refactor for testability

- [ ] Extract four core functions from `index.js` into `lib.js`
  - `addOneToArray`
  - `filterEvenNumbers`
  - `findFirstOverFour`
  - `sumArray`

- [ ] Using jest, write at least one test for each function

## Stretch
<details>
  <summary>More about stretch challenges</summary>

  If you've completed this kata with a partner, next try:
  - completing it solo while referring to notes
  - completing it solo from memory, without notes
</details>

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=exercise-arrays)
