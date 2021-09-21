import React from 'react'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import { registerUser } from './registerHelper'
import { useAuth0 } from '@auth0/auth0-react'
import * as Yup from 'yup'

const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'This must be atleast 2 characters long!')
    .max(15, 'Sorry! this must be under 15 characters long')
    .required('Required'),
  lastName: Yup.string()
    .required('Required')
    .min(2, 'This must be atleast 2 characters long!')
    .max(20, 'Sorry, this must be under 20 characters long'),
  username: Yup.string()
    .min(2, 'This must be atleast 2 characters long!')
    .max(15, 'Sorry! this must be under 15 characters long')
    .required('Required'),
  gardenId: Yup.number()
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
      registerUser(values, authUser, history.push)
    },
    validationSchema: registerSchema
  })

  function showAnyErrors (inputName) {
    return formik.errors[inputName] && formik.touched[inputName]
      ? <p className='inputError'>{formik.errors[inputName]}</p>
      : null
  }

  return (
    <>
      <section className='flex-container'>
        <form className='column-6' onSubmit={formik.handleSubmit}>
          <div className="field">
            <label htmlFor='firstName' className='form-label'>First Name</label>
            {showAnyErrors('firstName')}
            <input
              className='form-input'
              id='firstName'
              name='firstName'
              placeholder='First Name'
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            <label htmlFor='lastName' className='form-label'>Last Name</label>
            {showAnyErrors('lastName')}
            <input
              className='form-input'
              id='lastName'
              name='lastName'
              placeholder='Last Name'
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
            <label htmlFor='username' className='form-label'>Username</label>
            {showAnyErrors('username')}
            <input
              className='form-input'
              id='username'
              name='username'
              placeholder='Username'
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <label htmlFor='garden' className='form-label'>My Garden</label>
            {showAnyErrors('garden')}
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
