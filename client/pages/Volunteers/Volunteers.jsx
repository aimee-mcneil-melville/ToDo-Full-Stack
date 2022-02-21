// TODO: Return volunteer list from component above
import React, { useState, useEffect } from 'react'
import VolunteerList from '../../components/volunteers/VolunteerList/VolunteerList'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getVolunteers } from './volunteersHelper'

export default function Volunteers () {
  const { id } = useParams()
  const [volunteers, setVolunteers] = useState([])
  const user = useSelector(globalState => globalState.user)

  useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    getVolunteers(id, user)
      .then((volunteers) => {
        setVolunteers(volunteers)
        return null
      })
  }, [user, id])

  return (
    <>
      <VolunteerList volunteers={volunteers} eventId={id}/>
    </>
  )
}
