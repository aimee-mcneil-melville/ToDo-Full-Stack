import React from 'react'
import { screen, render } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import Input from './Input'

describe('<Input /> component tests', () => {
  test('Input renders correctly', () => {
    render(
      <Input
        placeholder='Placeholder'
        id='testId'
        name='testName'
        label='test label'
      />
    )

    const textBox = screen.getByLabelText(/test label/i)
    expect(textBox.value).toEqual('')
    userEvent.type(textBox, 'test this')
    expect(textBox.value).toEqual('test this')
  })
})
