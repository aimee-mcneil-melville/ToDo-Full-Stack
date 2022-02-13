import React from 'react'

// eslint-disable-next-line no-unused-vars
function AddTodo(props) {
  return (
    <>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus={true}
      />
    </>
  )
}

export default AddTodo
