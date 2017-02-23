import React from 'react'

import * as localDb from '../localDb'
import ItemForm from './ItemForm'

const Items = React.createClass({
  getInitialState () {
    return {
      items: []
    }
  },

  componentDidMount () {
    this.refreshItemList()
  },

  getItem (item) {
    const { id, name, description, color } = item
    const { deleteItem } = this.props
    return (
      <tr key={id}>
        <td className="item-name">{name}</td>
        <td className="item-description">{description}</td>
        <td className="item-color">{color}</td>
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

