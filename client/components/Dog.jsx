import React from 'react'

import Pic from './Pic'
import NamePlate from './NamePlate'

const Dog = (props) => (
  <div className='dog-wrapper'>
    <NamePlate name={props.name} breed={props.breed} superpower={props.superpower} />
    <div className='dog-pic'>
      <Pic image={props.image} alt={props.name} />
    </div>
  </div>
)

export default Dog
