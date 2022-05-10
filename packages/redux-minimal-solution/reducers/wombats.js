const initialWombatState = ['Gertrude', 'Bartholemew']

const wombatReducer = (state = initialWombatState, action) => {
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
