import React, { useState } from 'react'

const Circle = props => {
  const { cx, cy, r } = props

  const [babyCircles, setBabies] = useState([])

  const handleMouseOver = () => {
    if(babyCircles.length === 0){
      const babies = [
        <Circle cx={cx} cy={cy + r} r={r / 2}/>, // NORTH
        <Circle cx={cx} cy={cy - r} r={r / 2}/>, // SOUTH
        <Circle cx={cx + r} cy={cy} r={r / 2}/>, // EAST
        <Circle cx={cx - r} cy={cy} r={r / 2}/>  // WEST
      ]
      setBabies(babies)
    }
  }


  return (
    <>
      <circle onMouseOver={handleMouseOver} cx={cx} cy={cy} r={r} />
      {babyCircles}
    </>
  )
}

export default Circle
