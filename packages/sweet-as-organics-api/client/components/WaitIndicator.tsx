import { useAppSelector } from '../hooks'

export default function WaitIndicator() {
  const waiting = useAppSelector((state) => state.waiting)
  return waiting ? (
    <img className="wait-indicator" src="/animated-circle.gif" alt="loading" />
  ) : null
}
