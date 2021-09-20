import React from 'react'
import { screen, render } from '@testing-library/react'

import DataTextRow from './DataTextRow'

describe('<DataTextRow/> component tests', () => {
  test('Component renders with all props supplied', () => {
    render(<DataTextRow title='Title text' subtitle='Test subtext' />)

    const title = screen.getByRole('heading', { level: 3 })
    const subtitle = screen.getByRole('heading', { level: 4 })

    expect(title.textContent).toEqual('Title text')
    expect(subtitle.textContent).toEqual('Test subtext')
  })
})
