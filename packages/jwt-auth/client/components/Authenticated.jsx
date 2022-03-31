import React from 'react'

// TODO: import a proper isAuthenticated function
const isAuthenticated = () => {
  return true
}

export function IfAuthenticated({ children }) {
  return isAuthenticated() ? <>{children}</> : null
}

export function IfNotAuthenticated({ children }) {
  return !isAuthenticated() ? <>{children}</> : null
}
