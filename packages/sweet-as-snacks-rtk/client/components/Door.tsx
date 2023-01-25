function Door() {
  // TODO: select the product in door from global state
  const productInDoor: string | null = null

  function handleClick() {
    // TODO: dispatch openDoor action from slice
  }

  return (
    <main
      className={`${
        productInDoor ? 'cursor-pointer' : 'cursor-default'
      } ml-auto mr-auto bg-slate-100 flex flex-col text-center align-middle gap-4 p-8 mt-2 border-solid border-2 border-slate-600`}
    >
      {productInDoor && (
        <i
          className={`w-192 fa-solid fa-${productInDoor} m-5 text-8xl text-orange`}
          onClick={handleClick}
        ></i>
      )}
    </main>
  )
}

export default Door
