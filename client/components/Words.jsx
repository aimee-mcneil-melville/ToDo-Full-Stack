import React from 'react'
import { useSelector } from 'react-redux'

import Word from './Word'

function Words () {
  const words = useSelector(state => state.words)

  return (
    <div>
      {words.map(word =>
        <Word key={word.id}
          {...word}
        />
      )}
    </div>
  )
}

export default Words
