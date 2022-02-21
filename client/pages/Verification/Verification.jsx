import React from 'react'

// Paragraph "please check your inbox and verify link"

// use inside App.jsx

export default function Verification () {
  const message = 'please check your inbox and verify link'
  return (
    <div>
      <p className='verify-message'>{message}</p>
    </div>
  )
}
