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
      <h1>Profile page</h1>
      <h1>Name: {firstName} {lastName}</h1>
      <h1>email: {email}</h1>
      <h3>Your garden: {garden.name}</h3>
      <h3>{garden.address}</h3>
    </>
  )
}
