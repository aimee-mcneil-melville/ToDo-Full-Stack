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

  const { title, description } = form
  return (
    <>
      <div className='form-container'>
        {/* <article className='column-6'> */}
        <p className='label'>Create Event</p>
        <form >
          <div className="field">
            <label
              htmlFor='title'
              className='title-label'>Event Title</label>
            <input
              className='title-box'
              id='title'
              name='title'
              type='text'
              placeholder='event title'
              value={title}
              onChange={handleChange}
            />
            <label
              className='date-label'
            >Date</label>
            <input
              className='date-box'
              id='date'
              name='date'
              type='date'
              placeholder='date'
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label
              htmlFor='volunteersNeeded'
              className='volunteer-label'
            >Volunteers Needed</label>
            <input
              className='volunteer-box'
              id='volunteersNeeded'
              name='volunteersNeeded'
              type='number'
              placeholder='volunteers needed'
              min='0'
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label
              htmlFor='description'
              className='description-label'
            >Description</label>
            <textarea
              className='description-box'
              id='description'
              name='description'
              placeholder='event description'
              value={description}
              onChange={handleChange}
            />
          </div>
          <button
            className='update'
            onClick={handleSubmit}
          >{props.action}</button>
        </form>
        {/* </article> */}
      </div>
    </>

  )
}
