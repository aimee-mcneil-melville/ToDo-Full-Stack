import * as fs from 'node:fs/promises'
import { describe, it, expect, vi } from 'vitest'

import { getPuppyData, getPuppyById, addNewPuppy, editPuppy } from '../lib'

vi.mock('node:fs/promises')

const mockPuppies = {
  puppies: [
    { id: 1, name: 'Fido', owner: 'Fred', image: '/img/1.jpg', breed: 'Lab' },
    { id: 2, name: 'Coco', owner: 'Chloe', image: '/img/2.jpg', breed: 'Lab' },
    {
      id: 3,
      name: 'Mags',
      owner: 'Mike',
      image: '/img/3.jpg',
      breed: 'Rottie',
    },
  ],
}

describe('getPuppyData', () => {
  it('returns an array of puppy data on success', async () => {
    vi.mocked(fs.readFile).mockImplementation(async () => {
      return JSON.stringify({ ...mockPuppies })
    })

    const puppyData = await getPuppyData()
    expect(puppyData.puppies).toHaveLength(3)
  })

  it('returns an error when it cannot load the file', async () => {
    vi.mocked(fs.readFile).mockImplementation(async () => {
      throw new Error('test load error')
    })

    await expect(getPuppyData()).rejects.toThrow('test load error')
    expect(fs.readFile).toBeCalled()
  })

  it('returns an error when it cannot parse the JSON', async () => {
    vi.mocked(fs.readFile).mockImplementation(async () => {
      return 'Invalid json'
    })

    await expect(getPuppyData()).rejects.toThrow()
    expect(fs.readFile).toBeCalled()
  })
})

describe('getPuppyById', () => {
  it('returns puppy details on success', async () => {
    vi.mocked(fs.readFile).mockImplementation(async () => {
      return JSON.stringify({ ...mockPuppies })
    })

    const puppyDetails = await getPuppyById(2)
    expect(puppyDetails.name).toBe('Coco')
    expect(puppyDetails.owner).toBe('Chloe')
    expect(puppyDetails.image).toBe('/img/2.jpg')
    expect(puppyDetails.breed).toBe('Lab')
  })

  it('returns an error when it cannot load the file', async () => {
    vi.mocked(fs.readFile).mockImplementation(async () => {
      throw new Error('test load error')
    })

    await expect(getPuppyById(2)).rejects.toThrow()
  })

  it('returns an error when it cannot parse the file', async () => {
    vi.mocked(fs.readFile).mockImplementation(async () => {
      return 'Invalid JSON'
    })

    await expect(getPuppyById(2)).rejects.toThrow()
  })

  it('returns an error when it cannot find the puppy id', async () => {
    vi.mocked(fs.readFile).mockImplementation(async () => {
      return JSON.stringify({ ...mockPuppies })
    })

    await expect(getPuppyById(9999)).rejects.toThrow('ID not found')
  })
})

describe('addNewPuppy', () => {
  it('adds a new puppy on success', async () => {
    vi.mocked(fs.readFile).mockImplementation(async () => {
      return JSON.stringify({ ...mockPuppies })
    })

    vi.mocked(fs.writeFile).mockImplementation(async () => {})

    const newPup = { name: 'Rex', owner: 'Sue', image: 'rex.jpg', breed: 'Pug' }
    const id = await addNewPuppy(newPup)
    expect(fs.writeFile).toBeCalledWith(
      expect.any(String),
      expect.any(String),
      'utf-8'
    )
    expect(id).toBe(4)
  })

  it('returns an error when it cannot load the file', async () => {
    vi.mocked(fs.readFile).mockImplementation(async () => {
      throw new Error('test load error')
    })

    const newPuppy = {} // doesn't matter that it's empty

    await expect(addNewPuppy(newPuppy)).rejects.toThrow('test load error')
  })

  it('returns an error when it cannot parse the file', async () => {
    vi.mocked(fs.readFile).mockImplementation(async () => {
      return 'this is not a json document'
    })

    const newPuppy = {} // doesn't matter that it's empty
    await expect(addNewPuppy(newPuppy)).rejects.toThrow()
  })

  it('returns an error when it cannot write the file', async () => {
    vi.mocked(fs.readFile).mockImplementation(async () => {
      return JSON.stringify({ ...mockPuppies })
    })

    vi.mocked(fs.writeFile).mockImplementation(async () => {
      throw new Error('test error message')
    })

    const newPuppy = {} // doesn't matter that it's empty

    await expect(addNewPuppy(newPuppy)).rejects.toThrow()
  })
})

describe('editPuppy', () => {
  it('updates a new puppy on success', async () => {
    vi.mocked(fs.readFile).mockImplementation(async () => {
      return JSON.stringify({ ...mockPuppies })
    })

    vi.mocked(fs.writeFile).mockImplementation(async () => {})

    const updatedPuppy = {
      id: 2,
      name: 'Test Pup',
      owner: 'Test Owner',
      image: '/images/test.jpg',
      breed: 'Test breed',
    }

    const newPuppies = mockPuppies.puppies.map((pup) => {
      return pup.id === 2 ? updatedPuppy : pup
    })

    await editPuppy(updatedPuppy)
    expect(fs.writeFile).toBeCalledWith(
      expect.any(String),
      JSON.stringify({ puppies: newPuppies }, null, 2),
      'utf-8'
    )
  })

  it('returns an error when it cannot load the file', async () => {
    vi.mocked(fs.readFile).mockImplementation(async () => {
      throw new Error()
    })

    const updatedPuppy = {} // doesn't matter that it's empty
    await expect(editPuppy(updatedPuppy)).rejects.toThrow()
  })

  it('returns an error when it cannot parse the file', async () => {
    vi.mocked(fs.readFile).mockImplementation(async () => {
      return 'not a json document'
    })

    const updatedPuppy = {} // doesn't matter that it's empty

    await expect(editPuppy(updatedPuppy)).rejects.toThrow()
  })

  it('returns an error when it cannot write the file', async () => {
    vi.mocked(fs.readFile).mockImplementation(async () => {
      return JSON.stringify({ ...mockPuppies })
    })

    vi.mocked(fs.writeFile).mockImplementation(async () => {
      throw new Error('test error message')
    })

    // doesn't matter that it isn't complete
    const updatedPuppy = { id: 2 }
    await expect(editPuppy(updatedPuppy)).rejects.toThrow()
  })

  it('returns an error when it cannot find the puppy id', async () => {
    vi.mocked(fs.readFile).mockImplementation(async () => {
      return JSON.stringify({ ...mockPuppies })
    })

    // doesn't matter that it isn't complete
    const updatedPuppy = { id: 9999 }

    await expect(editPuppy(updatedPuppy)).rejects.toThrow('ID not found')
  })
})
