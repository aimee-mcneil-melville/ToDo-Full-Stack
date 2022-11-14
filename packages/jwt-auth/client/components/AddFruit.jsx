import React, { useState } from 'react'
// TODO: import useAuth0

import { GridForm, ColOne, ColTwoText, Button } from './Styled'

import { addFruit } from '../api'

function AddFruit({ setFruits, closeAddForm, setError }) {
  // TODO: call the useAuth0 hook and destructure getAccessTokenSilently
  const [newFruit, setNewFruit] = useState(false)

  const handleAddChange = (e) => {
    const { name, value } = e.target
    setNewFruit({
      ...newFruit,
      [name]: value,
    })
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const fruit = { ...newFruit }
    // TODO: pass token as second parameter
    addFruit(fruit, 'token')
      .then(setFruits)
      .then(closeAddForm)
      .catch((err) => setError(err.message))
  }

  const { name: addingName, averageGramsEach: addingGrams } = newFruit

  return (
    <>
      <h2>Add new</h2>
      <GridForm onSubmit={handleAdd}>
        <ColOne>Name:</ColOne>
        <ColTwoText
          type="text"
          name="name"
          aria-label="adding-name"
          value={addingName || ''}
          onChange={handleAddChange}
        />

        <ColOne>Average Grams Each:</ColOne>
        <ColTwoText
          type="text"
          name="averageGramsEach"
          aria-label="adding-grams"
          value={addingGrams || ''}
          onChange={handleAddChange}
        />

        <Button type="submit">Add fruit</Button>
        <Button type="button" onClick={closeAddForm}>
          Close
        </Button>
      </GridForm>
    </>
  )
}

export default AddFruit
