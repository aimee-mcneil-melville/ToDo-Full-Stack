import React from 'react'
// import { useSelector } from 'react-redux'
import { Register } from '../../components/Registration/Register'
import { View } from '../../components/Registration/View'

export default function Profile () {
  // const user = useSelector(globalState => globalState.user)
  // console.log(user)

  const hardCodedUser = {
    id: 10,
    garden_id: null,
    first_name: 'Josh',
    last_name: 'Lake',
    username: 'jp_lake',
    email: 'joshisCooooool@sick.com',
    hash: '$$random',
    is_admin: 1
  }

  return (
    <div>
      {
        hardCodedUser.garden_id
          ? (<View user={hardCodedUser}/>)
          : (<Register user={hardCodedUser}/>)
      }

    </div>
  )
}
