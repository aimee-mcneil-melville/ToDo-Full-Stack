import { useCallback, useState } from 'react'
import Circle from './Circle'

interface Props {
  width: number
  height: number
}

function App({ width, height }: Props) {
  const [token, setToken] = useState(1)

  // STRETCH: Add a button to the page that will clear the screen and start over
  // TODO: I don't think this is a nice way to do this
  const handleReset = useCallback(() => {
    setToken(Math.random())
  }, [])

  const circle = {
    cx: width / 2,
    cy: height / 2,
    level: 0,
    r: 256,
  }

  return (
    <>
      <button onClick={handleReset}>Reset</button>
      <svg width={width} height={height}>
        <Circle {...circle} key={token} />
      </svg>
    </>
  )
}

export default App
