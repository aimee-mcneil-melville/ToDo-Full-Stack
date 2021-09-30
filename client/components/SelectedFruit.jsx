import React, { useState, useEffect } from 'react'

import { GridForm, ColOne, ColTwo, Button } from './Styled'

import { updateFruit, deleteFruit } from '../api'
import { useAuth0 } from '@auth0/auth0-react'

function SelectedFruit ({ selected, clearSelected, setError, setFruits }) {
  const { getAccessTokenSilently } = useAuth0()
  const [editing, setEditing] = useState(selected)

  function handleEditChange (e) {
    const { name, value } = e.target
    setEditing({
      ...editing,
      [name]: value
    })
  }

  function handleUpdate () {
    getAccessTokenSilently()
      .then((token) => updateFruit(editing, token))
      .then(remoteFruits => setFruits(remoteFruits))
      .then(clearSelected)
      .then(() => setError(''))
      .catch(err => setError(err.message))
  }

  function handleDelete () {
    getAccessTokenSilently()
      .then((token) => deleteFruit(editing.id, token))
      .then(setFruits)
      .then(clearSelected)
      .then(() => setError(''))
      .catch(err => setError(err.message))
  }

  useEffect(() => {
    setEditing(selected)
  }, [selected])

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
