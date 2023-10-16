import { Link, useParams } from 'react-router-dom'
import LineupNav from './LineupNav'
import { useSchedule } from '../hooks/api.ts'
import LoadingIndicator from './LoadingIndicator.tsx'

export default function DaySchedule() {
  const { day } = useParams()
  const { data, isError, isLoading, error } = useSchedule(String(day))

  if (isLoading) {
    return (
      <>
        <LineupNav />
        <LoadingIndicator />
      </>
    )
  }

  if (isError || !data) {
    return <p>Failed {String(error)}</p>
  }

  const { events } = data
  return (
    <>
      <LineupNav />

      <h2>
        events: <span className="data">{day}</span>
      </h2>

      <Link className="nav" to={`/events/add/${day}`}>
        add event
      </Link>

      <ul className="cards">
        {events.map(({ eventName, id, locationName, time, description }) => (
          <li key={id} className="card">
            <div className="event">
              <span className="title">{eventName}</span>
              <div className="time-location">
                <p>
                  Location: <span className="data">{locationName}</span>
                </p>
                <p>
                  Time: <span className="data">{time}</span>
                </p>
              </div>
            </div>
            <p className="event-description data">{description}</p>
            <Link to={`/events/${id}/edit`}>edit event</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
