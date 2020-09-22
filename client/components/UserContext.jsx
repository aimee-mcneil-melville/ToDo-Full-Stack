import React, { useState, createContext } from 'react'
import { getDecodedToken, isAuthenticated } from 'authenticare/client'

export const UserContext = createContext()

export const UserProvider = ({ reducer, initialState, children }) => {
  const [user, setUser] = useState({
    username: '',
    isAdmin: '',
    gardenId: '',
  })

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}
export const updateUserContext = (setUser) => {
  const { username, isAdmin, garden_id } = getDecodedToken()
  isAuthenticated() ? setUser({ username, isAdmin, garden_id }) : null
}
