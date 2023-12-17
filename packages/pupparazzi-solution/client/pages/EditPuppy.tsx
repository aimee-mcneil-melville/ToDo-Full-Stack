import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useDeletePuppy, usePuppy, useUpdatePuppy } from '../hooks/api.ts'
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
  const del = useDeletePuppy(id)
  const navigate = useNavigate()

  const handleDelete = useCallback(async () => {
    await del.mutateAsync()
    navigate('/')
  }, [del])

  const handleUpdate = useCallback(async (puppy: Partial<PuppyData>) => {
    await edit.mutateAsync({ puppy })
    navigate(`/${id}`)
  }, [])

  if (puppy.isLoading) {
    return <LoadingIndicator />
  }

  if (puppy.isError || !puppy.data) {
    return <ErrorMessage error={puppy.error} />
  }

  return (
    <EditPuppyForm
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      pending={edit.isPending || del.isPending}
      {...puppy.data}
    />
  )
}
