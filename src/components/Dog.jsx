import React from 'react'

import NamePlate from './NamePlate'
import Pic from './Pic'

export default React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    breed: React.PropTypes.string.isRequired,
    image: React.PropTypes.string.isRequired,
    superpower: React.PropTypes.string
  },

  render () {
    return (
      <div className="dog-wrapper">
        <NamePlate name={this.props.name} breed={this.props.breed} superpower={this.props.superpower} />
        <div className="dog-pic">
          <Pic image={this.props.image} alt={this.props.name} />
        </div>
      </div>
    )
  }
})
