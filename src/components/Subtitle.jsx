import React from 'react'

const subTitle = (props) => <h2>{props.text}</h2>
subTitle.propTypes = { text: React.PropTypes.string.isRequired }
export default subTitle
