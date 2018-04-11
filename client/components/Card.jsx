import React from 'react'

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  //   this.checkMatch = this.checkMatch.bind(this)
  }

  handleClick () {
    this.props.onClick(this.props.id)
  }

  // checkMatch(match, notmatch) {
  //   if (match)
  //     this.setState({
  //       isVisible: true
  //     }), () => {
  //       this.props.clear()
  //     }
  //   if (notmatch)
  //     this.setState({
  //       isVisible: false
  //     }, () => {
  //       this.props.clear()
  //     })
  // }


  render() {
    return (
      <div className='card' onClick={this.handleClick}>
        {this.props.isVisable ? this.props.value : 'x'}
      </div>
    )
  }
}

export default Card