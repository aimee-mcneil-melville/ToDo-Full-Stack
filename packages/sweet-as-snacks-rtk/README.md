# Sweet as Snacks

Learning objectives:
  1. Learn reducers
  2. Practice dispatching actions
  3. Practice selecting/reading from global state

When complete, your application might look like this:

![An animation of a simple vending machine](Animation.gif)

## Project setup

<details>
  <summary>Things about this project's setup</summary>

  1. The server-side is already configured and we are not going to change it.
  2. The front-end has react components that are already written and stylised for you.
  3. Components are stylised and configured using [Tailwindcss](https://tailwindcss.com/).
</details>
<br />

## User stores

In this challenge, we are going to build a simple vending machine.

1. After money is deposited, I want to be able to select a product that is in stock.
2. As an Admin, I want to be able to see how much money the vending machine has.

**Note**: This vending machine lets you buy one product at a time.

## Requirements

## 1. Display messages on Screen
- [ ] As a I user, I want to be able read instructions coming from the vending machine

<details style="padding-left: 2em">
  <summary>More about displaying messages on the page</summary>

Take a look at `slice.js`, the `initialState` has a `message` property and it is initialised to `'Deposit funds'`.

1. In in the `Screen.jsx` component, import the `useSelector`.
2. Replace the hardcoded placeholder, call the useSelector, and select the `message` property from global state.

You should now see *Deposit funds* displayed on the page.
</details>

### 2. Deposit money

- [ ] As I user, I want to be able to deposit money.

<details style="padding-left: 2em">
    <summary>More about depositing money</summary>

In the `slice.js`, there is an action named `deposit` that has an empty implementation.

1. Read the `state` and `{ payload }` from parameters.
2. Update the `deposit` property in global state and return the new state. Remember not overwrite other properties.

In the `DepositSlot.jsx` component, there is a local state that is used for the controlled input that accepts an input of type `number`. The component has an event handler that checks when the user presses the `Enter` button.

3. Import `useDispatch`
4. Import the `deposit` action from the slice.
5. Dispatch the `deposit` action when the user presses `Enter` and pass the amount to it so that the global state updates.
<br />

Check Redux devtools and you should be able to see the deposit updates.
</details>


### 3. Display deposited money

- [ ] As a user, I want to see the deposited amount displayed on the page.

<details style="padding-left: 2em" >
  <summary>More about displaying amounts</summary>

1. In the `slice.js`, update the `deposit` action - from previous step - and update the `message` property to show a message telling the user the amount that has been deposited, e.g  *Deposited $5.00, Please select a snack*

You should see the deposited amount displayed on the page after inputing a number and pressing *Enter*
</details>

### 4. Display products

- [ ] As a user I want to be able to view products on the screen with the their prices and how many products are in stock. 

<details style="padding-left: 2em">
  <summary>More about viewing products</summary>

In the `Products.jsx`, the component imports and uses the data that is coming from another module called `products.js`. 

1. Import `useSelector` and select `products` from global state.
2. Remove the import that uses the sample data.

You should expect no changes in the UI, however, the current component is connected and aware of any changes that happens to global state.
</details>

### 5. Select products

- [ ] As a user I want to be able to select a product and see the stock decrease. I will also see a message that will prompt me to Collect product.

<details style="padding-left: 2em">
  <summary>More about selecting products</summary>

In the `ProductItem.jsx`, there is an event handler named `hadnleOnClick`.

1. Dispatch the `select` action and pass the `id` of the product that is passed as props to it.

Skip updating `canSelect` and `inStock`, we'll visit this later

Now the `id` is passed to the reducer and it's time to write the logic for it, here are things to consider to make the `select` reducer in `slice.js` work:

1. Define the `state` and `{ payload }` as parameters

2. Find the selected product by using the `payload`

3. Update the `revenue` property. The `revenue` is how much sales profit the machine has made. 

4. Reset the `deposit` to `0`

5. Set the `message` property to look like `Collect product`

6. Update the `change` property 

7. Update the `products` property and decrement the `stock` for the selected product. *Hint:* use `.filter()`

8. Add a conditional to prevent selecting products when the deposited amount is less than the product's price. 

9. Add another conditional to prevent users from selecting products that are not in stock. 

Take a look at Redux devtools and you should be able to see the global state updates as expected.
</details>

### 6. Update ProductItem Component

- [ ] Users should be able to know if an product is selectable by using a different cursor icon

<details style="padding-left: 2em">
<summary>More about mouse hover when selecting a products</summary>

In `ProductItem.jsx` component:

1. Read the `deposit` value from global state and check  if the `deposit` is greater than or equal to the `price` of the product and assign this boolean to `canSelect`. For example:

```js
const canVote = useSelector((state) => state.user.age >= 16)
```

2. Update the `inStock` variable with a boolean value to check if the product is in stock

You should be able to see a different cursor icon when you hover on a product that is not in stock or the deposited amount is less than the product's price. 
</details>

### 7. Collecting a Product

- [ ] As a user I want to be able collect my product.

<details style="padding-left: 2em">
<summary>More about collecting a product</summary>

In `slice.js`, find the `openDispenser` reducer:

1. Reset the `dispenser` property to null

2. Set the `message` property to a new values saying 'Depoist funds' to inform the user that this is the end of a vending machine cycle

3. Reset the `change` property to `0`

Now let's swtich to the `Dispenser.jsx`:

4. Dispatch the `openDispenser` action in the event handler

5. Call the `useSelector` and read the `dispenser` property and assign it to `productInDispenser`

You should see the product disappears when collecting an product and see a message displayed.
</details>

### 8. Stretch

Make the necessary updates so that the vending machine allows users to select more than one product after depositing the right amount.
