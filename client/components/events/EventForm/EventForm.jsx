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

  function handleCancel (e) {
    e.preventDefault()
    props.cancelSubmit()
  }

  const { title, date, volunteersNeeded, description } = form
  return (
    <>
      <div className='flex-container'>
        <article className='column-6'>
          <h2>Create Event</h2>
          <form className='form-container'>
            <div className="field">
              <label
                htmlFor='title'
                className='form-label'>Event Title</label>
              <input
                className='form-input'
                id='title'
                name='title'
                type='text'
                placeholder='event title'
                value={title}
                onChange={handleChange}
              />
              <label
                className='form-label'
              >Date</label>
              <input
                className='form-input'
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
                className='form-label'
              >Volunteers Needed</label>
              <input
                className='form-input'
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
                className='form-label'
              >Description</label>
              <textarea
                className='form-textarea'
                id='description'
                name='description'
                placeholder='event description'
                value={description}
                onChange={handleChange}
              />
            </div>
            <button
              className='button-primary'
              onClick={handleSubmit}
            >{props.action}</button>
            <br/>
          </form>
          {props.action === 'Update Event' ? (
            <button
              className='button-primary'
              onClick={handleCancel}>Cancel Event
            </button>
          ) : null}
        </article>
        <div className='column-6'>
          <h2>Event Preview</h2>
          <article className='card-secondary'>
            {title
              ? <h1 className='card-title'>{title}</h1>
              : <h1 className='card-title'>Your title here</h1>
            }
            {date
              ? <p>{date}</p>
              : <p>Your date here</p>
            }
            <p>{volunteersNeeded} volunteer{Number(volunteersNeeded) !== 1 ? 's' : ''} needed</p>
            {description
              ? <p>{description}</p>
              : <p>Your description here</p>
            }
          </article>
        </div>
      </div>
    </>

  )
}
