import React from 'react'

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.onClick(this.props.id)
  }

  render() {
    return (
      <div className='card' onClick={this.handleClick}>
        {this.props.isVisable ? this.props.value : 'x'}
      </div>
    )
  }
}

export default Card