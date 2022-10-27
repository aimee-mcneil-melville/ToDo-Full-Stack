import { TWombatAction } from '../actions'

const initialWombatState = ['Gertrude', 'Bartholemew']

const wombatReducer = (
  state = initialWombatState,
  action: TWombatAction
): string[] => {
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
