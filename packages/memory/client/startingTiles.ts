export type TTile = {
  id: number
  value: string
  isVisible: boolean
  info: string
}

const startingTiles: TTile[] = [
  { id: 1, value: '\u{1F330}', isVisible: false, info: 'chestnut' },
  { id: 2, value: '\u{1F33D}', isVisible: false, info: 'ear of maze' },
  { id: 3, value: '\u{1F33E}', isVisible: false, info: 'ear of rice' },
  { id: 4, value: '\u{1F34D}', isVisible: false, info: 'pineapple' },
  { id: 5, value: '\u{1F341}', isVisible: false, info: 'maple leaf' },
  { id: 6, value: '\u{1F34D}', isVisible: false, info: 'pineapple' },
  { id: 7, value: '\u{1F33F}', isVisible: false, info: 'herb' },
  { id: 8, value: '\u{1F33D}', isVisible: false, info: 'ear of maze' },
  { id: 9, value: '\u{1F33F}', isVisible: false, info: 'herb' },
  { id: 10, value: '\u{1F340}', isVisible: false, info: 'four leaf clover' },
  { id: 11, value: '\u{1F330}', isVisible: false, info: 'chestnut' },
  { id: 12, value: '\u{1F347}', isVisible: false, info: 'grapes' },
  { id: 13, value: '\u{1F33E}', isVisible: false, info: 'ear of rice' },
  { id: 14, value: '\u{1F347}', isVisible: false, info: 'grapes' },
  { id: 15, value: '\u{1F341}', isVisible: false, info: 'maple leaf' },
  { id: 16, value: '\u{1F340}', isVisible: false, info: 'four leaf clover' },
]

export default startingTiles
