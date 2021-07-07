import React from 'react'
import { render, screen } from '@testing-library/react'

import Map from './Map'

describe('user location marker', () => {
  it('displays when userCoordinates available on props', () => {
    const userCoordinates = {
      lat: -36.8666700,
      lon: 174.7666700
    }
    render(<Map
      addresses={[]}
      coordinates={[]}
      userCoordinates={userCoordinates}
    />)
    const markers = screen.getAllByRole('img')
    // each marker has a marker image and the marker's shadow image
    expect(markers).toHaveLength(2)
  })

  it('does not display when userCoordinates not provided', () => {
    render(<Map
      addresses={[]}
      coordinates={[]}
    />)
    const markers = screen.queryByRole('img')
    expect(markers).toBeNull()
  })
})

describe('garden location markers', () => {
  it('displays correct number of markers from coordinates prop', () => {
    const coordinates = [{
      lat: -36.8666700,
      lon: 174.7666700
    }, {
      lat: -36.8888888,
      lon: 174.7777777
    }]
    render(<Map
      addresses={['address 1', 'address 2']}
      coordinates={coordinates}
    />)
    const markers = screen.getAllByRole('img')
    // there are 2 marker images per marker...
    // each marker has a marker image and the marker's shadow image
    expect(markers).toHaveLength(4)
  })
})
