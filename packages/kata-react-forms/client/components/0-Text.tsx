/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'

export default function TextForm() {
  const [list, setList] = useState<string[]>([])
  const [newItem, setNewItem] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log('Submitting:', newItem)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Text changed:', event.target.value)
  }

  return (
    <>
      <form>
        <label htmlFor="newItem">New Item:</label>
        <input type="text" name="newItem" id="newItem" value={newItem} />
        <button>Submit</button>
      </form>
      <h2 id="list">List: </h2>
      <ul aria-labelledby="list">
        {list.map((listItem, index) => (
          <li key={index}>{listItem}</li>
        ))}
      </ul>
    </>
  )
}
