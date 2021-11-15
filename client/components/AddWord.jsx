import React from 'react'
import { useDispatch } from 'react-redux'

import { addWord } from '../actions'

function AddWord () {
  const dispatch = useDispatch()

  const submitWord = (e) => {
    if (e.keyCode === 13) {
      dispatch(addWord(e.target.value))
      e.target.value = ''
    }
  }

  return (
    <input
      placeholder='Enter a word or phrase'
      onKeyUp={submitWord}
    />
  )
}

export default AddWord
