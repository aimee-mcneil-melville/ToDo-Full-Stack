import { useState, ChangeEvent, MouseEvent, FormEvent } from 'react'
import { FruitCamel } from '../../types'
import { GridForm, ColOne, ColTwoText, Button } from './Styled'
import { updateFruit, deleteFruit } from '../api'
import { useAuth0 } from '@auth0/auth0-react'
interface Props {
  fruit: FruitCamel
  clearSelected: () => void
  setFruits: (fruits: FruitCamel[]) => void
  setError: (err: string) => void
  editedValues: FruitCamel
  setEditedValues: React.Dispatch<React.SetStateAction<FruitCamel>>
}

function SelectedFruit({
  fruit,
  clearSelected,
  setError,
  setFruits,
  editedValues,
  setEditedValues,
}: Props) {
  const { getAccessTokenSilently } = useAuth0()
  console.log('SelectedFruit: ')
  console.log(fruit)
  // const [editedValues, setEditedValues] = useState<FruitCamel>(fruit)
  // setEditedValues({
  //   name: fruit.name,
  //   averageGramsEach: fruit.averageGramsEach,
  // })
  console.log(editedValues)

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedValues({
      ...editedValues,
      [name]: value,
    })
  }

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault()
    const accessToken = await getAccessTokenSilently()
    updateFruit(editedValues, accessToken)
      .then((remoteFruits) => setFruits(remoteFruits))
      .then(clearSelected)
      .then(() => setError(''))
      .catch((err) => setError(err.message))
  }

  const handleDelete = async (e: MouseEvent) => {
    e.preventDefault()
    const accessToken = await getAccessTokenSilently()
    deleteFruit(editedValues.id!, accessToken)
      .then(setFruits)
      .then(clearSelected)
      .then(() => setError(''))
      .catch((err) => setError(err.message))
  }

  const { name: editingName, averageGramsEach: editingGrams } = editedValues
  const { name: currentName } = fruit

  return (
    <>
      <h2>Selected: {currentName}</h2>
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
