import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Pixel from './Pixel'

describe('<Pixel />', () => {
  it('changes colour when you click', () => {
    render(<Pixel />)
    const pixel = screen.getByTestId('pixel')
    const initialColour = pixel.style.backgroundColor
    fireEvent.click(pixel)
    expect(pixel.style.backgroundColor).not.toBe(initialColour)
  })
})
