import React, { useState, useEffect } from 'react'

import { GridForm, ColOne, ColTwo, Button } from './Styled'

import { updateFruit, deleteFruit } from '../api'

function SelectedFruit({ selected, clearSelected, setError, setFruits }) {
  // TODO: read from global state
  const [editing, setEditing] = useState(selected)

  function handleEditChange(e) {
    const { name, value } = e.target
    setEditing({
      ...editing,
      [name]: value,
    })
  }

  function handleUpdate() {
    // TODO: pass token as second parameter
    updateFruit(editing, 'token')
      .then((remoteFruits) => setFruits(remoteFruits))
      .then(clearSelected)
      .then(() => setError(''))
      .catch((err) => setError(err.message))
  }

  function handleDelete() {
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

  return (
    <>
      <h2>Selected</h2>
      <GridForm>
        <ColOne>Name:</ColOne>
        <ColTwo
          type="text"
          name="name"
          aria-label="selected-name"
          data-testid="selected-name"
          value={editingName || ''}
          onChange={handleEditChange}
        />

        <ColOne>Average Grams Each:</ColOne>
        <ColTwo
          type="text"
          name="averageGramsEach"
          aria-label="selected-grams"
          data-testid="selected-grams"
          value={editingGrams || ''}
          onChange={handleEditChange}
        />

        <Button
          type="button"
          data-testid="update-button"
          onClick={handleUpdate}
        >
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
