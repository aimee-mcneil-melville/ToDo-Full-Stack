import React, { useState, useEffect, useContext } from 'react'
// import { UserContext } from './UserContext'

import Map from './Map'
import Events from './Events'

import { getUserGarden } from '../apiClient.js'

const Garden = (props) => {
  // const [user, setUser] = useContext(UserContext)
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [url, setUrl] = useState(null)

  const gardenId = 1
  // const gardenId = user.garden_id

  useEffect(() => {
    getUserGarden(gardenId)
      .then(res => {
        setName(res.name)
        setDescription(res.description)
        setUrl(res.url)
        return null
      })
      .catch((error) => {
        console.log('error: ', error.message)
      })
  }, [])

  return (
    <>
      <div className="column">
        <h3>{name}</h3>
        <p className="mb-4">{description}</p>
        <a className="word-wrap" href={url}>{url}</a>
        <Events />
      </div>
      <Map/>
    </>
  )
}

export default Garden
