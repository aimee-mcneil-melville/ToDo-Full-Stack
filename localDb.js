// http://stackoverflow.com/a/2117523/122643, more or less...
const generateUUID = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
  const r = Math.random() * 16 | 0
  const v = c === 'x' ? r : (r & 0x3 | 0x8)
  return v.toString(16)
})

export const addItem = item => {
  const newItem = {
    id: generateUUID(),
    ...item
  }
  const storage = JSON.parse(localStorage.getItem('_eda_items') || '[]')
  storage.push(newItem)
  localStorage.setItem('_eda_items', JSON.stringify(storage))
}

export const getItems = () => JSON.parse(localStorage.getItem('_eda_items') || '[]')

export const saveItem = ({ id, name, description }) => {
  const saveItem = { id, name, description }
  const items = JSON.parse(localStorage.getItem('_eda_items') || '[]')
  localStorage.setItem(
    '_eda_items',
    JSON.stringify(items.map(i => i.id === id ? saveItem : i))
  )
}

export const deleteItem = id => {
  const items = JSON.parse(localStorage.getItem('_eda_items'))
  localStorage.setItem('_eda_items', JSON.stringify(items.filter(r => r.id !== id)))
}

