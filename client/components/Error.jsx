import React from 'react'
import { useSelector } from 'react-redux'

import { hide } from './errorHelper'

function Error () {
  const error = useSelector(globalState => globalState.error)

  return (
    error
      ? <article className='message is-danger' role='alert'>
        <div className='message-header'>
          <p>{error}</p>
          <a className='delete' onClick={hide}>&#10005;</a>
        </div>
      </article>
      : null
  )
}

export default Error

//some comments