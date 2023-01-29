let nextWordId = 0

export type WordAction = {
  type: 'ADD_WORD'
  payload: { id: number; word: string }
}

export const addWord = (word: string): WordAction => {
  return {
    type: 'ADD_WORD',
    payload: {
      id: nextWordId++,
      word,
    },
  }
}
