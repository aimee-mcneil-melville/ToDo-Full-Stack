import type { PuppyData } from '../models/Puppy.ts'
import initialData from './initial-data.ts'

interface Data {
  puppies: PuppyData[]
}

export async function getPuppies(): Promise<Data> {
  return initialData
}
