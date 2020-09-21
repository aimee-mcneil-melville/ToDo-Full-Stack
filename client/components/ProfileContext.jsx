import React, {useState, createContext, useEffect, useReducer, useContext } from 'react'

export const ProfileContext = createContext()

export const ProfileProvider = ({reducer, initialState, children}) => {
  const [profile, setProfile] = useState({
    username: '',
    isAdmin: '',
    gardenId: ''
  })

  
  return (
    <ProfileContext.Provider value= {[profile, setProfile]}>
      {children}
    </ProfileContext.Provider>
  )
}

export const