import React from 'react'
import { Edit } from '../../components/Registration/Edit'
import { View } from '../../components/Registration/View'
import { IfAuthenticated, IfNotAuthenticated } from '../../components/Authenticated/Authenticated'

export default function Profile () {
  return (
    <div>
      <IfAuthenticated>

      </IfAuthenticated>
      <IfNotAuthenticated>

      </IfNotAuthenticated>
    </div>
  )
}
