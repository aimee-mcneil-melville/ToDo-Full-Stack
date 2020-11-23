import React, { useState, useEffect } from 'react'

import { GridForm, ColOne, ColTwo, Button } from './Styled'
import { updateFruit, deleteFruit } from '../api'

function SelectedFruit ({fruit: selectedFruit, clearSelected, setError, setFruits}) {
  const [editing, setEditing] = useState(selectedFruit)

  const handleEditChange = e => {
    const { name, value } = e.target
    setEditing({
      ...editing,
      [name]: value
    })
  }

  const handleUpdate = () => {
    updateFruit(editing)
      .then(remoteFruits => {
        setFruits(remoteFruits)
        clearSelected()
        setError('')
        return null
      })
      .catch(err => {
        setError(err.message)
      })
  }

  const handleDelete = () => {
    deleteFruit(editing.id)
      .then(setFruits)
      .then(() => setEditing({}))
      .then(() => setError(''))
      .catch(err => setError(err.message))
  }

  useEffect(() => {
    setEditing(selectedFruit)
  }, [selectedFruit])

  const { name: editingName, calories: editingCalories } = editing

  return (
    <>
      <h2>Selected</h2>
      <GridForm>
        <ColOne>Name:</ColOne>
        <ColTwo type='text'
          name='name'
          aria-label='selected-name'
          data-testid='selected-name'
          value={editingName || ''}
          onChange={handleEditChange} />

        <ColOne>Calories:</ColOne>
        <ColTwo type='text'
          name='calories'
          aria-label='selected-calories'
          data-testid='selected-calories'
          value={editingCalories || ''}
          onChange={handleEditChange} />

        <Button type='button'
          data-testid='update-button'
          onClick={handleUpdate}>Update fruit</Button>
        <Button type='button'
          data-testid='delete-button'
          onClick={handleDelete}>Delete fruit</Button>
        <Button type='button'
          data-testid='clear-button'
          onClick={clearSelected}>Clear selection</Button>
      </GridForm>
    </>
  )
}

export default SelectedFruit
