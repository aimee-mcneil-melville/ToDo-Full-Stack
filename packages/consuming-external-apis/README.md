# External APIs - Choose your own adventure!

## Intro

This exercise is about exploring the world of APIs available to us. 

In addition to hitting our own APIs with JavaScript, we can also make use of APIs exposed from all around the Internet! As how the API works (and what routes are exposed to us) depends on how it was coded by the developer or team of developers who created it, part of learning how to use external APIs is also about learning how to read their documentation.

## Getting started

```sh
cd consuming-external-apis
npm install
npm run dev
```

Choose an API to work with, and let's get building! 

Some possibilities are listed below if you want a place to start, otherwise find one of your own!

#### Things to take note of:
* Create the functions that make your API calls in `client/apiClient.js`, and call those functions within your React components.
* There is a basic API route set up for you - you may wish to use this as a template.
* If you choose an API that enforces CORS, you'll need to consume that API from your server-side, and consume your own API from the client-side (i.e. using your server as a proxy).
* If you choose an API that requires a key or other authentication token, you will need to create a .env (to keep your key hidden from git).

## API Suggestions

If you're not sure where to start, you can use one of the APIs listed below. 

#### Simple APIs (no API key required or CORS restrictions)
* https://www.boredapi.com: suggest a random activity
* https://dog.ceo/api: dog pictures
* https://randomfox.ca/floof: random fox pictures
* https://pokeapi.co/docs/v2: Pokémon
* https://swapi.dev: Star Wars
* https://disneyapi.dev/docs: Disney characters
* https://open-meteo.com/: weather
* https://wheretheiss.at/w/developer: get the latitude and longitude of the International Space Station
* https://eda-te-reo.herokuapp.com: whakataukī (Māori proverbs) and their translations

#### APIs with CORS restrictions (serverside proxy required)
* https://www.affirmations.dev: positive affirmations/quotes
* https://openlibrary.org/developers/api: books

#### API key required (.env file)
* https://www.omdbapi.com: movies
* https://thecatapi.com: cat pictures
* https://developer.marvel.com: Marvel comics
* https://the-one-api.dev: Lord of the Rings
* https://www.tepapa.govt.nz/learn/research/datasets/collections-api Te Papa Collections
* https://data.rijksmuseum.nl/object-metadata/api: Rijksmuseum (art)
* https://opendata.metlink.org.nz: Metlink (Wellington public transport)
* https://dev-portal.at.govt.nz: Auckland Transport
* https://docs.opencollective.com/help/contributing/development/api: GraphQL

#### API Collections
* https://api.nasa.gov/api.html: a library of APIs from NASA (picture of the day, natural event tracker, etc.)
* https://github.com/public-apis/public-apis: a LOT of APIs (inaccurate in places, use this to help start your search but you'll have to investigate the APIs themselves, and please note that a few of them may have triggering or NSFW content, so please proceed with care)

If any of the examples in this list are out of date, please let your facilitators know and create a Pull Request on this repo!
