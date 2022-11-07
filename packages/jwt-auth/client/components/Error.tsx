import { useState } from 'react'
import { useOutletContext, useRouteError } from 'react-router-dom'
import { Error } from './Styled'

type Props = {
  error: string
  setError: (x: string) => void
}
function ErrorMessage(props: Props) {
  const { error, setError } = props
  const errorMessage = useRouteError()

  const hideError = () => {
    setError('')
  }
  return (
    <>
      <Error onClick={hideError}>
        {errorMessage ? `Error: ${errorMessage}` : `Error: ${error}`}
      </Error>
    </>
  )
}

export default ErrorMessage
