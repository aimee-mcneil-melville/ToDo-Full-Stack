import { useState, MouseEvent } from 'react'
import { FruitCamel } from '../../types'
import SelectedFruit from './SelectedFruit'
import AddFruit from './AddFruit'
import Error from './Error'
import { useLoaderData, useOutletContext } from 'react-router-dom'

function Fruits() {
  const fruitData = useLoaderData() as FruitCamel[]
  const [fruits, setFruits] = useState(fruitData)
  const [adding, setAdding] = useState(false)
  const [selected, setSelected] = useState<Number>(0)
  const [error, setError] = useState('')

  const openAddForm = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setAdding(true)
    clearSelected()
  }

  const closeAddForm = () => {
    setAdding(false)
  }

  const setSelectHandler = (
    fruit: FruitCamel,
    e: MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault()
    setSelected(fruit.id)
    closeAddForm()
  }

  const clearSelected = () => {
    setSelected(0)
  }

  return (
    <>
      <Error error={error} setError={setError} />
      <ul>
        {fruits.map((fruit: FruitCamel) => (
          <li key={fruit.id}>
            <a
              href="#"
              data-testid="fruit-link"
              onClick={(e) => setSelectHandler(fruit, e)}
            >
              {fruit.name}
            </a>
          </li>
        ))}
      </ul>

      {adding ? (
        <AddFruit
          setError={setError}
          setFruits={setFruits}
          closeAddForm={closeAddForm}
        />
      ) : (
        <a href="#" onClick={openAddForm}>
          Add a Fruit
        </a>
      )}

      {selected && (
        <SelectedFruit
          fruits={fruits}
          selected={selected}
          clearSelected={clearSelected}
          setError={setError}
          setFruits={setFruits}
        />
      )}
    </>
  )
}

export default Fruits
