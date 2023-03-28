const initialAardvarkState = ['Amelia', 'Amir', 'Ali']

type AardvarkAction =
  | { type: 'ADD_AARDVARK'; payload: string }
  | { type: 'DEL_AARDVARK'; payload: string }
  | { type: 'UPDATE_AARDVARK'; payload: { old: string; new: string } }

const aardvarkReducer = (
  state = initialAardvarkState,
  action: AardvarkAction
) => {
  const { type, payload } = action
  switch (type) {
    case 'ADD_AARDVARK':
      return [...state, payload]
    case 'DEL_AARDVARK':
      return state.filter((aardvark) => aardvark !== payload)
    case 'UPDATE_AARDVARK':
      return state.map((aardvark) =>
        aardvark === payload.old ? payload.new : aardvark
      )
    default:
      return state
  }
}

export default aardvarkReducer
