import { useCallback, useState, FormEvent, ChangeEvent } from 'react'
import { useLocations } from '../hooks/api.ts'
import { EventData } from '../../models/Event.ts'
import LoadingIndicator from './LoadingIndicator.tsx'

interface Props extends EventData {
  submitLabel: string
  onSubmit: (_: EventData) => void
}

export default function EditEventForm({
  name,
  submitLabel,
  description,
  locationId,
  day,
  time,
  onSubmit,
}: Props) {
  const locations = useLocations()
  const [formState, setFormState] = useState({
    name,
    description,
    day,
    locationId,
    time,
  })

  const handleChange = useCallback(
    (
      evt: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = evt.target
      setFormState((prev) => ({
        ...prev,
        [name]: value,
      }))
    },
    []
  )

  const handleSubmit = useCallback(
    (evt: FormEvent) => {
      evt.preventDefault()
      onSubmit(formState)
    },
    [formState]
  )

  if (locations.isLoading) {
    return <LoadingIndicator />
  }

  if (locations.isError || !locations.data) {
    return 'Failed to load locations data'
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input type="hidden" name="id" value="{{event.id}}" />

      <label htmlFor="name" className="label">
        Event Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Event name"
        onChange={handleChange}
        value={formState.name}
      />

      <label htmlFor="description" className="label">
        Description
      </label>
      <textarea
        rows={5}
        id="description"
        name="description"
        placeholder="Event description"
        onChange={handleChange}
        value={formState.description}
      />

      <label htmlFor="location" className="label">
        Location
      </label>
      <select
        id="location"
        name="locationId"
        value={formState.locationId}
        onChange={handleChange}
      >
        {locations.data.locations.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      <label htmlFor="day" className="label">
        Day
      </label>
      <select id="day" name="day" value={formState.day} onChange={handleChange}>
        {['friday', 'saturday', 'sunday'].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>

      <label htmlFor="time"> Time </label>
      <input
        type="text"
        id="time"
        name="time"
        onChange={handleChange}
        placeholder="Example: 1pm - 2pm"
        value={formState.time}
      />

      <div></div>
      <button>{submitLabel}</button>
    </form>
  )
}
