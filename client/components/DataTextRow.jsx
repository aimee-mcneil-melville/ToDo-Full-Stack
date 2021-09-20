// Used to display two lines of text for each song or friend
import React from 'react'

const DataText = (props) => {
  const { title, subtitle } = props
  return (
    <div className='data-row__text'>
      <h3 className="data-row__title">{ title }</h3>
      <h4 className="data-row__subtitle">{ subtitle }</h4>
    </div>
  )
}

export default DataText
