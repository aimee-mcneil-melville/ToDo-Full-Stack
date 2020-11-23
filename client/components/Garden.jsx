import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Map from './Map'
import Events from './Events'

import { getUserGarden } from '../api/gardens'

const Garden = (props) => {
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [url, setUrl] = useState(null)

  const { gardenId } = props.user

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

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Garden)
