import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'

import Subtitle from './Subtitle'

test('<Subtitle> shows a header with proper the text', () => {
  const props = { text: 'test text' }

  render(<Subtitle {...props} />)

  const header = screen.getByRole('heading')
  expect(header).toBeInTheDocument()
  expect(header).toHaveTextContent(props.text)
})
