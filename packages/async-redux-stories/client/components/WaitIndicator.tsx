import spinnerSrc from '../animated-circle.gif'
import { useAppSelector } from '../hooks'

function WaitIndicator() {
  const showIndicator = useAppSelector((state) => state.waiting)

  return showIndicator ? (
    <img className="wait-indicator" alt="a wait indicator" src={spinnerSrc} />
  ) : null
}

export default WaitIndicator
