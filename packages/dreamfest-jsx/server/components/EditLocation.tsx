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
        edit location: <span className="data">{name}</span>
      </h2>

      <form method="POST" action="/locations/edit" className="form">
        <input type="hidden" name="id" value={id} />

        <label htmlFor="name">Location name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Location name"
          value={name}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={4}
          id="description"
          name="description"
          placeholder="Location description"
        >
          {description}
        </textarea>

        <div></div>
        <button>Update location</button>
      </form>
    </>
  )
}

export default EditLocation
