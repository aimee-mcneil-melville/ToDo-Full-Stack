import React from 'react'

// eslint-disable-next-line no-unused-vars
function ProductItem({ id, name, price, stock }) {
  // TODO: select the deposit from global state and check if the 
  // deposited amount is greater than or equal to the price 
  const canSelect = false
  // TODO: replace `true` and check if the stock is greater than 0
  const inStock = true

  function handleClick() {
    // TODO: dispatch the select action from slice and pass the appropiate argument
  }

  return (
    <main
      onClick={handleClick}
      className={`${
        canSelect && inStock
          ? 'cursor-pointer hover:bg-slate-100'
          : 'cursor-not-allowed'
      } border-box w-72 flex flex-col text-center align-middle gap-4 p-8 pt-1 mt-2 ml-2 border-solid border-2 border-slate-600`}
    >
      <p>{stock}</p>
      <i className={`fa-solid fa-${name} m-5 text-8xl text-orange`}></i>
      <p className="text-4xl">{inStock ? `$${price}` : 'Out of Stock'}</p>
    </main>
  )
}

export default ProductItem
