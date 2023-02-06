export interface WidgetData {
  name: string
  price: number
  mfg: string
  inStock: number
  rating: number
}

export interface Widget extends WidgetData {
  id: number
}
