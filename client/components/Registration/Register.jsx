import React from 'react'
// import { useFormik } from 'formik'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import { registerUser } from './registerHelper'
import { useAuth0 } from '@auth0/auth0-react'
import * as Yup from 'yup'

const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .required('Required')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!'),
  username: Yup.string()
    .required('Required')
})

export default function Register () {
  const authUser = useAuth0().user
  const history = useHistory()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      gardenId: null
    },
    onSubmit: values => {
      console.log('hello')
      registerUser(values, authUser, history.push)
    },
    validationSchema: registerSchema
  })

  return (
    <>
      <section className='flex-container'>
        <form className='column-6' onSubmit={formik.handleSubmit}>
          <div className="field">
            <label htmlFor='firstName' className='form-label'>First Name</label>
            {formik.errors.firstName && formik.touched.firstName
              ? (<p className="inputError">{formik.errors.firstName}</p>)
              : null}
            <input
              className='form-input'
              id='firstName'
              name='firstName'
              placeholder='First Name'
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />

            <label htmlFor='lastName' className='form-label'>Last Name</label>
            {formik.errors.lastName && formik.touched.lastName
              ? (<p className="inputError">{formik.errors.lastName}</p>)
              : null}
            <input
              className='form-input'
              id='lastName'
              name='lastName'
              placeholder='Last Name'
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
            <label htmlFor='username' className='form-label'>Username</label>
            {formik.errors.username && formik.touched.username
              ? (<p className="inputError">{formik.errors.username}</p>)
              : null}
            <input
              className='form-input'
              id='username'
              name='username'
              placeholder='Username'
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <label htmlFor='garden' className='form-label'>My Garden</label>
            {formik.errors.garden && formik.touched.garden
              ? (<p className="inputError">{formik.errors.garden}</p>)
              : null}
            <select
              className='select'
              name='gardenId'
              id='garden'
              onChange={formik.handleChange}
            >

              <option hidden>Select from this list</option>
              <option value={1}>Kelmarna Gardens</option>
              <option value={2}>Kingsland Community Orchard</option>
              <option value={3}>Devonport Community Garden</option>
            </select>
          </div>
          <button className='button-primary' type='submit' data-testid='submitButton'>Register</button>
        </form>
      </section>
      <div className='column-6'>
        <img src='./images/comGardenPlant.png' alt='Person gardening with trowel' />
      </div>

    </>
  )
}
