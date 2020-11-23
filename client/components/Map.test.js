import React from 'react'
import renderer from 'react-test-renderer'

import Map from './Map'
import { getMap } from '../apiClient'

it('renders correctly', () => {
  const tree = renderer
    .create(<Map />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
