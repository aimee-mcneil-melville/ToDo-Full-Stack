import React, { useState, useEffect } from 'react'
import {FormFruit, JsonFruit} from '../../types'
import SelectedFruit from './SelectedFruit'
import AddFruit from './AddFruit'
import { Error } from './Styled'

import { getFruits } from '../api'

function Fruits() {
  const selectedFruit: JsonFruit = {
    id: 0,
    name: '',
    averageGramsEach: 0,
    addedByUser: ''
  }
  const [error, setError] = useState('')
  const [fruits, setFruits] = useState<JsonFruit[]>([])
  const [adding, setAdding] = useState(false)
  const [selected, setSelected] = useState<JsonFruit>(selectedFruit)

  const hideError = () => {
    setError('')
  }

  const openAddForm = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> ) => {
    e.preventDefault()
    setAdding(true)
    clearSelected()
  }

  const closeAddForm = () => {
    setAdding(false)
  }

  const setSelectHandler = (fruit: JsonFruit, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    setSelected(fruit)
    closeAddForm()
  }

  const clearSelected = () => {
    setSelected(selectedFruit)
  }
// TODO remove useEffect Sophia!
  useEffect(() => {
    getFruits()
      .then((remoteFruits) => setFruits(remoteFruits))
      .catch((err) => setError(err.message))
  }, [])

  return (
    <>
      <Error onClick={hideError}>{error && `Error: ${error}`}</Error>

      <ul>
        {fruits.map((fruit: JsonFruit) => (
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
