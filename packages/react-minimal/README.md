# React minimal

As part of an introduction to React, this repo attempts to show React in a basic implementation.

Learning objectives:
1. Many components can be simple functions
1. Data to render in the component is passed in as props
1. Assemble other components by importing them and calling them

## Setup

### 0. Cloning and installation
- [ ] Clone this repo, navigate to it, install packages, and start the server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    ```sh
    npm install
    npm run dev
    ```
  </details>

---

## Requirements

### 1. Adding components
- [ ] Add new mount points and render components into them
- [ ] Add new components and use them inside existing components

### 2. Nested data
- [ ] Render complex data structures (objects in objects) as props

### 3. Scripts
- [ ] Check out the `npm run dev` script and the `webpack.config.js` file

### 4. Child components
- [ ] Conditionally show child components using a ternary operator
- [ ] Create child components from an array of data using `.map()`

---

## About the server

<details>
  <summary>Why a simple Node server?</summary>

  If you've worked with React before, you might be wondering "Why does this project use a Node server and not `webpack-dev-server`?"
  
  When most students see this repo for the first time, they are likely proficient with Node/Express, but not React or Webpack. We've chosen not to introduce the concept of client/server, even though we admittedly don't need a server here. We will introduce `webpack-dev-server` later. Today we just want to focus on React concepts.
</details>

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=react-minimal)
