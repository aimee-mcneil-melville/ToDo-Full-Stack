# $how Me The Money

## Week 7 Large group project

Meetings are expensive, but sometimes we forget how expensive they are and feel the need to talk for too long about topics that are unimportant for the meeting purpose.

This is an app to display the costs of meetings, and track the costs of your meetings over time.

The idea of the App is to be able to display the real-time cost of a meeting as it occurs.
This cost is calculated based on the hourly wages of the meeting's attendees and the current duration of the meeting.

The intended effect of this App is to make meeting attendees aware of how much this time is costing the business.

## The Tech

A Boilerplate is already set up for you with everything you will need to get started. This boilerplate is set up to use:

* [React](https://reactjs.org/docs/getting-started.html)
* [Redux](https://redux.js.org/)
* [Express](https://expressjs.com/en/api.html)
* [Knex.js](https://knexjs.org/)
* [Auth0](https://www.auth0.com)
* [Bulma (CSS framework)](https://bulma.io/documentation/)

The mobile responsiveness is also being handled by some neat JS and Bulma classes, be sure to incorporate this perspective in your project goals!

## User Stories

### MVP

As a user:
  * I want to register for the App under my name, and state my hourly wage
  * I want to start a new meeting, and add all the meeting members. (MVP: Add member names and wages manually)
  * I want to start my created meeting, and see a ($) cost tracker display the current meeting cost every second
  * I want to be able to save a meeting's cost, attendees, duration, and date/time when it is finished for later viewing
  * I want to be able to view previous meetings in date/time order, and see more information about a past meeting.
  * I want to see a graph of meeting costs over time

### Stretch
  * I want to be able to select existing users of the App as meeting attendees, so that our wages don't have to be shown / inputted manually. If a meeting attendee doesn't have an account, I want to be able to manually add them to the App.
  * I want to set a Maximum Cost an Maximum Duration for my Meeting, and see colourised progress bar displaying both a these
  * I want to be able to state my yearly salary rather than hourly rate as an option on register
  * I want to be able to view all meetings that I am an attenee for, and I want information about my meetings to not be visible to all users of the app.
  * I want to create a group of regular attendees for my meeting group to make setting up my meeting easier.
  * I want to be able to write notes or summaries for meetings upon saving them.

  ---

## Views (Client Side)
  | name | purpose |
  | --- | --- |
  | Login | Welcome unregistered users and encourage them to login / sign up |
  | Home | Welcome registered users and display links to other parts of the site |
  | CreateMeeting | View for user to arrange meeting attendees and information before starting the timer |
  | Meeting | View to display current meeting time, cost and other information while the meeting is in progress |
  | History | Display a list of past meetings the user has attended with select preview information |
  | PastMeeting | Display a single meeting from the history list, displaying more information and a list of attendees for the past meeting |


## Reducers (Client Side)

  | name | purpose |
  | --- | --- |
  | currentMeeting | Track meeting progress such as current cost and current duration |
  | meetings | store the list of meetings the user has attended in the past |
  | users | store the list of users who can attend meetings |

 ## Actions

 ### meetings

 | type | data | purpose |
 | --- | --- | --- |
 | RECEIVE_MEETINGS | meetings | retrieve meetings from the db and store in redux |
 | ADD_MEETING | meeting | Add a single meeting to the history after it is created |

 ### currentMeeting

  | type | data | purpose |
| --- | --- | --- |
| START_MEETING | attendees ([]), meeting_name | a meeting has started, set initial meeting state |
| END_MEETING | null | Set meeting in progress flag to false |  
| TICK_ONE_SECOND | null | Increase running total by 1s worth of $ |
| RESET_MEETING | null | Revert to initial state |



## API (Client - Server)

| Method | Endpoint | Protected | Usage | Response |
| --- | --- | --- | --- | --- |
| Get | /api/meetings | Yes | Get a Users Meeting Histroy | An Array of Meetings |
| Post | /api/meetings | Yes | Save a completed meeting | The Meeting that has been saved in db read format |

## DB (Server Side)
  There should be two tables for MVP. You may want/need to add additional columns and tables.

### Meetings
  | Column Name | Data Type |
  | --- | --- |
  | id | Integer |
  | meeting_name | String |
  | duration | Integer |
  | start_time | Timestamp |
  | attendees | Integer |
  | total_cost | Decimal |

### Attendees

 | Column Name | Data Type |
 | --- | --- |
 | id | Integer |
 | name | String |
 | wage | Decimal |
 | meeting_id | Integer |

 ---
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

Run dokku migrations and seeds:
```sh
npm run dokku:migrate
npm run dokku:seed
```

---
[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=show-me-the-money)
