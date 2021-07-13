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
      {/* ADMIN EVENT VIEW */}
      <div className='event-preview'>
        <h3 className='title form-title'>Event Preview</h3>
        {title
          ? <h3 className='para-title'>{title}</h3>
          : <h3 className='para-title'>Your title here</h3>
        }
        {date
          ? <p className='para-title'>{date}</p>
          : <p className='para-title'>Your date here</p>
        }
        <p className='para-title'>{volunteersNeeded} volunteer{Number(volunteersNeeded) !== 1 ? 's' : ''} needed</p>
        {description
          ? <p className='para-title'>{description}</p>
          : <p className='para-title'>Your description here</p>
        }
      </div>
      <article className='form-container'>
        {/* ADMIN SAVE EVENT VIEW */}
        <h3 className='form-title'>Create Event</h3>
        <form className='form-container'>
          <div className="field">
            <label
              htmlFor='title'
              className='label'>Event Title</label>
            <input
              className='form-box'
              id='title'
              name='title'
              type='text'
              placeholder='event title'
              // value={title}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label
              htmlFor='date'
              className='label'
            >Date</label>
            <input
              className='form-box'
              id='date'
              name='date'
              type='date'
              placeholder='date'
              // value={date}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label
              htmlFor='volunteersNeeded'
              className='label'
            >Volunteers Needed</label>
            <input
              className='form-box'
              id='volunteersNeeded'
              name='volunteersNeeded'
              type='number'
              placeholder='volunteers needed'
              min='0'
              // value={volunteersNeeded}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label
              htmlFor='description'
              className='label'
            >Description</label>
            <textarea
              className='form-box-height'
              id='description'
              name='description'
              placeholder='event description'
              value={description}
              onChange={handleChange}
            />
          </div>
          <button
            className='button mt-4'
            onClick={handleSubmit}
          >{props.action}</button>
        </form>
      </article>
      {/* <article className='form-container'> */}
      {/* ADMIN ADD EVENT VIEW
        <h3 className='form-title'>Edit Event</h3>
        <form className='form-container'>
          <div className="field">
            <label
              htmlFor='title'
              className='label'>Event Title</label>
            <input
              className='form-box'
              id='title'
              name='title'
              type='text'
              placeholder='event title'
              // value={title}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label
              htmlFor='date'
              className='label'
            >Date</label>
            <input
              className='form-box'
              id='date'
              name='date'
              type='date'
              placeholder='date'
              // value={date}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label
              htmlFor='volunteersNeeded'
              className='label'
            >Volunteers Needed</label>
            <input
              className='form-box'
              id='volunteersNeeded'
              name='volunteersNeeded'
              type='number'
              placeholder='volunteers needed'
              min='0'
              // value={volunteersNeeded}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label
              htmlFor='description'
              className='label'
            >Description</label>
            <textarea
              className='form-box-height'
              id='description'
              name='description'
              placeholder='event description'
              // value={description}
              onChange={handleChange}
            />
          </div>
          <button
            className='button mt-4'
            onClick={handleSubmit}
          >{props.action}</button>
        </form>
      </article> */}

    </>
  )
}
