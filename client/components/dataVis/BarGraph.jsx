import React, { useMemo } from 'react'
import { Bar } from '@visx/shape'
import { Group } from '@visx/group'
// import { GradientTealBlue } from '@visx/gradient'
import letterFrequency from '@visx/mock-data/lib/mocks/letterFrequency'
import { scaleBand, scaleLinear } from '@visx/scale'

const verticalMargin = 120

// accessors

export default function BarGraph ({ events }) {
  // bounds
  const clickAlert = false
  const width = 200
  const height = 400
  const xMax = width
  const yMax = height - verticalMargin
  const getLetter = (d) => d.letter
  const getLetterFrequency = (d) => Number(d.frequency) * 100
  const data = letterFrequency.slice(5)

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, xMax],
        round: true,
        domain: data.map(getLetter),
        padding: 0.4
      }),
    [xMax]
  )
  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getLetterFrequency))]
      }),
    [yMax]
  )

  return width < 10 ? null : (
    <svg width={width} height={height}>
      {/* <GradientTealBlue id="teal" /> */}
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={verticalMargin / 2}>
        {data.map(d => {
          const letter = getLetter(d)
          const barWidth = xScale.bandwidth()
          const barHeight = yMax - (yScale(getLetterFrequency(d)) ?? 0)
          const barX = xScale(letter)
          const barY = yMax - barHeight
          return (
            <Bar
              key={`bar-${letter}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .5)"
              onClick={() => {
                if (clickAlert) alert(`clicked: ${JSON.stringify(Object.values(d))}`)
              }}
            />
          )
        })}
      </Group>
    </svg>
  )
}
