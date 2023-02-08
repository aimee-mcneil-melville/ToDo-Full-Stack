import { useState, FormEvent, ChangeEvent } from 'react'
import { Widget, WidgetData } from '../../models/Widget'

interface Props extends Partial<Widget> {
  submitWidget: (widget: WidgetData) => void
  setShowForm: (showAdd: boolean) => void
}

export default function WidgetForm({
  name,
  price,
  mfg,
  inStock,
  rating,
  submitWidget,
  setShowForm,
}: Props) {
  const formInitialState = {
    name: name || '',
    price: price || 0.0,
    mfg: mfg || '',
    inStock: inStock || 0,
    rating: rating || 0,
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
      <form onSubmit={handleSubmit} aria-label="Widget form">
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

        <label htmlFor="rating">Rating:</label>
        <input
          onChange={handleChange}
          value={form.rating}
          name="rating"
          id="rating"
        />

        <button>Submit</button>
        <button type="button" onClick={() => setShowForm(false)}>
          Cancel
        </button>
      </form>
    </div>
  )
}
