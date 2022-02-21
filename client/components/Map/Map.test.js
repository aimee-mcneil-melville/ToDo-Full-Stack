import React from 'react'
import { render, screen } from '@testing-library/react'

import Map from './Map'

describe('user location marker', () => {
  it('displays when userCoordinates available on props', () => {
    const userCoordinates = {
      lat: -36.86667,
      lon: 174.76667,
    }
    render(
      <Map
        addresses={[]}
        coordinates={[]}
        names={[]}
        userCoordinates={userCoordinates}
      />
    )
    const marker = screen.getByRole('img')
    expect(marker).toBeInTheDocument()
  })
  it('user location marker has a different image', () => {
    const userCoordinates = {
      lat: -36.86667,
      lon: 174.76667,
    }
    render(
      <Map
        addresses={[]}
        coordinates={[]}
        names={[]}
        userCoordinates={userCoordinates}
      />
    )
    const marker = screen.getByRole('img')
    expect(marker.src).toContain(
      'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF'
    )
  })

  it('does not display when userCoordinates not provided', () => {
    render(<Map addresses={[]} coordinates={[]} names={[]} />)
    const markers = screen.queryByRole('img')
    expect(markers).toBeNull()
  })
})

describe('garden location markers', () => {
  it('displays correct number of markers from coordinates prop', () => {
    const coordinates = [
      {
        lat: -36.86667,
        lon: 174.76667,
      },
      {
        lat: -36.8888888,
        lon: 174.7777777,
      },
    ]
    render(
      <Map
        addresses={['address 1', 'address 2']}
        names={['name 1', 'name 2']}
        coordinates={coordinates}
      />
    )
    const markers = screen.getAllByRole('img')

    // there are 2 marker images per marker...
    // each marker has a marker image and the marker's shadow image
    expect(markers).toHaveLength(4)
  })
})
