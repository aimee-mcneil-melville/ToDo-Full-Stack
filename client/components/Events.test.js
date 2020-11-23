import React from 'react'
import { HashRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

import Events from './Events'

it('renders correctly', () => {
  const tree = renderer
    .create(
      <HashRouter>
        <Events />
      </HashRouter>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
