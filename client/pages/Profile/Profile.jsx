import React from 'react'
import { useSelector } from 'react-redux'
import Register from '../../components/Registration/Register'
import { View } from '../../components/Registration/View'

export default function Profile () {
  const user = useSelector(globalState => globalState.user)
  const garden = useSelector(globalState => globalState.garden)

  return (
    <>
      {
        user.gardenId
          ? (<View user={user} garden={garden}/>)
          : (<Register user={user}/>)
      }
    </>
  )
}
