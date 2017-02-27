import React from 'react'
import { Link } from 'react-router'

import * as localDb from '../localDb'
import SimpleItemForm from './SimpleItemForm'

export default React.createClass({
  getInitialState () {
    return {
      items: []
    }
  },

  componentDidMount () {
    this.setState({
      items: localDb.getItems()
    })
  },

  deleteItem (evt, id) {
    evt.preventDefault()

    localDb.deleteItem(id)
    this.setState({
      items: this.state.items.filter(item => item.id !== id)
    })
  },

  getItem (item) {
    const { id, name, description, color } = item
    return (
      <tr key={id} className="item" onContextMenu={(evt) => this.deleteItem(evt, id)}>
        <td className="item-name">{name}</td>
        <td className="item-description">{description}</td>
        <td className="item-color" style={{ backgroundColor: color }}></td>
      </tr>
    )
  },

  saveItem (item) {
    localDb.addItem(item)
    this.setState({
      items: localDb.getItems()
    })
  },

  render () {
    return (
      <div className="row">
        <div className="two-thirds column">
          <h1>Items</h1>
          <p>This is the simple version of the demo, without editing or validation. For the complex version, <Link to="/">click here</Link>.</p>
          <p>Right-click to delete. (Probably not the best UX for a production app!)</p>
          <table className="u-full-width">
            <thead>
              <tr>
                <th className="item-name">Name</th>
                <th className="item-description">Description</th>
                <th className="item-color">Colour</th>
              </tr>
            </thead>
            <tbody>
            {this.state.items.map(item => this.getItem(item))}
            </tbody>
          </table>
        </div>

        <div className="one-third column">
          <h2>Add an item</h2>
          <SimpleItemForm saveItem={this.saveItem} />
        </div>
      </div>
    )
  }
})

