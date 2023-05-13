# TypeScript Kata

This repo contains a collection of exercises to help you get a first introduction to TypeScript.

Technically, it's a collection of tests, but at the moment, all the tests are broken as the functions they call need to be implemented in TypeScript.

Check out the video here for more of an intro: [[video]](https://youtu.be/gespcv4r1xU)

## Setup / running this repo

- `npm install`
- checkout a branch
- run the tests

The files in this repo are numbered, and are meant to be completed in order as concepts in one file might be used by a later file. You will find all the functions to complete in the `functions` folder.

## Running individual tests

As you will need to implement the functions in the `functions` folder for tests to run, it is advised to run the tests individually to begin with. Check out the `functions` folder to see the files and functions you need to implement.

To run the test for the first function in `1-types.ts` (getGreeting), run `npm test getGreeting`. Follow this pattern for the other functions in all our files:

```sh
npm test <functionName>
```
  <details style="padding-left: 2em">
    <summary>More about running tests</summary>

Once you have implemented all the functions in a file, you can run all the tests with `npm test <filename>`, eg:

```bash 
npm test 1-types
npm test 2-functions
// etc...
```

The stretch files can be run individually, or by running `npm test stretch`.

  </details>

## What is TypeScript?

[TypeScript](https://www.typescriptlang.org/) is a superset of JavaScript, meaning it is JavaScript with extra features. 

  <details style="padding-left: 2em">
    <summary>More about TypeScript</summary>

TypeScript cares about the "shape" of our data . For example, we can't change a variable from a string to a number, or pass a number to a function that expects a string.

It is a "statically typed" language, meaning that the types of variables and functions are known at compile time, rather than at runtime. Using node modules to help us, VSCode can help us write TypeScript code, and will tell us if we are doing something wrong.

Check out the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html) for more info, or read on for a quick overview of the main features of TypeScript we will be exploring in this repo (there's plenty more out there!).

  </details>

## Types

TypeScript has a number of types, which are similar to those in JavaScript, but with some extra features.

### Basic types

  <details style="padding-left: 2em">
    <summary>More about basic types</summary>

- `string`, `number`, `boolean`, `null`, (etc..)
- `any` - any type
- `void` - returns nothing
- and more...

To define a variable, we can follow the variable name with the type, eg:

```ts
const myString: string = "hello"

let total: number = 0
```

but we can also let TypeScript infer the type for us, eg:

```ts
const myString = "hello"

let total = 0
```
We usually just let TypeScript infer the type for us, but it's good to know that we can define the type explicitly if we need to.

  </details>

### Functions

  <details style="padding-left: 2em">
    <summary>More about functions</summary>

In TypeScript we define the types of the parameters and the return type of a function, eg:

```ts
function add(a: number, b: number): number {
  return a + b
}
```

We can also define the types of the parameters and return type of an arrow function, eg:

```ts
const add = (a: number, b: number): number => {
  return a + b
}
```

  </details>

### Optional parameters in functions

  <details style="padding-left: 2em">
    <summary>More about optional parameters</summary>

Unlike JavaScript, TypeScript will complain if we don't pass in the expected number of parameters to a function. We can make a parameter optional by adding a `?` after the parameter name, eg:

```ts
function greet(name?: string): string {
  return name ? `Hello ${name}` : "Hello World"
}
```
  </details>

### Type aliases and Union types

  <details style="padding-left: 2em">
    <summary>More about unions and type aliases</summary>

Sometimes it's useful to have another name for a type. We can use a type alias for this, eg:

```ts
type MyString = string
```

> Note: the `type` keyword and that the name of the type is capitalised.

Type aliasing is commonly used with a union type, which is a type that can be one of a number of types, eg:

```ts
type MyStringOrNumber = string | number
```

These can both also be used in functions, eg:

```ts
function log(value: string | number): void {
  console.log(value)
}

// or..

type MyStringOrNumber = string | number

function log(value: MyStringOrNumber): void {
  console.log(value)
}
```
  </details>

### Arrays

  <details style="padding-left: 2em">
    <summary>More about arrays</summary>

When identifying the type of an array we need to know what the contents of the array will be, eg:

```ts
const myArray = [1, 2, 3]
```

will be inferred as `number[]`, but

```ts
const myArray = [1, "2", 3]
```

will be inferred as `(number | string)[]`, a union type of `number` and `string`.

When arrays are returned from, or passed in as parameters to functions, we need to know the type of the array (and therefore the type of the contents of the array), eg:

```ts
function sum(array: number[]): number {
  let total = 0
  array.forEach((num) => total += num)
  return total
}
```
  </details>

### Tuples

  <details style="padding-left: 2em">
    <summary>More about tuples</summary>

Tuples are essentially an array of a fixed length. You often know the types of a typical array, but not the length, and so Tuples are defined a little differently. Tuples are defined with square brackets, and the types of the values in the array matching their positions, eg:

```ts
const myTuple: [string, number] = ["hello", 1]
const myOtherTuple: [string, number, boolean] = ["hello", 1, true]
```
  </details>

### Objects / Interfaces

  <details style="padding-left: 2em">
    <summary>More about interfaces</summary>

We can define the shape of an object type, which is a collection of key-value pairs, using an `Interface` in TypeScript eg:

```ts
interface Person {
  name: string
  age: number
}

const mike = {
  name: 'Michael',
  age: 35
}
```
> Note that the name of the interface is capitalised.
  </details>

### Optional Interface Keys

  <details style="padding-left: 2em">
    <summary>More about optional keys</summary>

Not all keys are always needed on our objects. Interfaces will assume if we have noted a key, we should have that key to match the shape. We can make a key optional by adding a `?` after the key name, eg:

```ts
interface Person {
  name: string
  age?: number
}

const mike = {
  name: 'Michael'
}

const debbie = {
  name: 'Deborah',
  age: 32
}
```

  </details>

### Records

  <details style="padding-left: 2em">
    <summary>More about records</summary>

Sometimes we have data structures that are key-value pairs, but we don't know what keys we will have, even if we know the type of the values. We can define a record type, which is a collection of key-value pairs, eg:

```ts
let bowlingScores = {
  Michael: 10,
  Deborah: 20,
  James: 30
  Ellie: 96 
}
```
would have the type: `Record<string, number>`.

Or for a larger example:

```ts
Interface Puppy {
  id: number
  name: string
  breed: string
  img?: string
}

let pups: Record<string, Puppy[]>

pups = {
  Deborah: [
    {
      id: 1,
      name: 'Bruno'
      breed: 'Labrador',
    },
    {
      id: 2,
      name: 'Lola'
      breed: 'Poodle',
    }
  ]
  Michael: [
    {
      id: 2,
      name: 'Lola'
      breed: 'Poodle',
    }
  ]
}

```
  </details>

## Stretch

The above are the core pieces that it's good to know and get familiar with for bootcamp, but some stretch has also been included in this repo around:

- passing functions as parameters
- extending interfaces
- narrowing types
- using generics

You may find these useful at some points in bootcamp, but they are supporting pieces or are less commonly going to be seen at first.

## Official Resources

There's a lot more out there to see in TypeScript! And plenty of resources out there to help you. The best place to start for documentation is the TypeScript site itself:

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html)
- [Official TS Cheat Sheets](https://www.typescriptlang.org/cheatsheets)

Some cool things if you're looking for even more TypeScript would be:
- [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [Enums](https://www.typescriptlang.org/docs/handbook/enums.html)

---

[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=kata-typescript)
