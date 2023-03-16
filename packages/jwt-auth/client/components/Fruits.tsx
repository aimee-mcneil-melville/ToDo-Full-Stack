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
  // const [selectedId, setSelectedId] = useState<number | undefined>()
  const [selectedFruit, setSelectedFruit] = useState<FruitCamel>()
  const [editedValues, setEditedValues] = useState<FruitCamel>()

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
    // setSelectedId(fruit.id)
    // const foundFruit = findFruitById(fruit.id)

    console.log('Fruits: ')
    console.log(fruit)
    setSelectedFruit(fruit)
    setEditedValues(fruit)
    console.log(selectedFruit)
    closeAddForm()
  }

  const clearSelected = () => {
    setSelectedFruit(undefined)
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
      {selectedFruit && (
        <SelectedFruit
          fruit={selectedFruit}
          clearSelected={clearSelected}
          setError={setError}
          setFruits={setFruits}
          editedValues={editedValues}
          setEditedValues={setEditedValues}
        />
      )}
    </>
  )
}

export default Fruits
