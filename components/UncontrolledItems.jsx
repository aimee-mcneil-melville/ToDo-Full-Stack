import React from 'react'
import { Link } from 'react-router'

import * as localDb from '../localDb'
import UncontrolledItemForm from './UncontrolledItemForm'

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
          <p>Right-click to delete. (Probably not the best UX for a production app!)</p>
          <p>This is the <strong>uncontrolled component</strong> version of the demo. This technique uses refs to keep track of values in the DOM. You may like to read <a href="http://stackoverflow.com/a/29504636/122643">this Stack Overflow answer</a> on why refs aren't always a great choice. However, they can often work well for simple forms (see <a href="https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/">here</a> for a balanced viewpoint).</p>
          <p>For the complex (controlled component) version, <Link to="/">click here</Link>. For the simple (controlled component) version, <Link to="/simple">click here</Link>.</p>
          <p></p>
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
          <UncontrolledItemForm saveItem={this.saveItem} />
          <p>Above component is <strong>&lt;UncontrolledItemForm /&gt;</strong>.</p>
        </div>
      </div>
    )
  }
})

