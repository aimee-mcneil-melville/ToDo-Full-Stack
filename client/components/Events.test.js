import React from 'react'
import renderer from 'react-test-renderer'

import Events from './Events'

it('renders correctly', () => {
  const tree = renderer
    .create(<Events />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});