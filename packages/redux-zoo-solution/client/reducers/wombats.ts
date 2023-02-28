import { WombatAction } from '../actions'

const initialWombatState = ['Gertrude', 'Bartholemew']

const wombatReducer = (
  state = initialWombatState,
  action: WombatAction
): string[] => {
  const { type, payload } = action
  switch (type) {
    case 'ADD_WOMBAT':
      return [...state, payload]
    case 'DEL_WOMBAT':
      return state.filter((wombat) => wombat !== payload)
    case 'UPDATE_WOMBAT':
      return state.map((wombat) =>
        wombat === payload.old ? payload.new : wombat
      )
    default:
      return state
  }
}

export default wombatReducer
