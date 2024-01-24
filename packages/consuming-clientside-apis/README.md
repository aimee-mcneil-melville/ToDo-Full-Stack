# External APIs - Choose your own adventure!

This exercise is about exploring the world of APIs available to us.

In addition to hitting our own APIs with JavaScript, we can also make use of APIs exposed from all around the Internet! As to how the API works (and what routes are exposed to us) depends on how it was coded by the developer or team of developers who created it, part of learning how to use external APIs is also about learning how to read their documentation.

## Setup

### 0. Cloning and installation

- [ ] Clone this repo, navigate to it, install packages, and start the server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

  ```sh
  cd consuming-external-apis
  npm i
  npm run dev
  ```

  </details>

## Requirements

### 1. Choosing an API

- [ ] Choose an API to work with

Some possibilities are listed below if you want a place to start, otherwise find one of your own!

### 2. Building API calls

- [ ] Create the functions that make your API calls in `client/apiClient.ts`, and call those functions within your React components
<details style="padding-left: 2em">
  <summary>Tip</summary>
    We've left an example of consuming an API for you - you may wish to use this as a template.
    The example uses this amiibo API: https://amiiboapi.com/docs/
</details>

## API Suggestions

If you're not sure where to start, you can use one of the APIs listed below.

<details>
  <summary>Browser friendly APIs (no API key required or CORS restrictions)</summary>

- https://www.boredapi.com: suggest a random activity
- https://dog.ceo/dog-api: dog pictures
- https://randomfox.ca/floof: random fox pictures
- https://pokeapi.co/docs/v2: Pokémon
- https://swapi.dev: Star Wars
- https://disneyapi.dev/docs: Disney characters
- https://open-meteo.com/: weather
- https://wheretheiss.at/w/developer: get the latitude and longitude of the International Space Station
</details>
<br />

<details>
  <summary>API Collections</summary>
    https://github.com/marcelscruz/public-apis: this is a big list of APIs across a lot of different topics, so remember to keep things work-appropriate and friendly

    Because we're doing everything in the browser, we want an API that:

    - _does not_ require an API key
    - _does_ support https
    - _does_ support CORS

</details>
<br />
If any of the examples in this list are out of date, please let your facilitators know and create a Pull Request on this repo!

---

[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=consuming-external-apis)
