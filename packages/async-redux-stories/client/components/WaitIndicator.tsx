import { useAppSelector } from '../hooks'

function WaitIndicator() {
  const showIndicator = useAppSelector((state) => state.waiting)

  return showIndicator ? (
    <img
      className="wait-indicator"
      alt="a wait indicator"
      src="/animated-circle.gif"
    />
  ) : null
}

export default WaitIndicator
