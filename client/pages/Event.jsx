import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { getEvent, toggleVolunteerStatus } from './eventHelper'
// import { getGarden } from './gardenHelper'

import VolunteersList from '../components/VolunteersList'
import Map from '../components/Map'

function Event (props) {
  const [event, setEvent] = useState({})
  const [isVolunteer, setIsVolunteer] = useState(false)
  const { id } = useParams()
  const isAdmin = useSelector(globalState => globalState.user.isAdmin)
  // currently using initial state and wipes clear on refresh - needs attention
  // const garden = useSelector(globalState => globalState.garden)
  const lat = useSelector(globalState => globalState.garden.lat)
  const lon = useSelector(globalState => globalState.garden.lon)
  const address = useSelector(globalState => globalState.garden.address)

  console.log(address)

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    getEvent(id)
      .then((event) => {
        console.log(event)
        setEvent(event)
        setIsVolunteer(event.isVolunteer)
        return null
      })
  }, [])

  function clickHandler () {
    return toggleVolunteerStatus(id, isVolunteer)
      .then((wasSuccessful) => {
        if (wasSuccessful) {
          setIsVolunteer(!isVolunteer)
        }
        return null
      })
  }

  const { title, gardenName, gardenAddress, date, volunteersNeeded, description, volunteers } = event

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
            {!isAdmin
              ? <div>
                {!isVolunteer
                  ? <button onClick={clickHandler} className='button'>Volunteer</button>
                  : <button onClick={clickHandler} className='button'>Un-Volunteer</button>
                }
              </div>
              : null
            }
          </article>
        </div>
      </article>
      {isAdmin
        ? <div>
          <VolunteersList volunteers={volunteers} />
        </div>
        : <div>
          <Map
            coordinates={[{ lat: lat, lon: lon }]}
            addresses={[address]}
          />
        </div>
      }
    </>
  )
}

export default Event
