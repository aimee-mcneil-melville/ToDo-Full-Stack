import React from 'react'
import {shallow} from 'enzyme'

import App from '../client/components/App'
import Board from '../client/components/Board'

describe('<App />', () => {
  test("renders a board", () => {
    const wrapper = shallow(<App />)
    let board = wrapper.find(Board)
    expect(board.length).toBe(1)
  })
})
