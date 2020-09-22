import React from 'react'
import renderer from 'react-test-renderer'

import EditEvent from './EditEvent'

it('renders correctly', () => {
  const tree = renderer
    .create(<EditEvent />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
