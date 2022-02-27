import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { addVolunteer } from './AddVolunteerFormHelper'

const schema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
})

export default function AddVolunteerForm({ addExtraVolunteer, id }) {
  const formik = useFormik({
    initialValues: {
      eventId: id,
      firstName: '',
      lastName: '',
    },
    onSubmit: (values) => {
      addVolunteer(values, addExtraVolunteer)
    },
    validationSchema: schema,
  })

  function showAnyErrors(inputName) {
    return formik.errors[inputName] && formik.touched[inputName] ? (
      <p className="inputError">{formik.errors[inputName]}</p>
    ) : null
  }

  return (
    <>
      <h2 className="form-title">Add Rock-Up Attendee</h2>

      <form className="form-container" onSubmit={formik.handleSubmit}>
        <div>
          <label className="label" htmlFor="firstname">
            First Name
          </label>

          {showAnyErrors('firstName')}

          <input
            className="form-box"
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            placeholder="First Name"
            aria-label="firstName"
            type="text"
          />
        </div>

        <div>
          <label className="label" htmlFor="lastname">
            Last Name
          </label>

          {showAnyErrors('lastName')}

          <input
            className="form-box"
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            placeholder="Last Name"
            aria-label="lastName"
            type="text"
          />
        </div>

        <button
          className="edit-event-button"
          data-testid="submit-button"
          type="submit"
        >
          Add
        </button>
      </form>
    </>
  )
}
