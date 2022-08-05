# Number patterns

Your task is to write a JavaScript function for each one of these patterns. When you run the function, it should output the pattern. When you're finished (or before you start) write the tests that verify each of the functions.

## Setup

### 0. Clone and install
- [ ] After cloning this repo, run `npm install`

----
## Requirements
<details>
  <summary>Detailed requirements</summary>

  - Each function will accept the max number and return a multi-line string.
  - Do **not** put calls to `console.log` inside your functions, just `console.log` the string returned. For example:

    ```
    function fn (max) {
      let output
      // Build up a multi-line string
      // Tip: use '\n' at the end of the line to create a line break
      return output
    }

    const pattern = fn(7)
    console.log(pattern)
    ```
  - The spacing between the numbers isn't that important, but of course you want the output to look nice. Keeping `max` under `10` can help avoiding double-digits which keeps spacing easy.
  - Avoid using the `for (let i = 0; i <details arr.length; i++)` form of a loop by using the array functions, `for in` and `for of` loop forms.
</details>
<br >

### 1.

- [ ] Write a function that produces pattern 1
  <details style="padding-left: 2em">
    <summary>See the pattern</summary>

    ```
    1
    1 0
    1 0 1
    1 0 1 0
    1 0 1 0 1
    1 0 1 0 1 0
    1 0 1 0 1 0 1
    ```
  </details>

### 2.

- [ ] Write a function that produces pattern 2
  <details style="padding-left: 2em">
    <summary>See the pattern</summary>

    ```
    1 1 1 1 1 1 1
    1 1 1 1 1 2 2
    1 1 1 1 3 3 3
    1 1 1 4 4 4 4
    1 1 5 5 5 5 5
    1 6 6 6 6 6 6
    7 7 7 7 7 7 7
    ```
  </details>

### 3.

- [ ] Write a function that produces pattern 3
  <details style="padding-left: 2em">
    <summary>See the pattern</summary>

    ```
    1 0 1 0 1 0 1
    0 1 0 1 0 1 0
    1 0 1 0 1 0 1
    0 1 0 1 0 1 0
    1 0 1 0 1 0 1
    0 1 0 1 0 1 0
    1 0 1 0 1 0 1
    ```
  </details>

### 4.

- [ ] Write a function that produces pattern 4
  <details style="padding-left: 2em">
    <summary>See the pattern</summary>

    ```
    1
    1 2
    1 2 3
    1 2 3 4
    1 2 3 4 5
    1 2 3 4 5 6
    1 2 3 4 5 6 7
    ```
  </details>

### 5.

- [ ] Write a function that produces pattern 5
  <details style="padding-left: 2em">
    <summary>See the pattern</summary>

    ```
    1
    2 2
    3 3 3
    4 4 4 4
    5 5 5 5 5
    6 6 6 6 6 6
    7 7 7 7 7 7 7
    ```
  </details>

### 6.

- [ ] Write a function that produces pattern 6
  <details style="padding-left: 2em">
    <summary>See the pattern</summary>

    ```
    1
    2 1
    3 2 1
    4 3 2 1
    5 4 3 2 1
    6 5 4 3 2 1
    7 6 5 4 3 2 1
    ```
  </details>

### 7.

- [ ] Write a function that produces pattern 7
  <details style="padding-left: 2em">
    <summary>See the pattern</summary>

    ```
    7 6 5 4 3 2 1
    7 6 5 4 3 2
    7 6 5 4 3
    7 6 5 4
    7 6 5
    7 6
    7
    ```

### 8.

- [ ] Write a function that produces pattern 8
  <details style="padding-left: 2em">
    <summary>See the pattern</summary>

    ```
    1 2 3 4 5 6 7
    1 2 3 4 5 6
    1 2 3 4 5
    1 2 3 4
    1 2 3
    1 2
    1
    ```
  </details>

### 9.

- [ ] Write a function that produces pattern 9
  <details style="padding-left: 2em">
    <summary>See the pattern</summary>

    ```
    7 6 5 4 3 2 1
    6 5 4 3 2 1
    5 4 3 2 1
    4 3 2 1
    3 2 1
    2 1
    1
    ```
  </details>

### 10.

- [ ] Write a function that produces pattern 10
  <details style="padding-left: 2em">
    <summary>See the pattern</summary>

    ```
    7
    7 6
    7 6 5
    7 6 5 4
    7 6 5 4 3
    7 6 5 4 3 2
    7 6 5 4 3 2 1
    ```
  </details>

### 11.
- [ ] Write a function that produces pattern 11
  <details style="padding-left: 2em">
    <summary>See the pattern</summary>

    ```
    1
    1 2 1
    1 2 3 2 1
    1 2 3 4 3 2 1
    1 2 3 4 5 4 3 2 1
    1 2 3 4 5 6 5 4 3 2 1
    1 2 3 4 5 6 7 6 5 4 3 2 1
    ```
  </details>

### 12.
- [ ] Write a function that produces pattern 12
  <details style="padding-left: 2em">
    <summary>See the pattern</summary>

    ```
    1
    1 2
    1 2 3
    1 2 3 4
    1 2 3 4 5
    1 2 3 4 5 6
    1 2 3 4 5 6 7
    1 2 3 4 5 6
    1 2 3 4 5
    1 2 3 4
    1 2 3
    1 2
    1
    ```
  </details>

### 13.
- [ ] Write a function that produces pattern 13
  <details style="padding-left: 2em">
    <summary>See the pattern</summary>

    ```
    1 2 3 4 5 6 7
    1 2 3 4 5 6
    1 2 3 4 5
    1 2 3 4
    1 2 3
    1 2
    1
    1 2
    1 2 3
    1 2 3 4
    1 2 3 4 5
    1 2 3 4 5 6
    1 2 3 4 5 6 7
    ```
  </details>

### 14.
- [ ] Write a function that produces pattern 14
  <details style="padding-left: 2em">
    <summary>See the pattern</summary>

    ```
    1 2 3 4 5 6 7
      2 3 4 5 6 7
        3 4 5 6 7
          4 5 6 7
            5 6 7
              6 7
                7
              6 7
            5 6 7
          4 5 6 7
        3 4 5 6 7
      2 3 4 5 6 7
    1 2 3 4 5 6 7
    ```
  </details>

### 15.
- [ ] Write a function that produces pattern 15
  <details style="padding-left: 2em">
    <summary>See the pattern</summary>

    ```
    1 2 3 4 5 6 7
      1 2 3 4 5 6
        1 2 3 4 5
          1 2 3 4
            1 2 3
              1 2
                1
              1 2
            1 2 3
          1 2 3 4
        1 2 3 4 5
      1 2 3 4 5 6
    1 2 3 4 5 6 7
    ```
  </details>

### 16.
- [ ] Write a function that produces pattern 16
  <details style="padding-left: 2em">
    <summary>See the pattern</summary>

    ```
    1
    2 6
    3 7 10
    4 8 11 13
    5 9 12 14 15
    ```
  </details>

### 17.
- [ ] Write a function that produces pattern 17
  <details style="padding-left: 2em">
    <summary>See the pattern</summary>

    ```
    0 0 0 0 0 0 0
    0 1 0 0 0 0 0
    0 0 2 0 0 0 0
    0 0 0 3 0 0 0
    0 0 0 0 4 0 0
    0 0 0 0 0 5 0
    0 0 0 0 0 0 6
    ```
  </details>

### 18.
- [ ] Write a function that produces pattern 18
  <details style="padding-left: 2em">
    <summary>See the pattern</summary>

    ```
    1
    2  3
    4  5  6
    7  8  9  10
    ```
  </details>
