import React from 'react'
import renderer from 'react-test-renderer'

import Garden from './Garden'

it('renders correctly', () => {
  const tree = renderer.create(<Garden />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly', () => {
  const gardens = ['one']
  const tree = renderer.create(<Garden gardens={gardens}/>).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly', () => {
  const gardens = ['one', 'two', 'three']
  const tree = renderer.create(<Garden gardens={gardens}/>).toJSON()
  expect(tree).toMatchSnapshot()
})
