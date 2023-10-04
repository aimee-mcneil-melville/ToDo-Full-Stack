export interface EventData {
  locationId: number
  day: string
  time: string
  name: string
  description: string
}

export interface EventWithLocation {
  id: number
  locationName: string
  eventName: string
  day: string
  time: string
  description: string
}

export interface Event extends EventData {
  id: number
}
