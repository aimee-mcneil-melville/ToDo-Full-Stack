// TODO: fix me
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react'
import { Fruit } from '../../models/fruit'
import { GridForm, ColOne, ColTwoText, Button } from './Styled'

interface Props {
  fruit: Fruit
  onUpdate: (updatedFruit: Fruit) => void
  onDelete: (id: number) => void
  onClose: () => void
}

function SelectedFruit({ fruit, onUpdate, onDelete, onClose }: Props) {
  const [prevFruit, setPrevFruit] = useState<number>(fruit.id)
  const [updatedFruit, setUpdatedFruit] = useState<Fruit>(fruit)

  if (fruit.id !== prevFruit) {
    setUpdatedFruit(fruit)
    setPrevFruit(fruit.id)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setUpdatedFruit({
      ...updatedFruit,
      [name]: value,
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    onUpdate(updatedFruit)
  }

  const handleDeleteButtonClick = () => {
    onDelete(fruit.id)
  }

  const { name: editingName, averageGramsEach: editingGrams } = updatedFruit
  const { name: currentName } = fruit

  return (
    <>
      <h2>Selected: {currentName}</h2>
      <GridForm onSubmit={handleSubmit}>
        <ColOne>Name:</ColOne>
        <ColTwoText
          type="text"
          name="name"
          aria-label="selected-name"
          data-testid="selected-name"
          value={editingName || ''}
          onChange={handleChange}
        />

        <ColOne>Average Grams Each:</ColOne>
        <ColTwoText
          type="text"
          name="averageGramsEach"
          aria-label="selected-grams"
          data-testid="selected-grams"
          value={editingGrams || ''}
          onChange={handleChange}
        />

        <Button type="submit" data-testid="update-button">
          Update fruit
        </Button>
        <Button
          type="button"
          data-testid="delete-button"
          onClick={handleDeleteButtonClick}
        >
          Delete fruit
        </Button>
        <Button type="button" data-testid="clear-button" onClick={onClose}>
          Clear selection
        </Button>
      </GridForm>
    </>
  )
}

export default SelectedFruit
