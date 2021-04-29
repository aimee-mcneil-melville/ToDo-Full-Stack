import React from 'react'
import { Link } from 'react-router-dom'
import { getIfVolunteer, toggleVolunteerStatus } from '../components/eventItemHelper'
import { useSelector } from 'react-redux'


function Event ({event}) {
  const details = {
    title: 'Wednesday Weeding',
    gardenName: 'Kelmarna Gardens',
    gardenAddress: '12 Hukanui Crescent, Ponsonby, Auckland 1021',
    date: '29th April 2021',
    volunteers: 'Volunteers Needed: 8',
    description: 'This is a really cool description of this really cool event coming up.'
  }

    const isAdmin = useSelector(globalState => globalState.user.isAdmin)
    // const { id, title, date, volunteersNeeded, description, volunteers } = event
    // const isVolunteer = getIfVolunteer(volunteers)
  
    function clickHandler () {
      // toggleVolunteerStatus(id, isVolunteer)
      console.log(isAdmin)
    }
  

  return (
    <>
      <h1>{details.title}</h1>
      <h2>{details.gardenName}</h2>
      <h2>{details.gardenAddress}</h2>
      <h3>{details.date}</h3>
      <h3>{details.volunteers}</h3>
      <p>{details.description}</p>
      
      { !isAdmin && 
        <div>
      { !isAdmin 
          ? <button onClick={clickHandler} className='button'>Volunteer</button>
          : <button onClick={clickHandler} className='button'>Un-Volunteer</button>
          }
          </div>
    }
    </>
  )
}

export default Event
