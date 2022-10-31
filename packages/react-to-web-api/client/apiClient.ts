// eslint-disable-next-line no-unused-vars
import request from 'superagent'
// eslint-disable-next-line no-unused-vars
const widgetUrl = '/api/v1/widgets/'

export function getWidgets() {
  return request
    .get(widgetUrl)
    .then((response) => {
      return response.body
    })
    .catch((err) => {
      console.error(err.message)
    })
}
