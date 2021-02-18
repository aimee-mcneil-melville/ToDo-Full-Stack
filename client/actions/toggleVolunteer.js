export const TOGGLE_VOLUNTEER = 'TOGGLE_VOLUNTEER'

export function toggleVolunteer (isVolunteer) {
  return {
    type: TOGGLE_VOLUNTEER,
    isVolunteer: !isVolunteer
  }
}
