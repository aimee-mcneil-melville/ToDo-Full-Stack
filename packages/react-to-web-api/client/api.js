import request from 'superagent'

const widgetUrl = '/api/v1/widgets/'

export function getWidgets() {
  return request.get(widgetUrl).then((response) => response.body)
}
