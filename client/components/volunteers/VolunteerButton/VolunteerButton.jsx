import React from 'react'

import { toggleVolunteerStatus } from './volunteerButtonHelper'

export default function VolunteerButton ({ eventId, volunteering, setVolunteering }) {
  function handleClick () {
    toggleVolunteerStatus(eventId, !volunteering, setVolunteering)
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
