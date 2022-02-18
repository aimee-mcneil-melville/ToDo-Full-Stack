import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function Posts() {
  const { id } = useParams()
  // const globalState = useSelector(globalState => globalState)

  // console.log(globalState)
  return (
    <p>show posts here</p>
  )
}
