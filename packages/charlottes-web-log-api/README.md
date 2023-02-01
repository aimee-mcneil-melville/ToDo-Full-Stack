# Charlotte's Web Log API

Last week you created a frontend blog for Charlotte. In this exercise, you'll build an API for her blog.

Learning objectives:
1. refresh your database querying skills
1. practice exposing an API for client side consumption
1. use Insomnia to test an API

You won't need the front-end for the purposes of this challenge.

![Charlotte's Web logo](charlottes-web.png)

## Setup

### 0. Installation and migrations

- [ ] Clone this repo and `cd` into the new directory
- [ ] Install packages, run migrations and seeds, and start the dev server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    Commands might look like this:

    ```sh
    npm install
    npm run knex migrate:latest
    npm run knex seed:run
    npm run dev
    ```
  </details>

- [ ] Open Insomnia, Thunder Client, or the client of your choice for testing API calls

---

## Requirements

The database migrations and seeds have already been written for you so you don't have to worry about designing the database and populating it with data.

- Write your database functions in `server/db/db.ts`
- Write your API functions in `server/routes/posts.ts` and `server/routes/comments.ts`
- Use Insomnia or VS Code's Thunder Client extension to verify that your API is behaving according to the specification described
- Try implementing the database and API routes one at a time (i.e. write the database query first, and then write the corresponding API route before moving on to the next database query)


<details>
  <summary>Overview of all routes</summary>

  Here is a table of routes that you need to implement as part of this exercise:

  | METHOD | ENDPOINT                                | USAGE                                      | RETURNS                     |
  |--------|-----------------------------------------|--------------------------------------------|-----------------------------|
  | GET    | `/v1/posts`                             | Get a list of blog posts                   | An array of blog posts      |
  | POST   | `/v1/posts`                             | Add a new blog post                        | The newly created blog post |
  | PATCH    | `/v1/posts/:id`                         | Update an existing blog post               | The updated blog post       |
  | DELETE | `/v1/posts/:id`                         | Delete an existing blog post               | Nothing (status OK)         |
  | GET    | `/v1/posts/:postId/comments`            | Get a list of comments for a specific post | An array of comments        |
  | POST   | `/v1/posts/:postId/comments`            | Add a new comment to a specific post       | The newly created comment   |
  | PATCH    | `/v1/comments/:commentId`               | Update an existing comment                 | The updated comment         |
  | DELETE | `/v1/comments/:commentId`               | Delete an existing comment                 | Nothing (status OK)         |

  In order to complete this exercise, the JSON responses will need conform to formats in each instruction, below.

</details>
<br  />

### Things to consider

<details>
  <summary>Tips</summary>

  - Instead of using `res.render` you will need to use `res.json`
  - The database fields are snake_case, but the frontend fields are camelCase. To make this work, you need to make sure you convert the fields from snake_case to camelCase when sending from the server to the client, and camelCase to snake_case when posting to the server. Remember that you can use the `as` keyword in your Knex `select` calls to control the names of the properties that come back from your queries. 
  - Your data will need to be typed. Depending on how you code the backend, you may need to use different types to those already in the folder 'common', as these types are in camelCase for the frontend.
  - Types for promises (such as those returned from `db` functions) can be written like `Promise<___>`, with the type for the expected result written inside the angle brackets `<>`. An example of this would be `Promise<Post[]>` for a promise that results in an array of Posts.
  
</details>
<br />

---

### 1. Getting posts

- [ ] Get a list of blog posts
  <details style="padding-left: 2em">
    <summary>More about getting posts</summary>
    
    Request type and route:<br />
    **GET `/v1/posts`**

    Response:

    ```json
    [
      {
        "id": 123,
        "title": "Blog day 1",
        "dateCreated": 1495083077243,
        "text": "Today is a good day."
      }
    ]
    ```

    The above is an example of the structure of the response, not the actual data you will see on a successful request. Take note of the `[]` around the object, telling us that we have an array of posts (an array of one, in this case). Note also that `dateCreated` is in camelCase, rather than snake_case. Our actual responses will contain different data, but should have the same structure in order to work.
  </details>

### 2. Adding, updating, and deleting posts

- [ ] Add a new blog post
  <details style="padding-left: 2em">
    <summary>More about adding a post</summary>
    
    Request type and route:<br />
    **POST `/v1/posts`**

    Request body:

    ```json
    {
      "title": "This is my post",
      "text": "I like how I can post."
    }
    ```

    Response:

    ```json
    {
      "id": 144,
      "title": "This is my post",
      "dateCreated": 1495083077243,
      "text": "I like how I can post."
    }
    ```

    **Hint:** What does the `insert` knex method return? How might we use that information to generate the response data shown above?

    Rather than making a second database call to fetch the newly-created record, a more efficient approach would be to reconstruct the record based on the details given to the route, plus the information returned from the database query.
  </details>

- [ ] Update an existing blog post
  <details style="padding-left: 2em">
    <summary>More about updating a post</summary>
    
    Request type and route:<br />
    **PATCH `/v1/posts/:id`**

    Request body:

    ```json
    {
      "title": "This is my updated post",
      "text": "I like how I can update posts."
    }
    ```

    Response:

    ```json
    {
      "id": 124,
      "title":"This is my updated post",
      "dateCreated": 1495083077243,
      "text": "I like how I can update posts."
    }
    ```
  </details>

- [ ] Delete an existing blog post
  <details style="padding-left: 2em">
    <summary>More about deleting posts</summary>
    
    Request type and route:<br />
    **DELETE `/v1/posts/:id`**

    Response: Nothing (status 200 - OK)

    As the Comments table has a field called `post_id` that `references` the Posts table, you will also need to delete any comments with a foreign key matching that post.

    Comments won't be able to reference a Post that doesn't exist!
  </details>

**Hint:** You can always re-run the seeds of your database to start over with a clean set of records.

---

### 3. Getting comments

- [ ] Get a list of comments for a specific post
  <details style="padding-left: 2em">
    <summary>More about getting comments</summary>
    
    Request type and route:<br />
    **GET `/v1/posts/:postId/comments`**

    Response:

    ```json
    [
        {
            "id": 1,
            "postId": 123,
            "datePosted": 1495083077243,
            "comment": "Great blog"
        },
        {
            "id": 2,
            "postId": 123,
            "datePosted": 1495083077243,
            "comment": "Really Great blog"
        }
    ]
    ```
  </details>

### 4. Adding, updating, and deleting comments

- [ ] Add a new comment to a specific post
  <details style="padding-left: 2em">
    <summary>More about adding comments</summary>
    
    Request type and route:<br />
    **POST `/v1/posts/:postId/comments`**

    Request body:

    ```json
    {
      "comment": "I enjoyed this post."
    }
    ```

    Response:

    ```json
    {
      "id": 4,
      "postId": 123,
      "datePosted": 1495083077243,
      "comment": "I enjoyed this post."
    }
    ```
  </details>

- [ ] Update an existing comment
  <details style="padding-left: 2em">
    <summary>More about updating comments</summary>
    
    Request type and route:<br />
    **PATCH `/v1/comments/:commentId`**

    Request body:

    ```json
    {
      "comment": "I really enjoyed this post."
    }
    ```

    Response:

    ```json
    {
      "id": 2,
      "postId": 123,
      "datePosted": 1495083077243,
      "comment": "I really enjoyed this post."
    }
    ```
  </details>

- [ ] Delete an existing comment
  <details style="padding-left: 2em">
    <summary>More about deleting comments</summary>
    
    Request type and route:<br />
    **DELETE `/v1/comments/:commentId`**

    Response: Nothing (status OK)
  </details>

### 5. See it in the browser

**Once all other steps are complete...**

- [ ] Terminate your dev server and restart with an alternate run script
  <details style="padding-left: 2em">
    <summary>More about alternate scripts</summary>

    `npm run dev:all`

    Visit [http://localhost:3000](http://localhost:3000) and see Charlotte's Web Log in action. You may find that there are a couple things that didn't turn out as you expected, or everything might be perfect!
  </details>

- [ ] Troubleshoot any outstanding issues you detect in the browser

Well done!

---

## Stretch

<details>
  <summary>More about stretch challenges</summary>

  - Write some tests for your API routes using `supertest`
  - Add the ability to like / dislike comments (once you have done the migrations/seeds/queries/api routes, you will need to write some front end `api` functions and `React` components to display these - have a particular look at the `client/api/index.ts` and `client/components/Post.tsx` for pointers on how to add client side API routes and front end components)
  - Remember converting snake_case into camelCase for some db field names? This works well when converting just one or two, but could be troublesome with many. Try using an external library to handle this. You may find the following links useful:
    - https://www.npmjs.com/package/camelcase-keys
    - https://lodash.com/docs/4.17.4#camelCase
    - https://lodash.com/docs/4.17.4#snakeCase
    - https://lodash.com/docs/4.17.11#mapKeys
</details>

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=charlottes-web-log-api)
