# Pickle's Picks

## Week 7 Large group project

The focus of this app is to practice using the Full Stack we teach, (with auth in place) in a large scale app.

The idea of the app is to create a blog style site for [Pickle](https://www.instagram.com/pickleapproves/) to post about places they have eaten at and review them, and for people who follow Pickle to be able to save places for them to eat at later.

As she grows in popularity, Pickle hopes to make the world (or at least Wellington) a more dog-friendly place! Not just dog-tolerant.


## The Tech

A Boilerplate is already set up for you with everything you will need to get started. This boilerplate is set up to use:

* [React](https://reactjs.org/docs/getting-started.html)
* [Redux](https://redux.js.org/)
* [Express](https://expressjs.com/en/api.html)
* [Knex.js](https://knexjs.org/)
* [Bulma (CSS framework)](https://bulma.io/documentation/)
* [Authenticare](https://www.npmjs.com/package/authenticare)

The migration and seeds for the users table, and all login functionality is already set up!

The mobile responsiveness is also being handled by some neat JS and Bulma classes, be sure to incorporate that view in your project goals!

## User Stories

### MVP

As a non-registered user:
* I want to register for the App under my name
* I want to browse a list of all the places Pickle has reviewed
* I want to read an individual review from Pickle and see any other details about it
* I want to sort the places by Pickle's rating

As a registered user:
* I want to save reviews to a "Wishlist" so I can eat at that place too!
* I want to view my saved Wishlist

### Stretch

As a registered user:
* I want to add my own rating to the places Pickle has reviewed.
* I want to add my own comment/review beneath Pickle's review so I can share my experience.
* I want to see other user's reviews of the same place when viewing a review from Pickle.
* I want to browse the places Pickle has reviewed on a map.

As Pickle:
* I want a form only I, Pickle, can access so I can upload a new review.

---

## Views (Client Side)

| name | purpose |
| --- | --- |
| Login | View for user to enter their login credentials |
| Register | View for user to sign up |
| Home | Welcome users and link to reviews |
| Review | View a Pickle review of an individual place |
| ReviewList | View the reviews Pickle has made |
| SavedList | View places/reviews saved by the user |
| ReviewMap | View the places reviewed on a map (Stretch) |


## Reducers (Client Side)

| name | purpose |
| --- | --- |
| auth | Store information regarding user logins, auth status and auth errors |
| reviews | Store the array of reviews (from db) |
| saved | Store the array containing ids of saved reviews (from db) |


## Actions (Client Side)

| type | data | purpose |
| --- | --- | --- |
| RECEIVE_REVIEWS | reviews | Follows retrieving the reviews from the server |
| RECEIVE_SAVED | saved | Follows retrieving the ids of saved reviews from the server |
| SAVE_REVIEW | id | For adding a new saved review |

## API (Client - Server)

| Method | Endpoint | Protected | Usage | Response |
| --- | --- | --- | --- | --- |
| Post | /api/auth/login | Yes | Log In a User | The Users JWT Token |
| Post | /api/auth/register | Yes | Register a User | The Users JWT Token |
| Get | /api/reviews | No | Get the list of Pickle reviews | Array of Objects (object = a review) |
| Get | /api/reviews/saved | Yes | Get the list of reviews a user has saved | Array of ints (int = an id) |
| Post | /api/reviews/saved | Yes | Add a saved review to the db | 201 status code |

## DB (Server Side)

There should be three tables for MVP. You may want/need to add additional columns or tables.

### Reviews

| Column Name | Data Type | Purpose |
| --- | --- | --- |
| id | integer | Unique identifier for each review |
| location | string | Name of the place reviewed |
| title | string | Synopsis of the review for easy viewing |
| text | text | Pickle's full review! |
| rating | integer | Number from 1-5 of Pickle's approval |
| date | date | When Pickle visited the place |

### Users

| Column Name | Data Type | Purpose |
| --- | --- | --- |
| id | integer | Unique identifier for each user |
| username | string | Used for login |
| email_address | string | So pickle can contact her fans :wink: |
| hash | text | Hashed login password |

### Saved Reviews (Many to Many / join table)

| Column Name | Data Type | Purpose |
| --- | --- | --- |
| id | integer | Unique identifier |
| user_id | integer | Which user saved the review |
| review_id | integer | Which review was saved |

## Authentication

Authentication is already set up in this project using the node module [authenticare](https://www.npmjs.com/package/authenticare). Users are currently able to login, logout, and register and all user information will be stored in a table in our database.

If you wish to dive deeper on authenticare, docs are avalable [here](https://github.com/enspiral-dev-academy/authenticare/tree/main/docs). Of particular note are `getEncodedToken` and `getTokenDecoder` as they deal with how you add a token to your request and secure server routes respectively.


---

## Setup

Run the following commands in your terminal:

```sh
npm install
npx knex migrate:latest
npx knex seed:run
cp .env.example .env
```

To run in development:
```sh
npm run dev
```

To run in production:
```sh
npm start
```


## Heroku!!!

### Creating your app

Create your app with `heroku create [name]`

You can check that this was successful by running `heroku apps` to view a list of your apps


### Adding postgres

Add postgresql (hobby dev) to your app at `https://dashboard.heroku.com/apps/[APP NAME HERE]/resources`

Check that pg has been added by running `heroku addons` to ensure the postgresql db is on your app


### Deploying!

I have created several npm scripts that will be useful for deploying your app to heroku easily.

To push your local master branch to your heroku app:
```sh
npm run h:deploy
```

Run heroku migrations:
```sh
npm run h:migrate
```

Run heroku seeds:
```sh
npm run h:seed
```

If ever you need to rollback, you can also:
```sh
npm run h:rollback
```


### Ta-Da!
Your app should be deployed!

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=lost-and-found)
