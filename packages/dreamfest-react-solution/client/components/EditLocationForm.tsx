import { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import useEditLocation from '../hooks/use-edit-location.ts'

interface Props {
  id: number
  name: string
  description: string
}

export default function EditLocationForm({ id, name, description }: Props) {
  const [formState, setFormState] = useState({
    name,
    description,
  })

  const updateLocation = useEditLocation()

  const handleChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = evt.currentTarget
      setFormState((prev) => ({
        ...prev,
        [name]: value,
      }))
    },
    []
  )

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      updateLocation.mutate({ id, ...formState })
    },
    [formState]
  )

  return (
    <form
      onSubmit={handleSubmit}
      className="form"
      aria-busy={updateLocation.isLoading}
    >
      {updateLocation.isError && (
        <h3>{String(updateLocation.failureReason)}</h3>
      )}
      {updateLocation.isSuccess && <h3>Location updated!</h3>}

      <label htmlFor="name">Location name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Location name"
        value={formState.name}
        onChange={handleChange}
      />

      <label htmlFor="description">Description</label>
      <textarea
        rows={4}
        id="description"
        name="description"
        placeholder="Location description"
        onChange={handleChange}
        value={formState.description}
      />
      <div></div>
      <button disabled={updateLocation.isLoading}>Update location</button>
    </form>
  )
}
