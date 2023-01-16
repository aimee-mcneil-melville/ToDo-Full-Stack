import { useState, KeyboardEvent, ChangeEvent } from 'react'
import { useAppDispatch } from '../hooks'
import { addWord } from '../actions'

function AddWord() {
  const dispatch = useAppDispatch()
  const [word, setWord] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value)
  }

  const submitWord = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(addWord(word))
      setWord('')
    }
  }

  return (
    <input
      id="word"
      placeholder="Enter a word or phrase"
      aria-label="Word or phrase"
      onKeyUp={submitWord}
      onChange={handleChange}
      value={word}
    />
  )
}

export default AddWord
