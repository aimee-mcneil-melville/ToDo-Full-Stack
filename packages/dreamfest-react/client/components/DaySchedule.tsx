import { useParams } from 'react-router-dom'
import LineupNav from './LineupNav'
import { useSchedule } from '../hooks/api.ts'

export default function DaySchedule() {
  const { day } = useParams()
  const { data, isError, isLoading, error } = useSchedule(String(day))

  if (isLoading) {
    return (
      <>
        <LineupNav />
        <p>Loading...</p>
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
      <a className="nav" href={`/events/add/${day}`}>
        add event
      </a>

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
            <a href={`/events/${id}/edit`}>edit event</a>
          </li>
        ))}
      </ul>
    </>
  )
}
