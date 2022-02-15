import React from 'react'
import { useSelector } from 'react-redux'

function ErrorMessage() {
  const errorMessage = useSelector((state) => state.errorMessage)

  return <div className="error">{errorMessage}</div>
}

export default ErrorMessage
