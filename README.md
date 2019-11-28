# Charlotte's Web Log API

## This is an assessed exercise

Last week you created a frontend blog for Charlotte. In this exercise, you'll build an API for her blog.

![Charlotte's Web](charlottes-web.png)

## Objective

The objectives of this challenge are to:
- refresh your database querying skills
- practice exposing an API for client side consumption

## Setup

Clone this repo, and from the repo's folder

```sh
npm install
npx knex migrate:latest
npx knex seed:run
npm run dev
```

## Exercise

**Important**: Read this entire file before beginning the challenge.

### Overview

Your task is to write the API routes (and associated database queries) that will allow you to:
 - Retrieve a list of blog posts
 - Create a new blog post
 - Update an existing blog post
 - Delete a blog post
 - Retrieve comments for a particular blog post
 - Create a new comment for a particular blog post
 - Update an existing comment for a particular blog post
 - Delete a comment for a particular blog post

The React frontend, including client side components and routes, has already been written for you. As you complete each part, you will be able to see the blog take shape.

The database migrations and seeds have also already been written for you so you don't have to worry about designing the database and populating it with data.

- Write your database functions in `server/db/db.js`
- Write your API functions in `server/routes/posts.js`
- Try implementing the database and API routes one at a time (i.e. write the database query first, and then write the corresponding API route before moving on to the next database query)

> **Pro tip**: Because the frontend has been written with the specification described below, it is possible (and even encouraged) to complete this entire exercise without viewing the app in your browser. Use Postman to verify that your API is behaving according to the specification described in the rest of this file. If you build the API correctly, the frontend should _just work_.


### What's up with the paragraphs?

You will notice in the request and response payloads below that the paragraphs are _arrays of strings_. This decision is motivated more for a learning opportunity than as a real-world scenario, and you're going to need to keep this in mind when building the backend. The challenge with this approach is we can't store an array of strings in a database field and joining to a `paragraphs` table isn't the database design we're going for.

So to make this work, you need to do two things:
- `JSON.stringify` the `paragraphs` property before saving it to the database
- `JSON.parse` it after you get the value from the database, and before you send the response to the client

You can do this in either the route, the database function, or in a separate _mapping_ module. A mapping module is the most appropriate place to do it (and to convert between snake_case and camelCase), but you can choose the route or database function if you don't want to create another module.


### Routes

Here is a table of routes that you need to implement as part of this exercise:

| METHOD | ENDPOINT                                | USAGE                                      | RETURNS                     |
|--------|-----------------------------------------|--------------------------------------------|-----------------------------|
| GET    | `/v1/posts`                             | Get a list of blog posts                   | An array of blog posts      |
| POST   | `/v1/posts`                             | Add a new blog post                        | The newly created blog post |
| PUT    | `/v1/posts/:id`                         | Update an existing blog post               | The updated blog post       |
| DELETE | `/v1/posts/:id`                         | Delete an existing blog post               | Nothing (status OK)         |
| GET    | `/v1/posts/:postId/comments`            | Get a list of comments for a specific post | An array of comments        |
| POST   | `/v1/posts/:postId/comments`            | Add a new comment to a specific post       | The newly created comment   |
| PUT    | `/v1/comments/:commentId`               | Update an existing comment                 | The updated comment         |
| DELETE | `/v1/comments/:commentId`               | Delete an existing comment                 | Nothing (status OK)         |

In order to complete this exercise, the JSON responses will need conform to the following formats below:

### Request and response formats

**GET `/v1/posts`**

Response:

```json
[
  {
    "id": 123,
    "title": "Blog day 1",
    "dateCreated": 1495083077243,
    "commentCount": 2,
    "paragraphs": [
      "Today is a good day.",
      "I found a million dollars."
    ],
  }
]
```

**POST `/v1/posts`**

Request:

```json
{
  "title": "This is my post",
  "paragraphs": [
    "I like how I can post.",
    "This is fun."
  ]
}
```

Response:

```json
{
  "id": 144,
  "title": "This is my post",
  "dateCreated": 1495083077243,
  "commentCount": 0,
  "paragraphs": [
    "I like how I can post.",
    "This is fun."
  ]
}
```

**PUT `/v1/posts/:id`**

Request:

```json
{
  "id": 144,
  "title": "This is my updated post",
  "paragraphs": [
    "I like how I can update posts.",
    "It is fun."
  ]
}
```

Response:

```json
{
  "id": 144,
  "title":"This is my updated post",
  "dateCreated": 1495083077243,
  "commentCount": 0,
  "paragraphs": [
    "I like how I can update posts.",
    "It is fun."
  ]
}
```

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

**POST `/v1/posts/:postId/comments`**

Request:

```json
{
  "postId": 123,
  "comment": "I enjoyed this post."
}
```

Response:

```json
{
  "id": 144,
  "postId": 123,
  "datePosted": 1495083077243,
  "comment": "I enjoyed this post."
}
```

**PUT `/v1/comments/:commentId`**

Request:

```json
{
  "id": 144,
  "postId": 123,
  "comment": "I really enjoyed this post."
}
```

Response:

```json
{
  "id": 144,
  "postId": 123,
  "datePosted": 1495083077243,
  "comment": "I really enjoyed this post."
}
```


## Gotchas

- The database fields are snake_case, but the frontend fields are camelCase. To make this work, you need to make sure you convert the fields from snake_case to camelCase when sending from the server to the client, and camelCase to snake_case when posting to the server. Remember that you can use the `as` keyword in your Knex `select` calls to control the names of the properties that come back from your queries. If you'd rather use an external library, you may find the following links useful:
  - https://www.npmjs.com/package/camelcase-keys
  - https://lodash.com/docs/4.17.4#camelCase
  - https://lodash.com/docs/4.17.4#snakeCase
  - https://lodash.com/docs/4.17.11#mapKeys
- Instead of using `res.render` you will need to use `res.json`


## Stretch Goals

- Write some tests for your API routes using `supertest`
- Add the ability to like / dislike comments (once you have done the migrations/seeds/queries/api routes, you will need to write some front end `api` functions and `React` components to display these - have a particular look at the `client/api/index.js` and `client/components/Post.jsx` for pointers on how to add client side API routes and front end components)
