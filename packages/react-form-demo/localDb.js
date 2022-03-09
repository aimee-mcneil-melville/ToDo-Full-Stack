const storageKey = '_eda_react_form_items'

// http://stackoverflow.com/a/2117523/122643, more or less...
const generateUUID = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
  const r = Math.random() * 16 | 0
  const v = c === 'x' ? r : (r & 0x3 | 0x8)
  return v.toString(16)
})

export default (storage = window.localStorage, key = storageKey) => ({
  addItem: item => {
    const newItem = {
      id: generateUUID(),
      ...item
    }
    const items = JSON.parse(storage.getItem(key) || '[]')
    items.push(newItem)
    storage.setItem(key, JSON.stringify(items))
  },

  getItems: () => JSON.parse(storage.getItem(key) || '[]'),

  updateItem: item => {
    const existing = JSON.parse(storage.getItem(key) || '[]')
    const items = existing.map(i => i.id === item.id ? item : i)
    storage.setItem(key, JSON.stringify(items))
  },

  deleteItem: id => {
    const items = JSON.parse(storage.getItem(key))
    localStorage.setItem(key, JSON.stringify(items.filter(r => r.id !== id)))
  }
})
