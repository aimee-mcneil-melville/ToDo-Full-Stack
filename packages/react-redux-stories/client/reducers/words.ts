import { WordAction } from '../actions'

interface Word {
  id: number
  word: string
}

const initialState: Word[] = []

const words = (state = initialState, action: WordAction) => {
  switch (action.type) {
    case 'ADD_WORD':
      return [
        ...state,
        {
          id: action.payload.id,
          word: action.payload.word,
        },
      ]

    default:
      return state
  }
}

export default words
