interface Props {
  width: number
  height: number
}

function App({ width, height }: Props) {
  const circle = {
    cx: width / 2,
    cy: height / 2,
    level: 0,
    r: 256,
  }

  return (
    <svg width={width} height={height}>
      <circle cx={circle.cx} cy={circle.cy} r={circle.r} />
    </svg>
  )
}

export default App
