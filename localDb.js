const storageKey = '_eda_react_form_items'

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
  const storage = JSON.parse(localStorage.getItem(storageKey) || '[]')
  storage.push(newItem)
  localStorage.setItem(storageKey, JSON.stringify(storage))
}

export const getItems = () => JSON.parse(localStorage.getItem(storageKey) || '[]')

export const updateItem = (item) => {
  const items = JSON.parse(localStorage.getItem(storageKey) || '[]')
  localStorage.setItem(
    storageKey,
    JSON.stringify(items.map(i => i.id === item.id ? item : i))
  )
}

export const deleteItem = id => {
  const items = JSON.parse(localStorage.getItem(storageKey))
  localStorage.setItem(storageKey, JSON.stringify(items.filter(r => r.id !== id)))
}
