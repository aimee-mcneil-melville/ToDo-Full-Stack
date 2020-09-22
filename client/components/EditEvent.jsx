import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function EditEvent () {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [volunteers, setVolunteers] = useState(0)
  const [description, setDescription] = useState('')

  return (
    <>
      <div className="edit-event-form columns is-8">
        <div className="column">
          <h1>Kelmarna Gardens</h1>
          <h3>Edit new event</h3>
          <form>
            <h5>Event Title</h5>

            <input className="input is-normal" type="text"
              placeholder="event title"
              name="title"
              value={title} onChange={event => setTitle(event.target.value)}/>

            <h5>Date</h5>
            <input className="input is-normal" type="datetime-local"
              placeholder="date and time"
              name="date"
              value={date} onChange={event => setDate(event.target.value)}/>

            <h5>Volunteers Needed</h5>
            <input className="input is-normal" type="number"
              placeholder="number of volunteers needed"
              name="volunteers"
              value={volunteers} onChange={event => setVolunteers(event.target.value)}/>

            <h5>Event Description</h5>
            <textarea className="textarea is-normal"
              placeholder="event description"
              name="description"
              value={description} onChange={event => setDescription(event.target.value)}/>
            {/* <Link to='/garden' className="button my-4 is-primary">Create</Link> */}
            <button className="button my-4 is-primary">Update Event</button>
          </form>
        </div>
        <div className="event-preview column">
          <h1>Event Preview</h1>
          <div className="box">
            <p>Weeds worker bee</p>
            <p>Date</p>
            <p>volunteers</p>
            <p>Description here...</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditEvent
