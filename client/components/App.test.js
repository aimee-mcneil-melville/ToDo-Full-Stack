import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'

import App from './App'

test('<App> shows a spinning paw', () => {
  render(<App />)
  const img = screen.getByAltText('animated spinning paw', { exact: false })
  expect(img).toBeInTheDocument()
})
