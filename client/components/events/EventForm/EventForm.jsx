import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'

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
      props.submitEvent({ ...values, date: moment(values.date).format('L') })
    },
    validationSchema: eventSchema
  })
  console.log(moment(formik.values.date).format('L'))
  // function dateFormater (date) {
  //   // input: yyyy-MM-dd
  //   // output: dd-MM-yyyy
  //   return `${date[8]}${date[9]}/${date[5]}${date[6]}/${date[0]}${date[1]}${date[2]}${date[3]}`
  // }

  return (
    <>
      <div className='flex-container'>
        <article>
          <h2>{props.action}</h2>

          <form className='form-container'onSubmit={formik.handleSubmit}>
            <div className="field">
              <label
                htmlFor='title'
                className='title-label'>Event Title
              </label>
              {formik.errors.title && formik.touched.title
                ? (<p className="inputError">{formik.errors.title}</p>)
                : null}
              <input
                className='title-box'
                id='title'
                name='title'
                type='text'
                placeholder='event title'
                onChange={formik.handleChange}
                value={formik.values.title}/>

              <label
                htmlFor='date'
                className='date-label'>Date</label>
              {formik.errors.date && formik.touched.date
                ? (<p className="inputError">{formik.errors.date}</p>)
                : null}
              <input
                className='date-box'
                id='date'
                name='date'
                type='date'
                placeholder='date'
                onChange={formik.handleChange}
                value={formik.values.date} />

              <label
                htmlFor='volunteersNeeded'
                className='volunteer-label'
              >Volunteers Needed</label>
              {formik.errors.volunteersNeeded && formik.touched.volunteersNeeded
                ? (<p className="inputError">{formik.errors.volunteersNeeded}</p>)
                : null}
              <input
                className='volunteer-box'
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
                className='description-label'
              >Description</label>
              {formik.errors.description && formik.touched.description
                ? (<p className="inputError">{formik.errors.description}</p>)
                : null}
              <textarea
                className='descripton-box'
                id='description'
                name='description'
                placeholder='event description'
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </div>
            <button className='update' type='submit'>Submit</button>
          </form>
        </article>
      </div>
    </>
  )
}
