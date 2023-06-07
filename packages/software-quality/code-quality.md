# Code quality

## Description

The quality of the application overall will also take into account the quality and maintainability of the code itself. How easy is it to understand what is happening in the code, locate the source of bugs, and make updates? Are there clear patterns to how new code should be written? If you do make a change, how likely is it to have unexpected consequences elsewhere in the app? Below are some ways to ensure a quality developer experience, even if you are a team of one.

Possible code quality measures you might implement...

Covered in our curriculum:
* use eslint and prettier.js. Your code adheres to the pre-generated patterns provided by Dev Academy project templates. Linting runs without errors or warnings
* apply separation of concerns. Here is [an article using React as an example](https://engineering.teknasyon.com/separation-of-concerns-on-the-front-end-with-react-fd5d4afcc298). Generally, files will be shorter than 100 lines and contain only closely related code functionality. Functions will serve a single purpose
* [avoid side effects of functions](https://www.freecodecamp.org/news/pure-function-vs-impure-function/)
* apply consistent code conventions. Similar tasks in your code should be accomplished the same way everywhere, for example using if/else vs ternaries vs logical conjunctions (&&), or using typescript interfaces vs types

Additional to our standard curriculum:
* use [meaningful commenting](https://swimm.io/learn/code-collaboration/comments-in-code-best-practices-and-mistakes-to-avoid/)
* use [consistent and readable naming conventions](https://blog.taboola.com/beginners-guide-for-naming-things-in-your-code/)
* [avoid mutation of data](https://alistapart.com/article/why-mutation-can-be-scary/)
* other code quality measures of your choosing

### Tips
* Use `npm run lint` to see whether your code lints successfully
* Optional: 
  * Watch [this video on kind code reviews](https://youtu.be/aDDUmdzzpS8)
  * Create a draft pull request of your challenge branch against the cohort repo
  * Recruit a classmate to watch the video and code review your changes checking for:
    * Consistent and understandable naming conventions
    * Consistent code conventions
    * Separation of concerns
    * Meaningful comments
  * Make updates based on their review
  * Make yourself available to code review for someone else

  This is great practice for getting feedback on your code, which is something you'll encounter both here at Dev Academy and (hopefully) in software teams in industry.


## Learning objective(s)

2. Demonstrate an understanding of quality practices for software development, such as automated testing, performance, and security

## Required
Choose and implement two [software quality measures](../software-quality/) to complete CP02.

## Requirements

* I have selected and implemented any **two** code quality measures, either from the list above or of my own choosing
* I have included a comment in my CP02 submission to tell the facilitator which code quality measures I have selected and implemented
* **Check:** My application runs and I have implemented at least two of the above code quality measures, and I have included a comment on CP02 to explain which code quality measures I have selected and implemented
* **Submit:** I have checked what I am submitting does the above, and I have posted a link to my branch or commit(s) that displays the criteria
