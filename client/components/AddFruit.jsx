import React, { useState, useEffect } from 'react'

import { GridForm, ColOne, ColTwo, Button, Error } from './Styled'

import { addFruit } from '../api'

function AddFruit ({setFruits, hideAdding}) {
  const [newFruit, setNewFruit] = useState(false)

  const handleAddChange = e => {
    const { name, value } = e.target
    setNewFruit({
      ...newFruit,
      [name]: value
    })
  }

  const handleAdd = () => {
    const fruit = { ...newFruit }
    return addFruit(fruit)
      .then(setFruits)
      .then(() => hideAdding())
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
        <Button type='button' onClick={hideAdding}>Close</Button>
      </GridForm>
    </>
  )
}

export default AddFruit