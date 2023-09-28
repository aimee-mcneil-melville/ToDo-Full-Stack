import LineUpNav from './LineUpNav'
import { Location } from '../../models/Location.ts'
import { Event } from '../../models/Event.ts'
import { Day } from '../../models/Day.ts'

interface Props {
  locations: Location[]
  days: Day[]
  event: Event
  selectedLocationId: number
  selectedDayName: string
}

function EditEvent(props: Props) {
  const { event, locations, days, selectedLocationId, selectedDayName } = props
  return (
    <>
      <LineUpNav />

      <h2>
        edit event: <span className="data">{event.name}</span>
      </h2>

      <form method="POST" action="/events/edit" className="form">
        <input type="hidden" name="id" defaultValue={event.id} />

        <label htmlFor="name" className="label">
          Event Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Event name"
          defaultValue={event.name}
        />

        <label htmlFor="description" className="label">
          Description
        </label>
        <textarea
          rows={5}
          id="description"
          name="description"
          placeholder="Event description"
          defaultValue={event.description}
        ></textarea>

        <label htmlFor="location" className="label">
          Location
        </label>
        <select
          id="location"
          name="locationId"
          defaultValue={selectedLocationId}
        >
          {locations.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        <label htmlFor="day" className="label">
          Day
        </label>
        <select id="day" name="day" defaultValue={selectedDayName}>
          <option value="">Select a day</option>
          {days.map(({ value, name }) => (
            <option key={value} value={value}>
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
          defaultValue={event.time}
        />

        <div></div>
        <button>Update event</button>
      </form>

      <form method="POST" action="/events/delete" className="form">
        <input type="hidden" name="id" defaultValue={event.id} />
        <input type="hidden" name="day" defaultValue={event.day} />
        <div></div>
        <button className="delete">Delete event</button>
      </form>
    </>
  )
}

export default EditEvent
