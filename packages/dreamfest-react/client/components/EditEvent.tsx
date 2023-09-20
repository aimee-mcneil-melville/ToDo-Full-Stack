import { useCallback, useState, FormEvent, ChangeEvent } from 'react' 
import { useParams } from 'react-router-dom'
import useLocations from '../hooks/use-locations'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { EventWithLocation } from '../../models/Event'

interface Props {
  eventName: string
  description: string
  time: string

  onDelete: () => void
  onSubmit: (_: { eventName: string, description: string, time: string }) => void
}
function EditEventForm({ eventName, description, time, onDelete, onSubmit}: Props) {
  const locations = useLocations()
  const [formState, setFormState] = useState({ eventName, description, time })

  const handleChange = useCallback((evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.currentTarget
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const handleSubmit = useCallback((evt: FormEvent) => {
    evt.preventDefault()
    onSubmit(formState)
  }, [formState])

  if (locations.isLoading) {
    return 'Loading...'
  }

  if (locations.isError || !locations.data) {
    return 'Failed to load locations data'
  }

  return <>
  <form onSubmit={handleSubmit} className="form">
    <input type="hidden" name="id" value="{{event.id}}" />
  
    <label htmlFor="name" className="label"> Event Name </label>
    <input type="text" id="name" name="eventName" placeholder="Event name" onChange={handleChange} value={formState.eventName} />
  
    <label htmlFor="description" className="label"> Description </label>
    <textarea rows={5} id="description" name="description" placeholder="Event description" onChange={handleChange} value={formState.description} />
  
    <label htmlFor="location" className="label"> Location </label>
    <select id="location" name="locationId">
      {locations.data.locations.map(({id, name}) => 
      <option value={id} >{name}</option>)}
    </select>
  
    <label htmlFor="day" className="label"> Day </label>
    <select id="day" name="day">
      {['friday', 'saturday', 'sunday'].map((value) => 
      <option value={value}>{value}</option>
      )}
    </select>
  
    <label htmlFor="time"> Time </label>
    <input type="text" id="time" name="time" onChange={handleChange} placeholder="Example: 1pm - 2pm" value={formState.time} />
  
    <div></div>
    <button>Update event</button>
  </form>
  
  <form onSubmit={onDelete} className='form'>
    <div />
    <button className="delete">Delete event</button>
  </form>
  </>
  
}

function useEventData(id: number) {
  return useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const res = await request.get(`/api/v1/events/${id}`)
      return res.body as EventWithLocation
    }
  })
}

function useEditEvent(id: number) { 
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (values: EventWithLocation) => {
      await request.patch(`/api/v1/event/${id}`).send(values)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(['event', id])
      queryClient.invalidateQueries(['schedule'])
    }
  })
}

function useDeleteEvent(id: number) {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async () => {
      await request.delete(`/api/v1/event/${id}`)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(['event', id])
      queryClient.invalidateQueries(['schedule'])
    }
  })
}

export default function EditEvent() {
  const params = useParams()
  const id = Number(params.id)
  const event = useEventData(id)  
  const editEvent = useEditEvent(id)
  const deleteEvent = useDeleteEvent(id)

  const handleSubmit = useCallback(async (formData: any) => {
    // editEvent.mutateAsync(formData)
  }, [])

  const handleDelete = useCallback(async  () => {
    deleteEvent.mutateAsync()
  }, [])

  if (event.isLoading) {
    return 'Loading...'
  }

  if (event.isError || !event.data) {
    return 'Failed to load event data'
  }

  return <>
    <h2>edit event: <span className="data">{event.data.eventName}</span></h2>
    <EditEventForm {...event.data} onSubmit={handleSubmit} onDelete={handleDelete} /> 
  </>
}