import React from 'react'
import { useSelector } from 'react-redux'
import { Register } from '../../components/Registration/Register'
import { View } from '../../components/Registration/View'

export default function Profile () {
  const globalState = useSelector(globalState => globalState)

  // const hardCodedUser = {
  //   id: 10,
  //   garden_id: null,
  //   first_name: 'Josh',
  //   last_name: 'Lake',
  //   username: 'jp_lake',
  //   email: 'joshisCooooool@sick.com',
  //   hash: '$$random',
  //   is_admin: 1
  // }

  return (
    <div>
      {
        globalState.user.gardenId
          ? (<View user={globalState.user}/>)
          : (<Register user={globalState.user}/>)
      }
    </div>
  )
}
