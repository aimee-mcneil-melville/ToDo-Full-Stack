# Number patterns

Your task is to write a JavaScript function for each one of these patterns. When you run the function, it should output the pattern. When you're finished (or before you start) write the tests that verify each of the functions.

Each function will accept the max number and return a multi-line string. Do **not** put calls to `console.log` inside your functions, just `console.log` the string returned. For example:

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


The spacing between the numbers isn't that important, but of course you want the output to look nice. Keeping `max` under `10` can help avoiding double-digits which keeps spacing easy.

Avoid using the `for (let i = 0; i < arr.length; i++)` form of a loop by using the array functions, `for in` and `for of` loop forms.


## 1

```
1
1 0
1 0 1
1 0 1 0
1 0 1 0 1
1 0 1 0 1 0
1 0 1 0 1 0 1
```

## 2

```
1 1 1 1 1 1 1
1 1 1 1 1 2 2
1 1 1 1 3 3 3
1 1 1 4 4 4 4
1 1 5 5 5 5 5
1 6 6 6 6 6 6
7 7 7 7 7 7 7
```

## 3

```
1 0 1 0 1 0 1
0 1 0 1 0 1 0
1 0 1 0 1 0 1
0 1 0 1 0 1 0
1 0 1 0 1 0 1
0 1 0 1 0 1 0
1 0 1 0 1 0 1
```

## 4

```
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
1 2 3 4 5 6
1 2 3 4 5 6 7
```

## 5

```
1
2 2
3 3 3
4 4 4 4
5 5 5 5 5
6 6 6 6 6 6
7 7 7 7 7 7 7
```

## 6

```
1
2 1
3 2 1
4 3 2 1
5 4 3 2 1
6 5 4 3 2 1
7 6 5 4 3 2 1
```

## 7

```
7 6 5 4 3 2 1
7 6 5 4 3 2
7 6 5 4 3
7 6 5 4
7 6 5
7 6
7
```

## 8

```
1 2 3 4 5 6 7
1 2 3 4 5 6
1 2 3 4 5
1 2 3 4
1 2 3
1 2
1
```

## 9

```
7 6 5 4 3 2 1
6 5 4 3 2 1
5 4 3 2 1
4 3 2 1
3 2 1
2 1
1

```

## 10

```
7
7 6
7 6 5
7 6 5 4
7 6 5 4 3
7 6 5 4 3 2
7 6 5 4 3 2 1
```

## 11

```
1
1 2 1
1 2 3 2 1
1 2 3 4 3 2 1
1 2 3 4 5 4 3 2 1
1 2 3 4 5 6 5 4 3 2 1
1 2 3 4 5 6 7 6 5 4 3 2 1
```

## 12

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

## 13

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

## 14

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

## 15

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

## 16

```
1
2 6
3 7 10
4 8 11 13
5 9 12 14 15
```

## 17

```
0 0 0 0 0 0 0
0 1 0 0 0 0 0
0 0 2 0 0 0 0
0 0 0 3 0 0 0
0 0 0 0 4 0 0
0 0 0 0 0 5 0
0 0 0 0 0 0 6
```

## 18

```
1
2  3
4  5  6
7  8  9  10
```
