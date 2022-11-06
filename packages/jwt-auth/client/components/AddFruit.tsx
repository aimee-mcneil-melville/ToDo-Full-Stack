import React, { useState, ChangeEvent } from 'react'
// TODO: import useAuth0

import { GridForm, ColOne, ColTwoText, Button } from './Styled'

import { addFruit } from '../api'
import { JsonFruit, FormFruit } from '../../types'

type Props = {
  setFruits: (fruits: JsonFruit[]) => void
  closeAddForm: () => void
  setError: (err: string) => void
}

function AddFruit(props: Props) {
  // TODO: call the useAuth0 hook and destructure getAccessTokenSilently
  const selectedFruit: FormFruit = {
    name: '',
    averageGramsEach: 0,
    addedByUser: ''
  }
  const [newFruit, setNewFruit] = useState<FormFruit>(selectedFruit)
  const { setFruits, closeAddForm, setError } = props
  const handleAddChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewFruit({
      ...newFruit,
      [name]: value,
    })
  }
  const handleAdd = (e: { preventDefault: () => void }) => {
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
          type="number"
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
