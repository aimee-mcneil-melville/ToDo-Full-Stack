// Example action creator:

// let nextWordId = 0

// export function addWord(word) {
//   return {
//     type: 'ADD_WORD',
//     id: nextWordId++,
//     word,
//   }
// }

export type TWombatAction =
  | { type: 'ADD_WOMBAT'; payload: string }
  | { type: 'DEL_WOMBAT'; payload: string }
