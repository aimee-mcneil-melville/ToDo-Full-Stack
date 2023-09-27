import LineUpNav from './LineUpNav'
import { Location } from '../../models/Location.ts'
import { Event } from '../../models/Event.ts'

interface Props {
  locations: Location[]
  days: { value: number; name: string; selected?: boolean }[]
  event: Event
}

function EditEvent({ event, locations, days }: Props) {
  return (
    <>
      <LineUpNav />

      <h2>
        edit event: <span className="data">{event.name}</span>
      </h2>

      <form method="POST" action="/events/edit" className="form">
        <input type="hidden" name="id" value={event.id} />

        <label htmlFor="name" className="label">
          Event Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Event name"
          value={event.name}
        />

        <label htmlFor="description" className="label">
          Description
        </label>
        <textarea
          rows={5}
          id="description"
          name="description"
          placeholder="Event description"
        >
          {event.description}
        </textarea>

        <label htmlFor="location" className="label">
          Location
        </label>
        <select id="location" name="locationId">
          {locations.map(({ id, name, selected }) => (
            <option value={id} selected={selected}>
              {name}
            </option>
          ))}
        </select>

        <label htmlFor="day" className="label">
          Day
        </label>
        <select id="day" name="day">
          {days.map(({ value, name, selected }) => (
            <option value={value} selected={selected}>
              {name}
            </option>
          ))}
        </select>

        <label htmlFor="time"> Time </label>
        <input
          type="text"
          id="time"
          name="time"
          placeholder="Example: 1pm - 2pm"
          value={event.time}
        />

        <div></div>
        <button>Update event</button>
      </form>

      <form method="POST" action="/events/delete" className="form">
        <input type="hidden" name="id" value={event.id} />
        <input type="hidden" name="day" value={event.day} />
        <div></div>
        <button className="delete">Delete event</button>
      </form>
    </>
  )
}

export default EditEvent
