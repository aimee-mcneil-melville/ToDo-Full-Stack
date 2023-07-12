import { describe, it, expect, vi } from 'vitest'
import { nextAct } from '../../../functions/6-stretch-narrowing'

describe('nextAct', () => {
  it('should call the play method on a Musician', () => {
    const musician = {
      instrument: 'saxophone',
      style: 'jazz',
      play: vi.fn(),
    }

    nextAct(musician)
    expect(musician.play).toHaveBeenCalled()
  })

  it('should call the dance method on a Dancer', () => {
    const dancer = {
      style: 'ballet',
      dance: vi.fn(),
    }

    nextAct(dancer)
    expect(dancer.dance).toHaveBeenCalled()
  })

  it('should call the act method on an Improviser', () => {
    const improviser = {
      funny: true,
      act: vi.fn(),
    }

    nextAct(improviser)
    expect(improviser.act).toHaveBeenCalled()
  })
})
