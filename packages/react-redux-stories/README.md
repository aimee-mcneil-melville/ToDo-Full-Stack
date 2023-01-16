# React Redux Stories

User stories for practicing React and Redux by adding and removing items from a list.

## Setup

### 0. Cloning and installation
- [ ] Clone this repo, navigate to it, install packages, and start the server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    ```sh
    cd react-redux-stories
    npm i
    npm run dev
    ```
  </details>

---

## Requirements

### 1. Adding and displaying items
- [x] As a user, I want to enter a word or phrase and have it displayed in a list so that I can keep track of all my words
  <details style="padding-left: 2em">
    <summary>How does it work?</summary>
  
  This one is done for you! Take a look at it anyway to see how it works. In particular, identify:
    - the **action** and **action creator**
    - the **reducer**
    - the **components**
  
  Notice that `<AddWord>` returns JSX, but also uses `useAppDispatch` function to fire off **actions**.
  </details>

- [ ] As a user, I want to enter the URL of an image and have it display as an image on the page so that I can save all my cute animal pictures
  <details style="padding-left: 2em">
    <summary>More about adding images</summary>

  Here's an opportunity to practice everything in the previous user story. We'll need to:
    - create a new action creator in `actions/index.ts`
    - create a new reducer in `reducers/images.ts`
    - add the reducer to the `combineReducers` call in `reducers/index.ts`
    - create `<Images>` and `<Image>` components
    - create an `<AddImage>` component to enter the URL
  </details>

### 2. Deleting items
- [ ] As a user, I want to click a button next to any word and delete it from the list so that I can remove any mistakes I make
  <details style="padding-left: 2em">
    <summary>More about deleting words</summary>

    - We'll need a new action creator and a modified reducer
    - We'll probably need to add the id to the props in `<Word>`. 
    - We'll need to dispatch the new action with `useAppDispatch`
  </details>

- [ ] As a user, I want to click a button next to any image and delete it from the list so that I can get rid of pics that just aren't cute anymore

---

## Stretch

<details>
  <summary>More about stretch challenges</summary>
  
  - As a user, I want to filter words based on letters I type so that I can find the word I'm looking for
  - As a user, I want to attach a description to each image so that I can... describe it
  - As a user, I want to attach meta information in the form of one-word tags to each image so that I can classify it
  - As a user, I want to filter the list of images by tag so that I can see only some of my gallery at a time
</details>

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=react-redux-stories)
