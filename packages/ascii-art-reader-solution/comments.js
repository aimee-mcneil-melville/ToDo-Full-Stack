import { readFile, truncate, open, writeFile } from 'node:fs/promises'
export { display, get, erase, save }

async function get(filename = 'data/comments.txt') {
  return readFile(filename,'utf8')
}

async function display() {
  try {
    const comments = await get()
    console.log(
      'Comments people made about art:\n-------------------------------'
    )
    console.log(comments)
  } catch (e) {
    console.error("Can't read comments from the comments file.")
  }
}

async function erase( filename = 'data/comments.txt') {
  try {
    await truncate(filename , 0)
    console.log('All comments have been deleted.')
  } catch (err) {
    console.error("Can't delete the comments from the comments file.")
  }
}

async function save(comment, filename = 'data/comments.txt') {
  try {
    var commentLine = `${comment}\n`
    const file = await open(filename, 'a+')

    await writeFile(file, commentLine, 'utf8')
    await file.close()
    console.log('Your comment has been saved for posterity. Congratulations.')
  } catch (err) {
    console.error(err)
    console.error("Can't write to comments file.")
  }
}
