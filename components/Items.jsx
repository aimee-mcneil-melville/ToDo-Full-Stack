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
    this.refreshItemList()
  },

  editItem (item) {
    this.setState({
      editItem: item
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
    const { deleteItem } = this.props
    return (
      <tr key={id} onContextMenu={(evt) => this.deleteItem(evt, id)}>
        <td className="item-name">{name}</td>
        <td className="item-description">{description}</td>
        <td className="item-color" style={{ backgroundColor: color }}></td>
      </tr>
    )
  },

  refreshItemList () {
    this.setState({
      items: localDb.getItems()
    })
  },
  
  render () {
    return (
      <div className="row">
        <div className="two-thirds column">
          <h1>Items</h1>
          <p>Click to edit, right-click to delete.</p>
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
          <h2>Add an item</h2>
          <ItemForm refreshItemList={this.refreshItemList} />
        </div>
      </div>
    )
  }
})

export default Items

