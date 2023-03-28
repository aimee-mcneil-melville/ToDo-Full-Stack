import type { Fruit, NewFruit } from '../../models/fruit'

import { useState, useEffect } from 'react'

import { addFruit, deleteFruit, getFruits, updateFruit } from '../api'
import SelectedFruitForm from './SelectedFruit'
import AddFruitForm from './AddFruit'
import { ErrorMessage } from './Styled'

type State =
  | {
      selectedFruit: Fruit
      show: 'selected'
    }
  | {
      selectedFruit: null
      show: 'add' | 'none'
    }

const closedForm: State = {
  selectedFruit: null,
  show: 'none',
}

function Fruits() {
  const [error, setError] = useState('')
  const [fruits, setFruits] = useState<Fruit[]>([])
  const [form, setForm] = useState<State>(closedForm)

  // TODO: call the useAuth0 hook and destructure getAccessTokenSilently

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
      handleCloseForm()
      hideError()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      }
    }
  }

  const handleUpdate = async (updatedFruit: Fruit) => {
    try {
      // TODO: pass token as second parameter
      const fruits = await updateFruit(updatedFruit, 'token')

      setFruits(fruits)
      handleCloseForm()
      hideError()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      }
    }
  }

  const handleDelete = async (id: number) => {
    try {
      // TODO: pass token as second parameter
      const fruits = await deleteFruit(id, 'token')

      setFruits(fruits)
      handleCloseForm()
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
    setForm({ show: 'add', selectedFruit: null })
  }

  const handleCloseForm = () => {
    setForm(closedForm)
  }

  const handleSelectFruit = (fruit: Fruit) => {
    setForm({ show: 'selected', selectedFruit: fruit })
  }

  return (
    <>
      {error && <ErrorMessage onClick={hideError}>Error: {error}</ErrorMessage>}
      <ul>
        {fruits.map((fruit) => (
          <li key={fruit.id}>
            <button onClick={() => handleSelectFruit(fruit)}>
              {fruit.name}
            </button>
          </li>
        ))}
      </ul>
      {form.show === 'add' ? (
        <AddFruitForm onAdd={handleAdd} onClose={handleCloseForm} />
      ) : (
        <button onClick={handleOpenAddForm}>Add a Fruit</button>
      )}
      {form.show === 'selected' && (
        <SelectedFruitForm
          key={form.selectedFruit.id}
          fruit={form.selectedFruit}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onClose={handleCloseForm}
        />
      )}
    </>
  )
}

export default Fruits
