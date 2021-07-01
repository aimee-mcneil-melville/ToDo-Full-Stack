import React from 'react'

import { toggleVolunteerStatus } from './volunteerButtonHelper'

export default function VolunteerButton ({ eventId, volunteering, setVolunteering }) {
  function handleClick () {
    return toggleVolunteerStatus(eventId, volunteering)
      .then((wasSuccessful) => {
        if (wasSuccessful) {
          setVolunteering(!volunteering)
        }
        return null
      })
  }

  return (
    <div>
      {!volunteering
        ? <button onClick={handleClick} className='button'>Volunteer</button>
        : <button onClick={handleClick} className='button'>Un-Volunteer</button>
      }
    </div>
  )
}
