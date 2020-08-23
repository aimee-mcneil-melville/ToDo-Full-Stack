const lib = require('./lib')

const mockPuppies = {
  puppies: [
    { id: 1, name: "Fido", owner: "Fred", image: "/img/1.jpg", breed: "Lab" },
    { id: 2, name: "Coco", owner: "Chloe", image: "/img/2.jpg", breed: "Lab" },
    { id: 3, name: "Mags", owner: "Mike", image: "/img/3.jpg", breed: "Rottie" }
  ]
}

describe('getPuppyData', () => {
  it('returns an array of puppy data on success', () => {
    const mockfs = {
      readFile: (filepath, encoding, callback) => {
        callback(null, JSON.stringify({...mockPuppies}))
      }
    }


    lib.getPuppyData((err, puppyData) => {
      expect(puppyData.puppies).toHaveLength(3)
    }, mockfs)
  })

  it('returns an error when it cannot load the file', () => {
    const mockfs = {
      readFile: (filepath, encoding, callback) => {
        callback(new Error('test load error'))
      }
    }

    const logger = { error: jest.fn() }

    lib.getPuppyData((err, puppyData) => {
      expect(err.message).toMatch('Unable to load the data file')
      expect(logger.error).toHaveBeenCalledTimes(1)
      expect(puppyData).toBeUndefined()
    }, mockfs, logger)
  })

  it('returns an error when it cannot parse the JSON', () => {
    const mockfs = {
      readFile: (filepath, encoding, callback) => {
        callback(null, 'this is not a json document')
      }
    }

    const logger = { error: jest.fn() }

    lib.getPuppyData((err, puppyData) => {
      expect(err.message).toMatch('Unable to parse the data file')
      expect(logger.error).toHaveBeenCalledTimes(1)
      expect(puppyData).toBeUndefined()
    }, mockfs, logger)
  })
})

describe('getPuppyById', () => {
  it('returns puppy details on success', () => {
    const mockfs = {
      readFile: (filepath, encoding, callback) => {
        callback(null, JSON.stringify({...mockPuppies}))
      }
    }

    lib.getPuppyById(2, (err, puppyDetails) => {
      expect(puppyDetails.name).toBe('Coco')
      expect(puppyDetails.owner).toBe('Chloe')
      expect(puppyDetails.image).toBe('/img/2.jpg')
      expect(puppyDetails.breed).toBe('Lab')
    }, mockfs)
  })

  it('returns an error when it cannot load the file', () => {
    const mockfs = {
      readFile: (filepath, encoding, callback) => {
        callback(new Error('test load error'))
      }
    }

    const logger = { error: jest.fn() }

    lib.getPuppyById(2, (err, puppyDetails) => {
      expect(err.message).toMatch('Unable to load the data file')
      expect(logger.error).toHaveBeenCalledTimes(1)
      expect(puppyDetails).toBeUndefined()
    }, mockfs, logger)
  })

  it('returns an error when it cannot parse the file', () => {
    const mockfs = {
      readFile: (filepath, encoding, callback) => {
        callback(null, 'this is not a json document')
      }
    }

    const logger = { error: jest.fn() }

    lib.getPuppyData((err, puppyData) => {
      expect(err.message).toMatch('Unable to parse the data file')
      expect(logger.error).toHaveBeenCalledTimes(1)
      expect(puppyData).toBeUndefined()
    }, mockfs, logger)
  })

  it('returns an error when it cannot find the puppy id', () => {
    const mockfs = {
      readFile: (filepath, encoding, callback) => {
        callback(null, JSON.stringify({...mockPuppies}))
      }
    }

    lib.getPuppyById(9999, (err, puppyDetails) => {
      expect(err.message).toMatch('ID not found')
      expect(puppyDetails).toBeUndefined()
    }, mockfs)
  })
})

