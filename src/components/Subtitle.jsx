import React from 'react'

const SubTitle = (props) => <h2>{props.text}</h2>
SubTitle.propTypes = { text: React.PropTypes.string.isRequired }
export default SubTitle
