import { useState } from 'react'

function DepositSlot() {
  const [amount, setAmount] = useState(0)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // the '+' sign means cast to a number
    if (!isNaN(+event.target.value)) {
      setAmount(Number(event.target.value))
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: dispatch the deposit action from slice
    setAmount(0)
  }

  return (
    <section className=" text-center justify-center ml-auto mr-auto">
      <form onSubmit={handleSubmit}>
        <input
          className="border-2 border-slate-300 focus:border-slate-700 text-7xl w-48 text-center "
          width={40}
          value={amount}
          onChange={handleChange}
        />
      </form>
    </section>
  )
}

export default DepositSlot
