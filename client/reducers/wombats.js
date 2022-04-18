const initialWombatState = ['Gertrude', 'Bartholemew']

const wombatReducer = (state = initialWombatState, action) => {
  switch (action.type) {
    case 'ADD_WOMBAT':
      return [...state, action.payload]
    case 'DEL_WOMBAT':
      return state.filter((wombat) => wombat !== action.payload)
    default:
      return state
  }
}

export default wombatReducer
