export default function () {
  let testItems = [
    {
      id: 1,
      color: 'burlywood',
      name: 'test name 1',
      description: 'test description 1'
    }, {
      id: 2,
      color: 'tomato',
      name: 'test name 2',
      description: 'test description 2'
    }, {
      id: 3,
      color: 'thistle',
      name: 'test name 3',
      description: 'test description 3'
    }
  ]

  return {
    addItem: item => {
      const newItem = {...item}
      newItem.id = testItems.length + 1
      testItems.push(newItem)
      testItems = [...testItems]
    },
    getItems: () => { return [...testItems]},
    updateItem: item => {
      testItems = testItems.map(i => i.id === item.id ? {...item} : i)
    },
    deleteItem: id => {
      testItems = testItems.filter(i => i.id !== id)
    }
  }
}
