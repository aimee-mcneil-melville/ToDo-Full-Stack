import React from 'react'

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    isVisible: false
    }
    this.showCard = this.showCard.bind(this)
    this.checkMatch = this.checkMatch.bind(this)
  }

  checkMatch () {
    if (this.props.ismatch === true)
      this.setState({
        isVisible: true
      }), () => {
        this.props.clear()
      }
    if (this.props.ismatch === false)
      this.setState({
        isVisible: false
      }, () => {
        this.props.clear()
      })
  }


  render() {
    return (
      <div className='card'>
        {this.props.isVisible ?
          <div className='card-visible'
            getSelection={this.props.getSelection}
            checkMatch={this.props.checkMatch}>
            {this.props.value}
          </div>
          :
          <div className='card-notvisible'
            showCard={this.showCard} >
            {'x'}
          </div>}


      </div>
    )
  }
}

export default Card