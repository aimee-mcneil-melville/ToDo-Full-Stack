import React from 'react'

import * as localDb from '../localDb'

// Uncontrolled component form
// https://facebook.github.io/react/docs/uncontrolled-components.html
export default React.createClass({
  itemColors: [
    'aliceblue',
    'blanchedalmond',
    'burlywood',
    'cadetblue',
    'chartreuse',
    'darkgoldenrod',
    'cornflowerblue',
    'tomato',
    'gainsboro',
    'mediumaquamarine',
    'papayawhip',
    'thistle',
    'whitesmoke'
  ],

  handleSubmit (evt) {
    evt.preventDefault()

    this.props.saveItem({
      name: this.name.value,
      description: this.description.value,
      color: this.color.value
    })
  },

  render () {
    return (
      <form onSubmit={this.handleSubmit} ref={form => this.form = form}>
        <label htmlFor="name">Name</label>
        <input type="text" className="u-full-width" ref={name => this.name = name} />
        <label htmlFor="description">Description</label>
        <textarea className="u-full-width" ref={description => this.description = description} />
        <label htmlFor="color">Colour</label>
        <select defaultValue={this.itemColors[0]} className="u-full-width" ref={color => this.color = color} >
          {this.itemColors.map((color, i) => (
            <option key={i} defaultValue={color}>{color}</option>
          ))}
        </select>
        <input type="submit" className="button-primary" type="submit" value="Add" />
      </form>
    )
  }
})

