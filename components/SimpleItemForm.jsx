import React from 'react'

import colorList from '../color-list'

const defaultState = {
  name: '',
  description: '',
  color: 'aliceblue'
}

class SimpleItemForm extends React.Component {
  state = {
    ...defaultState
  }

  handleSubmit = evt => {
    this.props.saveItem(this.state)
    this.setState({...defaultState})
    evt.preventDefault()
  }

  handleChange = evt => {
    const { name, value } = evt.target
    this.setState({
      [name]: value
    })
  }

  render () {
    const { name, description, color } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name'
          className='u-full-width'
          onChange={this.handleChange}
          value={name}
        />

        <label htmlFor='description'>Description</label>
        <textarea name='description'
          className='u-full-width'
          onChange={this.handleChange}
          value={description}
        />

        <label htmlFor='color'>Colour</label>
        <select name='color' className='u-full-width'
          onChange={this.handleChange}
          value={color}
        >
          {colorList.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>

        <input type='submit' className='button-primary' value='Add' />
      </form>
    )
  }
}

export default SimpleItemForm
