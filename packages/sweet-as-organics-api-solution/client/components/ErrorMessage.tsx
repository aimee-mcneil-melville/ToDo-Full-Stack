import { hideError } from '../actions/error'
import { useAppSelector } from '../hooks'

export default function ErrorMessage() {
  const errorMessage = useAppSelector((state) => state.errorMessage)
  function hide() {
    hideError()
  }

  return errorMessage.length ? (
    <div role="alert" className="error">
      {errorMessage}
      <button className="hide-error" onClick={hide}>
        Hide Error
      </button>
    </div>
  ) : null
}
