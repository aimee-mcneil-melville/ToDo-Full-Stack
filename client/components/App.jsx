import React from 'react'

import Card from './Card'

const cards = [
  {id: 1, value: 1},
  {id: 2, value: 2},
  {id: 3, value: 2},
  {id: 4, value: 3},
  {id: 5, value: 1},
  {id: 6, value: 3},
]

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: cards,
      matches: 0,
      ismatch: false,
      card1: null,
      card2: null
    }
    this.getSelection = this.getSelection.bind(this)
    this.clear = this.clear.bind(this)
    this.checkMatch = this.checkMatch.bind(this)
  }

  showCard () {
    const card = {
      id: this.props.id,
      value: this.props.value
    }
    this.setState({
    isVisible: true
    })
    this.props.getSelection(card)
  }
  
  getSelection (card) {
    const card1 = this.state.card1
    const card2 = this.state.card2
    if (card1 === null)
    this.setState({
      card1: card
    }), () => {
      this.checkMatch()
    }
    if ((card1 !== null) && (card2 === null))
    this.setState({
      card2: card
    }, () => {
      this.checkMatch()
    }) 
  } 

  checkMatch () {
    const card1 = this.state.card1
    const card2 = this.state.card2
    // const match = this.state.match
    if (card1.value === card2.value)
    this.setState({
      ismatch: true
    }, () => {
      
    }) 
    if (card1.value !== card2.value)
    this.setState({
      ismatch: false
    }, () => {
      //
    }) 
  }

  clear () {
    this.setState({
      card1: null,
      card2: null
    })
  }

  render () {
    return (
      <div className='cards'>
          {this.state.cards.map((card) => {
            return <Card 
            key={card.id}
            id={card.id} 
            value={card.value}
            isVisible={this.state.isVisible}
            onClick={this.onClick}
            // checkMatch={this.checkMatch}
            />
          })}
      </div>
    )
  }
}

export default App
