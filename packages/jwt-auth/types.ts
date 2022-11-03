export type Fruit = {
  id?: number
  name: string
  average_grams_each: number
  added_by_user: string
}
export interface TypedRequestBody<T> extends Express.Request {
  body: T,
  auth: any
}
export type PostFruitReq = {
    fruit: {
      name: string,
      averageGramsEach: number
}}