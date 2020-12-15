import React, { useState } from 'react'
import { addEvent } from './addEventHelper'

function AddEvent (props) {
  const [form, setForm] = useState({
    title: '',
    date: '',
    volunteersNeeded: 0,
    description: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const navigate = props.history.push
    addEvent(form, navigate)
  }

  const { title, date, volunteersNeeded, description } = form
  return (
    <>
      <div className="column form">
        <form className='column is-two-fifths pl-0 is-pulled-left'>
          <h2 className='mb-6'>Create New Event</h2>
          <label className='label'>Event Title</label>
          <input
            className="input is-normal"
            type="text"
            placeholder="Event Title"
            name="title"
            value={title}
            onChange={handleChange}
          />

          <h5 className='label'>Date</h5>
          <input
            className="input is-normal"
            type="date"
            name="date"
            value={date}
            onChange={handleChange}
          />

          <label className='label'>Volunteers Needed</label>
          <input
            className="input is-normal"
            type="number"
            name="volunteersNeeded"
            value={volunteersNeeded}
            onChange={handleChange}
          />

          <label className='label'>Event Description</label>
          <textarea
            className="textarea is-normal"
            placeholder="Event Description"
            name="description"
            value={description}
            onChange={handleChange}
          />

          <button
            className="button mt-6"
            onClick={handleSubmit}
          >Create</button>
        </form>

        <div className="column is-two-fifths is-pulled-right">
          <div className='eventPreview'>
            <h1 className='mb-6'>Event Preview</h1>
            <div className="box mt-78">
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
      </div>
    </>

  )
}

export default AddEvent
