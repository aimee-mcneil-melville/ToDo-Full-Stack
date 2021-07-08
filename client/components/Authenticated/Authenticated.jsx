import React from 'react'

// import { isAuthenticated } from '../../auth' ---> IMPORT ISAUTHENTICATED FROM USEAUTH0

export function IfAuthenticated ({ children }) {
  function isAuthenticated () {
    return true
  }
  return isAuthenticated()
    ? <>{children}</>
    : null
}

export function IfNotAuthenticated ({ children }) {
  function isAuthenticated () {
    return true
  }
  return !isAuthenticated()
    ? <>{children}</>
    : null
}
