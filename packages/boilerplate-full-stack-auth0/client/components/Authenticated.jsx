import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import { getIsAuthenticated } from '../auth0-utils'

export function IfAuthenticated ({ children }) {
  const isAuthenticated = getIsAuthenticated(useAuth0)
  return isAuthenticated
    ? <>{children}</>
    : null
}

export function IfNotAuthenticated ({ children }) {
  const isAuthenticated = getIsAuthenticated(useAuth0)
  return !isAuthenticated
    ? <>{children}</>
    : null
}
