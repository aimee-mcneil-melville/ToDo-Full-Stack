import request from 'superagent'

import { Widget, WidgetData } from '../models/Widget'

const widgetUrl = '/api/v1/widgets/'

export function getWidgets(): Promise<Widget[]> {
  return request.get(widgetUrl).then((res) => res.body)
}

export function addWidget(widget: WidgetData): Promise<Widget[]> {
  return request
    .post(widgetUrl)
    .send(widget)
    .then((res) => res.body)
}

export function deleteWidget(id: number) {
  return request.del(`${widgetUrl}${id}`).then((res) => res.body)
}

export function updateWidget(id: number, widget: WidgetData): Promise<Widget> {
  return request
    .patch(`${widgetUrl}${id}`)
    .send(widget)
    .then((res) => res.body)
}
