import { createRoutesFromElements, Route } from 'react-router-dom'

import AppLayout from './components/AppLayout'
import TextForm from './components/0-Text'
import CheckboxForm from './components/1-Checkbox'
import TextAndCheckboxForm from './components/2-TextAndCheckbox'
import SelectForm from './components/3-Select'
import AddingAndDeletingForm from './components/4-AddingAndRemoving'

export const routes = createRoutesFromElements(
  <Route element={<AppLayout />}>
    <Route path="0" element={<TextForm />} />
    <Route path="1" element={<CheckboxForm />} />
    <Route path="2" element={<TextAndCheckboxForm />} />
    <Route path="3" element={<SelectForm />} />
    <Route path="4" element={<AddingAndDeletingForm />} />
  </Route>
)
