# Charlotte's Web Log

In this exercise, you're going to build a blog for Charlotte.

![Charlotte's Web](charlottes-web.png)


## Setup

Clone this repo, and from the repo's folder

```sh
npm install
npm run dev
```


# Exercise

Your task is to create all of the components that comprise the page and wire up data for the component to render. One approach would be to create the HTML of the page with static data first, and afterwards, decompose the page into the components below.

The data for the blog, excerpts from the [book](https://en.wikipedia.org/wiki/Charlotte%27s_Web), can be found in the `data` folder.

Import the data from the appropriate components and pass the needed data to the components using props.

The components that make up Charlotte's blog are:

* `App`: already in place, but could be refactored out into `App.jsx`.
* `Header`: the header of the page.
* `Footer`: the footer of the page.
* `Posts`: to hold all posts.
* `Post`: the component for a single post.
* `OtherBlogs`: to hold the list of other blogs.
* `OtherBlog`: the component for a single blog link.
* `RecentEntries`: to hold the list of recent entries.
* `RecentEntry`: the component for a single entry.

Here is a basic layout of the page:

![Basic layout](basic-layout.png)

Try to not use a UI framework like Bootstrap. Rather, try to use the CSS Flexbox. Also, consider applying a class to each component using `className` (instead of the `class` we use in HTML) to _namespace_ the styles of each component.


## Stretch

Because of the way the paragraphs are arrays of strings, there isn't currently an intuitive way to provide a `key` for the paragraph we're mapping over. If you check the console in your browser's dev tools, you'll see a warning (unless you've already used a creative way to mitigate it).

For a stretch, use [`hash-string`](https://www.npmjs.com/package/hash-string) to create and use a hash of the paragraph's text as the key.
