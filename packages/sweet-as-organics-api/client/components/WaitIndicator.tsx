import { useAppSelector } from '../hooks'

export default function WaitIndicator() {
  const loading = useAppSelector((state) => state.waiting)

  if (loading) {
    return (
      <img
        className="wait-indicator"
        src="../../images/animated-circle.gif"
        alt="loading..."
      />
    )
  }

  return null
}
