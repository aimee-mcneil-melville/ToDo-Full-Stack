// @vitest-environment jsdom

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'

import { useAppDispatch } from '../../hooks'
import EditWombat from '../EditWombat'

expect.extend(matchers)

vi.mock('../../hooks')

const fakeDispatch = vi.fn()

vi.mocked(useAppDispatch).mockReturnValue(fakeDispatch)

beforeEach(() => {
  vi.clearAllMocks()
  cleanup()
})

describe('EditWombat', () => {
  it('renders a form to edit a wombat', () => {
    const wombat = 'Wallace'
    render(<EditWombat name={wombat} />)

    const nameInput = screen.getByLabelText('Update Wombat:')
    expect(nameInput).toBeInTheDocument()
    expect(nameInput).toHaveValue('')

    const submitButton = screen.getByRole('button', { name: /update/i })
    expect(submitButton).toBeInTheDocument()
  })

  it('allows the user to edit a wombat', async () => {
    const user = userEvent.setup()
    const wombat = 'Wallace'
    render(<EditWombat name={wombat} />)

    const nameInput = screen.getByLabelText('Update Wombat:')
    await user.type(nameInput, 'Wiremu')
    expect(nameInput).toHaveValue('Wiremu')

    const submitButton = screen.getByRole('button', { name: /update/i })
    fireEvent.click(submitButton)

    expect(fakeDispatch).toHaveBeenCalledTimes(1)
    expect(fakeDispatch).toHaveBeenCalledWith({
      type: 'UPDATE_WOMBAT',
      payload: {
        new: 'Wiremu',
        old: 'Wallace',
      },
    })
  })

  it('allows the user to delete a wombat', () => {
    const wombat = 'Wallace'
    render(<EditWombat name={wombat} />)

    const deleteButton = screen.getByRole('button', { name: /delete/i })
    fireEvent.click(deleteButton)

    expect(fakeDispatch).toHaveBeenCalledTimes(1)
    expect(fakeDispatch).toHaveBeenCalledWith({
      type: 'DEL_WOMBAT',
      payload: 'Wallace',
    })
  })
})
