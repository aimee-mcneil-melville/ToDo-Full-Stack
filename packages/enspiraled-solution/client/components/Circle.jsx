import React, { useState } from 'react'

const Circle = (props) => {
  const { cx, cy, r } = props

  const [babyCircles, setBabies] = useState([])

  const handleMouseOver = () => {
    if (babyCircles.length === 0) {
      const babies = [
        <Circle key="baby-north" cx={cx} cy={cy + r} r={r / 2} />, // NORTH
        <Circle key="baby-south" cx={cx} cy={cy - r} r={r / 2} />, // SOUTH
        <Circle key="baby-east" cx={cx + r} cy={cy} r={r / 2} />, // EAST
        <Circle key="baby-west" cx={cx - r} cy={cy} r={r / 2} />, // WEST
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
