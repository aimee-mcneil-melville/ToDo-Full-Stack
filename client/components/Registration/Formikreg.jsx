import React from 'react'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import { registerUser } from './registerHelper'
import { useAuth0 } from '@auth0/auth0-react'
import * as Yup from 'yup'

const registerSchema = Yup.object({
  firstName: Yup.string()
    .required('Required'),
  lastName: Yup.date()
    .required('Required'),
  userName: Yup.number()
    .required('Required')
})

export default function EventForm (props) {
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
                value={formik.values.volunteersNeeded}
              />

              <label
                htmlFor='description'
                className='form-label'
              >Description</label>
              {formik.errors.description && formik.touched.description
                ? (<p className="inputError">{formik.errors.description}</p>)
                : null}
              <textarea
                className='form-textarea'
                id='description'
                name='description'
                placeholder='event description'
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </div>
            <button className='button-primary' type='submit'>Submit</button>
          </form>
        </article>

        <div className='column-6'>
          <h2>Event Preview</h2>
          <article className='card-secondary'>
            {formik.values.title
              ? <h1 className='card-title'>{formik.values.title}</h1>
              : <h1 className='card-title'>Your title here</h1>
            }
            {formik.values.date
              ? <p>{formik.values.date}</p>
              : <p>Your date here</p>
            }
            <p>{formik.values.volunteersNeeded} volunteer{Number(formik.values.volunteersNeeded) !== 1 ? 's' : ''} needed</p>
            {formik.values.description
              ? <p>{formik.values.description}</p>
              : <p>Your description here</p>
            }
          </article>
        </div>
      </div>
    </>
  )
}
