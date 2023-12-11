import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { usePuppy, useUpdatePuppy } from '../hooks/api.ts'
import ErrorMessage from '../components/ErrorMessage.tsx'
import LoadingIndicator from '../components/LoadingIndicator.tsx'
import EditPuppyForm from '../components/EditPuppyForm.tsx'
import { PuppyData } from '../../models/Puppy.ts'

export default function EditPuppy() {
  const id = Number(useParams().id)
  if (isNaN(id)) {
    throw new Error(`Missing route param "id"`)
  }

  const puppy = usePuppy(id)
  const edit = useUpdatePuppy(id)

  const navigate = useNavigate()

  const handleUpdate = useCallback(async (puppy: Partial<PuppyData>) => {
    await edit.mutateAsync({ puppy })
    navigate(`/${id}`)
  }, [edit, navigate, id])

  if (puppy.isLoading) {
    return <LoadingIndicator />
  }

  if (puppy.isError || !puppy.data) {
    return <ErrorMessage error={puppy.error} />
  }

  return (
    <EditPuppyForm
      onUpdate={handleUpdate}
      pending={edit.isPending}
      {...puppy.data}
    />
  )
}
