import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'

import Pic from './Pic'

test('<Pic> shows <img> with proper attributes', () => {
  const props = {
    image: 'test.png',
    alt: 'test alt text'
  }

  render(<Pic {...props} />)

  const img = screen.getByAltText(props.alt)
  expect(img).toBeInTheDocument()
  expect(img).toHaveAttribute('src', '/images/' + props.image)
})
