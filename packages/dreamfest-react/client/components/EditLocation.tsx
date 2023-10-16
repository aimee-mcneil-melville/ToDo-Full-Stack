import { useParams } from 'react-router-dom'

import LocationsNav from './LocationsNav.tsx'
import EditLocationForm from './EditLocationForm.tsx'
import { useLocationData } from '../hooks/api.ts'
import LoadingIndicator from './LoadingIndicator.tsx'

export default function EditLocation() {
  const params = useParams()
  const id = Number(params.id)

  const { data, isLoading, isError } = useLocationData(id)

  if (isLoading) {
    return (
      <main aria-live="polite" aria-busy={true}>
        <LoadingIndicator />
      </main>
    )
  }

  if (isError || !data) {
    return (
      <main aria-live="polite" aria-busy={false}>
        <p>Something went wrong loading this page</p>
      </main>
    )
  }

  return (
    <main aria-live="polite" aria-busy={false}>
      <LocationsNav />
      <h2>
        edit location: <span className="data">{data.name}</span>
      </h2>
      <EditLocationForm
        name={data.name}
        description={data.description}
        id={id}
      />
    </main>
  )
}
