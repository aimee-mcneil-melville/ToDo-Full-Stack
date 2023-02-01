// Example action creator:

// let nextWordId = 0

// export function addWord(word: string): Action {
//   return {
//     type: 'ADD_WORD',
//     id: nextWordId++,
//     word,
//   }
// }

export type WombatAction =
  | { type: 'ADD_WOMBAT'; payload: string }
  | { type: 'DEL_WOMBAT'; payload: string }
