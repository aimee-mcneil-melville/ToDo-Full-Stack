import React from 'react'
import { shallow } from 'enzyme'

import App from '../client/components/App'
import Board from '../client/components/Board'

describe('<App />', () => {
  test('renders a board', () => {
    const wrapper = shallow(<App />)
    const board = wrapper.find(Board)
    expect(board).toHaveLength(1)
  })
})
