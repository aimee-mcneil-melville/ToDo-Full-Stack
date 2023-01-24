# Sweet as Snacks

Learning objectives:
  1. Learn reducers
  2. Practice dispatching actions
  3. Practice selecting/reading from global state

When complete, your application might look like this:

![An animation of a simple vending machine](Animation.gif)

## 0. Project setup
<details>
  <summary>Important things about this project's setup</summary>

  1. The server-side is already configured and we are not going to change it. We are using Vite as a bundler so as you save your work the localhost browser automatically updates with your changes - you don't need to refresh your webpage to see the changes you've made.
  2. The front-end has react components that are already written and stylised for you.
  3. Components are stylised and configured using [Tailwindcss](https://tailwindcss.com/). You are welcome to read the code to understand what is going on but not expected to make any styling changes.

</details>

- [ ] Clone this repo and `cd` into the new directory

- [ ] Install packages, run migrations and seeds, and start the dev server with `npm run dev`
 <details style="padding-left: 2em">
    <summary>Tip</summary>

  Commands might look like this:

  ```sh
  npm install
  npm run dev
  ```

  </details>

- [ ] Navigate to the link provided in the terminal

<br />

## User stories

In this challenge, we are going to build a simple vending machine.

1. As a user I want to be able to deposit an amount of money.
1. After money is deposited, I want to be able to select a product that is in stock and recieve the correct amount of change.
1. As an Admin, I want to be able to see how much money the vending machine has.

**Note**: This vending machine lets you buy only one product at a time.

## Requirements

## 1. Display messages on Screen
- [ ] As a I user, I want to be able read instructions coming from the vending machine

<details style="padding-left: 2em">
  <summary>More about displaying messages on the page</summary>

Take a look at `slices/machine.ts`, the `initialState` has a `message` property and it is initialised to `'Deposit funds'`.

1. In in the `Screen.tsx` component, import the `useAppSelector` from `hooks.ts`.
2. Replace the hardcoded placeholder, call the useAppSelector, and select the `message` property from global state.

You should now see *Deposit funds* displayed on the page.
</details>

### 2. Deposit money

- [ ] As I user, I want to be able to deposit money.

<details style="padding-left: 2em">
    <summary>More about depositing money</summary>

In the `machine.ts`, there is an action named `deposit` that has an empty implementation.

1. Read the `state` and `{ payload }` from parameters.
2. Update the `deposit` property in global state and return the new state. Remember to not overwrite other properties.

In the `DepositSlot.tsx` component, there is a local state that is used for the controlled input that accepts an input of type `number`. The component has an event handler that checks when the user presses the `Enter` button.

3. Import `useAppDispatch` from `hooks.ts`.
4. Import the `deposit` action from the slice.
5. Dispatch the `deposit` action when the user presses `Enter` and pass the amount to it so that the global state updates.
<br />

Check Redux devtools and you should be able to see the deposit updates.
</details>


### 3. Display deposited money

- [ ] As a user, I want to see the deposited amount displayed on the page.

<details style="padding-left: 2em" >
  <summary>More about displaying amounts</summary>

1. In the `machine.ts`, update the `deposit` action - from previous step - and update the `message` property to show a message telling the user the amount that has been deposited, e.g  *Deposited $5.00 - Please select a snack*

Tip: there is a formatMoney helper function provided in machine.ts to format into $0.00

You should see the deposited amount displayed on the page after inputing a number and pressing *Enter*
</details>

### 4. Display products

- [ ] As a user I want to be able to view products on the screen with the their prices and how many products are in stock. 

<details style="padding-left: 2em">
  <summary>More about viewing products</summary>

In the `Products.tsx`, the component imports and uses the data that is coming from another module called `products.ts`. We want to instead get the product data from global state.

1. Import `useAppSelector` and select `products` from global state.
2. Remove the import that uses the sample data.

You should expect no changes in the UI, however, the current component is connected and aware of any changes that happens to global state.
</details>

### 5. Select products

- [ ] As a user I want to be able to select a product and see the stock decrease. I will also see a message that will prompt me to Collect product.

<details style="padding-left: 2em">
  <summary>More about selecting products</summary>

In the `ProductItem.tsx`, there is an event handler named `handleClick`.

1. Dispatch the `select` action and pass the `id` of the product that is passed as props to it.

Skip updating `canSelect` and `inStock`, we'll visit this later

Now the `id` is passed to the reducer and it's time to write the logic for it, here are things to consider to make the `select` reducer in `machine.ts` work:

1. Define the `state` and `{ payload }` as parameters

1. Find the selected product by using the `payload`

1. Set the `dispenser` to the selected product name

1. Update the `revenue` property by adding the selected products price. The `revenue` is how much sales profit the machine has made. 

1. Reset the `deposit` to `0`

1. Set the `message` property to look like `Collect product`

1. Update the `change` property. Change should be the `deposit - price of selected product`

1. Update the `products` property and decrement the `stock` for the selected product. *Hint:* use `.filter()` or `.map()`

1. Add a conditional to prevent selecting products when the deposited amount is less than the product's price. 

1. Add another conditional to prevent users from selecting products that are not in stock. 

Take a look at Redux devtools and you should be able to see the global state updates as expected.
</details>

### 6. Update the Components

- [ ] Users should be able to know if an product is selectable by using a different cursor icon and see their change quantity

In `ProductItem.tsx` component:
<details style="padding-left: 2em">
<summary>More about mouse hover when selecting a products</summary>

1. Read the `deposit` value from global state and check  if the `deposit` is greater than or equal to the `price` of the product and assign this boolean to `canSelect`. For example:

```ts
const canVote = useAppSelector((state) => state.user.age >= 16)
```

2. Update the `inStock` variable with a boolean value to check if the product is in stock

You should be able to see a different cursor icon when you hover on a product that is not in stock or the deposited amount is less than the product's price. 
</details>

In the `Change.tsx` component:

1. Call the `useAppSelector` and read the `change` property and assign it to `change`

### 7. Collecting a Product

- [ ] As a user I want to be able collect my product.

<details style="padding-left: 2em">
<summary>More about collecting a product</summary>

In `machine.ts`, find the `openDispenser` reducer:

1. Reset the `dispenser` property to null

1. Set the `message` property to a new values saying 'Depoist funds' to inform the user that this is the end of a vending machine cycle

1. Reset the `change` property to `0`

Now let's switch to the `Dispenser.tsx`:

1. Dispatch the `openDispenser` action in the event handler

1. Call the `useAppSelector` and read the `dispenser` property and assign it to `productInDispenser`

You should see the product disappears when clicking (collecting) the product from the dispenser.
</details>

### 8. Stretch

- Add a button to show the revenue from global state using the `Revenue.tsx` component. Maybe you could add another button which dispatches an action which clears the revenue.
- Make the necessary updates so that the vending machine allows users to select more than one product after depositing the right amount.
- Write tests.
