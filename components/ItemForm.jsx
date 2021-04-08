import React, { useEffect, useState } from 'react'

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

function ItemForm (props) {
  const [invalid, setInvalid] = useState({})
  const [item, setItem] = useState({...(props.editItem || defaultState)})

  useEffect(() => {
    const {editItem} = props
    setItem(editItem || defaultState)
  }, [props.editItem])

  const handleChange = evt => {
    const { name, value } = evt.target
    setItem({
        ...item,
        [name]: value
      })
  }

  const handleSubmit = evt => {
    const results = validate(item, validationRules, invalid)
    evt.preventDefault()

    if (results.isValid) {
      props.saveItem(item)
      handleReset()
    } else {
      setInvalid(results.details)
    }
  }

  const handleReset = evt => {
    evt && evt.preventDefault()
    setItem({...defaultState})
    setInvalid({})
    props.reset()
  }

  const handleDelete = evnt => {
    const { deleteItem, editItem, reset } = props
    deleteItem(editItem.id, evnt)
    setItem({...defaultState})
    setInvalid({})
    reset()
  }

    return (
      <form data-testid='form'
        onSubmit={handleSubmit}
        onReset={handleReset}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name'
          className='u-full-width'
          value={item.name}
          onChange={handleChange}
        />

        {invalid.name &&
          <div className='error'>{invalid.name}</div>
        }

        <label htmlFor='description'>Description</label>
        <textarea id="description" name='description'
          className='u-full-width'
          value={item.description}
          onChange={handleChange}
        />

        {invalid.description &&
          <div className='error'>{invalid.description}</div>
        }

        <label htmlFor='color'>Colour</label>
        <select id='color' name='color'
          className='u-full-width'
          value={item.color}
          onChange={handleChange}>
          {colorList.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>

        {invalid.color &&
          <div className='error'>{invalid.color}</div>
        }

        <input type='submit'
          className='button-primary'
          data-testid='submit'
          value={props.editItem ? 'Save' : 'Add'} />

        <button type='reset'
          className='button-info'
          data-testid='reset'>Reset</button>

        {props.editItem && props.deleteItem &&
          <button type='delete'
            className='button-warning'
            onClick={handleDelete}
            data-testid='delete'>Delete</button>
        }
      </form>
    )
  }

export default ItemForm

