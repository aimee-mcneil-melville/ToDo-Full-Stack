function Door() {
  // TODO: select the product in door from global state
  const productInDoor: string | null = null

  function handleClick() {
    // TODO: dispatch openDoor action from slice
  }

  return productInDoor ? (
    <button
      onClick={handleClick}
      className="cursor-pointer ml-auto mr-auto bg-slate-100 flex flex-col text-center align-middle gap-4 p-8 mt-2 border-solid border-2 border-slate-600"
    >
      <i
        className={`w-192 fa-solid fa-${productInDoor} m-5 text-8xl text-orange`}
      ></i>
    </button>
  ) : (
    <button className="cursor-default ml-auto mr-auto bg-slate-100 flex flex-col text-center align-middle gap-4 p-8 mt-2 border-solid border-2 border-slate-600"></button>
  )
}

export default Door
