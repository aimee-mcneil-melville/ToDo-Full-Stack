import React from 'react'

import Dog from './Dog'
import Subtitle from './Subtitle'

export default React.createClass({
  getInitialState () {
    return {
      dogs: [
        { name: 'Desdemona', breed: 'Bulldog', superpower: 'Heat vision', image: 'bulldog.png' },
        { name: 'Horatio', breed: 'Greyhound', superpower: 'Prehensile tail', image: 'greyhound.png' },
        { name: 'Othello', breed: 'Bull Terrier', superpower: 'Flight. Also, an acute sense of impending tragedy.', image: 'bull-terrier.png' },
        { name: 'Caliban', breed: 'Hound', superpower: 'Super bark', image: 'hound.png' },
        { name: 'Cleopatra', breed: 'Dachshund', superpower: 'Faking own death. Bewitching gaze.', image: 'dachshund.png' },
        { name: 'Lady Macbeth', breed: 'Scottie', superpower: 'Stealth, guilt, and remorse.', image: 'scottie.png' }
      ]
    }
  },

  render () {
    const createDog = dog => <Dog name={dog.name} breed={dog.breed} superpower={dog.superpower} image={dog.image} />
    return (
      <div className="container">
        <img className="spinner" src="images/paw.png" />
        <Subtitle text="Canines using supercanine abilities for social good." />
        {this.state.dogs.map(createDog)}
      </div>
    )
  }
})
