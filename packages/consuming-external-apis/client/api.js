import request from 'superagent'

const serverURL = 'http://localhost:3000/api/v1'

// *** EXAMPLE ***
export function getWelcome() {
  return request.get(`${serverURL}/welcome`).then((response) => response.body)
}
// ***   ***   ***
