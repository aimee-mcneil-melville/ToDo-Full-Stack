import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getEvent, setVolunteerStatus } from './eventHelper'
import { useParams } from 'react-router-dom'

function Event (props) {
  const [event, setEvent] = useState({})
  const [isVolunteer, setIsVolunteer] = useState(false)
  const { id } = useParams()
  const isAdmin = useSelector(globalState => globalState.user.isAdmin)

  useEffect(() => {
    getEvent(id)
      .then((event) => {
        setEvent(event)
        return null
      }).catch(err => {
        console.log(err)
      })
  }, [])

  function clickHandler () {
    return setVolunteerStatus(id, isVolunteer)
      .then((wasSuccessful) => {
        if (wasSuccessful) {
          setIsVolunteer(!isVolunteer)
        }
        return null
      })
  }

  const { title, gardenName, gardenAddress, date, volunteersNeeded, description } = event

  return (

    <>
      <article className='column'>
        <div className='columns'>
          <article className='column is-three-quarters'>
            <h2 className='title is-4'>{title}</h2>
            <dl className='description--inline'>
              <dt className='has-text-weight-bold'>Garden Name:</dt>
              <dd>{gardenName}</dd>

              <dt className = 'has-text-weight-bold'>Address:</dt>
              <dd>{gardenAddress}</dd>

              <dt className = 'has-text-weight-bold'>Date:</dt>
              <dd>{date}</dd>

              <dt className = 'has-text-weight-bold'>Volunteers Needed:</dt>
              <dd>{volunteersNeeded}</dd>
            </dl>
            <p className='has-text-weight-semibold'>{description}</p>
            { !isAdmin &&
              <div>
                {!isVolunteer
                  ? <button onClick={clickHandler} className='button'>Volunteer</button>
                  : <button onClick={clickHandler} className='button'>Un-Volunteer</button>
                }
              </div>
            }
          </article>
        </div>
        image or map can go here
      </article>
    </>
  )
}

export default Event
