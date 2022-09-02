# Lost and Found

## Week 7 Large group project

The focus of this app is to practice using the Full Stack we teach, (with auth) in a large scale app.

The idea of the app is to create a "billboard" style site for people to post about their animals that have gone missing, and for people who have found stray animals to post about them.

The hope is that within a small community this could be a great go to for making sure those run-away floofs make it home safely.


## The Tech

A Boilerplate is already set up for you (Thanks Harrison!) with everything you will need to get started. This boilerplate is set up to use:

* [React](https://reactjs.org/docs/getting-started.html)
* [Redux](https://redux.js.org/)
* [Express](https://expressjs.com/en/api.html)
* [Knex.js (SQL)](https://knexjs.org/)
* [Bulma (CSS framework)](https://bulma.io/documentation/)
* [JWT Auth (Local)](https://jwt.io/)

The Migration and seeds for the users table, and all login functionality is already set up!

The mobile responsiveness is also being handled by some neat JS and Bulma classes, be sure to incorporate that view in your project goals!

## User Stories

### MVP

As a non-registered user:
  * I want to register for the App under my name
  * I want to browse all of the "Found" animals on the site.
  * I want to to view a list of "Lost" animals posted to the site.
  * I want to sort the "Lost" or Found" animals by species. (such as Cat / Dog)

As a registered user:
  * I want to see the contact information for the user that has found an animal that is mine.
  * I want to be able to inform a user that their "Found" animal is mine through the app, and provide them with contact information of my own.
  * I want to be able to post about a Lost animal that I have "Found"
  * I want to be able to post about an animal of my own that has been "Lost"

### Stretch

As an unregistered user:
  * I want to be able to see a list of all the Animals that have been "Found" after being posted as lost within the site, to give me hope <3

As a registered user:
  * I want to be able to remove a lost animal that I have posted, as it has been "Found" / Mark it as found.
  * I want to be able to edit a post I have made about a Lost animal of mine
  * I want to be able to edit a post I have made about a Found animal of mine

  ---

## Views (Client Side)
  | name | purpose |
  | --- | --- |
  | Login | View for user to enter their login credentials |
  | Register | View for user to sign up for the App |
  | Home | Welcome users and link to pet pages |
  | FoundPets | View the pets that users have found |
  | LostPets | View the pets that users have reported as lost |
  | LostForm | For a User to add a pet that they have lost |
  | FoundForm | For a user to add a pet that they have found |


## Reducers (Client Side)

  | name | purpose |
  | --- | --- |
  | auth | Store information regarding user logins, auth status and auth errors |
  | foundPets | Store the array of pets that have been found (from db) |
  | lostPets | Store the array of pets that have been lost (from db) |


## Actions (Client Side)

  | type | data | purpose |
  | --- | --- | --- |
  | RECEIVE_FOUND_PETS | pets | For retreving the found pets from the server response |
  | ADD_FOUND_PET | pet | For adding a found pet to the client store after is had been added to the db |
  | RECEIVE_LOST_PETS | pets | For retreving the lost pets from the server response |
  | ADD_LOST_PET | pet | For adding lost a pet to the client store after is had been added to the db |


## API (Client - Server)

| Method | Endpoint | Protected | Usage | Response |
| --- | --- | --- | --- | --- |
| Post | /api/auth/login | Yes | Log In a User | The Users JWT Token |
| Post | /api/auth/register | Yes | Register a User | The Users JWT Token |
| Get | /api/lost | No | Get the list of lost pets | Array of Objects (object = A Lost Pet) |
| Get | /api/found | No | Get the list of found pets | Array of Objects (object = A Found Pet) |
| Post | /api/lost | Yes | Add a Lost pet to the db | The Pet that was added (as an object) |
| Post | /api/found | Yes | Add a Found pet to the db | The Pet that was added (as an object) |

## DB (Server Side) -
  There should be three tables for MVP. You may want/need to add additional columns or tables.

### Lost
  | Column Name | Data Type | Purpose |
  | --- | --- | --- |
  | id | Integer | Unique identifier for each lost animal |
  | name | String | Name of Lost animal, because names are special <3 |
  | species | String | What kind of animal is it? |
  | photo | string | URL of a picture of the lost animal |
  | user_id | integer | Id of the user who reported the animal as lost |


### Found
  | Column Name | Data Type | Purpose |
  | --- | --- | --- |
  | id | Integer | Unique identifier for each found animal |
  | species | String | What kind of animal is it? |
  | photo | string | URL of a picture of the found animal |
  | user_id | integer | Id of the user who found the lost animal |

### Users (Join Table M2M)

  Many Users to Many Pets

 | Column Name | Data Type | Purpose |
 | --- | --- | --- |
 | id | Integer | Unique identifier for each user |
 | username | string | Used for login |
 | contact_details | string | displayed for contact information |
 | email_address | string | displayed for contact information |
 | hash | text | hashed login password |
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
