import React, { useMemo } from 'react'
import { Bar } from '@visx/shape'
import { Group } from '@visx/group'
// import { GradientTealBlue } from '@visx/gradient'
// import letterFrequency from '@visx/mock-data/lib/mocks/letterFrequency'
import { scaleBand, scaleLinear } from '@visx/scale'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { timeParse, timeFormat } from 'd3-time-format'
const verticalMargin = 120
let index = 0
let leftThing = 40
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
  const getVolunteersNeeded = (d) => Number(d.totalVolunteers)
  const data = events
  const margin = { top: 60, right: 0, bottom: 40, left: 0 }
  // const parseDate = timeParse('%Y-%m-%d')
  // const format = timeFormat('%b %d')
  const formatDate = (d) => {
    console.log(index)
    index++
    leftThing += 40
    return d
  }
  // console.log(formatDate('2021-09-2'))
  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, xMax],
        round: true,
        domain: getSortedDates(data.map(getDates)), // range on x-axis (domain is an array where each element is a bar)
        padding: 0.4
      }),
    [xMax, data]
  )
  const dateScale = scaleBand({
    domain: getSortedDates(data.map(d => d.date)),
    nice: true
  })
  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getVolunteersNeeded))] // change to volunteers participate  // height on y-axis
      }),
    [yMax, data]
  )
  // console.log(data)
  return width < 10 ? null : (
    <>
      <svg key='barChart' width={width} height={height}>
        {/* <GradientTealBlue id="teal" /> */}
        <rect width={width} height={height} fill="url(#teal)" rx={14} />
        <Group top={verticalMargin / 2}>
          {data.map(d => {
            const dates = getDates(d)
            const barWidth = xScale.bandwidth()
            const barHeight = yMax - (yScale(getVolunteersNeeded(d)) ?? 0)
            const barX = xScale(dates)
            const barY = yMax - barHeight
            const id = d.id
            return (
              <>
                <Bar
                  key={`bar-${id}`}
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
        <AxisBottom
          // label="string"
          top={yMax + margin.top}
          left= {leftThing + 60}
          scale={dateScale}
          tickFormat= {formatDate}
          stroke= '#e5fd3d'
          tickStroke='#e5fd3d'
          tickLabelProps={() => ({
            // fill: '#e5fd3d',
            fontSize: 11,
            textAnchor: 'middle'
          })}
        />

      </svg>
    </>
  )
}
