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
    <>
      <h1>Profile</h1>
      <ul className='list-primary'>
        <li>{firstName} {lastName}</li>
        <li>{email}</li>
      </ul>
      <h2>Your Garden:</h2>
      <ul className='list-primary'>
        <li>{garden.name}</li>
        <li>{garden.address}</li>
      </ul>
    </>
  )
}
