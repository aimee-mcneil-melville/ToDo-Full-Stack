import React from 'react'

import Card from './Card'

function startingCards() {
  return [
    { id: 1, value: 1, isVisable: false },
    { id: 2, value: 4, isVisable: false },
    { id: 3, value: 2, isVisable: false },
    { id: 4, value: 3, isVisable: false },
    { id: 5, value: 5, isVisable: false },
    { id: 6, value: 6, isVisable: false },
    { id: 7, value: 1, isVisable: false },
    { id: 8, value: 3, isVisable: false },
    { id: 9, value: 5, isVisable: false },
    { id: 10, value: 2, isVisable: false },
    { id: 11, value: 6, isVisable: false },
    { id: 12, value: 4, isVisable: false },
  ]
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: startingCards(),
    }
  }

  render() {
    return (
      <div className='game'>
        <h1>Welcome to the Memory Game!</h1>
        <h2>Match all the cards to win.</h2>

        <div className='board'>
          <div className='cards'>
            {this.state.cards.map((card) => {
              return <Card
                key={card.id}
                id={card.id}
                value={card.value}
                isVisable={card.isVisable} />
            })}
          </div>
        </div>

      </div>
    )
  }
}

export default App
