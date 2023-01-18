import { useAppSelector, useAppDispatch } from '../hooks'
import { hideError } from '../slices/errorMessage'

export default function ErrorMessage() {
  const errorMessage = useAppSelector((state) => state.errorMessage)
  const dispatch = useAppDispatch()

  const hide = () => {
    dispatch(hideError())
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
