/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'

type Person = {
  name: string
  hobby: string
  isStudent: boolean
}

const emptyPerson: Person = {
  name: '',
  hobby: '',
  isStudent: false,
}

export default function TextAndCheckboxForm() {
  const [list, setList] = useState<Person[]>([])
  const [formState, setFormState] = useState<Person>(emptyPerson)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setList((prevList) => [...prevList, formState])
  }

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // read about computed keys: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names
    // we want to set `name` when `event.target.name` is `name`
    // and set `hobby` when `event.target.name` is `hobby`
    console.log(
      'Text changed:',
      event.target.value,
      'on input:',
      event.target.name
    )
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // here, we can set isStudent as normal, because there's only one checkbox using this handler
    console.log(
      'Checkbox changed:',
      event.target.checked,
      'on input:',
      event.target.name
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formState.name}
          onChange={handleTextChange}
        />

        <label htmlFor="hobby">Hobby:</label>
        <input
          type="text"
          name="hobby"
          id="hobby"
          value={formState.hobby}
          onChange={handleTextChange}
        />

        <label htmlFor="isStudent">Is Student:</label>
        <input
          type="checkbox"
          name="isStudent"
          id="isStudent"
          checked={formState.isStudent}
          onChange={handleCheckboxChange}
        />
        <button>Add Person</button>
      </form>

      <h2 id="list">People: </h2>
      <ul aria-labelledby="list">
        {list.map((person, index) => (
          <li key={index}>
            {person.name} - {person.hobby} -{' '}
            {person.isStudent ? 'Student' : 'Not a student'}
          </li>
        ))}
      </ul>
    </>
  )
}
