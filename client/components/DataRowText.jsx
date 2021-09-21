// Used to display two lines of text for each song or friend
import React from 'react'
import { Link } from 'react-router-dom'

const DataRowText = (props) => {
  const { title, subtitle, link } = props
  return (
    <div className='data-row__text'>
      <h3 className="data-row__title">
        {link
          ? <Link to={link}>{title}</Link>
          : title
        }
      </h3>
      <h4 className="data-row__subtitle">
        {link
          ? <Link to={link}>{title}</Link>
          : subtitle
        }
      </h4>
    </div>
  )
}

export default DataRowText
