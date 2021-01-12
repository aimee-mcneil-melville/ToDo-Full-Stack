import React, { useEffect, useState } from 'react'

import localDb from '../localDb'
import ItemForm from './ItemForm'

function Items (props) {
  // props.db is used during automated test runs
  // localDb() is used during normal operation
  // Not sure how I feel about doing this :|
  const db = props.db || localDb()
  const [items, setItems] = useState([])
  const [edit, setEdit] = useState(null)

  useEffect ( () => {
    setItems(db.getItems())
  }, [])

  const editItem = id => {
    setEdit({...items.find(item => item.id === id)})
  }

  const reset = () => {
    setEdit(null)
  }

  const deleteItem = (id, evt) => {
    evt.preventDefault()

    db.deleteItem(id)
    setItems(items.filter(item => item.id !== id))
  }

  const getItem = item => {
    const {id, name, description, color} = item
    return (
      <tr key={id} className='item' data-testid='item'
        onClick={() => editItem(id)} onContextMenu={() => deleteItem(id)}>
        <td className='item-name'>{name}</td>
        <td className='item-description'>{description}</td>
        <td className='item-color' style={{backgroundColor: color}}></td>
      </tr>
    )
  }

  const saveItem = item => {
    if (edit) {
      db.updateItem(item)
      setItems(items.map(i => i.id === item.id ? item : i))
      setEdit(null)
    } else {
      db.addItem(item)
      setItems(db.getItems())
    }
  }

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
              {items.map(item => getItem(item))}
            </tbody>
          </table>
        </div>

        <div className='one-third column'>
          <h2>{edit ? 'Edit' : 'Add an'} item</h2>
          <ItemForm
            editItem={edit}
            deleteItem={deleteItem}
            saveItem={saveItem}
            reset={reset}
          />
        </div>
      </div>
    )
  }

export default Items

