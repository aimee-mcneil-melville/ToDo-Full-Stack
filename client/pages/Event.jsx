import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getEvent, setVolunteerStatus } from './eventHelper'
import { useParams } from 'react-router-dom'
import VolunteersList from '../components/VolunteersList'

function Event (props) {
  const [event, setEvent] = useState({})
  const [isVolunteer, setIsVolunteer] = useState(false)
  const { id } = useParams()
  const isAdmin = useSelector(globalState => globalState.user.isAdmin)

  useEffect(() => {
    getEvent(id)
      .then((event) => {
        console.log(event);
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

  const { title, gardenName, date, volunteersNeeded, description, volunteers } = event
  const mockData = [{id: 1, firstName: 'Sloane', lastName: 'Pickles'}, {id: 2, firstName: 'Steve', lastName: 'Puce'}]
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
        <VolunteersList volunteers={mockData} />
        </div>
      }
       
    </>
  )
}

export default Event
