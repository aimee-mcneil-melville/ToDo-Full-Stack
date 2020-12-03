import React, { useState, useEffect } from 'react'

const randomColour = () => `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, 0)}`

const getNewStyle = () => {
  return {
    width: 20,
    height: 20,
    backgroundColor: randomColour()
  }
}

function Pixel () {
  const [style, setStyle] = useState(getNewStyle())

  const changeColour = () => {
    setStyle(getNewStyle())
  }

  // -----------
  // You haven't been shown useEffect yet, so do some research:
  // What is this doing? Why is there an empty array at the end?
  // -----------
  useEffect(() => {
    const interval = setInterval(() => {
      changeColour()
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      onClick={changeColour}
      onMouseEnter={changeColour}
      style={style}
    />
  )
}

export default Pixel
