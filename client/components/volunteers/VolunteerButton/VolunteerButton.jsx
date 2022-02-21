import React from 'react'

import { toggleVolunteerStatus } from './volunteerButtonHelper'

export default function VolunteerButton({
  eventId,
  volunteering,
  setVolunteering,
}) {
  function handleClick() {
    toggleVolunteerStatus(eventId, !volunteering, setVolunteering)
  }

  return (
    <>
      {!volunteering ? (
        <button onClick={handleClick} className="button-secondary">
          Volunteer
        </button>
      ) : (
        <button onClick={handleClick} className="button-secondary">
          Un-Volunteer
        </button>
      )}
    </>
  )
}
