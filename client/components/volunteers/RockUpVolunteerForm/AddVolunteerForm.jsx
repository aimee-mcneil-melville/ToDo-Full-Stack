import React, { useState } from 'react'
import { addVolunteer } from './AddVolunteerFormHelper'
import { useSelector } from 'react-redux'

export default function AddVolunteerForm ({ addExtraVolunteer, id }) {
  const token = useSelector((state) => state.user.token)

  const [form, setForm] = useState({
    eventId: id,
    firstName: '',
    lastName: ''
  })

  function handleChange (e) {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  function handleClick (e) {
    e.preventDefault()
    addVolunteer(form, token, addExtraVolunteer)
    setForm({ eventId: id, firstName: '', lastName: '' })
  }

  return (
    <>
      <h2 className="form-title">Add Rock-Up Attendee</h2>

      <form className="form-container">
        <div>
          <label htmlFor="firstname" className="">
            First name
          </label>
          <input
            className="input"
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First name"
            type="text"
            aria-label="firstName"
          />
        </div>
        <div className="">
          <label htmlFor="lastname" className="">
            Last name
          </label>
          <input
            className="input"
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last name"
            type="text"
            aria-label="lastName"
          />
        </div>
        <button
          className="edit-event-button"
          data-testid="submit-button"
          onClick={handleClick}
        >
          Add
        </button>
      </form>
    </>
  )
}
