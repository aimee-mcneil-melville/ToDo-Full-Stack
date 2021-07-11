import React from 'react'
// import { Link } from 'react-router-dom'

// import VolunteerButton from '../../volunteers/VolunteerButton/VolunteerButton'

export default function EventDetailCard ({ event, isAdmin }) {
  // const { id, title, date, volunteersNeeded, description, totalVolunteers, isVolunteer } = event
  // const [isVolunteering, setIsVolunteering] = useState(isVolunteer)
  // const remainingVolunteers = volunteersNeeded - totalVolunteers
  // const additionalVolunteers = Math.abs(remainingVolunteers)

  // useEffect(() => {
  //   setIsVolunteering(isVolunteer)
  // }, [isVolunteer])

  return (
    <section className='card-container'>
      <button className='card-close-button'>close</button>
      <article className='card-text-container'>
        <h1 className='card-title'>Weeding Working Bee</h1>
        <h2 className='card-sub-title'>2021/2/2at 10:00am</h2>
        <h2 className='card-sub-title'>8/10 Volunteers</h2>
        <h3 className='card-text'>Description Description Description Description
        Description Description Description Description Description
        Description Description Description Description Description
        </h3>
      </article>
      <button className='card-volunteer-button '>Volunteer</button>
    </section>
  )
}
