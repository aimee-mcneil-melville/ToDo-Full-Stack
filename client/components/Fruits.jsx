import React, { useState, useEffect } from 'react'

import SelectedFruit from './SelectedFruit'
import AddFruit from './AddFruit'
import { Error } from './Styled'

import { getFruits } from '../api'

function Fruits () {
  const [error, setError] = useState('')
  const [fruits, setFruits] = useState([])
  const [adding, setAdding] = useState(false)
  const [selected, setSelected] = useState(null)

  const hideError = () => {
    setError('')
  }

  const toggleAdding = e => {
    if(e) e.preventDefault() // TODO: make this better
    setAdding(!adding)
  }

  const setSelectHandler = (fruit, e) => {
    e.preventDefault()
    setSelected(fruit)
  }

  const clearSelected = () => {
    setSelected(null)
  }

  useEffect(() => {
    getFruits()
      .then(remoteFruits => setFruits(remoteFruits))
      .catch(err => setError(err.message))
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

      {selected && <SelectedFruit 
        fruit={selected} 
        clearSelected={clearSelected}
        setError={setError}
        setFruits={setFruits}
      />}
    </>
  )
}

export default Fruits