describe('addNewPuppy', () => {
  it('adds a new puppy on success', () => {
    expect.assertions(7)

    const mockfs = {
      readFile: (filepath, encoding, callback) => {
        callback(null, JSON.stringify({...mockPuppies}))
      },
      writeFile: (filepath, contents, enc, callback) => {
        const encoding = enc.toLowerCase().replace('-', '')
        expect(encoding).toMatch('utf8')
        expect(contents).toMatch('Rex')
        expect(contents).toMatch('Sue')
        expect(contents).toMatch('rex.jpg')
        expect(contents).toMatch('Pug')
        callback()
      }
    }

    const newPup = { name: "Rex", owner: "Sue", image: "rex.jpg", breed: "Pug" }

    lib.addNewPuppy(newPup, (err, id) => {
      expect(err).toBeNull()
      expect(id).toBe(4)
    }, mockfs)
  })

  it('returns an error when it cannot load the file', () => {
    const mockfs = {
      readFile: (filepath, encoding, callback) => {
        callback(new Error('test load error'))
      }
    }

    const logger = { error: jest.fn() }
    const newPuppy = {} // doesn't matter that it's empty

    lib.addNewPuppy(newPuppy, (err) => {
      expect(err.message).toMatch('Unable to load the data file')
      expect(logger.error).toHaveBeenCalledTimes(1)
    }, mockfs, logger)
  })

  it('returns an error when it cannot parse the file', () => {
    const mockfs = {
      readFile: (filepath, encoding, callback) => {
        callback(null, 'this is not a json document')
      }
    }

    const logger = { error: jest.fn() }
    const newPuppy = {} // doesn't matter that it's empty

    lib.addNewPuppy(newPuppy, (err) => {
      expect(err.message).toMatch('Unable to parse the data file')
      expect(logger.error).toHaveBeenCalledTimes(1)
    }, mockfs, logger)
  })

  it('returns an error when it cannot write the file', () => {
    const mockfs = {
      readFile: (filepath, encoding, callback) => {
        callback(null, JSON.stringify({...mockPuppies}))
      },
      writeFile: (filepath, contents, enc, callback) => {
        callback(new Error('test error message'))
      }
    }

    const logger = { error: jest.fn() }
    const newPuppy = {} // doesn't matter that it's empty

    lib.addNewPuppy(newPuppy, (err) => {
      expect(err.message).toMatch('Unable to write the data file')
      expect(logger.error).toHaveBeenCalledTimes(1)
    }, mockfs, logger)
  })
})

describe('editPuppy', () => {
  it('updates a new puppy on success', () => {
    expect.assertions(6)
    const mockfs = {
      readFile: (filepath, encoding, callback) => {
        callback(null, JSON.stringify({...mockPuppies}))
      },
      writeFile: (filepath, contents, enc, callback) => {
        const encoding = enc.toLowerCase().replace('-', '')
        expect(encoding).toMatch('utf8')
        expect(contents).toMatch('Test Pup')
        expect(contents).toMatch('Test Owner')
        expect(contents).toMatch('test.jpg')
        expect(contents).toMatch('Test breed')
        callback()
      }
    }

    const updatedPuppy = {
      id: 2,
      name: "Test Pup",
      owner: "Test Owner",
      image: "/images/test.jpg",
      breed: "Test breed"
    }

    lib.editPuppy(updatedPuppy, (err) => {
      expect(err).toBeUndefined()
    }, mockfs)
  })

  it('returns an error when it cannot load the file', () => {
    const mockfs = {
      readFile: (filepath, encoding, callback) => {
        callback(new Error('test load error'))
      }
    }

    const logger = { error: jest.fn() }
    const updatedPuppy = {} // doesn't matter that it's empty

    lib.editPuppy(updatedPuppy, (err) => {
      expect(err.message).toMatch('Unable to load the data file')
      expect(logger.error).toHaveBeenCalledTimes(1)
    }, mockfs, logger)
  })

  it('returns an error when it cannot parse the file', () => {
    const mockfs = {
      readFile: (filepath, encoding, callback) => {
        callback(null, 'this is not a json document')
      }
    }

    const logger = { error: jest.fn() }
    const updatedPuppy = {} // doesn't matter that it's empty

    lib.editPuppy(updatedPuppy, (err) => {
      expect(err.message).toMatch('Unable to parse the data file')
      expect(logger.error).toHaveBeenCalledTimes(1)
    }, mockfs, logger)
  })

  it('returns an error when it cannot write the file', () => {
    const mockfs = {
      readFile: (filepath, encoding, callback) => {
        callback(null, JSON.stringify({...mockPuppies}))
      },
      writeFile: (filepath, contents, enc, callback) => {
        callback(new Error('test error message'))
      }
    }

    const logger = { error: jest.fn() }
    // doesn't matter that it isn't complete
    const updatedPuppy = { id: 2 }

    lib.editPuppy(updatedPuppy, (err) => {
      expect(err.message).toMatch('Unable to write the data file')
      expect(logger.error).toHaveBeenCalledTimes(1)
    }, mockfs, logger)
  })

  it('returns an error when it cannot find the puppy id', () => {
    const mockfs = {
      readFile: (filepath, encoding, callback) => {
        callback(null, JSON.stringify({...mockPuppies}))
      }
    }

    // doesn't matter that it isn't complete
    const updatedPuppy = { id: 9999 }

    lib.editPuppy(updatedPuppy, (err, puppyDetails) => {
      expect(err.message).toMatch('ID not found')
      expect(puppyDetails).toBeUndefined()
    }, mockfs)
  })
})
