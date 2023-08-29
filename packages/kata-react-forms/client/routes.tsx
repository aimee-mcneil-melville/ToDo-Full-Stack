import { createRoutesFromElements, Route } from 'react-router-dom'

import AppLayout from './components/AppLayout.tsx'
import TextForm from './components/0-Text.tsx'
import CheckboxForm from './components/1-Checkbox.tsx'
import TextAndCheckboxForm from './components/2-TextAndCheckbox.tsx'
import SelectForm from './components/3-Select.tsx'
import AddingAndDeletingForm from './components/4-AddingAndRemoving.tsx'

export const routes = createRoutesFromElements(
  <Route element={<AppLayout />}>
    <Route path="0" element={<TextForm />} />
    <Route path="1" element={<CheckboxForm />} />
    <Route path="2" element={<TextAndCheckboxForm />} />
    <Route path="3" element={<SelectForm />} />
    <Route path="4" element={<AddingAndDeletingForm />} />
  </Route>
)
