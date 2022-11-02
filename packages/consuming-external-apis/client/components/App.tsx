import React from 'react'
import { useState, useEffect } from 'react'
import { useLoaderData, useNavigation } from 'react-router-dom'
import { getWelcome } from '../apiClient'

type TWelcome = {
  statement: string
}
function App() {
  const welcome = useLoaderData() as TWelcome
  const navigation = useNavigation()
  return navigation.state === 'loading' ? (
    <h1>Loading...</h1>
  ) : (
    <h1>{welcome.statement}</h1>
  )
}

export default App
