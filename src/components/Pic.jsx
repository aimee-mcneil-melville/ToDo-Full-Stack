import React from 'react'

const Pic = (props) => <img src={`images/${props.image}`} alt={props.alt} className="dog-img" />
Pic.propTypes = { image: React.PropTypes.string.isRequired, alt: React.PropTypes.string }
export default Pic
