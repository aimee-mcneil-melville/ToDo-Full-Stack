import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'

import NamePlate from './NamePlate'

test('<NamePlate> renders its props', () => {
  const props = {
    name: 'test name',
    breed: 'test breed',
    superpower: 'test power'
  }

  render(<NamePlate {...props} />)

  expect(screen.getByText(props.name)).toBeInTheDocument()
  expect(screen.getByText(props.breed)).toBeInTheDocument()
  expect(screen.getByText(props.superpower)).toBeInTheDocument()
})
