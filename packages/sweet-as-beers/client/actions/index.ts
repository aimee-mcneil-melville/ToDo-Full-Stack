export type Action = { type: 'ACTION_TYPE' }

export const actionCreatorName = (): Action => {
  return {
    type: 'ACTION_TYPE',
  }
}
