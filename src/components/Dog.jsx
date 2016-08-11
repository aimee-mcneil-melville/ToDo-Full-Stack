import React from 'react'

export default React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    breed: React.PropTypes.string.isRequired,
    superpower: React.PropTypes.string
  },

  render () {
    return (
      <div className="dog">
        <div className="dog-name-plate">
          <span className="dog-name">{this.props.name}</span>
          <span className="dog-breed">{this.props.breed}</span>
        </div>
        <span className="dog-superpower">{this.props.superpower}</span>
      </div>
    )
  }
})
