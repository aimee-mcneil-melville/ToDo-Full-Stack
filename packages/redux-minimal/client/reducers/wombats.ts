const initialWombatState = ['Gertrude', 'Bartholemew']

type Action =
  | { type: 'ADD_WOMBAT'; payload: string }
  | { type: 'DEL_WOMBAT'; payload: string }

const wombatReducer = (state = initialWombatState, action: Action) => {
  const { type, payload } = action
  switch (type) {
    case 'ADD_WOMBAT':
      return [...state, payload]
    case 'DEL_WOMBAT':
      return state.filter((wombat) => wombat !== payload)
    default:
      return state
  }
}

export default wombatReducer
