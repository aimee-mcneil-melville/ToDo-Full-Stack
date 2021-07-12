import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../../auth-utils'

export function IfAuthenticated ({ children }) {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(async () => {
    setAuthenticated(await isAuthenticated())
  }, [authenticated])

  return authenticated
    ? <>{children}</>
    : null
}

export function IfNotAuthenticated ({ children }) {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(async () => {
    setAuthenticated(await isAuthenticated())
  }, [authenticated])

  return !authenticated
    ? <>{children}</>
    : null
}
