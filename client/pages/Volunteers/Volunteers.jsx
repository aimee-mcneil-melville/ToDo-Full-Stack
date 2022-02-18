// TODO: Return volunteer list from component above
import React from 'react'
import VolunteerList from '../../components/volunteers/VolunteerList/VolunteerList'
import { useParams } from 'react-router-dom'

export default function Volunteers () {
  const { id } = useParams()

  return (
    <>
      <VolunteerList eventId={id}/>
    </>
  )
}
