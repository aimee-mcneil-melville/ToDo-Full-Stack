const initialWombatState = ['Gertrude', 'Bartholemew']

type Action =
  | { type: 'ADD_WOMBAT'; payload: string }
  | { type: 'DEL_WOMBAT'; payload: string }
  | { type: 'UPDATE_WOMBAT'; payload: { oldWombat: string; newWombat: string } }

const wombatReducer = (state = initialWombatState, action: Action) => {
  switch (action.type) {
    case 'ADD_WOMBAT':
      return [...state, action.payload]
    case 'DEL_WOMBAT':
      return state.filter((wombat) => wombat !== action.payload)
    case 'UPDATE_WOMBAT':
      return state.map((wombat) => {
        return wombat === action.payload.oldWombat
          ? action.payload.newWombat
          : wombat
      })
    default:
      return state
  }
}

export default wombatReducer
