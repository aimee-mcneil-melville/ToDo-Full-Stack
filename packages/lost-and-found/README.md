# Lost and Found

## Week 7 Large group project

The focus of this app is to practice using the full stack we teach in a large scale app.

The idea of the app is to create a "billboard" style site for people to post about their animals that have gone missing, and for people who have found stray animals to post about them.

The hope is that within a small community this could be a great go to for making sure those run-away floofs make it home safely.

## The Tech

A Boilerplate is already set up for you with everything you will need to get started. This boilerplate is set up to use:

* [React](https://reactjs.org/docs/getting-started.html)
* [Redux](https://redux.js.org/)
* [Express](https://expressjs.com/en/api.html)
* [Knex.js](https://knexjs.org/)
* [Auth0](https://www.auth0.com)
* [Bulma (CSS framework)](https://bulma.io/documentation/)

The mobile responsiveness is being handled by some neat JS and Bulma classes, be sure to incorporate this perspective in your project goals!

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
  | Login | Welcome unregistered users and encourage them to login / sign up |
  | Home | Welcome registered users and display links to pet pages |
  | FoundPets | View the pets that users have found |
  | FoundForm | For a registered user to add a pet that they have found |
  | LostPets | View the pets that users have reported as lost |
  | LostForm | For a registered user to add a pet that they have lost |

## Reducers (Client Side)

  | name | purpose |
  | --- | --- |
  | foundPets | Store the array of pets that have been found (from db) |
  | lostPets | Store the array of pets that have been lost (from db) |

## Actions (Client Side)

  | type | data | purpose |
  | --- | --- | --- |
  | RECEIVE_FOUND_PETS | pets | For retrieving the found pets from the server response |
  | ADD_FOUND_PET | pet | For adding a found pet to the client store after is had been added to the db |
  | RECEIVE_LOST_PETS | pets | For retrieving the lost pets from the server response |
  | ADD_LOST_PET | pet | For adding lost a pet to the client store after is had been added to the db |

## API (Client - Server)

| Method | Endpoint | Protected | Usage | Response |
| --- | --- | --- | --- | --- |
| Get | /api/lost | No | Get the list of lost pets | Array of Objects (object = A Lost Pet) |
| Get | /api/found | No | Get the list of found pets | Array of Objects (object = A Found Pet) |
| Post | /api/lost | Yes | Add a Lost pet to the db | The Pet that was added (as an object) |
| Post | /api/found | Yes | Add a Found pet to the db | The Pet that was added (as an object) |

## DB (Server Side) -
  There should be two tables for MVP. You may want/need to add additional columns or tables.

### Lost
  | Column Name | Data Type | Purpose |
  | --- | --- | --- |
  | id | Integer | Unique identifier for each lost animal |
  | name | String | Name of Lost animal, because names are special <3 |
  | species | String | What kind of animal is it? |
  | photo | String | URL of a picture of the lost animal |
  | user_id | String | Auth0 id (aka `sub`) of the user who reported the animal as lost |
  | user_name | String | Name of the user who reported the animal as lost |
  | user_contact | String | Contact email of the user who reported the animal as lost |

### Found
  | Column Name | Data Type | Purpose |
  | --- | --- | --- |
  | id | Integer | Unique identifier for each found animal |
  | species | String | What kind of animal is it? |
  | photo | string | URL of a picture of the found animal |
  | user_id | String | Auth0 id (aka `sub`) of the user who found the animal |
  | user_name | String | Name of the user who reported the found animal |
  | user_contact | String | Contact email of the user who reported the found animal |

## Authentication

Authentication is already set up in the client side of this project using Auth0. Users are currently able to login and logout.

When you wish to protect your server side routes (those for registered users only), you may need to reference other exercises or materials.

If you wish to replace the Auth0 authentication with your own, so you can customise the login for example, you will need to update the `client/index.tsx` file of the project with your own Auth0 details.

## Setup

Run the following commands in your terminal:

```sh
npm install
npm run dev
```

To run before merging:
```sh
npm run lint
npm run format
npm run test
```

### Deploying!

There are several scripts in this project that may be useful when deploying your app to Dokku.

To push your local main branch:
```sh
npm run dokku:deploy
```

To run migrations and seeds:
```sh
npm run dokku:migrate
npm run dokku:seed
```

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=lost-and-found)
