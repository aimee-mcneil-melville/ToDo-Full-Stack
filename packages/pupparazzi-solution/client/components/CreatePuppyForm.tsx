import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { PuppyData } from '../../models/Puppy'

interface Props {
  pending: boolean
  onSubmit: (data: PuppyData) => void
}

const empty = {
  name: '',
  breed: '',
  owner: '',
  image: '/images/puppy3.jpg',
} as PuppyData

export default function EditPuppyForm(props: Props) {
  const { onSubmit, pending } = props
  const [{ name, breed, owner, image }, setFormState] = useState(empty)
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (pending) {
      return
    }
    onSubmit({ name, breed, owner, image })
  }
  const handleChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget
    setFormState((prev) => ({ ...prev, [name]: value }))
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input name="name" id="name" value={name} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="breed">Breed:</label>
        <input name="breed" id="breed" value={breed} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="owner">Owner:</label>
        <input name="owner" id="owner" value={owner} onChange={handleChange} />
      </div>
      <button data-pending={pending}>Submit</button>
    </form>
  )
}
