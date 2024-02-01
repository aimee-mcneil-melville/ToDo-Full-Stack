import type { PuppyData, Puppy } from '../models/Puppy.ts'
import initialData from './initial-data.ts'

interface Data {
  puppies: Puppy[]
}

export async function getPuppies(): Promise<Data> {
  return initialData
}
