import fs from 'node:fs/promises'
import * as Path from 'node:path'

const filepath = Path.resolve('./server/data/data.json')

export async function getPuppyData() {
  const contents = await fs.readFile(filepath, 'utf-8')
  const data = JSON.parse(contents)
  return data.puppies
}

export async function savePuppyData(puppies) {
  const data = { puppies }
  const json = JSON.stringify(data, null, 2)
  await fs.writeFile(filepath, json, 'utf-8')
}

export async function getPuppyById(id) {
  const puppyData = await getPuppyData()
  const puppyDetails = puppyData.find((pup) => pup.id === id)
  if (!puppyDetails) {
    const error = new Error('ID not found')
    error.code = 404
    throw error
  }

  return puppyDetails
}

export async function addNewPuppy(newPuppy) {
  const puppyData = await getPuppyData()
  // this is not a perfect way to choose an ID
  newPuppy.id = puppyData.length + 1
  puppyData.push(newPuppy)

  await savePuppyData(puppyData)
  return newPuppy.id
}

export async function editPuppy(puppy) {
  const puppyData = await getPuppyData()
  const foundPuppy = puppyData.find((pup) => pup.id === puppy.id)
  if (!foundPuppy) {
    const error = new Error('ID not found')
    error.code = 404
    throw error
  }

  const { name, owner, image, breed } = puppy
  foundPuppy.name = name
  foundPuppy.owner = owner
  foundPuppy.image = image
  foundPuppy.breed = breed

  await savePuppyData(puppyData)
}
