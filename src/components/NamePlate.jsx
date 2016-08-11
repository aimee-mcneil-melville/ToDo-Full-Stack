import React from 'react'

const NamePlate = (props) => {
  return (
    <div className="dog">
      <div className="dog-name-plate">
        <span className="dog-name">{props.name}</span>
        <span className="dog-breed">{props.breed}</span>
      </div>
      <span className="dog-superpower">{props.superpower}</span>
    </div>
  )
}
NamePlate.propTypes = {
  name: React.PropTypes.string.isRequired,
  breed: React.PropTypes.string.isRequired,
  superpower: React.PropTypes.string.isRequired
}
export default NamePlate
