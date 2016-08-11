import React from 'react'

import Dog from './Dog'
import Subtitle from './Subtitle'

export default React.createClass({
  render () {
    return (
      <div className="container">
        <img className="spinner" src="images/paw.png" />
        <Subtitle text="Canines using supercanine abilities for social good." />
        <Dog name="Desdemona" breed="Bulldog" superpower="Heat vision" image="bulldog.png" />
        <Dog name="Horatio" breed="Greyhound" superpower="Prehensile tail" image="greyhound.png" />
        <Dog name="Othello" breed="Bull Terrier" superpower="Flight. Also, an acute sense of impending tragedy." image="bull-terrier.png" />
        <Dog name="Caliban" breed="Hound" superpower="Super bark" image="hound.png" />
        <Dog name="Cleopatra" breed="Dachshund" superpower="Faking own death. Bewitching gaze." image="dachshund.png" />
        <Dog name="Lady Macbeth" breed="Scottie" superpower="Stealth, guilt, and remorse." image="scottie.png" />
      </div>
    )
  }
})
