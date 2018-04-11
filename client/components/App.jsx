import React from 'react'

import Card from './Card'

const cards = [
  { id: 1, value: 1, isVisable: false },
  { id: 2, value: 2, isVisable: false },
  { id: 3, value: 2, isVisable: false },
  { id: 4, value: 3, isVisable: false },
  { id: 5, value: 1, isVisable: false },
  { id: 6, value: 3, isVisable: false },
]

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: cards,
      card1: null,
      card2: null
    }
    this.onClick = this.onClick.bind(this)
    this.clear = this.clear.bind(this)
    this.checkMatch = this.checkMatch.bind(this)
  }

  onClick(id) {
    const card1 = this.state.card1
    const card2 = this.state.card2
    if (card1 === null) {
      const newCards = [...this.state.cards]
      const cardIndex = newCards.findIndex((card) => card.id === id)
      newCards[cardIndex].isVisable = true
      this.setState({
        card1: id,
        cards: newCards
      })
    }
    if ((card1 !== null) && (card2 === null)) {
      const newCards = [...this.state.cards]
      const cardIndex = newCards.findIndex((card) => card.id === id)
      newCards[cardIndex].isVisable = true
      this.setState({
        card2: id,
        cards: newCards
      }, () => {
        this.checkMatch()
      })
    }
  }

  checkMatch() {
    const card1 = this.state.cards.find(card => card.id === this.state.card1)
    const card2 = this.state.cards.find(card => card.id === this.state.card2)
    if (card1.value !== card2.value) {

      setTimeout(() => {
        console.log('reset')
        const newCards = [...this.state.cards]
        const cardIndex1 = newCards.findIndex((card) => card.id === card1.id)
        const cardIndex2 = newCards.findIndex((card) => card.id === card2.id)
        newCards[cardIndex1].isVisable = false
        newCards[cardIndex2].isVisable = false
        this.setState({
          cards: newCards,
          card1: null,
          card2: null
        })
      }, 5000)
    } else {
      this.clear()
    }


  }

  clear() {
    this.setState({
      card1: null,
      card2: null
    })
  }

  render() {
    return (
      <div className='memorygame'>
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
    )
  }
}

export default App