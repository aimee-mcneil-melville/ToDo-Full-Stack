import { main } from './menu.js'

console.log(' Welcome!\n --------\n')

main().catch((e) => {
  process.exitCode = 1
})
