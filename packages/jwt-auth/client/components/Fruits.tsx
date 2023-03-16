// TODO: fix me
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useEffect } from 'react'
import { FruitCamel } from '../../types'
import SelectedFruit from './SelectedFruit'
import AddFruit from './AddFruit'
import { Error } from './Styled'
import { addFruit, deleteFruit, getFruits, updateFruit } from '../api'

type ShowFormOptions = 'add' | 'selected' | 'none'

function Fruits() {
  const [error, setError] = useState('')
  const [fruits, setFruits] = useState<FruitCamel[]>([])

  const [selectedFruit, setSelectedFruit] = useState<FruitCamel | null>(null)

  const [shownForm, setShownForm] = useState<ShowFormOptions>('none')

  useEffect(() => {
    getFruits()
      .then((remoteFruits) => setFruits(remoteFruits))
      .catch((err) => setError(err.message))
  }, [])

  const handleAdd = async (fruit: FruitCamel) => {
    // TODO: pass token as second parameter
    const accessToken = await getAccessTokenSilently()

    addFruit(fruit, accessToken)
      .then(setFruits)
      .then(handleCloseForm)
      .then(hideError)
      .catch((err) => setError(err.message))
  }

  const handleUpdateFruit = async (updatedFruit: FruitCamel) => {
    const accessToken = await getAccessTokenSilently()

    updateFruit(updatedFruit, accessToken)
      .then(setFruits)
      .then(handleCloseForm)
      .then(hideError)
      .catch((err) => setError(err.message))
  }

  const handleDeleteFruit = async (id: number) => {
    const accessToken = await getAccessTokenSilently()

    deleteFruit(id, accessToken)
      .then(setFruits)
      .then(handleCloseForm)
      .then(hideError)
      .catch((err) => setError(err.message))
  }

  const hideError = () => {
    setError('')
  }

  const handleOpenAddForm = () => {
    setShownForm('add')
  }

  const handleCloseForm = () => {
    setSelectedFruit(null)
    setShownForm('none')
  }

  const handleSelectFruit = (fruit: FruitCamel) => {
    setSelectedFruit(fruit)

    setShownForm('selected')
  }

  return (
    <>
      <Error onClick={hideError}>{error && `Error: ${error}`}</Error>
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
async function getAccessTokenSilently() {
  console.error('Not Implemented: getAccessTokenSilently')
  return 'hello'
}
