/* eslint-disable no-import-assign */

import * as fs from 'node:fs/promises'
import prompt from 'prompt'
import * as comments from './comments.js'

export { areYouSure, enterComment, main, pressEnter }

prompt.message = ''
prompt.delimiter = ' > '
prompt.start()

async function main() {
  let result = await init()
  for (;;) {
    switch (result.choice) {
      case 'q':
        process.exitCode = 0
        return

      case 'c':
        await enterComment()
        break

      case 'e':
        if (await areYouSure()) {
          await comments.erase()
          await pressEnter()
        }
        break

      case 'v':
        await comments.display()
        await pressEnter()
        break

      default:
        await display(result.choice)
    }

    result = await init()
  }
}

async function init() {
  console.log(
    ' Choose an artwork to display, or:\n',
    '  `c` to comment\n',
    '  `e` to erase comments\n',
    '  `v` to view comments\n',
    '  `q` to quit\n'
  )
  const files = await fs.readdir('data')

  var list = files
    .filter((fn) => fn !== 'comments.txt')
    .map((artwork, i) => ` ${i}: ${artwork}\n`)
    .join('')

  console.log(list)

  return await prompt.get({
    name: 'choice',
    message: 'Choice',
  })
}

async function enterComment() {
  try {
    const input = await prompt.get({
      name: 'comment',
      message: 'Enter your comment',
    })
    await comments.save(input.comment)
  } catch (e) {
    console.error("I don't understand that.")
    await pressEnter()
  }
}

async function pressEnter() {
  await prompt.get('Hit <enter> to continue...')
}

async function areYouSure() {
  const result = await prompt.get({
    name: 'sure',
    message: 'Are you sure [y/N]?',
  })

  return result.choice === 'y'
}

async function display(choice) {
  try {
    const files = await fs.readdir('data')
    const file = files[choice]

    if (!file) {
      throw new Error("That's not one of the artworks!")
    }

    try {
      const artwork = await fs.readFile(`data/${file}`, 'utf8')
      console.log(artwork)
    } catch (err) {
      throw new Error("Can't load that file.")
    }
  } catch (err) {
    console.error(err.message)
  }
}
