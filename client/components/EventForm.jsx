import React, { useState } from 'react'

export default function EventForm (props) {
  const [form, setForm] = useState(props.formData || {
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

  function handleSubmit (e) {
    e.preventDefault()
    props.submitEvent(form)
  }

  const { title, date, volunteersNeeded, description } = form
  return (
    <>
      <div className="column form">
        <div className="column is-two-fifths pl-0 is-pulled-left">
          <h2 className="mb-6">Event Details</h2>
          <form>
            <label
              htmlFor="title"
              className="label"
            >Event Title</label>
            <input
              id="title"
              name="title"
              className="input is-normal"
              type="text"
              placeholder="event title"
              value={title}
              onChange={handleChange}
            />

            <label
              htmlFor="date"
              className="label"
            >Date</label>
            <input
              id="date"
              name="date"
              className="input is-normal"
              type="date"
              value={date}
              onChange={handleChange}
            />

            <label
              htmlFor="volunteersNeeded"
              className="label"
            >Number of Volunteers</label>
            <input
              id="volunteersNeeded"
              name="volunteersNeeded"
              className="input is-normal"
              type="number"
              min="0"
              value={volunteersNeeded}
              onChange={handleChange}
            />

            <label
              htmlFor="description"
              className="label"
            >Description</label>
            <textarea
              id="description"
              name="description"
              className="textarea is-normal"
              placeholder="event description"
              value={description}
              onChange={handleChange}
            />

            <button
              className="button mt-6"
              onClick={handleSubmit}
            >{props.action}</button>
          </form>
        </div>

        <div className="column is-two-fifths is-pulled-right">
          <h2 className="mb-6">Event Preview</h2>
          <div className="eventPreview box mt-78">
            {title
              ? <h4>{title}</h4>
              : <h4>Your title here</h4>
            }
            {date
              ? <p>{date}</p>
              : <p>Your date here</p>
            }
            {volunteersNeeded
              ? <p>{volunteersNeeded} volunteers needed</p>
              : <p>Number of volunteers</p>
            }
            {description
              ? <p>{description}</p>
              : <p>Your description here</p>
            }

          </div>
        </div>
      </div>
    </>
  )
}
