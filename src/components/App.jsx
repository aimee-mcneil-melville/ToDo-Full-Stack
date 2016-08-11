import React from 'react'

import Dog from './Dog'
import Subtitle from './Subtitle'

export default React.createClass({
  render () {
    return (
      <div className="container">
        <img className="spinner" src="images/paw.png" />
        <Subtitle text="Canines using supercanine abilities for social good." />
        <Dog name="Desdemona" breed="Bulldog" superpower="Heat vision" />
        <Dog name="Radagast" breed="Greyhound" superpower="Prehensile tail" />
      </div>
    )
  }
})
