import React, { useState, useEffect } from 'react'

import SelectedFruit from './SelectedFruit'
import AddFruit from './AddFruit'
import { Error } from './Styled'

import { getFruits } from '../api'

function Fruits() {
  const [error, setError] = useState('')
  const [fruits, setFruits] = useState([])
  const [adding, setAdding] = useState(false)
  const [selected, setSelected] = useState(null)

  function hideError() {
    setError('')
  }

  function openAddForm(e) {
    e.preventDefault()
    setAdding(true)
  }

  function closeAddForm() {
    setAdding(false)
  }

  function setSelectHandler(fruit, e) {
    e.preventDefault()
    setSelected(fruit)
  }

  function clearSelected() {
    setSelected(null)
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
        {fruits.map((fruit) => (
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
