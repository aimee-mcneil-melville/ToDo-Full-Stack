import { useState, useEffect } from 'react'
import { Fruit, NewFruit } from '../../models/fruit'
import SelectedFruit from './SelectedFruit'
import AddFruit from './AddFruit'
import { ErrorMessage } from './Styled'
import { addFruit, deleteFruit, getFruits, updateFruit } from '../api'

type ShowFormOptions = 'add' | 'selected' | 'none'

function Fruits() {
  const [error, setError] = useState('')
  const [fruits, setFruits] = useState<Fruit[]>([])

  const [selectedFruit, setSelectedFruit] = useState<Fruit | null>(null)

  const [shownForm, setShownForm] = useState<ShowFormOptions>('none')

  useEffect(() => {
    getFruits()
      .then(setFruits)
      .catch((err) => setError(err.message))
  }, [])

  const handleAdd = async (fruit: NewFruit) => {
    try {
      // TODO: pass token as second parameter
      const fruits = await addFruit(fruit, 'token')

      setFruits(fruits)
      setShownForm('none')
      hideError()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      }
    }
  }

  const handleUpdateFruit = async (updatedFruit: Fruit) => {
    try {
      // TODO: pass token as second parameter
      const fruits = await updateFruit(updatedFruit, 'token')

      setFruits(fruits)
      setShownForm('none')
      hideError()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      }
    }
  }

  const handleDeleteFruit = async (id: number) => {
    try {
      // TODO: pass token as second parameter
      const fruits = await deleteFruit(id, 'token')

      setFruits(fruits)
      setShownForm('none')
      hideError()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      }
    }
  }

  const hideError = () => {
    setError('')
  }

  const handleOpenAddForm = () => {
    setSelectedFruit(null)
    setShownForm('add')
  }

  const handleCloseForm = () => {
    setSelectedFruit(null)
    setShownForm('none')
  }

  const handleSelectFruit = (fruit: Fruit) => {
    setSelectedFruit(fruit)
    setShownForm('selected')
  }

  return (
    <>
      <ErrorMessage onClick={hideError}>
        {error && `Error: ${error}`}
      </ErrorMessage>
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit.id}>
            <button
              data-testid="fruit-link"
              onClick={() => handleSelectFruit(fruit)}
            >
              {fruit.name}
            </button>
          </li>
        ))}
      </ul>
      {shownForm === 'add' ? (
        <AddFruit onAdd={handleAdd} onClose={handleCloseForm} />
      ) : (
        <button onClick={handleOpenAddForm}>Add a Fruit</button>
      )}
      {shownForm === 'selected' && (
        <SelectedFruit
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          fruit={selectedFruit!}
          onUpdate={handleUpdateFruit}
          onClose={handleCloseForm}
          onDelete={handleDeleteFruit}
        />
      )}
    </>
  )
}

export default Fruits
