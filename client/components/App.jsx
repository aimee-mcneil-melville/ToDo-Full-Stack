import React from 'react'

import Card from './Card'

function startingCards() {
  return [
    { id: 1, value: 1, isVisable: false },
    { id: 2, value: 2, isVisable: false },
    { id: 3, value: 2, isVisable: false },
    { id: 4, value: 3, isVisable: false },
    { id: 5, value: 1, isVisable: false },
    { id: 6, value: 3, isVisable: false },
  ]
}

const win = 'Congratulations you matched all the cards!'
const tryAgain = 'Try match again'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: startingCards(),
      card1: null,
      card2: null,
      matches: 0,
      allMatched: false,
      mismatch: false,
      replay: false
    }
    this.onClick = this.onClick.bind(this)
    this.clear = this.clear.bind(this)
    this.checkMatch = this.checkMatch.bind(this)
    this.reset = this.reset.bind(this)
  }

  onClick(id) {
    const cards = this.state.cards
    const card1 = this.state.card1
    const card2 = this.state.card2
    const cardIndex = cards.findIndex((card) => card.id === id)
    if (card1 === null) {
      cards[cardIndex].isVisable = true
      this.setState({
        card1: id,
        cards: cards
      })
    }
    if ((card1 !== null) && (card2 === null)) {
      cards[cardIndex].isVisable = true
      this.setState({
        card2: id,
        cards: cards
      }, () => {
        this.checkMatch()
      })
    }
  }

  checkMatch() {
    const cards = this.state.cards
    const matches = this.state.matches
    const card1 = cards.find(card => card.id === this.state.card1)
    const card2 = cards.find(card => card.id === this.state.card2)
    if (card1.value !== card2.value) {
      setTimeout(() => {
        const card1Index = cards.findIndex((card) => card.id === card1.id)
        const card2Index = cards.findIndex((card) => card.id === card2.id)
        cards[card1Index].isVisable = false
        cards[card2Index].isVisable = false
        this.setState({
          cards: cards,
          card1: null,
          card2: null,
          mismatch: true
        })
      }, 1000)
    } else {
      this.setState({
        matches: matches + 1,
        mismatch: false
      }, () => {
        this.clear()
      })
    }
  }

  clear() {
    const matches = this.state.matches
    if (matches === 3) {
      this.setState({
        allMatched: true,
        replay: true
      })
    } else {
      this.setState({
        card1: null,
        card2: null
      })
    }
  }

  reset() {
    this.setState({
      cards: startingCards(),
      card1: null,
      card2: null,
      matches: 0,
      allMatched: false,
      mismatch: false,
      replay: false
    })
  }

  render() {
    return (
      <div className='game'>
      <h1>Welcome to the Memory Game!</h1>
      <h2>Match all the cards to win.</h2>
        
        <div className='cards'>
          {this.state.cards.map((card) => {
            return <Card
              key={card.id}
              id={card.id}
              value={card.value}
              isVisable={card.isVisable}
              onClick={this.onClick}
              checkMatch={this.checkMatch} />
          })}
        </div>
        <h5>{this.state.allMatched ? win : ' '}</h5>
        <h5>{this.state.mismatch ? tryAgain : ' '}</h5>

        <div className='replaybutton'>
        {this.state.replay ?
          <button onClick={this.reset}>Play Again</button>
          : ' '}
        </div>
      </div>
    )
  }
}

export default App