import { EventWithLocation } from '../../models/Event'
import LineUpNav from './LineUpNav'

interface Props {
  day: string
  events: EventWithLocation[]
}

function ShowDay({ day, events }: Props) {
  return (
    <>
      <LineUpNav />

      <h2>
        events: <span className="data">{day}</span>
      </h2>
      <a className="nav" href={`/events/add/${day}`}>
        add event
      </a>

      <ul className="cards">
        {events.map(({ eventName, locationName, time, description }) => (
          <li className="card">
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
            <a href="/events/{id}/edit">edit event</a>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ShowDay
