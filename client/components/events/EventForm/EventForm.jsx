import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const eventSchema = Yup.object({
  title: Yup.string()
    .required('Required'),
  date: Yup.date()
    .required('Required'),
  volunteersNeeded: Yup.number()
    .required('Required'),
  description: Yup.string()
    .required('Required')
})

export default function EventForm (props) {
  const formik = useFormik({
    initialValues: {
      title: '',
      date: '',
      volunteersNeeded: '',
      description: ''
    },
    onSubmit: values => {
      console.log(values)
    },
    validationSchema: eventSchema
  })

  return (
    <>
      <div className='flex-container'>
        <article className='column-6'>
          <h2>Create Event</h2>
          <div className="field">

            <form className='form-container'onSubmit={formik.handleSubmit}>
              <label
                htmlFor='title'
                className='form-label'>Event Title
              </label>
              {formik.errors.title && (
                <p className="inputError">{formik.errors.title}</p>
              )}
              <input
                className='form-input'
                id='title'
                name='title'
                type='text'
                placeholder='event title'
                onChange={formik.handleChange}
                value={formik.values.title}/>

              <label className='form-label'>Date</label>
              {formik.errors.date && (
                <p className="inputError">{formik.errors.date}</p>
              )}
              <input
                className='form-input'
                id='date'
                name='date'
                type='date'
                placeholder='date'
                onChange={formik.handleChange}
                value={formik.values.date} />

              <label
                htmlFor='volunteersNeeded'
                className='form-label'
              >Volunteers Needed</label>
              {formik.errors.volunteersNeeded && (
                <p className="inputError">{formik.errors.volunteersNeeded}</p>
              )}
              <input
                className='form-input'
                id='volunteersNeeded'
                name='volunteersNeeded'
                type='number'
                placeholder='volunteers needed'
                min='0'
                onChange={formik.handleChange}
                value={formik.values.volunteersNeeded}
              />

              <label
                htmlFor='description'
                className='form-label'
              >Description</label>
              {formik.errors.description && (
                <p className="inputError">{formik.errors.description}</p>
              )}
              <textarea
                className='form-textarea'
                id='description'
                name='description'
                placeholder='event description'
                onChange={formik.handleChange}
                value={formik.values.description}
              />
              <button className='button-primary' type='submit'>{props.action}</button>
            </form>
          </div>
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
