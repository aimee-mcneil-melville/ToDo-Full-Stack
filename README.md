# Charlotte's Web Log API

Last week you created a front end blog for Charlotte. In this exercise, you'll build an API for her blog.

![Charlotte's Web](charlottes-web.png)


## Objective

The objectives of this challenge are to:

- refresh your database querying skills
- practice exposing an API for client side consumption


## Setup

Clone this repo, and from the repo's folder:

```sh
yarn
yarn knex migrate:latest
yarn knex seed:run
yarn start
```


## Exercise

**Important** Read this entire file before beginning the challenge.


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

The React front end, including client side components and routes, have already been written for you. As you complete each part, you will be able to see the blog take shape.

The database migrations and seeds have also already been written for you so you don't have to worry about populating your database with data.

- Write your database functions in `server/db/db.js`
- Write your API functions in `server/routes/posts.js`
- Try implementing the database and API routes one at a time (i.e. write the database query first, and then write the corresponding API route before moving on to the next database query)


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


### Response Formats

GET `/v1/posts`

```json
[
  {
    "id": 123,
    "title": "Blog day 1",
    "dateCreated": "22/08/1985",
    "paragraphs": "[\"Today is a good day.\",\"I found a million dollars\"]"
  }
]
```

POST `/v1/posts`

```json
{
  "id": 144,
  "title":"This is my post",
  "dateCreated":"22/07/1996",
  "paragraphs":"[\"I like how I can post.\",\"It is fun.\"]"
}
```

PUT `/v1/posts`

```json
{
  "id": 144,
  "title":"This is my updated post",
  "dateCreated":"01/01/2008",
  "paragraphs":"[\"I like how I can update posts.\",\"It is fun.\"]"
}
```

GET `/v1/posts/:postId/comments`

```json
[
  {
    "id": 36,
    "postId": 123,
    "datePosted": "03/12/1985",
    "comment": "sdfsdf"
  }
]
```

POST `/v1/posts/:postId/comments`

```json
[
  {
    "id": 36,
    "postId": 123,
    "datePosted": "03/12/1985",
    "comment": "Newly created comment"
  }
]
```

PUT `/v1/comments/:commentId`

```json
[
  {
    "id": 36,
    "postId": 123,
    "datePosted": "03/12/1985",
    "comment": "Updated comment"
  }
]
```

You may find using Postman useful when testing routes.


## Gotchas

- The `paragraphs` column in the `Posts` table is of type string and takes a **stringified array**. However, the front end will send all data relating to the `paragraphs` column as an array of strings. You will need to convert the `paragraphs` string array into a stringified array before inserting it into the database.
- Instead of using `res.render` you will need to use `res.json`.


## Stretch Goals

- Write some tests for your API routes using `supertest`.
- Add the ability to like and dislike comments. Once you have applied the migrations and seeds, and written the queries and API routes, you will need to write some front end `api` functions and `React` components to display these. Have a look at the `client/api/index.js` and `client/components/Post.jsx` files for pointers on how to add client side API routes and front end components.

