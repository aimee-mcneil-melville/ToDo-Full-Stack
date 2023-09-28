import LineUpNav from './LineUpNav'
import { Location } from '../../models/Location.ts'
import { Day } from '../../models/Day.ts'

interface Props {
  locations: Location[]
  days: Day[]
  selectedDayName: string
}

function AddEvent({ locations, days, selectedDayName }: Props) {
  return (
    <>
      <LineUpNav />

      <h2>add new event</h2>

      <form method="POST" action="/events/add" className="form">
        <label htmlFor="name">Event name</label>
        <input type="text" id="name" name="name" placeholder="Event name" />

        <label htmlFor="description">Description</label>
        <textarea
          rows={3}
          id="description"
          name="description"
          placeholder="Event description"
        ></textarea>

        <label htmlFor="location">Location</label>
        <select id="location" name="locationId">
          {locations.map(({ id, name }) => (
            <option value={id}>{name}</option>
          ))}
        </select>

        <label htmlFor="day">Day</label>
        <select id="day" name="day" defaultValue={selectedDayName}>
          {days.map(({ value, name }) => (
            <option value={value}>{name}</option>
          ))}
        </select>

        <label htmlFor="time">Time</label>
        <input
          type="text"
          id="time"
          name="time"
          placeholder="Example: 1pm - 2pm"
        />

        <div></div>
        <button>Add new event</button>
      </form>
    </>
  )
}

export default AddEvent
