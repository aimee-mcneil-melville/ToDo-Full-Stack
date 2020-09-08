# Sweet As Organics

The Sweet As team have diversified! They are now selling a variety of organic foods, but have this time chosen to store their stock data in a database.

## Setup

After cloning this repo

```sh
cd sweet-as-organics-api
npm install
npm run knex migrate:latest
npm run knex seed:run
npm run dev
```

## Release 0: Understanding the codebase
getProducts has been done for you

## Release 1: Add an order 
implement the place order button from Cart

## Release 2: View your orders
orderList componentDidMount should get the orders and add them to the redux store

## Release 3: Update order
implement update order button

## Release 4: Delete orders
create and implement a cancel order button
