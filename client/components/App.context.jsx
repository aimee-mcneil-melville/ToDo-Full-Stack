import React, { createContext } from 'react'

export const AppContext = React.createContext({
  currentPage: 'home',
  setCurrentPage: () => {}
})