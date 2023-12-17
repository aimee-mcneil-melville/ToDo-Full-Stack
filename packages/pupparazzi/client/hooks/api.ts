import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { Puppy, PuppyData } from '../../models/Puppy'

export function usePuppies() {
  return useQuery({
    queryKey: ['puppies'],
    queryFn: async () => {
      const res = await request.get('/api/v1/puppies')
      return res.body as Array<Puppy>
    },
  })
}

export function usePuppy(id: number) {
  return useQuery({
    queryKey: ['puppies', id],
    queryFn: async () => {
      const res = await request.get(`/api/v1/puppies/${id}`)
      return res.body as Puppy
    },
  })
}

export function useCreatePuppy() {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async ({ puppy }: { puppy: PuppyData }) => {
      const res = await request.post('/api/v1/puppies').send(puppy)
      return res.body as { id: number; location: string }
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['puppies'] })
    },
  })
}

export function useUpdatePuppy(id: number) {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async ({ puppy }: { puppy: Partial<PuppyData> }) => {
      const res = await request.patch(`/api/v1/puppies/${id}`).send(puppy)
      return res.body as Array<Puppy>
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['puppies'] })
    },
  })
}
