import React, { useState, createContext, useEffect } from 'react'

export const ProfileContext = createContext()

export const ProfileProvider = props => {
  const [profile, setProfile] = useState({
    username: '',
    isAdmin: '',
    gardenId: ''
  })

  useEffect(() => {

  }, [])
  
  const updateUser = (event) => {
    setUser(props.username)
  }

  
  return (
    <ProfileContext.Provider value= {[profile]}>
      {props.children}
    </ProfileContext.Provider>
  )
}
