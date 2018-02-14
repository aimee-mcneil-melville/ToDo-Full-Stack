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

class ItemForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {
        isRequired: 'This field cannot be empty.',
        isNotChartreuse: 'Nobody likes chartreuse.'
      },
      item: {...initialState},
      invalid: {},
      validation: {
        name: [ 'isRequired' ],
        color: [ 'isNotChartreuse' ]
      },
      validators: {
        isRequired: val => val && val.length,
        isNotChartreuse: color => color !== 'chartreuse'
      }
    }
  }

  componentWillReceiveProps ({editItem}) {
    if (editItem) {
      this.setState({item: editItem})
    }
  }

  handleSubmit (evt) {
    evt.preventDefault()

    if (this.validate()) {
      this.props.saveItem(this.state.item)
      this.resetForm()
    }
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

  resetForm (evt) {
    if (evt) evt.preventDefault()

    this.setState({
      item: {...this.itemModel},
      invalid: {}
    })
  }

  validate () {
    const invalid = {...this.state.invalid}
    for (const field in this.state.item) {
      const validators = this.state.validation[field] || []
      validators.forEach(v => {
        if (!this.state.validators[v](this.state.item[field])) {
          invalid[field] = this.state.errors[v]
        } else {
          delete invalid[field]
        }
      })
    }
    this.setState({invalid})
    return !Object.keys(invalid).length
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>

        <label htmlFor="name">Name</label>
        <input type="text" className="u-full-width" name="name" value={this.state.item.name} onChange={this.handleChange} />
        {this.state.invalid.name ? (<div className="error">{this.state.invalid.name}</div>) : null}

        <label htmlFor="description">Description</label>
        <textarea className="u-full-width" name="description" value={this.state.item.description} onChange={this.handleChange} />
        {this.state.invalid.description ? (<div className="error">{this.state.invalid.description}</div>) : null}

        <label htmlFor="color">Colour</label>
        <select value={this.state.item.color} onChange={this.handleChange} className="u-full-width">
          {this.itemColors.map((color, i) => (
            <option key={i} value={color}>{color}</option>
          ))}
        </select>
        {this.state.invalid.color ? (<div className="error">{this.state.invalid.color}</div>) : null}

        <input type="submit" className="button-primary" value={this.props.editItem ? 'Save' : 'Add'} />
        <button className="button-warning" onClick={(evt) => this.resetForm(evt)}>Reset</button>
      </form>
    )
  }
}

export default ItemForm
