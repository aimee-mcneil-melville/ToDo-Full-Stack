import React, { useMemo } from 'react'
import { Bar } from '@visx/shape'
import { Group } from '@visx/group'
// import { GradientTealBlue } from '@visx/gradient'
// import letterFrequency from '@visx/mock-data/lib/mocks/letterFrequency'
// import { ScaleSVG } from '@visx/responsive';
import { scaleBand, scaleLinear } from '@visx/scale'
import { AxisBottom, AxisLeft } from '@visx/axis'
const verticalMargin = 120
// accessors

export default function BarGraph({ events }) {
  // bounds
  const clickAlert = true
  const width = 400
  const height = 400
  const xMax = width
  const yMax = height - verticalMargin
  const getDates = (d) => Date.parse(d.date)
  const getSortedDates = (data) => data.sort()
  const getVolunteersNeeded = (d) => Number(d.totalVolunteers)
  const data = events
  const margin = { top: 61, right: 0, bottom: 40, left: 0 }

  // a parsed date is passed into this and we find the corresponding date and use that in the graph
  const formatDate = (d) => {
    let date = ''
    data.map((obj) => {
      const parsed = Date.parse(obj.date)
      if (d === parsed) {
        date = obj.date
      }
    })
    return date
  }
  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, xMax],
        round: true,
        domain: getSortedDates(data.map(getDates)), // range on x-axis (domain is an array where each element is a bar)
        padding: 0.4,
      }),
    [xMax, data]
  )
  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getVolunteersNeeded))], // change to volunteers participate  // height on y-axis
      }),
    [yMax, data]
  )

  //
  //
  // add the ranges to scales
  const dateScale = scaleBand({
    domain: getSortedDates(data.map(getDates)),
    nice: true,
  })
  const volunteerScale = scaleLinear({
    domain: [0, Math.max(...data.map(getVolunteersNeeded))],
    nice: true,
  })
  dateScale.rangeRound([0, xMax])
  volunteerScale.rangeRound([yMax, 0])
  //
  // this range is needed for graph to have more than one element ^^^
  //
  return width < 10 ? null : (
    <>
      <svg className="graph" key="barChart" width={width} height={height}>
        <rect width={width} height={height} fill="url(#teal)" rx={14} />
        <Group top={verticalMargin / 2}>
          {data.map((d) => {
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
                    if (clickAlert)
                      alert(
                        `clicked: ${d.title} \nVolunteers: ${d.totalVolunteers}/${d.volunteersNeeded}`
                      )
                  }}
                />
              </>
            )
          })}

          <AxisBottom
            top={yMax}
            left={margin.left}
            scale={dateScale}
            tickFormat={formatDate}
            tickLabelProps={() => ({
              fontSize: 6,
              textAnchor: 'middle',
            })}
          />
          <AxisLeft
            scale={volunteerScale}
            // top={margin.top}
            left={margin.left + 20} // its crammed if less than 20 (disappears into the left side) probably can fix it if outside of group
          />
        </Group>
      </svg>
    </>
  )
}
