# Web API routes

Failure response (HTTP status: 500):

```json
{
  "error": {
    "title": "Sanitised error message here"
  }
}
```

## `GET /api/v1/gardens`

Response (200):

```json
{
  "gardens": [
    {
      "id": 1,
      "name": "Kelmarna Gardens",
      "address": "12 Hukanui Crescent",
      "lat": -36.86011508905973,
      "lon": 174.7330772002716,
      "url": "http://www.kelmarnagardens.nz"
    }
  ]
}
```


## `GET /api/v1/gardens/:id`

Response (200):

```json
{
  "id": 1,
  "name": "Kelmarna Gardens",
  "address": "12 Hukanui Crescent",
  "description": "Kelmarna Gardens is a city farm and ...",
  "lat": -36.86011508905973,
  "lon": 174.7330772002716,
  "url": "http://www.kelmarnagardens.nz",
  "events": [{
    "id": 1,
    "volunteersNeeded": 8,
    "title": "Weeding Worker Bee",
    "date": "2020-12-31",
    "description": "It's time to get these weeds under control.",
    "totalVolunteers": 13,
    "isVolunteer": false
  }]
}
```

## `POST /api/v1/events`

Request:

```json
{
  "gardenId": 1,
  "volunteersNeeded": 8,
  "title": "Weeding Worker Bee",
  "date": "2020-12-31",
  "description": "It's time to get these weeds under control."
}
```

Response (201):

```json
{
  "id": 167,
  "gardenId": 1,
  "volunteersNeeded": 8,
  "title": "Weeding Worker Bee",
  "date": "2020-12-31",
  "description": "It's time to get these weeds under control."
}
```

## `GET /api/v1/events/:id`

Response for GUEST (200):

```json
{
  "id": 167,
  "gardenId": 1,
  "gardenName": "Kelmarna Gardens",
  "gardenAddress": "12 Hukanui Crescent",
  "volunteersNeeded": 8,
  "title": "Weeding Worker Bee",
  "date": "2020-12-31",
  "description": "It's time to get these weeds under control."
}
```
Response for MEMBER (200):

```json
{
  "id": 167,
  "gardenId": 1,
  "gardenName": "Kelmarna Gardens",
  "gardenAddress": "12 Hukanui Crescent",
  "volunteersNeeded": 8,
  "title": "Weeding Worker Bee",
  "date": "2020-12-31",
  "description": "It's time to get these weeds under control.",
  "isVolunteer": true
}
```
Response for ADMIN (200):

```json
{
  "id": 167,
  "gardenId": 1,
  "gardenName": "Kelmarna Gardens",
  "gardenAddress": "12 Hukanui Crescent",
  "volunteersNeeded": 8,
  "title": "Weeding Worker Bee",
  "date": "2020-12-31",
  "description": "It's time to get these weeds under control.",
  "volunteers": [{
    "userId": 3,
    "username": "jdog",
    "firstName": "Johnny",
    "lastName": "Dawg"
  }]
}
```

## `PATCH /api/v1/events/:id`

Request:

```json
{
  "id": 167,
  "volunteersNeeded": 8,
  "title": "Weeding Worker Bee",
  "date": "2020-12-31",
  "description": "It's time to get these weeds under control."
}
```

Response (201):

```json
{
  "id": 167,
  "gardenId": 1,
  "volunteersNeeded": 8,
  "title": "Weeding Worker Bee",
  "date": "2020-12-31",
  "description": "It's time to get these weeds under control."
}
```

## `POST /api/v1/volunteers`

Request:

```json
{
  "eventId": 167,
  "userId": 48
}
```

Response (201)


## `DELETE /api/v1/volunteers`

Request:

```json
{
  "eventId": 167,
  "userId": 48
}
```

Response (200)

