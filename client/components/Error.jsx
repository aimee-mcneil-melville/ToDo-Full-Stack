import React from 'react'
import { useSelector } from 'react-redux'

import { hide } from './errorHelper'

function Error () {
  const error = useSelector(globalState => globalState.error)

  return (
    error
      ? <div className="message-error" role='alert'>
        {error}
        <a className="button-cancel" onClick={hide}>&#10005;</a>
      </div>
      : null
  )
}

export default Error
