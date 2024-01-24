import request from 'superagent'
import { AmiiboCollection } from '../models/amiibo.ts'

// *** EXAMPLE ***
export async function getAmiiboWithName(
  name: string
): Promise<AmiiboCollection> {
  const response = await request
    .get(`https://www.amiiboapi.com/api/amiibo/`)
    .query({ name })

  return response.body
}
// ***   ***   ***
