import React, { useState } from 'react'

import { GridForm, ColOne, ColTwo, Button } from './Styled'

import { addFruit } from '../api'
import { useSelector } from 'react-redux'

function AddFruit ({ setFruits, closeAddForm, setError }) {
  const user = useSelector(state => state)
  const [newFruit, setNewFruit] = useState(false)

  function handleAddChange (e) {
    const { name, value } = e.target
    setNewFruit({
      ...newFruit,
      [name]: value
    })
  }

  function handleAdd () {
    const fruit = { ...newFruit }
    addFruit(fruit, user.auth0Id, user.token)
      .then(setFruits)
      .then(closeAddForm)
      .catch(err => setError(err.message))
  }

  const { name: addingName, calories: addingCalories } = newFruit

  return (
    <>
      <h2>Add new</h2>
      <GridForm>
        <ColOne>Name:</ColOne>
        <ColTwo type='text'
          name='name'
          aria-label='adding-name'
          value={addingName || ''}
          onChange={handleAddChange} />

        <ColOne>Calories:</ColOne>
        <ColTwo type='text'
          name='calories'
          aria-label='adding-calories'
          value={addingCalories || ''}
          onChange={handleAddChange} />

        <Button type='button' onClick={handleAdd}>Add fruit</Button>
        <Button type='button' onClick={closeAddForm}>Close</Button>
      </GridForm>
    </>
  )
}

export default AddFruit
