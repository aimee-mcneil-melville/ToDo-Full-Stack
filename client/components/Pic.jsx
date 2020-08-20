import React from 'react'

const Pic = (props) => (
  <img src={`/images/${props.image}`} alt={props.alt} className='dog-img' />
)

export default Pic
