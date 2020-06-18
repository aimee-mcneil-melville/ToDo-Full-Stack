import React from 'react'

import colorList from '../color-list'
import { validate, rules } from '../validation'

const defaultState = {
  name: '',
  description: '',
  color: ''
}

const validationRules = {
  name: [ rules.isRequired ],
  color: [ rules.isNotChartreuse ]
}

class ItemForm extends React.Component {
  state = {
    invalid: {},
    item: {...(this.props.editItem || defaultState)}
  }

  componentDidUpdate (prevProps) {
    const {editItem} = this.props
    if (editItem && editItem !== prevProps.editItem) {
      this.setState({item: {...editItem}})
    }
  }

  handleChange = evt => {
    const { name, value } = evt.target
    this.setState({
      item: {
        ...this.state.item,
        [name]: value
      }
    })
  }

  handleSubmit = evt => {
    const {invalid, item} = this.state
    const results = validate(item, validationRules, invalid)
    evt.preventDefault()

    if (results.isValid) {
      this.props.saveItem(item)
      this.handleReset()
    } else {
      this.setState({invalid: results.details})
    }
  }

  handleReset = evt => {
    evt && evt.preventDefault()
    this.setState({
      item: {...defaultState},
      invalid: {}
    })
    this.props.reset()
  }

  handleDelete = evnt => {
    const { deleteItem, editItem, reset } = this.props
    deleteItem(editItem.id, evnt)
    this.setState({
      item: {...defaultState},
      invalid: {}
    })
    reset()
  }

  render () {
    return (
      <form data-testid='form'
        onSubmit={this.handleSubmit}
        onReset={this.handleReset}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name'
          className='u-full-width'
          value={this.state.item.name}
          onChange={this.handleChange}
        />

        {this.state.invalid.name &&
          <div className='error'>{this.state.invalid.name}</div>
        }

        <label htmlFor='description'>Description</label>
        <textarea id="description" name='description'
          className='u-full-width'
          value={this.state.item.description}
          onChange={this.handleChange}
        />

        {this.state.invalid.description &&
          <div className='error'>{this.state.invalid.description}</div>
        }

        <label htmlFor='color'>Colour</label>
        <select id='color' name='color'
          className='u-full-width'
          value={this.state.item.color}
          onChange={this.handleChange}>
          {colorList.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>

        {this.state.invalid.color &&
          <div className='error'>{this.state.invalid.color}</div>
        }

        <input type='submit'
          className='button-primary'
          data-testid='submit'
          value={this.props.editItem ? 'Save' : 'Add'} />

        <button type='reset'
          className='button-info'
          data-testid='reset'>Reset</button>

        {this.props.editItem && this.props.deleteItem &&
          <button type='delete'
            className='button-warning'
            onClick={this.handleDelete}
            data-testid='delete'>Delete</button>
        }
      </form>
    )
  }
}

export default ItemForm

