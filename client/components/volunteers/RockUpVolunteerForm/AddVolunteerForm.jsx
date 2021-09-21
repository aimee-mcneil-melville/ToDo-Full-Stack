import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { addVolunteer } from './AddVolunteerFormHelper'

const schema = Yup.object({
  firstName: Yup.string()
    .required('Requiered'),
  lastName: Yup.string()
    .required('Requiered')
})

export default function AddVolunteerForm ({ addExtraVolunteer, id }) {
  const formik = useFormik({
    initialValues: {
      eventId: id,
      firstName: '',
      lastName: ''
    },
    onSubmit: values => {
      addVolunteer(values, addExtraVolunteer)
    },
    validationSchema: schema
  })

  return (
    <>
      <h2 className='form-title'>Add Rock-Up Attendee</h2>

      <form className='form-container' onSubmit={formik.handleSubmit}>
        <div>

          <label htmlFor='firstname'>First Name</label>

          {formik.errors.firstName && formik.touched.firstName
            ? (<p className='inputError'>{formik.errors.firstName}</p>)
            : null}

          <input
            className='input'
            id='firstName'
            name='firstName'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            placeholder='First Name'
            aria-label='firstName'
            type='text'
          />
        </div>

        <div>
          <label htmlFor='lastname'>Last Name</label>

          {formik.errors.lastName && formik.touched.lastName
            ? (<p className='inputError'>{formik.errors.lastName}</p>)
            : null}

          <input
            className='input'
            id='lastName'
            name='lastName'
            value={formik.values.lastName}
            onChange={formik.handleChange}
            placeholder='Last Name'
            aria-label='lastName'
            type='text'
          />
        </div>

        <button
          className='edit-event-button'
          data-testid='submit-button'
          type='submit'
        >Add
        </button>
      </form>
    </>
  )
}
