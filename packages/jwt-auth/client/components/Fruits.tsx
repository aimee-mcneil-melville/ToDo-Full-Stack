import { useState, useEffect, useReducer } from 'react'
import { Fruit, NewFruit } from '../../models/fruit'
import SelectedFruit from './SelectedFruit'
import AddFruit from './AddFruit'
import { ErrorMessage } from './Styled'
import { addFruit, deleteFruit, getFruits, updateFruit } from '../api'

type State =
  | {
      selectedFruit: Fruit
      show: 'selected'
    }
  | {
      selectedFruit: null
      show: 'add' | 'none'
    }

type Action =
  | {
      type: 'select'
      payload: { fruit: Fruit }
    }
  | {
      type: 'add'
    }
  | {
      type: 'close'
    }

const initialState: State = {
  selectedFruit: null,
  show: 'none',
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'select':
      return {
        selectedFruit: action.payload.fruit,
        show: 'selected',
      }
    case 'add':
      return {
        selectedFruit: null,
        show: 'add',
      }
    case 'close':
      return {
        selectedFruit: null,
        show: 'none',
      }
    default:
      return state
  }
}

function Fruits() {
  const [error, setError] = useState('')
  const [fruits, setFruits] = useState<Fruit[]>([])
  const [form, dispatch] = useReducer(reducer, initialState)

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
    dispatch({ type: 'add' })
  }

  const handleCloseForm = () => {
    dispatch({ type: 'close' })
  }

  const handleSelectFruit = (fruit: Fruit) => {
    dispatch({ type: 'select', payload: { fruit } })
  }

  return (
    <>
      <ErrorMessage onClick={hideError}>
        {error && `Error: ${error}`}
      </ErrorMessage>
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
        <AddFruit onAdd={handleAdd} onClose={handleCloseForm} />
      ) : (
        <button onClick={handleOpenAddForm}>Add a Fruit</button>
      )}
      {form.show === 'selected' && (
        <SelectedFruit
          fruit={form.selectedFruit}
          onUpdate={handleUpdate}
          onClose={handleCloseForm}
          onDelete={handleDelete}
        />
      )}
    </>
  )
}

export default Fruits
