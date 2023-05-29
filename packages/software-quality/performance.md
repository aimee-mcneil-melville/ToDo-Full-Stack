# Performance

## Description

Optimising for performance means considering the time and resources required to run our application and using them as efficiently as possible. Usually, the result is that our app is "fast" or at least is perceived as being faster. There are many ways to optimise performance on both the front end and the server. Think about your application and where you might apply performance optimisations in a practical and beneficial way.

Possible performance optimisations you might implement...

Covered in our curriculum:
* write efficient database queries (selecting only specific columns, minimal use of wildcards)

Additional to our standard curriculum:
* [optimise images](https://web.dev/fast/#optimize-your-images) (this whole page is great)
* index your SQLite database [link](https://knexjs.org/guide/schema-builder.html#index) & [link](https://stackoverflow.com/a/75819101)
* use [Gzip compression](https://blog.devgenius.io/gzip-compression-with-node-js-cc3ed74196f9)
* use [code splitting](https://sambitsahoo.com/blog/vite-code-splitting-that-works.html)
* build a [lazy loading (UI)](https://react.dev/reference/react/lazy)
* [avoid extraneous React renders](https://www.developerway.com/posts/react-re-renders-guide)
* use [skeleton loaders](https://www.npmjs.com/package/react-loading-skeleton) (purely for user perception)
* other performance optimisations of your choosing

### Tips

* Optionally, you may want to measure the performance of your application before and after making optimisations. [Lighthouse in Chrome](https://developer.chrome.com/docs/lighthouse/performance/) is a good place to start
* Our applications tend to be small and to use small data sets. It's likely that your optimisations won't make a visible difference in how "fast" your app seems to be. That's ok! Optimising for performance is a good practice generally and will come in handy as you build bigger production apps

## Learning objective(s)

2. Demonstrate an understanding of quality practices for software development, such as automated testing, performance, and security

## Required
Choose and implement two [software quality measures](../software-quality/) to complete CP02.

## Requirements

* I have selected and implemented any **two** performance optimisations, either from the list above or of my own choosing
* I have included a comment in my CP02 submission to tell the facilitator which performance optimisations I have selected and implemented
* **Check:** My application runs and I have implemented at least two of the above performance optimisations, and I have included a comment on CP02 to explain which performance optimisations I have selected and implemented
* **Submit:** I have checked what I am submitting does the above, and I have posted a link to my branch or commit(s) that displays the criteria
