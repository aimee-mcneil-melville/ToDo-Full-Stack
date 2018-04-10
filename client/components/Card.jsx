import React from 'react'

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
    }
    this.onClick = this.onClick.bind(this)
    this.checkMatch = this.checkMatch.bind(this)
  }

  onClick() {
    const card = {
      id: this.props.id,
      value: this.props.value
    }
    this.setState({
      isVisible: true
    })
    this.props.onClick(card)
  }

  checkMatch(match, notmatch) {
    if (match)
      this.setState({
        isVisible: true
      }), () => {
        this.props.clear()
      }
    if (notmatch)
      this.setState({
        isVisible: false
      }, () => {
        this.props.clear()
      })
  }


  render() {
    return (
      <div className='card'>
        {this.state.isVisible ?
          <div className='card-visible'
            onClick={this.props.onClick}
            checkMatch={this.props.checkMatch}>
            {this.props.value}
          </div>
          :
          <div className='card-notvisible'
            onClick={this.onClick}
            checkMatch={this.checkMatch}>
            {'x'}
          </div>}


      </div>
    )
  }
}

export default Card