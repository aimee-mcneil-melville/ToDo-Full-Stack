rcmndr (no vowels for hipster cred) is a social media app for sharing music recommendations, either as genuine suggestions or as proof of how cool you are.

Local installation steps:

Clone this repo
cd rcmndr
npm install
npm run knex migrate:latest
npm run knex seed:run
Create a .env file by running cp server/.env.example server/.env
Start the app with npm run dev and it will be running on http://localhost:3000.