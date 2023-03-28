function Dispenser() {
  // TODO: select the product in dispenser from global state
  const productInDispenser: string | null = null

  function handleClick() {
    // TODO: dispatch openDispenser action from slice
  }

  return productInDispenser ? (
    <button
      onClick={handleClick}
      className="cursor-pointer ml-auto mr-auto bg-slate-100 flex flex-col text-center align-middle gap-4 p-8 mt-2 border-solid border-2 border-slate-600"
    >
      <i
        className={`w-192 fa-solid fa-${productInDispenser} m-5 text-8xl text-orange`}
      ></i>
    </button>
  ) : (
    <button className="cursor-default ml-auto mr-auto bg-slate-100 flex flex-col text-center align-middle gap-4 p-8 mt-2 border-solid border-2 border-slate-600"></button>
  )
}

export default Dispenser
