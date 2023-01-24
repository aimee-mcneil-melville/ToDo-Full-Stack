import { useAppSelector } from '../hooks'

// TODO: conver this to use useAppSelector
export default function WaitIndicator() {
  const loading = useAppSelector((state) => state.waiting)

  if (loading) {
    return (
      <img
        className="wait-indicator"
        src="/animated-circle.gif"
        alt="loading..."
      />
    )
  }

  return null
}
