export type WombatAction =
  | { type: 'ADD_WOMBAT'; payload: string }
  | { type: 'DEL_WOMBAT'; payload: string }
  | { type: 'UPDATE_WOMBAT'; payload: { old: string; new: string } }

export function addWombat(wombat: string): WombatAction {
  return {
    type: 'ADD_WOMBAT',
    payload: wombat,
  }
}

export function deleteWombat(wombat: string): WombatAction {
  return {
    type: 'DEL_WOMBAT',
    payload: wombat,
  }
}

export function updateWombat(
  oldWombat: string,
  newWombat: string
): WombatAction {
  return {
    type: 'UPDATE_WOMBAT',
    payload: { old: oldWombat, new: newWombat },
  }
}
