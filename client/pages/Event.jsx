import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getEvent, setVolunteerStatus } from './eventHelper'
import { useParams } from 'react-router-dom'
import VolunteersList from '../components/VolunteersList'
import volunteersList from '../components/VolunteersList'

function Event (props) {
  const [event, setEvent] = useState({})
  const [isVolunteer, setIsVolunteer] = useState(false)
  const { id } = useParams()
  const isAdmin = useSelector(globalState => globalState.user.isAdmin)

  useEffect(() => {
    getEvent(id)
    .then ((event) => {
      setEvent(event)
    })
  }, [])

  function clickHandler () {
   setVolunteerStatus(id, isVolunteer)
    .then((wasSuccessful) => {
      if (wasSuccessful) {
        setIsVolunteer(!isVolunteer)
      }
    })
  }

  const { title, gardenName, date, volunteersNeeded, description, volunteers } = event

  return (
  
    <>
      <h1>{title}</h1>
      <h2>{gardenName}</h2>
      <h3>{date}</h3>
      <h3>{volunteersNeeded}</h3>
      <p>{description}</p>

      { !isAdmin &&
        <div>
          {!isVolunteer
            ? <button onClick={clickHandler} className='button'>Volunteer</button>
            : <button onClick={clickHandler} className='button'>Un-Volunteer</button>
          }
        </div>
      }
      
      {
        isAdmin &&
        <div>
        <VolunteersList volunteers={volunteers} />
        </div>
      }
       
    </>
  )
}

export default Event