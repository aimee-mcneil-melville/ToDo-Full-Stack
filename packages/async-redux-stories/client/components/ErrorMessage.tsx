import { useAppSelector } from '../hooks'

function ErrorMessage() {
  const errorMessage = useAppSelector((state) => state.errorMessage)

  return <div className="error">{errorMessage}</div>
}

export default ErrorMessage
