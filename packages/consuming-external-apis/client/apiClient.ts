import request from 'superagent'

const serverURL = 'http://localhost:3000/api/v1'

interface Welcome {
  statement: string
}

// *** EXAMPLE ***
export function getWelcome(): Promise<Welcome> {
  return request.get(`${serverURL}/welcome`).then((response) => response.body)
}
// ***   ***   ***
