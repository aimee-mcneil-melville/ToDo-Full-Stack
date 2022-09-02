import React, { useState, useEffect } from 'react'

import { GridForm, ColOne, ColTwoText, Button } from './Styled'

import { updateFruit, deleteFruit } from '../api'

function SelectedFruit({ selected, clearSelected, setError, setFruits }) {
  // TODO: read token from global state
  const [editing, setEditing] = useState(selected)

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditing({
      ...editing,
      [name]: value,
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    // TODO: pass token as second parameter
    updateFruit(editing, 'token')
      .then((remoteFruits) => setFruits(remoteFruits))
      .then(clearSelected)
      .then(() => setError(''))
      .catch((err) => setError(err.message))
  }

  const handleDelete = () => {
    // TODO: pass token as second parameter
    deleteFruit(editing.id, 'token')
      .then(setFruits)
      .then(clearSelected)
      .then(() => setError(''))
      .catch((err) => setError(err.message))
  }

  useEffect(() => {
    setEditing(selected)
  }, [selected])

  const { name: editingName, averageGramsEach: editingGrams } = editing
  const { name: currentName, username: user } = selected

  return (
    <>
      <h2>Selected: {currentName}</h2>
      <p>Originally added by {user}</p>
      <GridForm onSubmit={handleUpdate}>
        <ColOne>Name:</ColOne>
        <ColTwoText
          type="text"
          name="name"
          aria-label="selected-name"
          data-testid="selected-name"
          value={editingName || ''}
          onChange={handleEditChange}
        />

        <ColOne>Average Grams Each:</ColOne>
        <ColTwoText
          type="text"
          name="averageGramsEach"
          aria-label="selected-grams"
          data-testid="selected-grams"
          value={editingGrams || ''}
          onChange={handleEditChange}
        />

        <Button type="submit" data-testid="update-button">
          Update fruit
        </Button>
        <Button
          type="button"
          data-testid="delete-button"
          onClick={handleDelete}
        >
          Delete fruit
        </Button>
        <Button
          type="button"
          data-testid="clear-button"
          onClick={clearSelected}
        >
          Clear selection
        </Button>
      </GridForm>
    </>
  )
}

export default SelectedFruit
