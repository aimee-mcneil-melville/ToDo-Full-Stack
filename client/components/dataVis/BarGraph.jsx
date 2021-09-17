import React, { useMemo } from 'react'
import { Bar } from '@visx/shape'
import { Group } from '@visx/group'
// import { GradientTealBlue } from '@visx/gradient'
// import letterFrequency from '@visx/mock-data/lib/mocks/letterFrequency'
import { scaleBand, scaleLinear } from '@visx/scale'
import { AxisBottom, AxisLeft } from '@visx/axis'
const verticalMargin = 120

// accessors

export default function BarGraph ({ events }) {
  // bounds
  // console.log(events)
  const clickAlert = true
  const width = 400
  const height = 400
  const xMax = width
  const yMax = height - verticalMargin
  const getDates = (d) => Date.parse(d.date)
  const getSortedDates = (data) => data.sort()
  const getVolunteersNeeded = (d) => Number(d.volunteersNeeded)
  const data = events

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, xMax],
        round: true,
        domain: getSortedDates(data.map(getDates)), // range on x-axis (domain is an array where each element is a bar)
        padding: 0.4
      }),
    [xMax]
  )
  const dateScale = scaleLinear({
    domain: [getSortedDates(data.map(getDates))],
    nice: true
  })
  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getVolunteersNeeded))] // change to volunteers participate  // height on y-axis
      }),
    [yMax]
  )
  // console.log(data.map(getDates))
  return width < 10 ? null : (
    <>
      <svg width={width} height={height}>
        {/* <GradientTealBlue id="teal" /> */}
        <rect width={width} height={height} fill="url(#teal)" rx={14} />
        <Group top={verticalMargin / 2}>
          {data.map(d => {
            const dates = getDates(d)
            const barWidth = xScale.bandwidth()
            const barHeight = yMax - (yScale(getVolunteersNeeded(d)) ?? 0)
            const barX = xScale(dates)
            const barY = yMax - barHeight
            return (
              <>
                <Bar
                  key={`bar-${dates}`}
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill="rgba(23, 233, 217, .5)"
                  onClick={() => {
                    if (clickAlert) alert(`clicked: ${d.title} \nVolunteers: ${d.totalVolunteers}/${d.volunteersNeeded}`)
                  }}
                />
              </>
            )
          })}
        </Group>
      </svg>
      {/* <AxisBottom
        top={yMax}
        scale={dateScale}
        // stroke={purple3}
        // tickStroke={purple3}
        tickLabelProps={() => ({
          // fill: purple3,
          fontSize: 11,
          textAnchor: 'middle'
        })}
      /> */}
    </>
  )
}
