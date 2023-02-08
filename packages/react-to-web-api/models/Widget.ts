export interface WidgetData {
  name: string
  price: number
  mfg: string
  inStock: number
}

export interface Widget extends WidgetData {
  id: number
}
