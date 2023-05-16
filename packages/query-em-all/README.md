# Async Redux

User stories for practice with async actions in Redux. We'll be using Reddit, a site where users share posts in a forum, called a subreddit.

## Setup

### 0. Cloning and installation
- [ ] Clone this repo, navigate to it, install packages, and start the server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    ```sh
    cd async-redux-stories
    npm i
    npm run dev
    ```
  </details>

---

## Requirements

### 1. Displaying info from Reddit
- [x] As a user, I want to click a button and retrieve a list of post titles from the New Zealand subreddit so that I can read about what's going on in New Zealand
  <details style="padding-left: 2em">
    <summary>How does it work?</summary>
    
  This one is done for you! Take a look at it anyway to see how it works. In particular, identify:
  
    - the **components** involved
    - the **action** and **action creator**. Take a good look at `fetchPosts` in particular. What does it return?
    - the **reducer**
    - the **api request** in the client and matching **route** in the server
  
  The DevTools setup is a little different when you're using middleware: check out the [docs](https://github.com/zalmoxisus/redux-devtools-extension) for more details

  </details>

- [ ] As a user, I want to be able to enter a new subreddit to view the titles from so that I can see what else is happening on Reddit
  <details style="padding-left: 2em">
    <summary>More about specifying the subreddit</summary>
 
    Initially, the subreddit is hardcoded into the `onClick` handler of the `<LoadSubreddit>` component. If you use the component's state to keep track of the subreddit (using `onChange`), you'll be able to add it to the action you dispatch.
  </details>

- [ ] As a user, I want to view not just the title, but also a date and time and a short summary of each post so that I can preview the content
  <details style="padding-left: 2em">
    <summary>More about post details</summary>
    
    Reddit returns us the time a post was created in seconds, if you find your date is far in the past try multiplying it by 1000 to use milliseconds instead
  </details>

### 2. Adding another API
- [ ] As a user, I want to incorporate another API and I don't care which one! So that I can, y'know, have another API to look at
  <details style="padding-left: 2em">
    <summary>More about additional APIs</summary>
    
    Take the opportunity to practice the process by retrieving data from another API using async actions. Use the same overall structure, returning a thunk from your action creator.
  </details>

----

## Stretch

<details>
  <summary>More about stretch challenges</summary>

  - As a user, I want to be able to sort the list of posts by title and post date so that I can organise my results
  - As a user, I want to be able to sort in both ascending and descending order so that I can see the start and end of the list
  - As a user, I want to filter the list of posts based on a search that I type so that I can find the post I'm looking for
</details>

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=async-redux-stories)
