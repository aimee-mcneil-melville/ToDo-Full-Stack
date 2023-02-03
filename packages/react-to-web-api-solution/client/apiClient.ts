import request from 'superagent'

import { Widget } from '../models/Widget'

const widgetUrl = '/api/v1/widgets/'

export function getWidgets(): Promise<Widget[]> {
  return request.get(widgetUrl).then((res) => res.body)
}
