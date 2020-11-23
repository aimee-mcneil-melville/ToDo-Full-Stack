import React, { useState, useEffect } from 'react'

import { Error } from './Styled'
import SelectedFruit from './SelectedFruit'
import AddFruit from './AddFruit'

import { getFruits } from '../api'

function Fruits () {
  const [error, setError] = useState('')
  const [fruits, setFruits] = useState([])
  const [adding, setAdding] = useState(false)
  const [selected, setSelected] = useState(null)

  const setSelectHandler = (fruit, e) => {
    e.preventDefault()
    setSelected(fruit)
  }

  const hideError = () => {
    setError('')
  }

  const clearSelected = () => {
    setSelected(null)
  }

  const toggleAdding = e => {
    e.preventDefault()
    setAdding(!adding)
  }

  useEffect(() => {
    getFruits()
      .then(remoteFruits => {
        setFruits(remoteFruits)
        return null
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [])

  return (
    <>
      <Error onClick={hideError}>
        { error && `Error: ${error}` }
      </Error>

      <ul>
        {fruits.map(fruit => (
          <li key={fruit.id}>
            <a href='#'
              data-testid='fruit-link'
              onClick={(e) => setSelectHandler(fruit, e)}>
                {fruit.name}
              </a>
          </li>
        ))}
      </ul>

      {selected && <SelectedFruit 
        fruit={selected} 
        clearSelected={clearSelected}
        setError={setError}
        setFruits={setFruits}
      />}

      {adding ? (
        <AddFruit 
          setFruits={setFruits}
          hideAdding={toggleAdding}
        /> 
      ) : (
        <a href='#' onClick={toggleAdding}>
          Add a Fruit
        </a>
      )}
    </>
  )
}

export default Fruits
