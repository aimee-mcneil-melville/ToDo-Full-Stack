import { Location } from '../../models/Location.ts'
import LineUpNav from './LineUpNav.tsx'

interface Props {
  location: Location
}

function EditLocation({ location }: Props) {
  const { id, name, description } = location
  return (
    <>
      <LineUpNav />

      <h2>
        edit location: <span className="edit-title">{name}</span>
      </h2>

      <form method="POST" action="/locations/edit" className="form">
        <input type="hidden" name="id" defaultValue={id} />

        <label htmlFor="name">Location name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Location name"
          defaultValue={name}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={4}
          id="description"
          name="description"
          placeholder="Location description"
          defaultValue={description}
        ></textarea>

        <div></div>
        <button>Update location</button>
      </form>
    </>
  )
}

export default EditLocation
