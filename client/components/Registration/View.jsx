import React, { useEffect } from 'react'
import { getGarden } from '../../pages/Garden/gardenHelper'
import { useSelector } from 'react-redux'

export function View (props) {
  const garden = useSelector(globalState => globalState.garden)
  // const user = useSelector(globalState => globalState.user) <== for when we can login
  const { firstName, lastName, email, gardenId } = props.user // <== change this to user from global state

  useEffect(() => {
    getGarden(gardenId)
  }, [gardenId])

  return (
    <article className='profile-container'>
      <h1 className='profile-title'>Profile</h1>
      <h1 className='profile-label'>Name</h1>
      <p className='profile-info'>{firstName} {lastName}</p>
      <h1 className='profile-label'>Email</h1> <p className='profile-info'>{email}</p>
      <h3 className='profile-label'>Your Garden</h3> <p className='profile-info'>{garden.name}</p>
      <h3 className='profile-label'>Address
      </h3>
      <p className='profile-info'>{garden.address}</p>
    </article>
    // <>
    //   <h1>Profile page</h1>
    //   <h1>Name: {firstName} {lastName}</h1>
    //   <h1>email: {email}</h1>
    //   <h3>Your garden: {garden.name}</h3>
    //   <h3>{garden.address}</h3>
    // </>
  )
}
