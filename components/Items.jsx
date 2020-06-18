import React from 'react'

import localDb from '../localDb'
import ItemForm from './ItemForm'

class Items extends React.Component {
  // this.props.db is used during automated test runs
  // localDb() is used during normal operation
  // Not sure how I feel about doing this :|
  db = this.props.db || localDb()

  state = {
    items: [],
    editItem: null
  }

  componentDidMount () {
    this.setState({
      items: this.db.getItems()
    })
  }

  editItem = id => {
    this.setState({
      editItem: {...this.state.items.find(item => item.id === id)}
    })
  }

  reset = () => {
    this.setState({ editItem: null })
  }

  deleteItem = (id, evt) => {
    evt.preventDefault()

    this.db.deleteItem(id)
    this.setState({
      items: this.state.items.filter(item => item.id !== id)
    })
  }

  getItem = item => {
    const {id, name, description, color} = item
    const editItem = this.editItem.bind(this, id)
    const deleteItem = this.deleteItem.bind(this, id)
    return (
      <tr key={id} className='item' data-testid='item'
        onClick={editItem} onContextMenu={deleteItem}>
        <td className='item-name'>{name}</td>
        <td className='item-description'>{description}</td>
        <td className='item-color' style={{backgroundColor: color}}></td>
      </tr>
    )
  }

  saveItem = item => {
    if (this.state.editItem) {
      this.db.updateItem(item)
      this.setState({
        items: this.state.items.map(i => i.id === item.id ? item : i),
        editItem: null
      })
    } else {
      this.db.addItem(item)
      this.setState({
        items: this.db.getItems()
      })
    }
  }

  render () {
    return (
      <div className='row'>
        <div className='two-thirds column'>
          <h1>Items</h1>
          <p>
            Left-click to edit, right-click to delete.
            (Probably not the best UX for a production app!)
          </p>
          <table className='u-full-width'>
            <thead>
              <tr>
                <th className='item-name'>Name</th>
                <th className='item-description'>Description</th>
                <th className='item-color'>Colour</th>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map(item => this.getItem(item))}
            </tbody>
          </table>
        </div>

        <div className='one-third column'>
          <h2>{this.state.editItem ? 'Edit' : 'Add an'} item</h2>
          <ItemForm
            editItem={this.state.editItem}
            deleteItem={this.deleteItem}
            saveItem={this.saveItem}
            reset={this.reset}
          />
        </div>
      </div>
    )
  }
}

export default Items

