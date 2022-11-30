import { useCallback, useState } from 'react'

interface Props {
  cx: number
  cy: number
  r: number
  level: number
}

export default function Circle({ cx, cy, r, level }: Props) {
  const [active, setActive] = useState(false)
  const handleClick = useCallback(() => {
    setActive(true)
  }, [])

  // STRETCH: When you double click a circle, it should remove all of its children circles
  const handleDoubleClick = useCallback(() => {
    setActive(false)
  }, [])

  // STRETCH: have fun with new colours for each generation!
  // basically mulberry32-ish, sorry it's very ugly
  let z = 0x6f1714
  for (let i = 0; i < level; i++) {
    z += 0x9e3779b9
    z ^= z >>> 16
    z = Math.imul(z, 0x21f0aaad)
    z ^= z >>> 15
    z = Math.imul(z, 0x735a2d97)
    z ^= z >>> 15
  }

  const color = `#${z.toString(16).slice(0, 6).padStart(6, '0')}`

  return (
    <>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        fill={color}
      />
      {
        // STRETCH: Stop generating new circles once there are 7 generations of circles
        active && level < 7 && (
          <>
            <Circle cx={cx} cy={cy + r} r={r / 2} level={level + 1} />
            <Circle cx={cx} cy={cy - r} r={r / 2} level={level + 1} />
            <Circle cx={cx + r} cy={cy} r={r / 2} level={level + 1} />
            <Circle cx={cx - r} cy={cy} r={r / 2} level={level + 1} />
          </>
        )
      }
    </>
  )
}
