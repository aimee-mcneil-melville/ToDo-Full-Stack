# Charlotte's Web Log

In this exercise, we're going to use modular React components to build a blog for Charlotte. The text content and a wireframe showing the suggested layout have been provided.

![Charlotte's Web logo](charlottes-web.png)

## Setup

### 0. Cloning and installation

- [ ] Clone this repo, and from the repo's folder, install packages, and run the dev server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

  Your terminal commands probably look like:

  ```sh
  git clone [url to this repo]
  cd charlottes-web-log
  npm install
  npm run dev
  ```

  This will start a [vite](https://vitejs.dev) dev server at http://localhost:5174/
  </details>

---

## Requirements

Our task is to create all of the components that comprise the page and wire up data for the component to render. One approach would be to create the HTML of the page with static data first, and afterwards, decompose the page into the components below.

### 1. Get familiar with the assets

- [ ] Investigate the `client/data` folder
  <details style="padding-left: 2em">
    <summary>More about using the provided data</summary>

  The data for the blog, excerpts from the [book](https://en.wikipedia.org/wiki/Charlotte%27s_Web), can be found in the `client/data` folder.

  We will need to import the data into:

  - `Footer.tsx` (e.g. `import data from '../data/footer'`)
  - `Header.tsx`
  - `Posts.tsx`
  - `OtherBlogs.tsx`
  - `RecentEntries.tsx`

  and for those that need children, pass the needed data to their child components (e.g. `Post.tsx`) using [props](https://beta.reactjs.org/learn/passing-props-to-a-component).

  Here's an example of how you may use that data in your components:

  ```tsx
  import postData from '../data/posts'
  import Post from './Post'

  function Posts() {
    return (
      <div>
        {postData.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    )
  }

  export default Posts
  ```

  and how that `Post` component may be defined

  ```tsx
  interface Props {
    id: number
    title: string
    date: string
    commentCount: number
    paragraphs: string[]
  }

  function Post(props: Props) {
    return (
      <div>
        <h3>{props.title}</h3>
        ...
      </div>
    )
  }

  export default Post
  ```

  </details>

- [ ] Understand the design requirements
  <details style="padding-left: 2em">
    <summary>More about design requirements</summary>

  Try to not use a UI framework like Bootstrap. Rather, try to use the CSS Flexbox. Also, consider applying a class to each component using `className` (instead of the `class` we use in HTML) to **namespace** the styles of each component.

  Here is the rough layout we are trying to achieve:

  ![Wireframe of the homepage, header at top, footer at bottom. The main content of the page is a three-column layout with "Other blogs" on the left, "Posts" in the centre and "Recent entries" on the right](basic-layout.png)

  </details>

### 2. App, Header, and Footer

- [x] `App`: already in place, we'll hold our other components within this one as you build them
- [ ] `Header`: build the header of the page
- [ ] `Footer`: build the footer of the page

### 3. Posts

- [ ] `Posts`: build a container to hold all posts
- [ ] `Post`: build the component for a single post

### 4. Other blogs

- [ ] `OtherBlogs`: build a container to hold the list of other blogs
- [ ] `OtherBlog`: build the component for a single blog link

### 5. Recent entries

- [ ] `RecentEntries`: build a container to hold the list of recent entries
- [ ] `RecentEntry`: build the component for a single entry

---

## Stretch

<details>
  <summary>More about stretch challenges</summary>
  
  Because the paragraphs are arrays of strings React asks us to use a key to make them distinct. If you check the console in your browser's dev tools, you'll see a warning (unless you've already used a creative way to mitigate it).

[The rules of keys](https://beta.reactjs.org/learn/rendering-lists#rules-of-keys) give you methods to think about how to choose a good value for key.

Since paragraphs in a blog post don't change order it's safe to use their index in the array as their key... but for a stretch, use [`hash-string`](https://www.npmjs.com/package/hash-string) to create and use a hash of the paragraph's text as the key.

</details>

---

[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=charlottes-web-log)
