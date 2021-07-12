import React from 'react'
// import { useSelector } from 'react-redux'
import { Edit } from '../../components/Registration/Edit'
import { View } from '../../components/Registration/View'

export default function Profile () {
  // const user = useSelector(globalState => globalState.user)
  // console.log(user)

  const hardCodedUser = {
    id: 10,
    garden_id: 3,
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
          : (<Edit user={hardCodedUser}/>)
      }

    </div>
  )
}
