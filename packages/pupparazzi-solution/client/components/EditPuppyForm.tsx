import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { PuppyData } from '../../models/Puppy'

interface Props extends PuppyData {
  pending: boolean
  onUpdate: (data: PuppyData) => void
  onDelete: () => void
}

export default function EditPuppyForm(props: Props) {
  const { onUpdate, onDelete, pending, ...puppy } = props
  const [{ name, breed, owner, image }, setFormState] = useState(puppy)
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (pending) {
      return
    }
    onUpdate({ name, breed, owner, image })
  }

  const handleDelete = () => {
    if (pending) {
      return
    }

    onDelete()
  }

  const handleChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget
    setFormState((prev) => ({ ...prev, [name]: value }))
  }, [])

  return (
    <form onSubmit={handleSubmit} className="form">
      <img className="img-circle" src={puppy.image} alt={puppy.name} />
      <div className="form-item">
        <label htmlFor="name">Name:</label>
        <input name="name" id="name" value={name} onChange={handleChange} />
      </div>
      <div className="form-item">
        <label htmlFor="breed">Breed:</label>
        <input name="breed" id="breed" value={breed} onChange={handleChange} />
      </div>
      <div className="form-item">
        <label htmlFor="owner">Owner:</label>
        <input name="owner" id="owner" value={owner} onChange={handleChange} />
      </div>
      <div className="form-item">
        <label htmlFor="image">Image:</label>
        <input name="image" id="image" value={image} onChange={handleChange} />
      </div>
      <button data-pending={pending}>Submit</button>
      <button data-pending={pending} onClick={handleDelete}>
        Delete
      </button>
    </form>
  )
}
