import { useState, FormEvent, ChangeEvent } from 'react'
import { WidgetData } from '../../models/Widget'

interface Props {
  submitWidget: (widget: WidgetData) => void
  setShowAdd: (showAdd: boolean) => void
}

export default function AddWidget({ submitWidget, setShowAdd }: Props) {
  const formInitialState = {
    name: '',
    price: 0.0,
    mfg: '',
    inStock: 0,
  }

  const [form, setForm] = useState(formInitialState)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    submitWidget(form)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          onChange={handleChange}
          value={form.name}
          name="name"
          id="name"
        />

        <label htmlFor="price">Price:</label>
        <input
          onChange={handleChange}
          value={form.price}
          name="price"
          id="price"
        />

        <label htmlFor="mfg">Manufacturer: </label>
        <input onChange={handleChange} value={form.mfg} name="mfg" id="mfg" />

        <label htmlFor="inStock">In stock:</label>
        <input
          onChange={handleChange}
          value={form.inStock}
          name="inStock"
          id="inStock"
        />

        <button>Submit</button>
        <button type="button" onClick={() => setShowAdd(false)}>
          Cancel
        </button>
      </form>
    </div>
  )
}
