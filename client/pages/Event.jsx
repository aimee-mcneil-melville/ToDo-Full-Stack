import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getEvent } from './eventHelper'
import { useParams } from 'react-router-dom'

function Event (props) {
  const [event, setEvent] = useState({})
  const { id } = useParams()
  const isAdmin = useSelector(globalState => globalState.user.isAdmin)

  const isVolunteer = false // hard coded for now

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
    console.log(isAdmin)
  }

  const { title, gardenName, date, volunteersNeeded, description } = event

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
    </>
  )
}

export default Event
