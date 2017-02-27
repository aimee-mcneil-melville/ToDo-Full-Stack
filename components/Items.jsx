import React from 'react'

import * as localDb from '../localDb'
import ItemForm from './ItemForm'

const Items = React.createClass({
  getInitialState () {
    return {
      items: [],
      editItem: null
    }
  },

  componentDidMount () {
    this.setState({
      items: localDb.getItems()
    })
  },

  editItem (id) {
    this.setState({
      editItem: { ...this.state.items.find(item => item.id === id) }
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
      <tr key={id} className="item" onClick={() => this.editItem(id)} onContextMenu={(evt) => this.deleteItem(evt, id)}>
        <td className="item-name">{name}</td>
        <td className="item-description">{description}</td>
        <td className="item-color" style={{ backgroundColor: color }}></td>
      </tr>
    )
  },

  saveItem (item) {
    if (this.state.editItem) {
      localDb.saveItem(item)
      this.setState({
        items: this.state.items.map(i => i.id === item.id ? item : i),
        editItem: null
      })
    } else {
      localDb.addItem(item)
      this.setState({
        items: localDb.getItems()
      })
    }
  },

  render () {
    return (
      <div className="row">
        <div className="two-thirds column">
          <h1>Items</h1>
          <p>For simplicity: click to edit, right-click to delete. Probably not the best UX for a production app!</p>
          <table className="u-full-width">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Colour</th>
              </tr>
            </thead>
            <tbody>
            {this.state.items.map(item => this.getItem(item))}
            </tbody>
          </table>
        </div>

        <div className="one-third column">
          <h2>{this.state.editItem ? 'Edit' : 'Add an'} item</h2>
          <ItemForm editItem={this.state.editItem} saveItem={this.saveItem} />
        </div>
      </div>
    )
  }
})

export default Items

