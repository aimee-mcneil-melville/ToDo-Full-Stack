import { useState } from 'react'
import { Fruit } from '../../models/fruit'
import { GridForm, ColOne, ColTwoText, Button } from './Styled'

interface Props {
  fruit: Fruit
  onUpdate: (updatedFruit: Fruit) => void
  onDelete: (id: number) => void
  onClose: () => void
}

function SelectedFruitForm({ fruit, onUpdate, onDelete, onClose }: Props) {
  const [prevFruit, setPrevFruit] = useState<number>(fruit.id)
  const [updatedFruit, setUpdatedFruit] = useState<Fruit>(fruit)

  if (fruit.id !== prevFruit) {
    setUpdatedFruit(fruit)
    setPrevFruit(fruit.id)
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <ColOne htmlFor="name">Name:</ColOne>
        <ColTwoText
          type="text"
          name="name"
          id="name"
          value={editingName}
          onChange={handleTextChange}
        />

        <ColOne htmlFor="averageGramsEach">Average Grams Each:</ColOne>
        <ColTwoText
          type="text"
          name="averageGramsEach"
          id="averageGramsEach"
          value={editingGrams}
          onChange={handleTextChange}
        />

        <Button
          type="submit"
          disabled={editingName === '' || editingGrams === 0}
        >
          Update fruit
        </Button>
        <Button type="button" onClick={handleDeleteButtonClick}>
          Delete fruit
        </Button>
        <Button type="button" onClick={onClose}>
          Close
        </Button>
      </GridForm>
    </>
  )
}

export default SelectedFruitForm
