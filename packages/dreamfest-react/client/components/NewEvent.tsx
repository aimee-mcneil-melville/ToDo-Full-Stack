import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import EditEventForm from './EditEventForm.tsx'
import { EventData } from '../../models/Event.ts'
import LineupNav from './LineupNav.tsx'
import { useCreateEvent } from '../hooks/api.ts'

export default function NewEvent() {
  const createEvent = useCreateEvent()
  const navigate = useNavigate()
  const handleSubmit = useCallback(async (data: EventData) => {
    await createEvent.mutateAsync(data)
    navigate(`/schedule/${data.day}`)
  }, [])

  return (
    <>
      <LineupNav />
      <h2>New Event</h2>
      <EditEventForm
        submitLabel="Create event"
        name=""
        day="friday"
        time=""
        locationId={1}
        description=""
        onSubmit={handleSubmit}
      />
    </>
  )
}
