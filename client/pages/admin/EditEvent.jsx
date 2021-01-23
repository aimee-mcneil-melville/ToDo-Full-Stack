import React, { useState, useEffect } from 'react'
import { getEvent, updateEvent } from './editEventHelper'

function EditEvent (props) {
  const [form, setForm] = useState({
    title: '',
    date: '',
    volunteersNeeded: 0,
    description: ''
  })

  function handleChange (e) {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  useEffect(() => {
    const { id } = props.match.params
    return getEvent(id, setForm)
  }, [])

  function handleSubmit (e) {
    e.preventDefault()
    const { id } = props.match.params
    const navigate = props.history.push
    updateEvent(id, form, navigate)
  }

  const { title, date, volunteersNeeded, description } = form
  return (
    <>
      <div className="column form">
        <div className="column is-two-fifths pl-0 is-pulled-left">
          <h2 className="mb-6">Edit This Event</h2>
          <form>
            <h5 className="label">Event Title</h5>
            <input
              className="input is-normal"
              type="text"
              placeholder="event title"
              name="title"
              value={title}
              onChange={handleChange}
            />

            <h5 className="label">Date</h5>
            <input
              className="input is-normal"
              type="date"
              name="date"
              value={date}
              onChange={handleChange}
            />

            <h5 className="label">Volunteers Needed</h5>
            <input
              className="input is-normal"
              type="number"
              name="volunteersNeeded"
              min="0"
              value={volunteersNeeded}
              onChange={handleChange}
            />

            <h5 className="label">Event Description</h5>
            <textarea
              className="textarea is-normal"
              placeholder="event description"
              name="description"
              value={description}
              onChange={handleChange}
            />

            <button
              className="button mt-6"
              onClick={handleSubmit}
            >Update Event</button>
          </form>
        </div>

        <div className="column is-two-fifths is-pulled-right">
          <h1 className="mb-6">Event Preview</h1>
          <div className="eventPreview box mt-78">
            {title === ''
              ? <p>Your title here</p>
              : <p>{title}</p>
            }
            {date === ''
              ? <p>Your date here</p>
              : <p>{date}</p>
            }
            {volunteersNeeded === 0
              ? <p>Number of volunteers</p>
              : <p>{volunteersNeeded} volunteers needed</p>
            }
            {description === ''
              ? <p>Your description here</p>
              : <p>{description}</p>
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default EditEvent
