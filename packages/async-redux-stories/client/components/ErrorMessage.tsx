import { useAppSelector } from '../hooks.ts'

function ErrorMessage() {
  const errorMessage = useAppSelector((state) => state.errorMessage)

  return <div className="error">{errorMessage}</div>
}

export default ErrorMessage
