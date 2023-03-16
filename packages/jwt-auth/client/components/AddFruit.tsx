import React, { useState, ChangeEvent } from 'react'
// TODO: import useAuth0

import { GridForm, ColOne, ColTwoText, Button } from './Styled'
import { FruitCamel } from '../../types'

interface Props {
  onAdd: (fruit: FruitCamel) => void
  onClose: () => void
}

function AddFruit({ onAdd, onClose }: Props) {
  // TODO: call the useAuth0 hook and destructure getAccessTokenSilently
  const selectedFruit: FruitCamel = {
    name: '',
    averageGramsEach: 0,
    addedByUser: '',
  }
  const [newFruit, setNewFruit] = useState(selectedFruit)
  const { name: addingName, averageGramsEach: addingGrams } = newFruit

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewFruit({
      ...newFruit,
      [name]: value,
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    onAdd(newFruit)
  }

  return (
    <>
      <h2>Add new</h2>
      <GridForm onSubmit={handleSubmit}>
        <ColOne>Name:</ColOne>
        <ColTwoText
          type="text"
          name="name"
          aria-label="adding-name"
          value={addingName || ''}
          onChange={handleChange}
        />

        <ColOne>Average Grams Each:</ColOne>
        <ColTwoText
          type="number"
          name="averageGramsEach"
          aria-label="adding-grams"
          value={addingGrams || ''}
          onChange={handleChange}
        />

        <Button type="submit">Add fruit</Button>
        <Button type="button" onClick={onClose}>
          Close
        </Button>
      </GridForm>
    </>
  )
}

export default AddFruit
