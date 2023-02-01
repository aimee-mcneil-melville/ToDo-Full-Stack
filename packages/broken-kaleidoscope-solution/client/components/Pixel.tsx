import { useCallback, useState, UIEvent } from 'react'

const randomColor = () =>
  `#${Math.floor(Math.random() * 0x1000000)
    .toString(16)
    .padStart(6, '0')}`

export default function Pixel() {
  const [color, setColor] = useState(randomColor())

  const handleMouseEnter = useCallback(() => {
    setColor('green')
  }, [])

  const handleContextMenu = useCallback((e: UIEvent) => {
    e.preventDefault()
    setColor('black')
  }, [])

  const handleDoubleClick = useCallback(() => {
    setColor('white')
  }, [])

  const handleDragEnter = useCallback(() => {
    setColor('yellow')
  }, [])

  const handleClick = useCallback(() => {
    setColor(randomColor())
  }, [])

  // NOTE: I've made the div a button for a11y reasons
  return (
    <button
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onContextMenu={handleContextMenu}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={handleMouseEnter}
      style={{
        display: 'block',
        border: 'none',
        width: '10px',
        height: '10px',
        backgroundColor: color,
      }}
    />
  )
}
