export type Fruit = {
  name: string
  average_grams_each: number
  added_by_user: string
}

export type SavedFruit = Fruit & { id: number }

export type JsonFruit = FormFruit & { id: number }

export type FormFruit = {
  name: string
  averageGramsEach: number
  addedByUser: string
}
