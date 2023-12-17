import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreatePuppy } from '../hooks/api.ts'
import ErrorMessage from '../components/ErrorMessage.tsx'
import CreatePuppyForm from '../components/CreatePuppyForm.tsx'
import { PuppyData } from '../../models/Puppy.ts'

export default function CreatePuppy() {
  const create = useCreatePuppy()
  const navigate = useNavigate()

  const handleUpdate = useCallback(async (puppy: PuppyData) => {
    const { id } = await create.mutateAsync({ puppy })
    navigate(`/${id}`)
  }, [])

  return (
    <>
      <h2>Add a new puppy</h2>
      {create.isError && <ErrorMessage error={create.error} />}
      <CreatePuppyForm onSubmit={handleUpdate} pending={create.isPending} />
    </>
  )
}
