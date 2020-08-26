const nodefs = require('fs')
const path = require('path')

module.exports = {
  getPuppyData,
  getPuppyById,
  addNewPuppy,
  editPuppy
}

const filepath = path.join(__dirname, 'data.json')

function getPuppyData (callback, fs = nodefs, log = console) {
  fs.readFile(filepath, 'utf8', (err, contents) => {
    let puppyData

    if (err) {
      log.error(err)
      callback(new Error('Unable to load the data file'))
      return
    }

    try {
      puppyData = JSON.parse(contents)
    } catch (error) {
      log.error(error)
      callback(new Error('Unable to parse the data file'))
      return
    }

    callback(null, puppyData)
  })
}

function getPuppyById (id, callback, fs = nodefs, log = console) {
  fs.readFile(filepath, 'utf8', (err, contents) => {
    let puppyData

    if (err) {
      log.error(err)
      callback(new Error('Unable to load the data file'))
      return
    }

    try {
      puppyData = JSON.parse(contents)
    } catch (error) {
      log.error(error)
      callback(new Error('Unable to parse the data file'))
      return
    }

    const puppyDetails = puppyData.puppies.find(pup => pup.id === id)
    if (!puppyDetails) {
      const error = new Error('ID not found')
      error.code = 404
      return callback(error)
    }

    callback(null, puppyDetails)
  })
}

function addNewPuppy (newPuppy, callback, fs = nodefs, log = console) {
  fs.readFile(filepath, 'utf8', (err, contents) => {
    let puppyData

    if (err) {
      log.error(err)
      callback(new Error('Unable to load the data file'))
      return
    }

    try {
      puppyData = JSON.parse(contents)
    } catch (error) {
      log.error(error)
      callback(new Error('Unable to parse the data file'))
      return
    }

    // This is NOT a safe way to assign new ID values because if the last pup is
    // deleted the next one will get the reused ID when they should be different
    const latestPuppy = puppyData.puppies[puppyData.puppies.length - 1]
    newPuppy.id = latestPuppy ? (latestPuppy.id + 1) : 1

    puppyData.puppies.push(newPuppy)
    const puppyString = JSON.stringify(puppyData, null, 2)

    fs.writeFile(filepath, puppyString, 'utf8', (error) => {
      if (error) {
        log.error(error)
        callback(new Error('Unable to write the data file'))
        return
      }

      callback(null, newPuppy.id)
    })
  })
}

function editPuppy (puppy, callback, fs = nodefs, log = console) {
  fs.readFile(filepath, 'utf8', (err, contents) => {
    let puppyData

    if (err) {
      log.error(err)
      callback(new Error('Unable to load the data file'))
      return
    }

    try {
      puppyData = JSON.parse(contents)
    } catch (error) {
      log.error(error)
      callback(new Error('Unable to parse the data file'))
      return
    }

    // There is no need to remove the puppy from the array, change it, and then
    // re-add it to the array. find() provides a reference to the object so you
    // can change it directly while it's still in the array.
    const foundPuppy = puppyData.puppies.find(pup => pup.id === puppy.id)

    if (!foundPuppy) {
      const error = new Error('ID not found')
      error.code = 404
      return callback(error)
    }

    const { name, owner, image, breed } = puppy
    foundPuppy.name = name
    foundPuppy.owner = owner
    foundPuppy.image = image
    foundPuppy.breed = breed
    const puppyString = JSON.stringify(puppyData, null, 2)

    fs.writeFile(filepath, puppyString, 'utf8', (error) => {
      if (error) {
        log.error(error)
        callback(new Error('Unable to write the data file'))
        return
      }

      callback()
    })
  })
}
