import * as fs from 'node:fs/promises'
import * as Path from 'node:path'
import { Puppy, PuppyData } from '../models/Puppy.ts'
import initialData from './initial-data.ts'

const path = Path.resolve('storage/data.json')

interface Data {
  puppies: Array<Puppy>
}

async function read() {
  try {
    const json = await fs.readFile(path, 'utf-8')
    const obj = JSON.parse(json)
    return obj as Data
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return initialData
    }

    throw error
  }
}

function hasErrorCode(error: unknown, code: string): boolean {
  return error != undefined && typeof error === 'object' && 'code' in error && error.code === code
}

async function write(obj: Data) {
  const json = JSON.stringify(obj)
  await fs.writeFile(path, json, 'utf-8')
}

export async function getAll() {
  const data = await read()
  return data.puppies
}

export async function create(data: PuppyData) {
  const { puppies } = await read()
  const maxId = Math.max(...puppies.map((pup) => pup.id))
  const id = maxId + 1
  const newPuppies = [...puppies, { ...data, id }]
  await write({ puppies: newPuppies })
  return id
}

export async function getById(id: number) {
  const { puppies } = await read()
  const puppy = puppies.find((pup) => pup.id === id)
  return puppy
}

export async function deleteById(id: number) {
  const { puppies } = await read()
  const newPuppies = puppies.filter((pup) => pup.id !== id)
  await write({ puppies: newPuppies })
}

export async function update(id: number, values: Partial<Puppy>) {
  const { puppies } = await read()
  const newPuppies = puppies.map((pup) => {
    if (pup.id !== id) {
      return pup
    }

    return { ...pup, ...values }
  })

  await write({ puppies: newPuppies })
}
