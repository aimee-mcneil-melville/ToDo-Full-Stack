# rcmndr

collate.
recommend.
discover.
## what is rcmndr?
rcmndr (no vowels for hipster cred) is a social media app for sharing music recommendations, either as genuine suggestions or as proof of how cool you are.

## External documentation
* [Wireframes on Figma](https://www.figma.com/file/4nBKJh6rgLuEqbX054Zw1i/rcmndr?node-id=0%3A1) 
* [Sitemap on Miro](https://miro.com/app/board/o9J_lwh4UFA=/)

## Local installation steps:
Clone this repo

```js
cd rcmndr
npm install
npm run knex migrate:latest
npm run knex seed:run
cp server/.env.example server/.env
npm run dev 
```

The server will be running on http://localhost:3000.