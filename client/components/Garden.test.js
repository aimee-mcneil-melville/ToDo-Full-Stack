import React from 'react'
import { HashRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

import Garden from './Garden'

it('renders correctly', () => {
  const fakeGarden = {
    name: 'Kelmarna Gardens',
    description: 'Kelmarna Gardens is a city farm and organic community garden, situated on 4.5 acres of council land in Ponsonby, close to the heart of Auckland City.',
    url: 'http://www.kelmarnagardens.nz/'
  }
  const tree = renderer.create(
  <HashRouter>
    <Garden garden={fakeGarden} />
  </HashRouter>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
