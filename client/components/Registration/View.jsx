import React from 'react'

export function View(props) {
  const garden = props.garden
  const { firstName, lastName, email } = props.user

  return (
    <>
      <h1>Profile</h1>
      <ul className="list-primary">
        <li>
          {firstName} {lastName}
        </li>
        <li>{email}</li>
      </ul>
      <h2>Your Garden:</h2>
      <ul className="list-primary">
        <li>{garden.name}</li>
        <li>{garden.address}</li>
      </ul>
    </>
  )
}
