import React from 'react'

import * as localDb from '../localDb'

const initialState = {
  name: '',
  description: '',
  color: 'aliceblue'
}

const itemColors = [
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
]

class SimpleItemForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      item: {...initialState}
    }
  }

  handleSubmit (evt) {
    evt.preventDefault()
    this.props.saveItem(this.state.item)
    this.setState({
      item: {...initialState}
    })
  }

  handleChange (evt) {
    // select lists have no 'name' attribute
    const field = evt.target.name || 'color'
    this.setState({
      item: {
        ...this.state.item,
        [field]: evt.target.value
      }
    })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>

        <label htmlFor="name">Name</label>
        <input type="text" className="u-full-width"
          name="name"
          value={this.state.item.name}
          onChange={this.handleChange}
        />

        <label htmlFor="description">Description</label>
        <textarea className="u-full-width"
          name="description"
          value={this.state.item.description}
          onChange={this.handleChange}
        />

        <label htmlFor="color">Colour</label>
        <select className="u-full-width"
          value={this.state.item.color}
          onChange={this.handleChange}
        >
          {this.itemColors.map((color, i) => (
            <option key={i} value={color}>{color}</option>
          ))}
        </select>

        <input type="submit" className="button-primary" value="Add" />
      </form>
    )
  }
}

export default SimpleItemForm
