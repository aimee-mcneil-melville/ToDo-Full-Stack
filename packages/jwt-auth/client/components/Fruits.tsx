import { useState, useEffect, MouseEvent } from 'react'
import { FruitCamel } from '../../types'
import SelectedFruit from './SelectedFruit'
import AddFruit from './AddFruit'
import { Error } from './Styled'
import { getFruits } from '../api'

function Fruits() {
  const [error, setError] = useState('')
  const [fruits, setFruits] = useState([] as FruitCamel[])
  const [adding, setAdding] = useState(false)
  const [selected, setSelected] = useState<number | undefined>()

  const hideError = () => {
    setError('')
  }

  const openAddForm = (e: MouseEvent) => {
    e.preventDefault()
    setAdding(true)
    clearSelected()
  }

  const closeAddForm = () => {
    setAdding(false)
  }

  const setSelectHandler = (fruit: FruitCamel, e: MouseEvent) => {
    e.preventDefault()
    setSelected(fruit.id)
    closeAddForm()
  }

  const clearSelected = () => {
    setSelected(0)
  }

  useEffect(() => {
    getFruits()
      .then((remoteFruits) => setFruits(remoteFruits))
      .catch((err) => setError(err.message))
  }, [])

  return (
    <>
      <Error onClick={hideError}>{error && `Error: ${error}`}</Error>

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

      {selected && fruits[selected] && (
        <SelectedFruit
          fruits={fruits}
          selected={fruits[selected]}
          clearSelected={clearSelected}
          setError={setError}
          setFruits={setFruits}
        />
      )}
    </>
  )
}

export default Fruits
